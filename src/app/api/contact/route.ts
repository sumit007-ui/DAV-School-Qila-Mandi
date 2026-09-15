import { NextResponse } from 'next/server'
import { contactFormSchema } from '@/lib/validation/contact'
import { getSupabaseServerClient } from '@/lib/supabase/server'
import { checkRateLimit, getClientIp } from '@/lib/security/rateLimit'

export async function POST(request: Request) {
  try {
    // 1. IP Rate Limiting (5 requests per 10 minutes)
    const clientIp = getClientIp(request)
    const rateLimit = checkRateLimit(`contact:${clientIp}`, 5, 10 * 60 * 1000)

    if (!rateLimit.success) {
      return NextResponse.json(
        {
          success: false,
          error: 'Too many requests. Please try again later.',
        },
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

    const body = await request.json()

    // 2. Zod Validation
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

    // 3. Insert into Supabase
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

    return NextResponse.json(
      {
        success: true,
        message: 'Your message has been dispatched successfully.',
      },
      {
        headers: {
          'X-RateLimit-Limit': rateLimit.limit.toString(),
          'X-RateLimit-Remaining': rateLimit.remaining.toString(),
        },
      }
    )
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
