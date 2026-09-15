interface RateLimitRecord {
  count: number
  resetTime: number
}

// In-memory store mapping IP/identifiers to submission counts and reset timestamps
const rateLimitStore = new Map<string, RateLimitRecord>()

// Sweep expired records every 5 minutes to prevent memory unbounded growth
const CLEANUP_INTERVAL_MS = 5 * 60 * 1000
let lastCleanup = Date.now()

function cleanupExpiredRecords() {
  const now = Date.now()
  if (now - lastCleanup < CLEANUP_INTERVAL_MS) return
  lastCleanup = now

  for (const [key, record] of rateLimitStore.entries()) {
    if (now >= record.resetTime) {
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
}

/**
 * Checks and records rate limits for a given client identifier.
 *
 * @param identifier Client IP address or composite identifier
 * @param limit Maximum allowed requests within the window (e.g. 5)
 * @param windowMs Time window in milliseconds (e.g. 10 * 60 * 1000 for 10 minutes)
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

  if (!record || now >= record.resetTime) {
    // Initialize a new window
    rateLimitStore.set(key, {
      count: 1,
      resetTime: now + windowMs,
    })

    return {
      success: true,
      limit,
      remaining: limit - 1,
      resetTime: now + windowMs,
      retryAfter: 0,
    }
  }

  if (record.count >= limit) {
    const retryAfter = Math.max(1, Math.ceil((record.resetTime - now) / 1000))
    return {
      success: false,
      limit,
      remaining: 0,
      resetTime: record.resetTime,
      retryAfter,
    }
  }

  // Increment within current window
  record.count += 1
  return {
    success: true,
    limit,
    remaining: Math.max(0, limit - record.count),
    resetTime: record.resetTime,
    retryAfter: 0,
  }
}

/**
 * Extracts client IP from incoming request headers safely.
 */
export function getClientIp(request: Request): string {
  const forwardedFor = request.headers.get('x-forwarded-for')
  if (forwardedFor) {
    const ips = forwardedFor.split(',').map((ip) => ip.trim())
    if (ips[0]) return ips[0]
  }

  const realIp = request.headers.get('x-real-ip')
  if (realIp) return realIp.trim()

  const cfConnectingIp = request.headers.get('cf-connecting-ip')
  if (cfConnectingIp) return cfConnectingIp.trim()

  return '127.0.0.1'
}
