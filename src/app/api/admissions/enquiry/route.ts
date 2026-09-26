import { NextResponse } from 'next/server'
import { admissionEnquirySchema } from '@/lib/validation/admission'
import { getSupabaseServerClient } from '@/lib/supabase/server'
import { checkRateLimit, getClientIp } from '@/lib/security/rateLimit'
import { sanitizeString } from '@/lib/security/sanitize'

export async function POST(request: Request) {
  try {
    // 1. IP Rate Limiting (5 requests per 10 minutes)
    const clientIp = getClientIp(request)
    const rateLimit = checkRateLimit(`admission:${clientIp}`, 5, 10 * 60 * 1000)

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
    const validationResult = admissionEnquirySchema.safeParse(body)
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

    const {
      parentName,
      studentName,
      gradeApplying,
      phone,
      email,
      preferredContact,
      message,
    } = validationResult.data

    // 3. Insert into Supabase with sanitized data
    const supabase = getSupabaseServerClient()
    const { error: dbError } = await supabase
      .from('admission_enquiries')
      .insert({
        parent_name: sanitizeString(parentName),
        student_name: sanitizeString(studentName),
        applying_for_class: sanitizeString(gradeApplying),
        phone: sanitizeString(phone),
        email: email ? sanitizeString(email) : null,
        preferred_contact_method: sanitizeString(preferredContact || 'WhatsApp'),
        message: message ? sanitizeString(message) : null,
        status: 'new',
        source: 'website_admission_form',
      })

    if (dbError) {
      console.error('[Supabase Error] admission_enquiries insert failed:', dbError)
      return NextResponse.json(
        {
          success: false,
          error: dbError.message || 'Failed to submit enquiry',
        },
        { status: 500 }
      )
    }

    const referenceId = `DAVQM-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`

    return NextResponse.json(
      {
        success: true,
        referenceId,
        message: 'Admission enquiry submitted successfully. Our counselor will contact you.',
      },
      {
        headers: {
          'X-RateLimit-Limit': rateLimit.limit.toString(),
          'X-RateLimit-Remaining': rateLimit.remaining.toString(),
        },
      }
    )
  } catch (error: any) {
    console.error('[API Error] /api/admissions/enquiry:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'An internal server error occurred while processing your enquiry.',
      },
      { status: 500 }
    )
  }
}
