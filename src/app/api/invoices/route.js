import { NextResponse } from 'next/server'
import { getInvoicesServer, createInvoiceServer, getCompanySettingsServer } from '@/lib/database-server'
import { generateInvoicePDF } from '@/lib/pdf-generator'
import { emailService } from '@/lib/email-service'

export async function GET(request) {
  try {
    console.log('GET /api/invoices - Starting request')
    
    // Get query parameters for filtering
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const month = searchParams.get('month')
    
    const filters = {}
    if (status) filters.status = status
    if (month) filters.month = month
    
    console.log('Fetching invoices with filters:', filters)
    
    const invoices = await getInvoicesServer(filters)
    console.log('Invoices fetched successfully:', invoices?.length || 0, 'invoices')
    
    return NextResponse.json({
      success: true,
      data: invoices || []
    })
  } catch (error) {
    console.error('Error fetching invoices:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch invoices',
      details: error.message
    }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    console.log('POST /api/invoices - Starting request')
    
    const body = await request.json()
    console.log('Request body:', body)
    
    // TODO: Add validation and authentication
    
    const invoice = await createInvoiceServer(body)
    console.log('Invoice created successfully:', invoice)
    
    // Fetch company settings for email
    const companySettings = await getCompanySettingsServer()
    
    // Generate PDF
    const pdfBuffer = await generateInvoicePDF(invoice, companySettings)
    
    // Send invoice email automatically
    const emailResult = await emailService.sendInvoiceEmail(
      invoice, 
      companySettings, 
      pdfBuffer,
      null // sentBy - could be extracted from auth context
    )
    
    if (!emailResult.success) {
      console.error('Failed to send invoice email:', emailResult.error)
      // Continue with invoice creation even if email fails
    }
    
    return NextResponse.json({
      success: true,
      data: invoice,
      message: 'Invoice created successfully and sent to client',
      emailSent: emailResult.success
    })
  } catch (error) {
    console.error('Error creating invoice:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to create invoice',
      details: error.message
    }, { status: 500 })
  }
}