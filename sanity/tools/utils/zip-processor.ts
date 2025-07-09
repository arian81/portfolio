import { useState, useCallback, useMemo } from 'react'
import JSZip from 'jszip'
import matter from 'gray-matter'
import type { SanityClient } from 'sanity'
import type { ExtractedContent, AssetFile, PostMetadata, CreatedDocument } from './types'

const SUPPORTED_IMAGE_TYPES = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg']

type UploadStatus = 'idle' | 'processing' | 'uploading' | 'success' | 'error'

interface UploadProgress {
  step: string
  current: number
  total: number
  details?: string
}

interface UseZipUploadOptions {
  generateSlug?: boolean
  asDraft?: boolean
  onSuccess?: (document: CreatedDocument) => void
  onError?: (error: Error) => void
}

interface UseZipUploadReturn {
  status: UploadStatus
  progress: UploadProgress | null
  extractedContent: ExtractedContent | null
  error: string | null
  uploadZip: (file: File) => Promise<void>
  reset: () => void
}

export function useZipUpload(
  client: SanityClient,
  options: UseZipUploadOptions = {}
): UseZipUploadReturn {
  const [status, setStatus] = useState<UploadStatus>('idle')
  const [progress, setProgress] = useState<UploadProgress | null>(null)
  const [extractedContent, setExtractedContent] = useState<ExtractedContent | null>(null)
  const [error, setError] = useState<string | null>(null)

  const processor = useMemo(() => new ZipProcessor(), [])

  const uploadZip = useCallback(async (file: File) => {
    setStatus('processing')
    setError(null)
    setProgress({ step: 'Extracting ZIP contents...', current: 0, total: 4 })

    try {
      const content = await processor.extractZipContents(file)
      setExtractedContent(content)
      setProgress({ 
        step: 'Uploading assets...', 
        current: 1, 
        total: 4, 
        details: `Found ${content.assets.length} assets` 
      })

      setStatus('uploading')
      const assetMap = await processor.uploadAssets(client, content.assets, (uploaded: number, total: number) => {
        setProgress({ 
          step: 'Uploading assets...', 
          current: 1, 
          total: 4, 
          details: `${uploaded}/${total} assets uploaded` 
        })
      })

      setProgress({ step: 'Processing content...', current: 2, total: 4 })
      const processedMarkdown = processor.replaceAssetReferences(content.markdownContent, assetMap)

      setProgress({ step: 'Creating document...', current: 3, total: 4 })
      const document = await processor.createPostDocument(client, content, processedMarkdown, {
        generateSlug: options.generateSlug,
        asDraft: options.asDraft
      })

      setStatus('success')
      setProgress({ step: 'Complete!', current: 4, total: 4 })
      
      options.onSuccess?.(document)
    } catch (err) {
      setStatus('error')
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred'
      setError(errorMessage)
      
      const error = err instanceof Error ? err : new Error(errorMessage)
      options.onError?.(error)
    }
  }, [client, processor, options])

  const reset = useCallback(() => {
    setStatus('idle')
    setProgress(null)
    setExtractedContent(null)
    setError(null)
  }, [])

  return {
    status,
    progress,
    extractedContent,
    error,
    uploadZip,
    reset
  }
}

class ZipProcessor {
  /**
   * Extract and parse zip file contents in the browser
   */
  async extractZipContents(file: File): Promise<ExtractedContent> {
    const arrayBuffer = await file.arrayBuffer()
    const zip = await JSZip.loadAsync(arrayBuffer)

    // Find markdown file
    const markdownFiles = Object.keys(zip.files).filter(name => {
      const zipFile = zip.files[name]
      if (!zipFile || zipFile.dir || !name.endsWith('.md')) return false
      
      // Apply same filtering logic as for assets
      const filename = this.getBasename(name)
      return !this.shouldSkipFile(filename, name)
    })

    if (markdownFiles.length === 0) {
      throw new Error('No markdown file found in zip')
    }

    if (markdownFiles.length > 1) {
      throw new Error(`Multiple markdown files found: ${markdownFiles.join(', ')}. Please include only one markdown file in the ZIP.`)
    }

    const markdownFile = markdownFiles[0]!
    const markdownFileObj = zip.files[markdownFile]
    if (!markdownFileObj) {
      throw new Error(`Could not access markdown file: ${markdownFile}`)
    }
    const markdownContent = await markdownFileObj.async('text')

    // Find image assets
    const assetFiles: AssetFile[] = []
    
    for (const [filePath, zipFile] of Object.entries(zip.files)) {
      if (zipFile.dir || filePath === markdownFile) continue

      // Skip macOS metadata files and other system files
      const filename = this.getBasename(filePath)
      if (this.shouldSkipFile(filename, filePath)) {
        continue
      }

      const ext = this.getFileExtension(filePath).toLowerCase()
      
      if (SUPPORTED_IMAGE_TYPES.includes(ext)) {
        const arrayBuffer = await zipFile.async('arraybuffer')
        const buffer = Buffer.from(arrayBuffer)
        const mimeType = this.getMimeType(ext)
        
        assetFiles.push({
          filename,
          path: filePath,
          buffer,
          mimeType
        })
      }
    }

    // Extract metadata from frontmatter if present
    const metadata = this.extractFrontmatter(markdownContent)

    return {
      markdownFile,
      markdownContent,
      assets: assetFiles,
      metadata
    }
  }

