/**
 * Security Input Sanitizer — Enhanced v2
 * Strips HTML, script injections, SQL fragments, and malicious protocols.
 */

// Known malicious SQL keywords to strip
const SQL_PATTERNS = [
  /\b(SELECT|INSERT|UPDATE|DELETE|DROP|TRUNCATE|ALTER|CREATE|EXEC|EXECUTE|UNION|CAST|CONVERT)\b/gi,
  /(-{2}|\/\*|\*\/)/g, // SQL comments
  /;{2,}/g, // Stacked queries
];

export function sanitizeString(input: unknown): string {
  if (typeof input !== 'string') return ''

  let cleaned = input
    // Strip HTML/XML tags
    .replace(/<[^>]*>/g, '')
    // Strip javascript: and vbscript: pseudo-protocols
    .replace(/javascript:/gi, '')
    .replace(/vbscript:/gi, '')
    // Strip data: text/html base64 injection attempts
    .replace(/data:\s*text\/html/gi, '')
    // Strip on* event handlers
    .replace(/\bon\w+\s*=/gi, '')
    // Strip null bytes and dangerous control characters
    .replace(/[\u0000-\u0008\u000B-\u000C\u000E-\u001F\u007F]/g, '')
    // Strip SQL injection patterns
    .replace(/\b(SELECT|INSERT|UPDATE|DELETE|DROP|TRUNCATE|ALTER|CREATE|EXEC|EXECUTE|UNION|CAST|CONVERT)\b/gi, '')
    .replace(/(-{2}|\/\*|\*\/)/g, '')
    .trim()

  return cleaned
}

/**
 * Sanitize a URL - only allows http/https schemes and valid structure.
 */
export function sanitizeUrl(input: unknown): string {
  if (typeof input !== 'string') return ''
  const trimmed = input.trim()
  if (!trimmed) return ''

  try {
    const url = new URL(trimmed)
    if (!['http:', 'https:'].includes(url.protocol)) return ''
    return url.href
  } catch {
    // If it starts with / (relative), allow it
    if (trimmed.startsWith('/')) return trimmed.replace(/<[^>]*>/g, '').trim()
    return ''
  }
}

/**
 * Sanitize a phone number — keep only digits, spaces, +, -, (, )
 */
export function sanitizePhone(input: unknown): string {
  if (typeof input !== 'string') return ''
  return input.replace(/[^\d\s+\-().]/g, '').trim().slice(0, 20)
}

/**
 * Sanitize an email address
 */
export function sanitizeEmail(input: unknown): string {
  if (typeof input !== 'string') return ''
  const trimmed = input.trim().toLowerCase().slice(0, 254)
  // Basic email pattern
  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) return trimmed
  return ''
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
