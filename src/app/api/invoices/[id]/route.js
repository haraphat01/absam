import { NextResponse } from 'next/server'
import { getInvoiceByIdServer, updateInvoiceServer, deleteInvoiceServer, updateInvoiceStatusServer } from '@/lib/database-server'

export async function GET(request, { params }) {
  try {
    console.log('GET /api/invoices/[id] - Starting request')
    
    const { id } = await params
    console.log('Invoice ID:', id)
    
    const invoice = await getInvoiceByIdServer(id)
    
    if (!invoice) {
      return NextResponse.json({
        success: false,
        error: 'Invoice not found'
      }, { status: 404 })
    }
    
    return NextResponse.json({
      success: true,
      data: invoice
    })
  } catch (error) {
    console.error('Error fetching invoice:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch invoice',
      details: error.message
    }, { status: 500 })
  }
}

export async function PATCH(request, { params }) {
  try {
    console.log('PATCH /api/invoices/[id] - Starting request')
    
    const { id } = await params
    const body = await request.json()
    console.log('Invoice ID:', id, 'Update data:', body)
    
    // If only updating status, use the specific function
    if (body.status && Object.keys(body).length === 1) {
      const updatedInvoice = await updateInvoiceStatusServer(id, body.status)
      return NextResponse.json({
        success: true,
        data: updatedInvoice,
        message: 'Invoice status updated successfully'
      })
    }
    
    // Otherwise, update the full invoice
    const updatedInvoice = await updateInvoiceServer(id, body)
    
    return NextResponse.json({
      success: true,
      data: updatedInvoice,
      message: 'Invoice updated successfully'
    })
  } catch (error) {
    console.error('Error updating invoice:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to update invoice',
      details: error.message
    }, { status: 500 })
  }
}

export async function DELETE(request, { params }) {
  try {
    console.log('DELETE /api/invoices/[id] - Starting request')
    
    const { id } = await params
    console.log('Invoice ID to delete:', id)
    
    await deleteInvoiceServer(id)
    
    return NextResponse.json({
      success: true,
      message: 'Invoice deleted successfully'
    })
  } catch (error) {
    console.error('Error deleting invoice:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to delete invoice',
      details: error.message
    }, { status: 500 })
  }
}