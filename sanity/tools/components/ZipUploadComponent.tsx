import React, { useCallback, useRef } from 'react'
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
import { useZipUpload } from '../utils/zip-processor'

export function ZipUploadComponent() {
  const client = useClient()
  const router = useRouter()
  const toast = useToast()
  const fileInputRef = useRef<HTMLInputElement>(null)
  
  const { status, progress, extractedContent, error, uploadZip, reset } = useZipUpload(client, {
    onSuccess: (document) => {
      router.navigateIntent('edit', { id: document._id, type: 'post' })
    },
    onError: (error) => {
      toast.push({
        status: 'error',
        title: 'Import failed',
        description: error.message
      })
    }
  })

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
      
      // Automatically start upload with the custom hook
      uploadZip(selectedFile)
    }
  }, [toast, uploadZip])

  const handleReset = useCallback(() => {
    reset()
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }, [reset])

  return (
    <Stack space={4}>
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
          </Flex>
        </Stack>
      </Card>

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