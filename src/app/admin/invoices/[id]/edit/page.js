'use client'

import * as React from 'react'
import { useRouter } from 'next/navigation'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { InvoiceForm } from '@/components/admin/invoices'
import { Card, CardContent } from '@/components/ui/card'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { getInvoiceById, updateInvoice, getCompanySettings } from '@/lib/database'

export default function EditInvoicePage({ params }) {
  const router = useRouter()
  const queryClient = useQueryClient()
  const { id } = params

  // Fetch invoice data
  const { data: invoice, isLoading: invoiceLoading, error: invoiceError } = useQuery({
    queryKey: ['invoice', id],
    queryFn: () => getInvoiceById(id),
    enabled: !!id,
  })

  // Fetch company settings
  const { data: companySettings, isLoading: settingsLoading } = useQuery({
    queryKey: ['company-settings'],
    queryFn: getCompanySettings,
  })

  // Update invoice mutation
  const updateMutation = useMutation({
    mutationFn: (invoiceData) => {
      const updatedInvoice = {
        client_name: invoiceData.clientName,
        client_email: invoiceData.clientEmail,
        items: invoiceData.items,
        total_amount: invoiceData.totalAmount,
        status: invoiceData.status,
      }
      return updateInvoice(id, updatedInvoice)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['invoices'] })
      queryClient.invalidateQueries({ queryKey: ['invoice', id] })
      queryClient.invalidateQueries({ queryKey: ['dashboard-metrics'] })
      toast.success('Invoice updated successfully')
      router.push(`/admin/invoices/${id}`)
    },
    onError: (error) => {
      console.error('Error updating invoice:', error)
      toast.error('Failed to update invoice')
    },
  })

  const handleSubmit = (data) => {
    updateMutation.mutate(data)
  }

  const handleCancel = () => {
    router.push(`/admin/invoices/${id}`)
  }

  if (invoiceLoading || settingsLoading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Edit Invoice</h1>
          <p className="text-muted-foreground">
            Update invoice details and information.
          </p>
        </div>
        
        <Card>
          <CardContent className="flex items-center justify-center py-12">
            <LoadingSpinner className="h-8 w-8" />
            <span className="ml-2">Loading invoice...</span>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (invoiceError || !invoice) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Edit Invoice</h1>
          <p className="text-muted-foreground">
            Update invoice details and information.
          </p>
        </div>
        
        <Card>
          <CardContent className="flex items-center justify-center py-12">
            <div className="text-center">
              <h3 className="text-lg font-medium text-destructive mb-2">
                Invoice Not Found
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                The invoice you&apos;re looking for doesn&apos;t exist or has been deleted.
              </p>
              <button
                onClick={() => router.push('/admin/invoices')}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
              >
                Back to Invoices
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Transform invoice data for the form
  const initialData = {
    clientName: invoice.client_name,
    clientEmail: invoice.client_email,
    items: invoice.items || [],
    status: invoice.status,
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Edit Invoice</h1>
        <p className="text-muted-foreground">
          Update invoice {invoice.invoice_number} details and information.
        </p>
      </div>

      <InvoiceForm
        initialData={initialData}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        isLoading={updateMutation.isPending}
        companySettings={companySettings}
      />
    </div>
  )
}