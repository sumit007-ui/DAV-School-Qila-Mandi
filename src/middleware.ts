import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { checkRateLimit, getClientIp } from '@/lib/security/rateLimit'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const ip = getClientIp(request)

  // 1. Brute-force protection on /admin/login
  if (pathname === '/admin/login' && request.method === 'POST') {
    const rateLimit = checkRateLimit(`admin-login:${ip}`, 10, 5 * 60 * 1000)
    if (!rateLimit.success) {
      return NextResponse.json(
        { success: false, error: 'Too many login attempts. Please wait 5 minutes before trying again.' },
        { 
          status: 429,
          headers: {
            'Retry-After': rateLimit.retryAfter.toString(),
            'X-RateLimit-Limit': rateLimit.limit.toString(),
            'X-RateLimit-Remaining': '0',
          }
        }
      )
    }
  }

  // Helper to extract authentication indicator
  const hasAuthToken = () => {
    // Check Authorization header
    const authHeader = request.headers.get('authorization')
    if (authHeader && authHeader.toLowerCase().startsWith('bearer ')) {
      return true
    }

    // Check custom admin session cookie
    const adminSession = request.cookies.get('sb-admin-session')?.value
    if (adminSession && adminSession.length > 10) return true

    // Check Supabase standard session cookies
    const supabaseCookie = request.cookies
      .getAll()
      .find((c) => c.name.startsWith('sb-') && c.name.includes('auth-token'))?.value
    if (supabaseCookie && supabaseCookie.length > 10) return true

    return false
  }

  // 2. Guard all /api/admin/* API endpoints
  if (pathname.startsWith('/api/admin')) {
    if (!hasAuthToken()) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Unauthorized: Administrative access token or active session required.' 
        },
        { status: 401 }
      )
    }
  }

  // 3. Guard all /admin pages except /admin/login
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    if (!hasAuthToken()) {
      const loginUrl = new URL('/admin/login', request.url)
      loginUrl.searchParams.set('redirect', pathname)
      return NextResponse.redirect(loginUrl, { status: 307 })
    }
  }

  // 4. Inject strict security headers on all handled responses
  const response = NextResponse.next()
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('X-Frame-Options', 'SAMEORIGIN')
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  response.headers.set('X-XSS-Protection', '1; mode=block')

  return response
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
}