  /**
   * Upload assets to Sanity and return mapping of local paths to Sanity URLs
   */
  async uploadAssets(
    client: SanityClient,
    assets: AssetFile[], 
    onProgress?: (uploaded: number, total: number) => void
  ): Promise<Map<string, string>> {
    const assetMap = new Map<string, string>()
    const failedUploads: string[] = []

    for (let i = 0; i < assets.length; i++) {
      const asset = assets[i]!
      try {
        const assetType = asset.mimeType.startsWith('image/') ? 'image' : 'file'
        
        const uploadedAsset = await client.assets.upload(assetType, asset.buffer, {
          filename: asset.filename,
          contentType: asset.mimeType
        })

        const assetUrl = uploadedAsset.url
        assetMap.set(asset.path, assetUrl)
        assetMap.set(asset.filename, assetUrl) // Also map by filename
        
        // Report progress
        if (onProgress) {
          onProgress(i + 1, assets.length)
        }
      } catch (error) {
        failedUploads.push(asset.filename)
        // Continue with other assets
      }
    }

    if (failedUploads.length > 0) {
      throw new Error(`Failed to upload ${failedUploads.length} assets: ${failedUploads.join(', ')}`)
    }

    return assetMap
  }

  /**
   * Replace asset references in markdown with Sanity URLs
   */
  replaceAssetReferences(markdownContent: string, assetMap: Map<string, string>): string {
    let processedContent = markdownContent

    // Remove frontmatter from content
    processedContent = this.removeFrontmatter(processedContent)

    // Replace asset references
    assetMap.forEach((sanityUrl, localPath) => {
      // Common markdown image patterns
      const patterns = [
        // ![alt](./path/image.jpg)
        new RegExp(`!\\[([^\\]]*)\\]\\(\\.\/${this.escapeRegex(localPath)}\\)`, 'g'),
        // ![alt](path/image.jpg)
        new RegExp(`!\\[([^\\]]*)\\]\\(${this.escapeRegex(localPath)}\\)`, 'g'),
        // <img src="./path/image.jpg">
        new RegExp(`<img([^>]*src=["'])\\.\/${this.escapeRegex(localPath)}(["'][^>]*)>`, 'g'),
        // <img src="path/image.jpg">
        new RegExp(`<img([^>]*src=["'])${this.escapeRegex(localPath)}(["'][^>]*)>`, 'g'),
      ]

      patterns.forEach(pattern => {
        if (localPath.includes('/')) {
          // For image references: ![alt](path) -> ![alt](sanityUrl)
          processedContent = processedContent.replace(pattern, (match, ...groups) => {
            if (match.startsWith('![')) {
              return `![${groups[0]}](${sanityUrl})`
            } else if (match.startsWith('<img')) {
              return `<img${groups[0]}${sanityUrl}${groups[1]}>`
            }
            return match
          })
        }
      })

      // Also try filename-only patterns
      const filename = this.getBasename(localPath)
      const filenamePatterns = [
        new RegExp(`!\\[([^\\]]*)\\]\\(${this.escapeRegex(filename)}\\)`, 'g'),
      ]

      filenamePatterns.forEach(pattern => {
        processedContent = processedContent.replace(pattern, (match, alt) => {
          if (match.startsWith('![')) {
            return `![${alt}](${sanityUrl})`
          }
          return match
        })
      })
    })

    return processedContent
  }

