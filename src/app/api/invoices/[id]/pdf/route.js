import { NextResponse } from 'next/server'
import { getInvoiceByIdServer, getCompanySettingsServer, updateInvoicePdfUrlServer, uploadFile } from '@/lib/database-server'
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

    // Return PDF as response
    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `inline; filename="${filename}"`,
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Content-Length': Buffer.byteLength(pdfBuffer).toString(),
      },
    })
  } catch (error) {
    console.error('Error generating PDF:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to generate PDF',
        details: error.message 
      },
      { status: 500 }
    )
  }
}

export async function POST(request, { params }) {
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

    // Create filename and path for storage
    const filename = `invoice-${invoice.invoice_number}-${Date.now()}.pdf`
    const filePath = `invoices/${filename}`

    // Upload PDF to Supabase Storage
    const file = new File([pdfBuffer], filename, { type: 'application/pdf' })
    await uploadFile('invoices', filePath, file)

    // Get public URL
    const { supabase } = await import('@/lib/supabase')
    const { data: urlData } = supabase.storage
      .from('invoices')
      .getPublicUrl(filePath)

    const pdfUrl = urlData.publicUrl

    // Update invoice with PDF URL
    await updateInvoicePdfUrlServer(id, pdfUrl)

    return NextResponse.json({
      success: true,
      data: {
        pdfUrl,
        filename,
        message: 'PDF generated and stored successfully'
      }
    })
  } catch (error) {
    console.error('Error generating and storing PDF:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to generate and store PDF',
        details: error.message 
      },
      { status: 500 }
    )
  }
}