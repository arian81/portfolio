import React, { useState, useCallback, useRef } from 'react'
import { useClient } from 'sanity'
import { useRouter } from 'sanity/router'
import { 
  Card, 
  Text, 
  Stack, 
  Button, 
  Flex, 
  Box,
  Spinner,
  useToast,
  Badge,
  Code,
  Heading,
} from '@sanity/ui'
import { WarningOutlineIcon, DocumentIcon, ImageIcon } from '@sanity/icons'
import { ZipProcessor } from '../utils/zip-processor'
import type { ExtractedContent } from '../utils/types'

type UploadStatus = 'idle' | 'processing' | 'uploading' | 'success' | 'error'

interface UploadProgress {
  step: string
  current: number
  total: number
  details?: string
}

export function ZipUploadComponent() {
  const client = useClient()
  const router = useRouter()
  const toast = useToast()
  const fileInputRef = useRef<HTMLInputElement>(null)
  
  const [file, setFile] = useState<File | null>(null)
  const [status, setStatus] = useState<UploadStatus>('idle')
  const [progress, setProgress] = useState<UploadProgress | null>(null)
  const [extractedContent, setExtractedContent] = useState<ExtractedContent | null>(null)
  const [error, setError] = useState<string | null>(null)

  // File selection handler
  const handleFileSelect = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0]
    if (selectedFile) {
      if (!selectedFile.name.endsWith('.zip')) {
        toast.push({
          status: 'error',
          title: 'Invalid file type',
          description: 'Please select a .zip file'
        })
        return
      }
      
      setFile(selectedFile)
      setStatus('idle')
      setError(null)
      setExtractedContent(null)
      
      // Automatically start upload
      handleUpload(selectedFile)
    }
  }, [toast])

  // Main upload handler
  const handleUpload = useCallback(async (uploadFile?: File) => {
    const fileToUpload = uploadFile || file
    if (!fileToUpload) return

    setStatus('processing')
    setError(null)
    setProgress({ step: 'Extracting ZIP contents...', current: 0, total: 4 })

    try {
      const processor = new ZipProcessor(client)
      
      // Step 1: Extract ZIP contents
      const content = await processor.extractZipContents(fileToUpload)
      setExtractedContent(content)
      setProgress({ step: 'Uploading assets...', current: 1, total: 4, details: `Found ${content.assets.length} assets` })

      // Step 2: Upload assets
      setStatus('uploading')
      const assetMap = await processor.uploadAssets(content.assets, (uploaded: number, total: number) => {
        setProgress({ 
          step: 'Uploading assets...', 
          current: 1, 
          total: 4, 
          details: `${uploaded}/${total} assets uploaded` 
        })
      })

      // Step 3: Process markdown
      setProgress({ step: 'Processing content...', current: 2, total: 4 })
      const processedMarkdown = processor.replaceAssetReferences(content.markdownContent, assetMap)

      // Step 4: Create document
      setProgress({ step: 'Creating document...', current: 3, total: 4 })
      const document = await processor.createPostDocument(content, processedMarkdown)

      setStatus('success')
      setProgress({ step: 'Complete!', current: 4, total: 4 })
      router.navigateIntent('edit', { id: document._id, type: 'post' })

    } catch (err) {
      console.error('Upload error:', err)
      setStatus('error')
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred'
      setError(errorMessage)
      
      toast.push({
        status: 'error',
        title: 'Import failed',
        description: errorMessage
      })
    }
  }, [file, client, toast, router])

  // Reset handler
  const handleReset = useCallback(() => {
    setFile(null)
    setStatus('idle')
    setProgress(null)
    setExtractedContent(null)
    setError(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }, [])

  return (
    <Stack space={4}>
      {/* File Selection */}
      <Card padding={4} border>
        <Stack space={3}>
          <Heading size={2}>Select ZIP File</Heading>
          <input
            ref={fileInputRef}
            type="file"
            accept=".zip"
            onChange={handleFileSelect}
            style={{ display: 'none' }}
          />
          <Flex gap={3} align="center">
            <Button
              text="Choose ZIP File"
              onClick={() => fileInputRef.current?.click()}
              disabled={status === 'processing' || status === 'uploading'}
            />
            {file && (
              <Badge tone="primary">
                {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
              </Badge>
            )}
          </Flex>
        </Stack>
      </Card>

      {/* Content Preview */}
      {extractedContent && (
        <Card padding={4} border tone="transparent">
          <Stack space={3}>
            <Heading size={2}>Content Preview</Heading>
            <Flex gap={4}>
              <Flex align="center" gap={2}>
                <DocumentIcon />
                <Text size={1}>{extractedContent.markdownFile}</Text>
              </Flex>
              <Flex align="center" gap={2}>
                <ImageIcon />
                <Text size={1}>{extractedContent.assets.length} assets</Text>
              </Flex>
            </Flex>
            {extractedContent.metadata && Object.keys(extractedContent.metadata).length > 0 && (
              <Box>
                <Text size={1} weight="semibold">Metadata:</Text>
                <Code size={1}>{JSON.stringify(extractedContent.metadata, null, 2)}</Code>
              </Box>
            )}
          </Stack>
        </Card>
      )}

      {/* Progress */}
      {progress && (status === 'processing' || status === 'uploading') && (
        <Card padding={4} border tone="caution">
          <Stack space={3}>
            <Flex align="center" gap={3}>
              <Spinner />
              <Text size={1}>{progress.step}</Text>
            </Flex>
            {progress.details && (
              <Text size={1} muted>{progress.details}</Text>
            )}
            <Box>
              <div style={{ 
                width: '100%', 
                height: '4px', 
                backgroundColor: '#e0e0e0', 
                borderRadius: '2px',
                overflow: 'hidden'
              }}>
                <div style={{
                  width: `${(progress.current / progress.total) * 100}%`,
                  height: '100%',
                  backgroundColor: '#2276fc',
                  transition: 'width 0.3s ease'
                }} />
              </div>
            </Box>
          </Stack>
        </Card>
      )}

      {/* Error Display */}
      {error && status === 'error' && (
        <Card padding={4} border tone="critical">
          <Stack space={3}>
            <Flex align="center" gap={2}>
              <WarningOutlineIcon />
              <Heading size={2}>Import Failed</Heading>
            </Flex>
            <Text size={1}>{error}</Text>
          </Stack>
        </Card>
      )}

      {/* Action Buttons */}
      {(status === 'success' || status === 'error') && (
        <Button
          text="Import Another"
          mode="ghost"
          onClick={handleReset}
        />
      )}
    </Stack>
  )
} 