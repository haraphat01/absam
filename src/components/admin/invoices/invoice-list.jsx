'use client'

import * as React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/dialog'
import { 
  Search, 
  Filter, 
  MoreVertical, 
  Edit, 
  Trash2, 
  Eye, 
  Download,
  Mail,
  CheckCircle,
  XCircle,
  Clock,
  Plus,
  FileText
} from '@/components/ui/icons'
import { SendInvoiceModal } from './send-invoice-modal'
import { cn } from '@/lib/utils'

export function InvoiceList({ 
  invoices = [], 
  isLoading = false, 
  onStatusUpdate, 
  onDelete,
  onRefresh 
}) {
  const [searchTerm, setSearchTerm] = React.useState('')
  const [statusFilter, setStatusFilter] = React.useState('ALL')
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false)
  const [invoiceToDelete, setInvoiceToDelete] = React.useState(null)
  const [updatingStatus, setUpdatingStatus] = React.useState(null)
  const [generatingPdf, setGeneratingPdf] = React.useState(null)
  const [downloadingPdf, setDownloadingPdf] = React.useState(null)
  const [sendEmailModalOpen, setSendEmailModalOpen] = React.useState(false)
  const [selectedInvoiceForEmail, setSelectedInvoiceForEmail] = React.useState(null)

  // Filter invoices based on search and status
  const filteredInvoices = React.useMemo(() => {
    return invoices.filter(invoice => {
      const matchesSearch = 
        invoice.invoice_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
        invoice.client_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        invoice.client_email.toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchesStatus = statusFilter === 'ALL' || invoice.status === statusFilter
      
      return matchesSearch && matchesStatus
    })
  }, [invoices, searchTerm, statusFilter])

  const handleStatusUpdate = async (invoiceId, newStatus) => {
    setUpdatingStatus(invoiceId)
    try {
      await onStatusUpdate(invoiceId, newStatus)
    } finally {
      setUpdatingStatus(null)
    }
  }

  const handleDeleteClick = (invoice) => {
    setInvoiceToDelete(invoice)
    setDeleteDialogOpen(true)
  }

  const handleDeleteConfirm = async () => {
    if (invoiceToDelete) {
      await onDelete(invoiceToDelete.id)
      setDeleteDialogOpen(false)
      setInvoiceToDelete(null)
    }
  }

  const handleGeneratePdf = async (invoiceId) => {
    setGeneratingPdf(invoiceId)
    try {
      const response = await fetch(`/api/invoices/${invoiceId}/pdf`, {
        method: 'POST',
      })
      
      if (!response.ok) {
        throw new Error('Failed to generate PDF')
      }
      
      const result = await response.json()
      if (result.success) {
        // Refresh the invoice list to show the updated PDF URL
        onRefresh()
        // Show success message
        window.open(`/api/invoices/${invoiceId}/pdf`, '_blank')
      } else {
        throw new Error(result.error || 'Failed to generate PDF')
      }
    } catch (error) {
      console.error('Error generating PDF:', error)
      alert('Failed to generate PDF. Please try again.')
    } finally {
      setGeneratingPdf(null)
    }
  }

  const handleDownloadPdf = async (invoiceId) => {
    setDownloadingPdf(invoiceId)
    try {
      const response = await fetch(`/api/invoices/${invoiceId}/download`)
      
      if (!response.ok) {
        throw new Error('Failed to download PDF')
      }
      
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.style.display = 'none'
      a.href = url
      a.download = `invoice-${invoiceId}.pdf`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (error) {
      console.error('Error downloading PDF:', error)
      alert('Failed to download PDF. Please try again.')
    } finally {
      setDownloadingPdf(null)
    }
  }

  const handleViewPdf = (invoiceId) => {
    window.open(`/api/invoices/${invoiceId}/pdf`, '_blank')
  }

  const handleSendEmail = (invoice) => {
    setSelectedInvoiceForEmail(invoice)
    setSendEmailModalOpen(true)
  }

  const handleSendEmailSuccess = (result) => {
    console.log('Email sent successfully:', result)
    // Optionally refresh the invoice list or show a toast
    onRefresh()
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'PAID':
        return <CheckCircle className="h-4 w-4" />
      case 'UNPAID':
        return <XCircle className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const getStatusVariant = (status) => {
    switch (status) {
      case 'PAID':
        return 'default'
      case 'UNPAID':
        return 'destructive'
      default:
        return 'secondary'
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const formatCurrency = (amount) => {
    return `$${Number(amount).toLocaleString()}`
  }

  if (isLoading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-12">
          <LoadingSpinner className="h-8 w-8" />
          <span className="ml-2">Loading invoices...</span>
        </CardContent>
      </Card>
    )
  }

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
            <CardTitle>Invoice Management</CardTitle>
            <div className="flex items-center space-x-2">
              <Button onClick={onRefresh} variant="outline" size="sm">
                Refresh
              </Button>
              <Link href="/admin/invoices/new">
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  New Invoice
                </Button>
              </Link>
            </div>
          </div>
          
          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search invoices..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  {statusFilter === 'ALL' ? 'All Status' : statusFilter}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setStatusFilter('ALL')}>
                  All Status
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter('PAID')}>
                  Paid
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter('UNPAID')}>
                  Unpaid
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>
        
        <CardContent>
          {filteredInvoices.length === 0 ? (
            <div className="text-center py-12">
              <div className="mx-auto h-12 w-12 text-muted-foreground mb-4">
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-muted-foreground mb-2">No invoices found</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {searchTerm || statusFilter !== 'ALL' 
                  ? 'Try adjusting your search or filter criteria.'
                  : 'Get started by creating your first invoice.'
                }
              </p>
              {!searchTerm && statusFilter === 'ALL' && (
                <Link href="/admin/invoices/new">
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Create Invoice
                  </Button>
                </Link>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {/* Desktop Table View */}
              <div className="hidden md:block">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 font-medium">Invoice #</th>
                        <th className="text-left py-3 px-4 font-medium">Client</th>
                        <th className="text-left py-3 px-4 font-medium">Amount</th>
                        <th className="text-left py-3 px-4 font-medium">Status</th>
                        <th className="text-left py-3 px-4 font-medium">Date</th>
                        <th className="text-right py-3 px-4 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredInvoices.map((invoice) => (
                        <tr key={invoice.id} className="border-b hover:bg-muted/50">
                          <td className="py-3 px-4">
                            <div className="font-mono text-sm">{invoice.invoice_number}</div>
                          </td>
                          <td className="py-3 px-4">
                            <div>
                              <div className="font-medium">{invoice.client_name}</div>
                              <div className="text-sm text-muted-foreground">{invoice.client_email}</div>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <div className="font-medium">{formatCurrency(invoice.total_amount)}</div>
                          </td>
                          <td className="py-3 px-4">
                            <Badge variant={getStatusVariant(invoice.status)} className="flex items-center w-fit">
                              {getStatusIcon(invoice.status)}
                              <span className="ml-1">{invoice.status}</span>
                            </Badge>
                          </td>
                          <td className="py-3 px-4">
                            <div className="text-sm">{formatDate(invoice.created_at)}</div>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center justify-end">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="sm">
                                    {updatingStatus === invoice.id ? (
                                      <LoadingSpinner className="h-4 w-4" />
                                    ) : (
                                      <MoreVertical className="h-4 w-4" />
                                    )}
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem asChild>
                                    <Link href={`/admin/invoices/${invoice.id}`}>
                                      <Eye className="h-4 w-4 mr-2" />
                                      View
                                    </Link>
                                  </DropdownMenuItem>
                                  <DropdownMenuItem asChild>
                                    <Link href={`/admin/invoices/${invoice.id}/edit`}>
                                      <Edit className="h-4 w-4 mr-2" />
                                      Edit
                                    </Link>
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem
                                    onClick={() => handleViewPdf(invoice.id)}
                                    disabled={generatingPdf === invoice.id}
                                  >
                                    {generatingPdf === invoice.id ? (
                                      <>
                                        <LoadingSpinner className="h-4 w-4 mr-2" />
                                        Generating...
                                      </>
                                    ) : (
                                      <>
                                        <FileText className="h-4 w-4 mr-2" />
                                        View PDF
                                      </>
                                    )}
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    onClick={() => handleDownloadPdf(invoice.id)}
                                    disabled={downloadingPdf === invoice.id}
                                  >
                                    {downloadingPdf === invoice.id ? (
                                      <>
                                        <LoadingSpinner className="h-4 w-4 mr-2" />
                                        Downloading...
                                      </>
                                    ) : (
                                      <>
                                        <Download className="h-4 w-4 mr-2" />
                                        Download PDF
                                      </>
                                    )}
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    onClick={() => handleGeneratePdf(invoice.id)}
                                    disabled={generatingPdf === invoice.id}
                                  >
                                    {generatingPdf === invoice.id ? (
                                      <>
                                        <LoadingSpinner className="h-4 w-4 mr-2" />
                                        Generating...
                                      </>
                                    ) : (
                                      <>
                                        <FileText className="h-4 w-4 mr-2" />
                                        Generate & Store PDF
                                      </>
                                    )}
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    onClick={() => handleSendEmail(invoice)}
                                  >
                                    <Mail className="h-4 w-4 mr-2" />
                                    Send Invoice
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem
                                    onClick={() => handleStatusUpdate(
                                      invoice.id, 
                                      invoice.status === 'PAID' ? 'UNPAID' : 'PAID'
                                    )}
                                  >
                                    {invoice.status === 'PAID' ? (
                                      <>
                                        <XCircle className="h-4 w-4 mr-2" />
                                        Mark as Unpaid
                                      </>
                                    ) : (
                                      <>
                                        <CheckCircle className="h-4 w-4 mr-2" />
                                        Mark as Paid
                                      </>
                                    )}
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem
                                    onClick={() => handleDeleteClick(invoice)}
                                    className="text-destructive focus:text-destructive"
                                  >
                                    <Trash2 className="h-4 w-4 mr-2" />
                                    Delete
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Mobile Card View */}
              <div className="md:hidden space-y-4">
                {filteredInvoices.map((invoice) => (
                  <Card key={invoice.id}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="font-mono text-sm font-medium">{invoice.invoice_number}</div>
                          <div className="text-sm text-muted-foreground">{formatDate(invoice.created_at)}</div>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              {updatingStatus === invoice.id ? (
                                <LoadingSpinner className="h-4 w-4" />
                              ) : (
                                <MoreVertical className="h-4 w-4" />
                              )}
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem asChild>
                              <Link href={`/admin/invoices/${invoice.id}`}>
                                <Eye className="h-4 w-4 mr-2" />
                                View
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <Link href={`/admin/invoices/${invoice.id}/edit`}>
                                <Edit className="h-4 w-4 mr-2" />
                                Edit
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() => handleViewPdf(invoice.id)}
                              disabled={generatingPdf === invoice.id}
                            >
                              {generatingPdf === invoice.id ? (
                                <>
                                  <LoadingSpinner className="h-4 w-4 mr-2" />
                                  Generating...
                                </>
                              ) : (
                                <>
                                  <FileText className="h-4 w-4 mr-2" />
                                  View PDF
                                </>
                              )}
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleDownloadPdf(invoice.id)}
                              disabled={downloadingPdf === invoice.id}
                            >
                              {downloadingPdf === invoice.id ? (
                                <>
                                  <LoadingSpinner className="h-4 w-4 mr-2" />
                                  Downloading...
                                </>
                              ) : (
                                <>
                                  <Download className="h-4 w-4 mr-2" />
                                  Download PDF
                                </>
                              )}
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleGeneratePdf(invoice.id)}
                              disabled={generatingPdf === invoice.id}
                            >
                              {generatingPdf === invoice.id ? (
                                <>
                                  <LoadingSpinner className="h-4 w-4 mr-2" />
                                  Generating...
                                </>
                              ) : (
                                <>
                                  <FileText className="h-4 w-4 mr-2" />
                                  Generate & Store PDF
                                </>
                              )}
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleSendEmail(invoice)}
                            >
                              <Mail className="h-4 w-4 mr-2" />
                              Send Invoice
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() => handleStatusUpdate(
                                invoice.id, 
                                invoice.status === 'PAID' ? 'UNPAID' : 'PAID'
                              )}
                            >
                              {invoice.status === 'PAID' ? (
                                <>
                                  <XCircle className="h-4 w-4 mr-2" />
                                  Mark as Unpaid
                                </>
                              ) : (
                                <>
                                  <CheckCircle className="h-4 w-4 mr-2" />
                                  Mark as Paid
                                </>
                              )}
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() => handleDeleteClick(invoice)}
                              className="text-destructive focus:text-destructive"
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      
                      <div className="space-y-2">
                        <div>
                          <div className="font-medium">{invoice.client_name}</div>
                          <div className="text-sm text-muted-foreground">{invoice.client_email}</div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="font-medium text-lg">{formatCurrency(invoice.total_amount)}</div>
                          <Badge variant={getStatusVariant(invoice.status)} className="flex items-center">
                            {getStatusIcon(invoice.status)}
                            <span className="ml-1">{invoice.status}</span>
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Invoice</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete invoice {invoiceToDelete?.invoice_number}? 
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Send Email Modal */}
      <SendInvoiceModal
        isOpen={sendEmailModalOpen}
        onClose={() => {
          setSendEmailModalOpen(false)
          setSelectedInvoiceForEmail(null)
        }}
        invoice={selectedInvoiceForEmail}
        onSendSuccess={handleSendEmailSuccess}
      />
    </>
  )
}