// Types for the ZIP upload tool

export interface ExtractedContent {
  markdownFile: string
  markdownContent: string
  assets: AssetFile[]
  metadata?: PostMetadata
}

export interface AssetFile {
  filename: string
  path: string
  buffer: Buffer
  mimeType: string
}

export interface PostMetadata {
  title?: string
  slug?: string
  summary?: string
  categories?: string[]
  publishedAt?: string
  [key: string]: any
}

export interface UploadResult {
  documentId: string
  title: string
  slug?: string
  assetsUploaded: number
}

export interface CreatedDocument {
  _id: string
  title: string
  slug?: {
    current: string
  }
  publishedAt?: string
} 