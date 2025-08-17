import { NextResponse } from 'next/server'
import { getInvoiceByIdServer, getCompanySettingsServer, updateInvoicePdfUrlServer } from '@/lib/database-server'
import { generateBasicPDF } from '@/lib/pdf-generator-basic'
import { emailService } from '@/lib/email-service'

export async function POST(request, { params }) {
  try {
    const { id } = await params
    const body = await request.json()
    const { type = 'invoice', message } = body

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Invoice ID is required' },
        { status: 400 }
      )
    }

    // Fetch invoice data
    const invoice = await getInvoiceByIdServer(id)
    if (!invoice) {
      return NextResponse.json(
        { success: false, error: 'Invoice not found' },
        { status: 404 }
      )
    }

    // Fetch company settings for banking details
    const companySettings = await getCompanySettingsServer()

    // Generate PDF
    const pdfBuffer = await generateBasicPDF(invoice)

    // Note: We don't store the PDF buffer directly as it causes circular structure issues
    // The PDF is generated on-demand and sent as an attachment

    // Send invoice email using enhanced email service
    console.log('Sending invoice email:', {
      invoiceId: invoice.id,
      invoiceNumber: invoice.invoice_number,
      clientEmail: invoice.client_email,
      fromEmail: process.env.NEXT_PUBLIC_FROM_EMAIL
    })
    
    const emailResult = await emailService.sendInvoiceEmail(
      invoice, 
      companySettings, 
      pdfBuffer,
      null // sentBy - could be extracted from auth context
    )
    
    console.log('Invoice email result:', emailResult)

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
    const { id } = await params
    const { searchParams } = new URL(request.url)
    const action = searchParams.get('action')

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Invoice ID is required' },
        { status: 400 }
      )
    }

    // Fetch invoice data
    const invoice = await getInvoiceByIdServer(id)
    if (!invoice) {
      return NextResponse.json(
        { success: false, error: 'Invoice not found' },
        { status: 404 }
      )
    }

    if (action === 'preview') {
      // Return email preview without sending
      const companySettings = await getCompanySettingsServer()
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