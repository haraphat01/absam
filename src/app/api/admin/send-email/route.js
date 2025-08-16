import { NextResponse } from 'next/server'
import { emailService, EMAIL_TYPES } from '@/lib/email-service'
import { createServerClient } from '@/lib/supabase'

/**
 * API endpoint for sending various types of emails
 */
export async function POST(request) {
  try {
    const body = await request.json()
    const { 
      emailType, 
      recipientEmail, 
      recipientName,
      customSubject,
      customMessage,
      invoiceId,
      contactInquiryId,
      quoteDetails
    } = body

    if (!emailType || !recipientEmail) {
      return NextResponse.json(
        { success: false, error: 'Email type and recipient email are required' },
        { status: 400 }
      )
    }

    let emailResult

    switch (emailType) {
      case EMAIL_TYPES.WELCOME:
        if (!recipientName) {
          return NextResponse.json(
            { success: false, error: 'Recipient name is required for welcome emails' },
            { status: 400 }
          )
        }
        emailResult = await emailService.sendWelcomeEmail(
          recipientName,
          recipientEmail,
          null // sentBy
        )
        break

      case EMAIL_TYPES.QUOTE_FOLLOWUP:
        if (!recipientName || !quoteDetails) {
          return NextResponse.json(
            { success: false, error: 'Recipient name and quote details are required for quote follow-up emails' },
            { status: 400 }
          )
        }
        emailResult = await emailService.sendQuoteFollowUp(
          recipientName,
          recipientEmail,
          quoteDetails,
          null // sentBy
        )
        break

      case EMAIL_TYPES.CONTACT_RESPONSE:
        if (!contactInquiryId || !customMessage) {
          return NextResponse.json(
            { success: false, error: 'Contact inquiry ID and response message are required' },
            { status: 400 }
          )
        }

        // Fetch contact inquiry
        const supabase = createServerClient()
        const { data: inquiry, error: fetchError } = await supabase
          .from('contact_inquiries')
          .select('*')
          .eq('id', contactInquiryId)
          .single()

        if (fetchError || !inquiry) {
          return NextResponse.json(
            { success: false, error: 'Contact inquiry not found' },
            { status: 404 }
          )
        }

        emailResult = await emailService.sendContactResponse(
          inquiry,
          customMessage,
          null // sentBy
        )
        break

      case EMAIL_TYPES.REMINDER:
        if (!invoiceId) {
          return NextResponse.json(
            { success: false, error: 'Invoice ID is required for reminder emails' },
            { status: 400 }
          )
        }

        // Fetch invoice and company settings
        const { getInvoiceById, getCompanySettings } = await import('@/lib/database')
        const invoice = await getInvoiceById(invoiceId)
        const companySettings = await getCompanySettings()

        if (!invoice) {
          return NextResponse.json(
            { success: false, error: 'Invoice not found' },
            { status: 404 }
          )
        }

        emailResult = await emailService.sendPaymentReminderEmail(
          invoice,
          companySettings,
          null // sentBy
        )
        break

      case EMAIL_TYPES.GENERAL:
        if (!customSubject || !customMessage) {
          return NextResponse.json(
            { success: false, error: 'Subject and message are required for general emails' },
            { status: 400 }
          )
        }

        emailResult = await emailService.sendEmail({
          to: recipientEmail,
          subject: customSubject,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
              <div style="text-align: center; border-bottom: 2px solid #2563eb; padding-bottom: 20px; margin-bottom: 30px;">
                <h1 style="color: #1f2937; margin: 0;">Absad MultiSynergy Limited</h1>
                <p style="color: #6b7280; margin: 5px 0 0 0; font-size: 14px;">Import & Export Company</p>
              </div>
              
              ${recipientName ? `<p>Dear ${recipientName},</p>` : '<p>Dear Valued Customer,</p>'}
              
              <div style="margin: 20px 0;">
                ${customMessage.replace(/\n/g, '<br>')}
              </div>
              
              <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; text-align: center; color: #6b7280; font-size: 14px;">
                <p><strong>Best regards,</strong></p>
                <p><strong>The Absad MultiSynergy Team</strong></p>
                <p>Email: info@absadmultisynergy.com | Phone: +2347018222950</p>
              </div>
            </div>
          `,
          text: `
Dear ${recipientName || 'Valued Customer'},

${customMessage}

Best regards,
The Absad MultiSynergy Team

Email: info@absadmultisynergy.com
Phone: +2347018222950
          `,
          emailType: EMAIL_TYPES.GENERAL,
          contactInquiryId,
          sentBy: null
        })
        break

      default:
        return NextResponse.json(
          { success: false, error: 'Invalid email type' },
          { status: 400 }
        )
    }

    if (!emailResult.success) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Failed to send email',
          details: emailResult.error 
        },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      data: {
        emailId: emailResult.emailId,
        emailLogId: emailResult.emailLogId,
        message: 'Email sent successfully',
        sentTo: recipientEmail,
        emailType
      }
    })

  } catch (error) {
    console.error('Error sending email:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to send email',
        details: error.message 
      },
      { status: 500 }
    )
  }
}