  /**
   * Create or update a Sanity post document
   */
  async createPostDocument(
    client: SanityClient,
    content: ExtractedContent,
    processedMarkdown: string,
    options: { generateSlug?: boolean; asDraft?: boolean } = {}
  ): Promise<CreatedDocument> {
    const { metadata, markdownFile } = content
    const baseTitle = metadata?.title || this.getBasename(markdownFile, '.md')
    
    let slug = metadata?.slug
    if (!slug && options.generateSlug !== false) {
      slug = this.generateSlug(baseTitle)
    }

    let existingPost = null
    if (slug) {
      const query = `*[_type == "post" && slug.current == $slug][0]`
      const draftQuery = `*[_type == "post" && slug.current == $slug && _id match "drafts.*"][0]`
      
      try {
        existingPost = await client.fetch(query, { slug })
        
        if (!existingPost) {
          existingPost = await client.fetch(draftQuery, { slug })
        }
      } catch (error) {
        throw new Error(`Failed to check for existing posts with slug "${slug}": ${error instanceof Error ? error.message : 'Unknown error'}`)
      }
    }

    // Prepare document data
    const documentData = {
      _type: 'post',
      title: baseTitle,
      ...(slug && {
        slug: {
          _type: 'slug',
          current: slug
        }
      }),
      body: processedMarkdown,
      ...(metadata?.publishedAt && { publishedAt: metadata.publishedAt }),
      ...(metadata?.summary && { summary: metadata.summary }),
      ...(metadata?.categories && metadata.categories.length > 0 && {
        // Note: Categories should be handled as strings, not references for now
        categories: metadata.categories
      }),
      // Add any other metadata fields
      ...(metadata ? Object.keys(metadata).reduce((acc, key) => {
        if (!['title', 'slug', 'summary', 'categories', 'publishedAt'].includes(key)) {
          acc[key] = metadata[key]
        }
        return acc
      }, {} as any) : {})
    }

    if (existingPost) {
      const updatedPost = await client
        .patch(existingPost._id)
        .set({
          ...documentData,
          // Preserve original publishedAt if it exists and no new one is provided
          ...(existingPost.publishedAt && !metadata?.publishedAt && { publishedAt: existingPost.publishedAt })
        })
        .commit()
      
      return {
        _id: updatedPost._id,
        title: updatedPost.title,
        slug: updatedPost.slug,
        publishedAt: updatedPost.publishedAt
      }
    } else {
      const baseId = slug || this.generateSlug(baseTitle)
      const timestamp = Date.now()
      const documentId = `${baseId}-${timestamp}`
      
      const newDocument = {
        _id: options.asDraft !== false ? `drafts.${documentId}` : documentId,
        ...documentData
      }

      const createdPost = await client.create(newDocument)
      
      return {
        _id: createdPost._id,
        title: createdPost.title,
        slug: createdPost.slug,
        publishedAt: createdPost.publishedAt
      }
    }
  }

  // Helper methods
  private extractFrontmatter(content: string): PostMetadata {
    try {
      const parsed = matter(content)
      return parsed.data as PostMetadata
    } catch (error) {
      throw new Error(`Failed to parse frontmatter: ${error instanceof Error ? error.message : 'Invalid YAML format'}`)
    }
  }

  private removeFrontmatter(content: string): string {
    try {
      const parsed = matter(content)
      return parsed.content.trim()
    } catch (error) {
      throw new Error(`Failed to parse frontmatter: ${error instanceof Error ? error.message : 'Invalid YAML format'}`)
    }
  }

  private generateSlug(title: string): string {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
  }

  private getMimeType(ext: string): string {
    const mimeTypes: Record<string, string> = {
      '.jpg': 'image/jpeg',
      '.jpeg': 'image/jpeg',
      '.png': 'image/png',
      '.gif': 'image/gif',
      '.webp': 'image/webp',
      '.svg': 'image/svg+xml'
    }
    return mimeTypes[ext] || 'application/octet-stream'
  }

  private getFileExtension(filename: string): string {
    return filename.substring(filename.lastIndexOf('.'))
  }

  private getBasename(filepath: string, ext?: string): string {
    const name = filepath.substring(filepath.lastIndexOf('/') + 1)
    if (ext) {
      return name.replace(ext, '')
    }
    return name
  }

  private escapeRegex(str: string): string {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  }

  private shouldSkipFile(filename: string, filePath: string): boolean {
    if (filename.startsWith('._')) return true
    
    if (filename === '.DS_Store') return true
    
    if (filePath.includes('__MACOSX/')) return true
    
    if (filename === 'Thumbs.db') return true
    
    if (filename.startsWith('.') && filename !== '.gitignore') return true
    
    if (!filename.trim()) return true
    
    return false
  }
}

 