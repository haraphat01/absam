import { NextResponse } from 'next/server'
import { emailService } from '@/lib/email-service'
import { createServerClient } from '@/lib/supabase'

/**
 * API endpoint for email statistics and monitoring
 */
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const dateFrom = searchParams.get('from')
    const dateTo = searchParams.get('to')
    const period = searchParams.get('period') || '30' // days

    // Calculate date range if not provided
    let fromDate = dateFrom
    let toDate = dateTo

    if (!fromDate && !toDate) {
      const now = new Date()
      toDate = now.toISOString()
      fromDate = new Date(now.getTime() - (parseInt(period) * 24 * 60 * 60 * 1000)).toISOString()
    }

    // Get email statistics
    const stats = await emailService.getEmailStats(fromDate, toDate)
    
    if (!stats) {
      return NextResponse.json(
        { success: false, error: 'Failed to fetch email statistics' },
        { status: 500 }
      )
    }

    // Get recent email activity
    const recentActivity = await emailService.getRecentEmailActivity(20)

    // Get delivery rate calculation
    const deliveryRate = stats.total > 0 ? 
      ((stats.delivered + stats.sent) / stats.total * 100).toFixed(2) : 0

    const failureRate = stats.total > 0 ? 
      ((stats.failed + stats.bounced) / stats.total * 100).toFixed(2) : 0

    return NextResponse.json({
      success: true,
      data: {
        summary: {
          total: stats.total,
          sent: stats.sent,
          delivered: stats.delivered,
          failed: stats.failed,
          bounced: stats.bounced,
          deliveryRate: parseFloat(deliveryRate),
          failureRate: parseFloat(failureRate)
        },
        byType: stats.byType,
        recentActivity,
        period: {
          from: fromDate,
          to: toDate,
          days: parseInt(period)
        }
      }
    })

  } catch (error) {
    console.error('Error fetching email statistics:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch email statistics',
        details: error.message 
      },
      { status: 500 }
    )
  }
}

/**
 * Get detailed email logs with filtering
 */
export async function POST(request) {
  try {
    const body = await request.json()
    const { 
      emailType, 
      status, 
      dateFrom, 
      dateTo, 
      recipientEmail,
      limit = 50,
      offset = 0 
    } = body

    const supabase = createServerClient()
    let query = supabase
      .from('email_logs')
      .select(`
        *,
        invoices(invoice_number, client_name),
        contact_inquiries(name)
      `)
      .order('sent_at', { ascending: false })
      .range(offset, offset + limit - 1)

    // Apply filters
    if (emailType) {
      query = query.eq('email_type', emailType)
    }

    if (status) {
      query = query.eq('status', status)
    }

    if (recipientEmail) {
      query = query.ilike('recipient_email', `%${recipientEmail}%`)
    }

    if (dateFrom) {
      query = query.gte('sent_at', dateFrom)
    }

    if (dateTo) {
      query = query.lte('sent_at', dateTo)
    }

    const { data: emailLogs, error } = await query

    if (error) {
      throw error
    }

    // Get total count for pagination
    let countQuery = supabase
      .from('email_logs')
      .select('*', { count: 'exact', head: true })

    // Apply same filters for count
    if (emailType) countQuery = countQuery.eq('email_type', emailType)
    if (status) countQuery = countQuery.eq('status', status)
    if (recipientEmail) countQuery = countQuery.ilike('recipient_email', `%${recipientEmail}%`)
    if (dateFrom) countQuery = countQuery.gte('sent_at', dateFrom)
    if (dateTo) countQuery = countQuery.lte('sent_at', dateTo)

    const { count } = await countQuery

    return NextResponse.json({
      success: true,
      data: {
        emailLogs,
        pagination: {
          total: count,
          limit,
          offset,
          hasMore: count > offset + limit
        }
      }
    })

  } catch (error) {
    console.error('Error fetching email logs:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch email logs',
        details: error.message 
      },
      { status: 500 }
    )
  }
}