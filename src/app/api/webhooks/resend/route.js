import { NextResponse } from 'next/server'
import { emailService, EMAIL_STATUS } from '@/lib/email-service'

/**
 * Resend webhook handler for email delivery tracking
 * This endpoint receives delivery status updates from Resend
 */
export async function POST(request) {
  try {
    // Verify webhook signature (optional but recommended for production)
    const signature = request.headers.get('resend-signature')
    const webhookSecret = process.env.RESEND_WEBHOOK_SECRET
    
    if (webhookSecret && signature) {
      // In production, verify the webhook signature here
      // This is a simplified version - implement proper signature verification
      console.log('Webhook signature verification would happen here')
    }

    const body = await request.json()
    const { type, data } = body

    if (!data || !data.email_id) {
      return NextResponse.json(
        { error: 'Invalid webhook payload' },
        { status: 400 }
      )
    }

    const emailId = data.email_id
    const timestamp = data.created_at ? new Date(data.created_at) : new Date()

    // Handle different webhook events
    switch (type) {
      case 'email.sent':
        // Email was successfully sent
        await emailService.updateEmailStatus(
          emailId,
          EMAIL_STATUS.SENT,
          null,
          null,
          null
        )
        console.log(`Email ${emailId} marked as sent`)
        break

      case 'email.delivered':
        // Email was delivered to recipient's inbox
        await emailService.updateEmailStatus(
          emailId,
          EMAIL_STATUS.DELIVERED,
          timestamp,
          null,
          null
        )
        console.log(`Email ${emailId} marked as delivered`)
        break

      case 'email.delivery_delayed':
        // Email delivery was delayed but will be retried
        console.log(`Email ${emailId} delivery delayed`)
        break

      case 'email.complained':
        // Recipient marked email as spam
        await emailService.updateEmailStatus(
          emailId,
          EMAIL_STATUS.BOUNCED,
          null,
          null,
          null
        )
        console.log(`Email ${emailId} marked as complained/spam`)
        break

      case 'email.bounced':
        // Email bounced (hard or soft bounce)
        await emailService.updateEmailStatus(
          emailId,
          EMAIL_STATUS.BOUNCED,
          null,
          null,
          null
        )
        console.log(`Email ${emailId} bounced: ${data.reason || 'Unknown reason'}`)
        break

      case 'email.opened':
        // Recipient opened the email
        await emailService.updateEmailStatus(
          emailId,
          EMAIL_STATUS.DELIVERED, // Keep status as delivered, just update opened_at
          null,
          timestamp,
          null
        )
        console.log(`Email ${emailId} opened`)
        break

      case 'email.clicked':
        // Recipient clicked a link in the email
        await emailService.updateEmailStatus(
          emailId,
          EMAIL_STATUS.DELIVERED, // Keep status as delivered, just update clicked_at
          null,
          null,
          timestamp
        )
        console.log(`Email ${emailId} clicked`)
        break

      default:
        console.log(`Unhandled webhook event type: ${type}`)
        break
    }

    // Log the webhook event for debugging
    console.log('Resend webhook processed:', {
      type,
      emailId,
      timestamp: timestamp.toISOString(),
      data: JSON.stringify(data, null, 2)
    })

    return NextResponse.json({ 
      success: true, 
      message: 'Webhook processed successfully' 
    })

  } catch (error) {
    console.error('Resend webhook error:', error)
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Webhook processing failed',
        details: error.message 
      },
      { status: 500 }
    )
  }
}

// Handle GET requests for webhook verification (if needed)
export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const challenge = searchParams.get('challenge')
  
  if (challenge) {
    return NextResponse.json({ challenge })
  }
  
  return NextResponse.json({ 
    message: 'Resend webhook endpoint is active',
    timestamp: new Date().toISOString()
  })
}