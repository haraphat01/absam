import { NextResponse } from 'next/server'
import { getInvoiceByIdServer, getCompanySettingsServer } from '@/lib/database-server'
import { generateBasicPDF } from '@/lib/pdf-generator-basic'

export async function GET(request, { params }) {
  try {
    const { id } = await params

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

    // Create filename
    const filename = `invoice-${invoice.invoice_number}.pdf`

    // Return PDF as download
    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Content-Length': Buffer.byteLength(pdfBuffer).toString(),
      },
    })
  } catch (error) {
    console.error('Error downloading PDF:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to download PDF',
        details: error.message 
      },
      { status: 500 }
    )
  }
}