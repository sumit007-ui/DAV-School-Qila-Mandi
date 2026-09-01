import { NextResponse } from 'next/server'
import { getSupabaseServerClient } from '@/lib/supabase/server'

export async function POST(request: Request) {
  try {
    const { id, type } = await request.json()

    if (!id || !type) {
      return NextResponse.json(
        { success: false, error: 'Missing id or enquiry type' },
        { status: 400 }
      )
    }

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
