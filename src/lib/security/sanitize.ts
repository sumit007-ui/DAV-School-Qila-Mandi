/**
 * Security Input Sanitizer
 * Strips HTML tags, script tags, javascript: pseudo-protocols, and malicious control characters.
 */
export function sanitizeString(input: unknown): string {
  if (typeof input !== 'string') return ''
  
  return input
    // Strip HTML/XML tags
    .replace(/<[^>]*>/g, '')
    // Strip javascript: pseudo-protocols
    .replace(/javascript:/gi, '')
    // Strip data: text/html base64 injection attempts
    .replace(/data:\s*text\/html/gi, '')
    // Strip null bytes and control characters
    .replace(/[\u0000-\u0008\u000B-\u000C\u000E-\u001F\u007F]/g, '')
    .trim()
}

/**
 * Sanitizes an object of string fields recursively.
 */
export function sanitizeObject<T extends Record<string, any>>(obj: T): T {
  if (!obj || typeof obj !== 'object') return obj
  const sanitized: Record<string, any> = Array.isArray(obj) ? [] : {}

  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === 'string') {
      sanitized[key] = sanitizeString(value)
    } else if (value && typeof value === 'object') {
      sanitized[key] = sanitizeObject(value)
    } else {
      sanitized[key] = value
    }
  }

  return sanitized as T
}
