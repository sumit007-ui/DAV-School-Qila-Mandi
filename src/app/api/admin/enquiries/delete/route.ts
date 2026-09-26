import { NextResponse } from 'next/server'
import { getSupabaseServerClient } from '@/lib/supabase/server'
import { validateAdminRequest } from '@/lib/security/adminAuth'

export async function POST(request: Request) {
  try {
    // 1. Authenticate Requester via Bearer Token or Cookie
    const authResult = await validateAdminRequest(request)
    if (!authResult.authorized) {
      return authResult.response!
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
