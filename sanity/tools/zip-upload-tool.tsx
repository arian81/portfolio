import React, { useState, useCallback } from 'react'
import { type Tool } from 'sanity'
import { UploadIcon } from '@sanity/icons'
import { 
  Card, 
  Text, 
  Stack, 
  Button, 
  Flex, 
  Box,
  Spinner,
  Heading,
  Toast,
  ToastProvider,
  useToast
} from '@sanity/ui'
import { ZipUploadComponent } from './components/ZipUploadComponent'

// Tool configuration
export const zipUploadTool = (): Tool => ({
  name: 'upload',
  title: 'Blog Import',
  icon: UploadIcon,
  component: ZipUploadToolComponent,
})

// Main tool component
function ZipUploadToolComponent() {
  return (
    <ToastProvider>
      <Card padding={4} height="fill">
        <Stack space={4}>
          <Heading size={3}>Blog Post Import</Heading>
          <Text size={1} muted>
            Upload a ZIP file containing a markdown blog post and assets to import into Sanity.
          </Text>
          <ZipUploadComponent />
        </Stack>
      </Card>
    </ToastProvider>
  )
} 