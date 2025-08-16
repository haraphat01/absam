import { NextResponse } from 'next/server'
import { getInvoiceById, getCompanySettings, updateInvoicePdfUrl, uploadFile } from '@/lib/database'
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

    // Return PDF as response
    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `inline; filename="${filename}"`,
        'Cache-Control': 'no-cache, no-store, must-revalidate',
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
    await updateInvoicePdfUrl(id, pdfUrl)

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