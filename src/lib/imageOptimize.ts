/**
 * Image Optimization Utility
 * Uses sharp (bundled with Next.js) to:
 *  - Convert any JPEG/PNG/WEBP to WEBP for maximum compression
 *  - Resize to max safe dimensions (width-first, aspect preserved)
 *  - Strip EXIF metadata (privacy + size reduction)
 *  - Validate magic bytes to prevent polyglot file attacks
 */

// ── Magic byte signatures for supported image types ────────────────────────
const MAGIC_BYTES: Record<string, number[][]> = {
  'image/jpeg': [[0xff, 0xd8, 0xff]],
  'image/png':  [[0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]],
  'image/webp': [[0x52, 0x49, 0x46, 0x46]], // RIFF header
  'image/gif':  [[0x47, 0x49, 0x46, 0x38]], // GIF8
}

/**
 * Validates that a buffer's first bytes match the declared MIME type.
 * This prevents attackers from disguising SVGs or HTML as images.
 */
export function validateMagicBytes(buffer: Buffer, mimeType: string): boolean {
  const signatures = MAGIC_BYTES[mimeType]
  if (!signatures) return false

  return signatures.some((sig) =>
    sig.every((byte, index) => buffer[index] === byte)
  )
}

export interface OptimizeResult {
  buffer: Buffer
  mimeType: string
  extension: string
  originalSize: number
  optimizedSize: number
  width: number
  height: number
}

export interface OptimizeOptions {
  /** Max width in pixels. Images wider than this will be scaled down. */
  maxWidth?: number
  /** Max height in pixels. Images taller than this will be scaled down. */
  maxHeight?: number
  /** WebP quality 1-100. Default: 82 (excellent quality/size ratio) */
  quality?: number
  /** Output format. Default: 'webp' */
  format?: 'webp' | 'jpeg' | 'png'
  /** Whether to strip EXIF metadata. Default: true */
  stripMetadata?: boolean
}

/**
 * Optimizes an image buffer using sharp.
 * Returns a WebP (or specified format) buffer ready for storage upload.
 */
export async function optimizeImage(
  inputBuffer: Buffer,
  options: OptimizeOptions = {}
): Promise<OptimizeResult> {
  const {
    maxWidth = 2560,
    maxHeight = 2560,
    quality = 90,
    format = 'webp',
    stripMetadata = true,
  } = options

  // Lazy-import sharp to avoid edge runtime issues
  const sharp = (await import('sharp')).default

  const pipeline = sharp(inputBuffer, {
    // Safety: limit input pixel count to prevent decompression bomb attacks
    limitInputPixels: 50_000_000, // ~7071×7071 px max
    failOn: 'truncated',
  })

  // Strip EXIF / ICC metadata for privacy and size reduction
  if (stripMetadata) {
    pipeline.rotate() // auto-orient from EXIF, then strip EXIF
  }

  // Get original dimensions
  const metadata = await pipeline.metadata()
  const origWidth = metadata.width || 800
  const origHeight = metadata.height || 600

  // Resize only if larger than limits (never upscale)
  pipeline.resize({
    width: maxWidth,
    height: maxHeight,
    fit: 'inside',
    withoutEnlargement: true,
  })

  let outputBuffer: Buffer
  let outputMimeType: string
  let outputExtension: string

  if (format === 'webp') {
    outputBuffer = await pipeline
      .webp({ quality, effort: 4, smartSubsample: false })
      .toBuffer()
    outputMimeType = 'image/webp'
    outputExtension = 'webp'
  } else if (format === 'jpeg') {
    outputBuffer = await pipeline
      .jpeg({ quality, mozjpeg: true, progressive: true })
      .toBuffer()
    outputMimeType = 'image/jpeg'
    outputExtension = 'jpg'
  } else {
    outputBuffer = await pipeline
      .png({ quality, compressionLevel: 8, progressive: true })
      .toBuffer()
    outputMimeType = 'image/png'
    outputExtension = 'png'
  }

  // Get final dimensions
  const finalMeta = await sharp(outputBuffer).metadata()

  return {
    buffer: outputBuffer,
    mimeType: outputMimeType,
    extension: outputExtension,
    originalSize: inputBuffer.length,
    optimizedSize: outputBuffer.length,
    width: finalMeta.width || origWidth,
    height: finalMeta.height || origHeight,
  }
}

/**
 * Checks if a MIME type is an optimizable image format.
 */
export function isOptimizableImage(mimeType: string): boolean {
  return ['image/jpeg', 'image/png', 'image/webp', 'image/gif'].includes(mimeType)
}

/**
 * Formats file size in human-readable form.
 */
export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`
}
