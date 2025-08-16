import { NextResponse } from 'next/server'
import { getInvoiceById, getCompanySettings } from '@/lib/database'
import { generateInvoicePDF } from '@/lib/pdf-generator'

export async function GET(request, { params }) {
  try {
    const { id } = params

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

    // Create filename
    const filename = `invoice-${invoice.invoice_number}.pdf`

    // Return PDF as download
    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Content-Length': pdfBuffer.length.toString(),
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