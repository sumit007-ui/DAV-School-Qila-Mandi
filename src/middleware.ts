import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { checkRateLimit, getClientIp } from '@/lib/security/rateLimit'

// Paths that are public API routes (no auth required)
const PUBLIC_API_PATHS = ['/api/photos', '/api/news', '/api/toppers', '/api/settings', '/api/admissions', '/api/contact']

// Paths that need rate limiting (public contact/form submissions)
const FORM_API_PATHS = ['/api/admissions', '/api/contact']

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const ip = getClientIp(request)
  const method = request.method

  // ─── 1. Block obviously malicious user-agents ─────────────────────────────
  const userAgent = (request.headers.get('user-agent') || '').toLowerCase()
  const suspiciousAgents = ['sqlmap', 'nikto', 'nmap', 'masscan', 'zgrab', 'nessus', 'openvas', 'dirbuster']
  if (suspiciousAgents.some((ua) => userAgent.includes(ua))) {
    return new NextResponse('Forbidden', { status: 403 })
  }

  // ─── 2. Brute-force protection on /admin/login ────────────────────────────
  if (pathname === '/admin/login' && method === 'POST') {
    const rateLimit = checkRateLimit(`admin-login:${ip}`, 6, 5 * 60 * 1000)
    if (!rateLimit.success) {
      return NextResponse.json(
        { success: false, error: 'Too many login attempts. Please wait before trying again.' },
        {
          status: 429,
          headers: {
            'Retry-After': rateLimit.retryAfter.toString(),
            'X-RateLimit-Limit': rateLimit.limit.toString(),
            'X-RateLimit-Remaining': '0',
          },
        }
      )
    }
  }

  // ─── 3. Rate limit public form submissions (contact, admissions) ──────────
  if (FORM_API_PATHS.some((p) => pathname.startsWith(p)) && method === 'POST') {
    const rateLimit = checkRateLimit(`form:${ip}`, 5, 10 * 60 * 1000)
    if (!rateLimit.success) {
      return NextResponse.json(
        { success: false, error: 'Too many submissions. Please wait a few minutes.' },
        {
          status: 429,
          headers: {
            'Retry-After': rateLimit.retryAfter.toString(),
          },
        }
      )
    }
  }

  // ─── 4. Rate limit all API endpoints globally (DDoS protection) ───────────
  if (pathname.startsWith('/api/')) {
    const rateLimit = checkRateLimit(`api-global:${ip}`, 120, 60 * 1000) // 120 req/min
    if (!rateLimit.success) {
      return NextResponse.json(
        { success: false, error: 'Rate limit exceeded. Please slow down.' },
        { status: 429, headers: { 'Retry-After': rateLimit.retryAfter.toString() } }
      )
    }
  }

  // ─── Helper: check session token ─────────────────────────────────────────
  const hasAuthToken = (): boolean => {
    const authHeader = request.headers.get('authorization')
    if (authHeader?.toLowerCase().startsWith('bearer ')) {
      const token = authHeader.slice(7).trim()
      // Reject obviously bad tokens
      if (token.length < 20) return false
      return true
    }

    const adminSession = request.cookies.get('sb-admin-session')?.value
    if (adminSession && adminSession.length > 20) return true

    const supabaseCookie = request.cookies
      .getAll()
      .find((c) => c.name.startsWith('sb-') && c.name.includes('auth-token'))?.value
    if (supabaseCookie && supabaseCookie.length > 20) return true

    return false
  }

  // ─── 5. Guard /api/admin/* endpoints ─────────────────────────────────────
  if (pathname.startsWith('/api/admin')) {
    if (!hasAuthToken()) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized: Administrative session required.' },
        { status: 401 }
      )
    }
  }

  // ─── 6. Guard /admin/* pages (except /admin/login) ────────────────────────
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    if (!hasAuthToken()) {
      const loginUrl = new URL('/admin/login', request.url)
      loginUrl.searchParams.set('redirect', pathname)
      return NextResponse.redirect(loginUrl, { status: 307 })
    }
  }

  // ─── 7. Block path traversal attempts ────────────────────────────────────
  if (pathname.includes('..') || pathname.includes('%2e%2e') || pathname.includes('%252e')) {
    return new NextResponse('Forbidden', { status: 403 })
  }

  // ─── 8. Inject security headers on all responses ─────────────────────────
  const response = NextResponse.next()

  // Security headers
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('X-Frame-Options', 'SAMEORIGIN')
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  response.headers.set('X-XSS-Protection', '1; mode=block')
  response.headers.set('X-Permitted-Cross-Domain-Policies', 'none')

  // Add rate limit visibility headers on API responses
  if (pathname.startsWith('/api/')) {
    response.headers.set('X-RateLimit-Policy', '120;w=60')
  }

  return response
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/api/:path*',
  ],
}
