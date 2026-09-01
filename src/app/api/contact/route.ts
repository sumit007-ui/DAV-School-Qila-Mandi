import { NextResponse } from 'next/server'
import { contactFormSchema } from '@/lib/validation/contact'
import { getSupabaseServerClient } from '@/lib/supabase/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // 1. Zod Validation
    const validationResult = contactFormSchema.safeParse(body)
    if (!validationResult.success) {
      const fieldErrors: Record<string, string> = {}
      validationResult.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0].toString()] = err.message
        }
      })
      return NextResponse.json(
        {
          success: false,
          error: 'Validation failed',
          details: fieldErrors,
        },
        { status: 400 }
      )
    }

    const { fullName, phone, email, subject, category, message } = validationResult.data

    // 2. Insert into Supabase
    const supabase = getSupabaseServerClient()
    const { error: dbError } = await supabase
      .from('contact_enquiries')
      .insert({
        name: fullName,
        phone: phone || null,
        email: email || null,
        subject: subject || null,
        category: category || 'General Enquiry',
        message,
        status: 'new',
        source: 'website_contact_form',
      })

    if (dbError) {
      console.error('[Supabase Error] contact_enquiries insert failed:', dbError)
      return NextResponse.json(
        {
          success: false,
          error: dbError.message || 'Failed to submit message',
        },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Your message has been dispatched successfully.',
    })
  } catch (error: any) {
    console.error('[API Error] /api/contact:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'An internal server error occurred while processing your message.',
      },
      { status: 500 }
    )
  }
}
