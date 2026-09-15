import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { getSupabaseServerClient } from '@/lib/supabase/server'

export async function POST(request: Request) {
  try {
    // 1. Authenticate Requester via Bearer Token or Cookie
    const authHeader = request.headers.get('Authorization') || request.headers.get('authorization')
    const token = authHeader?.startsWith('Bearer ') ? authHeader.slice(7).trim() : null

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
    const supabaseAnonKey =
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
      ''

    if (!token || !supabaseUrl || !supabaseAnonKey) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized: Authentication required' },
        { status: 401 }
      )
    }

    const authClient = createClient(supabaseUrl, supabaseAnonKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    })

    const {
      data: { user },
      error: userError,
    } = await authClient.auth.getUser(token)

    if (userError || !user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized: Invalid or expired session' },
        { status: 401 }
      )
    }

    // 2. Enforce Administrative Role Authorization
    const role = user.app_metadata?.role || user.user_metadata?.role
    const adminEmail = process.env.ADMIN_EMAIL
    const isAuthorizedAdmin =
      role === 'admin' || (adminEmail && user.email?.toLowerCase() === adminEmail.toLowerCase())

    if (!isAuthorizedAdmin) {
      return NextResponse.json(
        { success: false, error: 'Forbidden: Administrator privileges required' },
        { status: 403 }
      )
    }

    // 3. Validate Request Parameters
    const { id, type } = await request.json()

    if (!id || !type || (type !== 'admissions' && type !== 'contacts')) {
      return NextResponse.json(
        { success: false, error: 'Invalid id or enquiry type' },
        { status: 400 }
      )
    }

    // 4. Perform Deletion with Server Client
    const supabase = getSupabaseServerClient()
    const table = type === 'admissions' ? 'admission_enquiries' : 'contact_enquiries'

    const { error: dbError } = await supabase
      .from(table)
      .delete()
      .eq('id', id)

    if (dbError) {
      console.error(`[Supabase Error] Delete from ${table} failed:`, dbError)
      return NextResponse.json(
        { success: false, error: dbError.message || 'Failed to delete record' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Record deleted successfully',
    })
  } catch (error: any) {
    console.error('[API Error] /api/admin/enquiries/delete:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error while deleting record' },
      { status: 500 }
    )
  }
}
