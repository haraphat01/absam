import { NextResponse } from 'next/server'
import { getInvoiceById, getCompanySettings, updateInvoicePdfUrl } from '@/lib/database'
import { generateInvoicePDF } from '@/lib/pdf-generator'
import { emailService } from '@/lib/email-service'

export async function POST(request, { params }) {
  try {
    const { id } = params
    const body = await request.json()
    const { type = 'invoice', message } = body

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Invoice ID is required' },
        { status: 400 }
      )
    }

    // Fetch invoice data
    const invoice = await getInvoiceById(id)
    if (!invoice) {
      return NextResponse.json(
        { success: false, error: 'Invoice not found' },
        { status: 404 }
      )
    }

    // Fetch company settings for banking details
    const companySettings = await getCompanySettings()

    // Generate PDF
    const pdfBuffer = await generateInvoicePDF(invoice, companySettings)

    // Store PDF URL if needed
    let pdfUrl = null
    try {
      pdfUrl = await updateInvoicePdfUrl(invoice.id, pdfBuffer)
    } catch (pdfError) {
      console.error('Failed to store PDF:', pdfError)
      // Continue without storing PDF URL
    }

    // Send invoice email using enhanced email service
    const emailResult = await emailService.sendInvoiceEmail(
      invoice, 
      companySettings, 
      pdfBuffer,
      null // sentBy - could be extracted from auth context
    )

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
        message: 'Invoice email sent successfully',
        sentTo: invoice.client_email,
        pdfUrl: pdfUrl,
        invoiceNumber: invoice.invoice_number
      }
    })
  } catch (error) {
    console.error('Error sending invoice email:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to send invoice email',
        details: error.message 
      },
      { status: 500 }
    )
  }
}

// GET endpoint to check email sending status or resend
export async function GET(request, { params }) {
  try {
    const { id } = params
    const { searchParams } = new URL(request.url)
    const action = searchParams.get('action')

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Invoice ID is required' },
        { status: 400 }
      )
    }

    // Fetch invoice data
    const invoice = await getInvoiceById(id)
    if (!invoice) {
      return NextResponse.json(
        { success: false, error: 'Invoice not found' },
        { status: 404 }
      )
    }

    if (action === 'preview') {
      // Return email preview without sending
      const companySettings = await getCompanySettings()
      const { generateInvoiceEmailTemplate } = await import('@/lib/email-templates')
      const emailTemplate = generateInvoiceEmailTemplate(invoice, companySettings)
      
      return NextResponse.json({
        success: true,
        data: {
          preview: {
            to: invoice.client_email,
            subject: emailTemplate.subject,
            html: emailTemplate.html,
            text: emailTemplate.text
          }
        }
      })
    }

    // Default: return invoice email status
    return NextResponse.json({
      success: true,
      data: {
        invoice: {
          id: invoice.id,
          invoice_number: invoice.invoice_number,
          client_name: invoice.client_name,
          client_email: invoice.client_email,
          status: invoice.status,
          total_amount: invoice.total_amount,
          created_at: invoice.created_at
        },
        canSendEmail: true
      }
    })
  } catch (error) {
    console.error('Error checking invoice email status:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to check email status',
        details: error.message 
      },
      { status: 500 }
    )
  }
}