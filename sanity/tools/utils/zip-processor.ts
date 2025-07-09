import JSZip from 'jszip'
import type { SanityClient } from 'sanity'
import type { ExtractedContent, AssetFile, PostMetadata, CreatedDocument } from './types'

// Supported image types for asset upload
const SUPPORTED_IMAGE_TYPES = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg']

export class ZipProcessor {
  private client: SanityClient

  constructor(client: SanityClient) {
    this.client = client
  }

  /**
   * Extract and parse zip file contents in the browser
   */
  async extractZipContents(file: File): Promise<ExtractedContent> {
    const arrayBuffer = await file.arrayBuffer()
    const zip = await JSZip.loadAsync(arrayBuffer)

    // Find markdown file
    const markdownFiles = Object.keys(zip.files).filter(name => {
      const zipFile = zip.files[name]
      return zipFile && name.endsWith('.md') && !zipFile.dir
    })

    if (markdownFiles.length === 0) {
      throw new Error('No markdown file found in zip')
    }

    if (markdownFiles.length > 1) {
      console.warn(`Multiple markdown files found, using: ${markdownFiles[0]}`)
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
        console.log(`Skipping system file: ${filePath}`)
        continue
      }

      const ext = this.getFileExtension(filePath).toLowerCase()
      
      if (SUPPORTED_IMAGE_TYPES.includes(ext)) {
        console.log(`Found asset: ${filePath}`)
        const arrayBuffer = await zipFile.async('arraybuffer')
        const buffer = Buffer.from(arrayBuffer)
        const mimeType = this.getMimeType(ext)
        
        assetFiles.push({
          filename,
          path: filePath,
          buffer,
          mimeType
        })
      } else {
        console.log(`Skipping unsupported file type: ${filePath}`)
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
    assets: AssetFile[], 
    onProgress?: (uploaded: number, total: number) => void
  ): Promise<Map<string, string>> {
    const assetMap = new Map<string, string>()
    
    console.log(`Uploading ${assets.length} assets...`)

    for (let i = 0; i < assets.length; i++) {
      const asset = assets[i]!
      try {
        console.log(`Uploading: ${asset.filename}`)
        
        const assetType = asset.mimeType.startsWith('image/') ? 'image' : 'file'
        
        const uploadedAsset = await this.client.assets.upload(assetType, asset.buffer, {
          filename: asset.filename,
          contentType: asset.mimeType
        })

        // Use the same URL format as before
        const assetUrl = uploadedAsset.url

        assetMap.set(asset.path, assetUrl)
        assetMap.set(asset.filename, assetUrl) // Also map by filename
        
        console.log(`✓ Uploaded: ${asset.filename} -> ${assetUrl}`)
        
        // Report progress
        if (onProgress) {
          onProgress(i + 1, assets.length)
        }
      } catch (error) {
        console.error(`Failed to upload ${asset.filename}:`, error)
        // Continue with other assets
      }
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
    content: ExtractedContent,
    processedMarkdown: string,
    options: { generateSlug?: boolean; asDraft?: boolean } = {}
  ): Promise<CreatedDocument> {
    const { metadata, markdownFile } = content
    const baseTitle = metadata?.title || this.getBasename(markdownFile, '.md')
    
    // Generate slug if not provided
    let slug = metadata?.slug
    if (!slug && options.generateSlug !== false) {
      slug = this.generateSlug(baseTitle)
    }

    // Check if a post with this slug already exists
    let existingPost = null
    if (slug) {
      console.log(`Checking for existing post with slug: ${slug}`)
      
      // Query for posts with matching slug (both published and draft)
      const query = `*[_type == "post" && slug.current == $slug][0]`
      const draftQuery = `*[_type == "post" && slug.current == $slug && _id match "drafts.*"][0]`
      
      try {
        // Check for published post first
        existingPost = await this.client.fetch(query, { slug })
        
        // If no published post, check for draft
        if (!existingPost) {
          existingPost = await this.client.fetch(draftQuery, { slug })
        }
        
        if (existingPost) {
          console.log(`✓ Found existing post: ${existingPost.title} (ID: ${existingPost._id})`)
        } else {
          console.log(`✓ No existing post found with slug: ${slug}`)
        }
      } catch (error) {
        console.warn('Error checking for existing post:', error)
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
      body: processedMarkdown, // FIXED: Use 'body' instead of 'content'
      // Only set publishedAt if specifically provided in metadata, otherwise leave undefined for drafts
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
      // Update existing post
      console.log(`Updating existing post...`)
      const updatedPost = await this.client
        .patch(existingPost._id)
        .set({
          ...documentData,
          // Preserve original publishedAt if it exists and no new one is provided
          ...(existingPost.publishedAt && !metadata?.publishedAt && { publishedAt: existingPost.publishedAt })
        })
        .commit()
      
      const status = existingPost._id.startsWith('drafts.') ? 'draft' : 'published'
      console.log(`✓ Updated ${status} post: ${updatedPost.title} (ID: ${updatedPost._id})`)
      return {
        _id: updatedPost._id,
        title: updatedPost.title,
        slug: updatedPost.slug,
        publishedAt: updatedPost.publishedAt
      }
    } else {
      // Create new post
      const baseId = slug || this.generateSlug(baseTitle)
      const timestamp = Date.now()
      const documentId = `${baseId}-${timestamp}`
      
      const newDocument = {
        _id: options.asDraft !== false ? `drafts.${documentId}` : documentId,
        ...documentData
      }

      const status = options.asDraft !== false ? 'draft' : 'published'
      console.log(`Creating new post document as ${status}...`)
      const createdPost = await this.client.create(newDocument)
      console.log(`✓ Created ${status} post: ${createdPost.title} (ID: ${createdPost._id})`)
      
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
    const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n/
    const match = content.match(frontmatterRegex)
    
    if (!match) return {}

    try {
      // Simple YAML-like parsing for basic frontmatter
      const frontmatter = match[1]
      if (!frontmatter) return {}
      
      const metadata: PostMetadata = {}
      
      frontmatter.split('\n').forEach(line => {
        const colonIndex = line.indexOf(':')
        if (colonIndex > 0) {
          const key = line.substring(0, colonIndex).trim()
          let value = line.substring(colonIndex + 1).trim()
          
          // Remove quotes if present
          if ((value.startsWith('"') && value.endsWith('"')) || 
              (value.startsWith("'") && value.endsWith("'"))) {
            value = value.slice(1, -1)
          }
          
          // Handle arrays (simple comma-separated values)
          if (value.includes(',')) {
            metadata[key] = value.split(',').map(v => v.trim())
          } else {
            metadata[key] = value
          }
        }
      })
      
      return metadata
    } catch (error) {
      console.warn('Failed to parse frontmatter:', error)
      return {}
    }
  }

  private removeFrontmatter(content: string): string {
    const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n/
    return content.replace(frontmatterRegex, '').trim()
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
    // Skip macOS metadata files
    if (filename.startsWith('._')) return true
    
    // Skip .DS_Store files
    if (filename === '.DS_Store') return true
    
    // Skip __MACOSX folder contents
    if (filePath.includes('__MACOSX/')) return true
    
    // Skip Thumbs.db (Windows)
    if (filename === 'Thumbs.db') return true
    
    // Skip hidden files
    if (filename.startsWith('.') && filename !== '.gitignore') return true
    
    // Skip empty filenames
    if (!filename.trim()) return true
    
    return false
  }
} 