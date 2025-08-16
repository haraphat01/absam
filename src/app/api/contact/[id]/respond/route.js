import { NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase'
import { emailService } from '@/lib/email-service'

/**
 * API endpoint for responding to contact inquiries
 */
export async function POST(request, { params }) {
  try {
    const { id } = params
    const body = await request.json()
    const { responseMessage } = body

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Contact inquiry ID is required' },
        { status: 400 }
      )
    }

    if (!responseMessage || responseMessage.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: 'Response message is required' },
        { status: 400 }
      )
    }

    // Fetch contact inquiry
    const supabase = createServerClient()
    const { data: inquiry, error: fetchError } = await supabase
      .from('contact_inquiries')
      .select('*')
      .eq('id', id)
      .single()

    if (fetchError || !inquiry) {
      return NextResponse.json(
        { success: false, error: 'Contact inquiry not found' },
        { status: 404 }
      )
    }

    // Send response email
    const emailResult = await emailService.sendContactResponse(
      inquiry,
      responseMessage.trim(),
      null // sentBy - could be extracted from auth context
    )

    if (!emailResult.success) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Failed to send response email',
          details: emailResult.error 
        },
        { status: 500 }
      )
    }

    // Mark inquiry as responded
    const { error: updateError } = await supabase
      .from('contact_inquiries')
      .update({ 
        is_responded: true,
        responded_at: new Date().toISOString()
      })
      .eq('id', id)

    if (updateError) {
      console.error('Failed to update inquiry status:', updateError)
      // Don't fail the request if update fails
    }

    return NextResponse.json({
      success: true,
      data: {
        emailId: emailResult.emailId,
        emailLogId: emailResult.emailLogId,
        message: 'Response sent successfully',
        sentTo: inquiry.email,
        inquiryId: inquiry.id
      }
    })

  } catch (error) {
    console.error('Error sending contact response:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to send response',
        details: error.message 
      },
      { status: 500 }
    )
  }
}

/**
 * Get contact inquiry details for response
 */
export async function GET(request, { params }) {
  try {
    const { id } = params

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Contact inquiry ID is required' },
        { status: 400 }
      )
    }

    // Fetch contact inquiry with email logs
    const supabase = createServerClient()
    const { data: inquiry, error: fetchError } = await supabase
      .from('contact_inquiries')
      .select(`
        *,
        email_logs(*)
      `)
      .eq('id', id)
      .single()

    if (fetchError || !inquiry) {
      return NextResponse.json(
        { success: false, error: 'Contact inquiry not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: {
        inquiry,
        emailHistory: inquiry.email_logs || []
      }
    })

  } catch (error) {
    console.error('Error fetching contact inquiry:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch inquiry',
        details: error.message 
      },
      { status: 500 }
    )
  }
}