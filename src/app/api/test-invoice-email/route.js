import { NextResponse } from 'next/server'
import { emailService } from '@/lib/email-service'
import { FROM_EMAIL } from '@/lib/resend'

export async function POST(request) {
  try {
    const body = await request.json()
    const { testEmail } = body

    if (!testEmail) {
      return NextResponse.json(
        { success: false, error: 'Test email address is required' },
        { status: 400 }
      )
    }

    console.log('Testing invoice email with FROM_EMAIL:', FROM_EMAIL)

    // Create a mock invoice for testing
    const mockInvoice = {
      id: 'test-invoice-id',
      invoice_number: 'TEST-001',
      client_name: 'Test Client',
      client_email: testEmail,
      total_amount: 1500.00,
      created_at: new Date().toISOString(),
      items: [
        {
          description: 'Web Development Services',
          quantity: 1,
          unit_price: 1500.00,
          total: 1500.00
        }
      ],
      status: 'pending'
    }

    const mockCompanySettings = {
      company_name: 'Absad MultiSynergy Limited',
      company_email: 'invoices@absadmultisynergy.com',
      company_phone: '+234 123 456 7890',
      company_address: '123 Business Street, Lagos, Nigeria',
      bank_name: 'First Bank of Nigeria',
      account_number: '1234567890',
      account_name: 'Absad MultiSynergy Limited'
    }

    // Create a simple PDF buffer for testing
    const mockPdfBuffer = Buffer.from('Test PDF content - Invoice TEST-001')

    console.log('Sending test invoice email...')
    
    const result = await emailService.sendInvoiceEmail(
      mockInvoice,
      mockCompanySettings,
      mockPdfBuffer
    )

    console.log('Invoice email result:', result)

    if (!result.success) {
      return NextResponse.json({
        success: false,
        error: 'Failed to send invoice email',
        details: result.error
      }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      data: {
        emailId: result.emailId,
        emailLogId: result.emailLogId,
        from: FROM_EMAIL,
        to: testEmail,
        invoiceNumber: mockInvoice.invoice_number
      },
      message: 'Test invoice email sent successfully'
    })

  } catch (error) {
    console.error('Test invoice email error:', error)
    return NextResponse.json({
      success: false,
      error: 'Test invoice email failed',
      details: error.message
    }, { status: 500 })
  }
}
