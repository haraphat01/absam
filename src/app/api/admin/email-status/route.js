import { NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase'

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const emailId = searchParams.get('emailId')
    const invoiceId = searchParams.get('invoiceId')

    const supabase = createServerClient()

    let query = supabase
      .from('email_logs')
      .select('*')
      .order('sent_at', { ascending: false })
      .limit(50)

    if (emailId) {
      query = query.eq('resend_email_id', emailId)
    }

    if (invoiceId) {
      query = query.eq('invoice_id', invoiceId)
    }

    const { data: emails, error } = await query

    if (error) {
      throw error
    }

    // Get email statistics
    const totalEmails = emails.length
    const sentEmails = emails.filter(e => e.status === 'sent').length
    const deliveredEmails = emails.filter(e => e.status === 'delivered').length
    const failedEmails = emails.filter(e => e.status === 'failed').length
    const bouncedEmails = emails.filter(e => e.status === 'bounced').length

    return NextResponse.json({
      success: true,
      data: {
        emails,
        statistics: {
          total: totalEmails,
          sent: sentEmails,
          delivered: deliveredEmails,
          failed: failedEmails,
          bounced: bouncedEmails,
          deliveryRate: totalEmails > 0 ? Math.round((deliveredEmails / totalEmails) * 100) : 0
        }
      }
    })

  } catch (error) {
    console.error('Error fetching email status:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch email status',
      details: error.message
    }, { status: 500 })
  }
}



