import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export interface AdminAuthResult {
  authorized: boolean
  user?: any
  response?: NextResponse
}

/**
 * Validates that an incoming request originates from an authentic, active administrator session.
 * Robustly inspects Authorization Bearer headers, sb-admin-session cookie, and standard Supabase cookies.
 */
export async function validateAdminRequest(
  request: Request | NextRequest
): Promise<AdminAuthResult> {
  try {
    let token: string | null = null

    // 1. Check Authorization Bearer header
    const authHeader = request.headers.get('authorization') || request.headers.get('Authorization')
    if (authHeader && authHeader.toLowerCase().startsWith('bearer ')) {
      token = authHeader.slice(7).trim()
    }

    // 2. Check cookies
    if (!token) {
      const cookieHeader = request.headers.get('cookie') || ''

      // Check custom sb-admin-session cookie
      const adminMatch = cookieHeader.match(/sb-admin-session=([^;]+)/)
      if (adminMatch && adminMatch[1]) {
        token = decodeURIComponent(adminMatch[1].trim())
      }

      // Check standard Supabase auth cookie sb-*-auth-token
      if (!token) {
        const sbAuthMatch = cookieHeader.match(/sb-[a-zA-Z0-9_-]+-auth-token=([^;]+)/)
        if (sbAuthMatch && sbAuthMatch[1]) {
          try {
            const parsed = JSON.parse(decodeURIComponent(sbAuthMatch[1]))
            if (Array.isArray(parsed) && parsed[0]) {
              token = parsed[0]
            } else if (parsed && typeof parsed === 'object' && parsed.access_token) {
              token = parsed.access_token
            }
          } catch {
            token = decodeURIComponent(sbAuthMatch[1])
          }
        }
      }
    }

    if (!token) {
      return {
        authorized: false,
        response: NextResponse.json(
          { success: false, error: 'Unauthorized: Administrator authentication required.' },
          { status: 401 }
        ),
      }
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
    const supabaseAnonKey =
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
      ''

    if (!supabaseUrl || !supabaseAnonKey) {
      return {
        authorized: false,
        response: NextResponse.json(
          { success: false, error: 'Configuration Error: Supabase credentials not set on server.' },
          { status: 500 }
        ),
      }
    }

    const authClient = createClient(supabaseUrl, supabaseAnonKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    })

    const {
      data: { user },
      error: userError,
    } = await authClient.auth.getUser(token)

    if (userError || !user) {
      return {
        authorized: false,
        response: NextResponse.json(
          { success: false, error: 'Unauthorized: Session invalid or expired. Please sign in again.' },
          { status: 401 }
        ),
      }
    }

    // Optional admin email whitelist verification
    const adminEmail = process.env.ADMIN_EMAIL
    if (adminEmail && user.email && user.email.toLowerCase() !== adminEmail.toLowerCase()) {
      const role = user.app_metadata?.role || user.user_metadata?.role
      if (role !== 'admin') {
        return {
          authorized: false,
          response: NextResponse.json(
            { success: false, error: 'Forbidden: Insufficient administrative privileges.' },
            { status: 403 }
          ),
        }
      }
    }

    return { authorized: true, user }
  } catch (err: any) {
    console.error('[Admin Security Error] Authorization validation failed:', err)
    return {
      authorized: false,
      response: NextResponse.json(
        { success: false, error: 'Internal security authentication failure.' },
        { status: 500 }
      ),
    }
  }
}
