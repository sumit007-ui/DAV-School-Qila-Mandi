interface RateLimitRecord {
  count: number
  resetTime: number
  blocked: boolean
  blockUntil: number
}

// In-memory store — maps identifier → rate limit record
const rateLimitStore = new Map<string, RateLimitRecord>()

const CLEANUP_INTERVAL_MS = 5 * 60 * 1000
let lastCleanup = Date.now()

function cleanupExpiredRecords() {
  const now = Date.now()
  if (now - lastCleanup < CLEANUP_INTERVAL_MS) return
  lastCleanup = now

  for (const [key, record] of rateLimitStore.entries()) {
    if (now >= record.resetTime && now >= record.blockUntil) {
      rateLimitStore.delete(key)
    }
  }
}

export interface RateLimitResult {
  success: boolean
  limit: number
  remaining: number
  resetTime: number
  retryAfter: number
  isBlocked: boolean
}

/**
 * Checks rate limits. Progressive penalties:
 *  - First breach → blocked for windowMs
 *  - Each successive breach → doubles the block duration
 *
 * @param identifier  Client IP or composite key
 * @param limit       Max requests per window
 * @param windowMs    Window duration in ms
 */
export function checkRateLimit(
  identifier: string,
  limit = 5,
  windowMs = 10 * 60 * 1000
): RateLimitResult {
  cleanupExpiredRecords()

  const now = Date.now()
  const key = identifier || 'anonymous'
  const record = rateLimitStore.get(key)

  // If currently in a block, reject immediately
  if (record && now < record.blockUntil) {
    return {
      success: false,
      limit,
      remaining: 0,
      resetTime: record.blockUntil,
      retryAfter: Math.max(1, Math.ceil((record.blockUntil - now) / 1000)),
      isBlocked: true,
    }
  }

  // New or expired window — start fresh
  if (!record || now >= record.resetTime) {
    rateLimitStore.set(key, {
      count: 1,
      resetTime: now + windowMs,
      blocked: false,
      blockUntil: 0,
    })
    return { success: true, limit, remaining: limit - 1, resetTime: now + windowMs, retryAfter: 0, isBlocked: false }
  }

  // Within window and under the limit
  if (record.count < limit) {
    record.count++
    return {
      success: true,
      limit,
      remaining: Math.max(0, limit - record.count),
      resetTime: record.resetTime,
      retryAfter: 0,
      isBlocked: false,
    }
  }

  // Limit exceeded → block (doubling penalty on repeated offences)
  const previousBlocks = record.blocked ? 2 : 1
  const blockDuration = windowMs * previousBlocks
  record.blocked = true
  record.blockUntil = now + blockDuration

  return {
    success: false,
    limit,
    remaining: 0,
    resetTime: record.blockUntil,
    retryAfter: Math.max(1, Math.ceil(blockDuration / 1000)),
    isBlocked: true,
  }
}

/**
 * Extracts the client's real IP address from request headers.
 * Handles Cloudflare, standard proxies, and direct connections.
 */
export function getClientIp(request: Request): string {
  const cfIp = request.headers.get('cf-connecting-ip')
  if (cfIp) return cfIp.trim()

  const forwardedFor = request.headers.get('x-forwarded-for')
  if (forwardedFor) {
    const ips = forwardedFor.split(',').map((ip) => ip.trim())
    // Take the first non-private address
    const publicIp = ips.find((ip) => !isPrivateIp(ip))
    if (publicIp) return publicIp
    if (ips[0]) return ips[0]
  }

  const realIp = request.headers.get('x-real-ip')
  if (realIp) return realIp.trim()

  return '127.0.0.1'
}

function isPrivateIp(ip: string): boolean {
  return (
    ip.startsWith('10.') ||
    ip.startsWith('192.168.') ||
    ip.startsWith('172.16.') ||
    ip.startsWith('127.') ||
    ip === '::1'
  )
}
