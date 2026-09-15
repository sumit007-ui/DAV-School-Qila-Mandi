import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Guard all /admin routes except /admin/login
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    // Check for our admin session cookie or any Supabase standard auth cookies
    const adminSession = request.cookies.get('sb-admin-session')?.value
    const supabaseCookie = request.cookies
      .getAll()
      .find((c) => c.name.startsWith('sb-') && c.name.includes('auth-token'))?.value

    if (!adminSession && !supabaseCookie) {
      const loginUrl = new URL('/admin/login', request.url)
      return NextResponse.redirect(loginUrl, { status: 307 })
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
