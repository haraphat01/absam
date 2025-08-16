'use client'

import * as React from 'react'
import { useRouter } from 'next/navigation'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { InvoiceForm } from '@/components/admin/invoices'
import { Card, CardContent } from '@/components/ui/card'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { createInvoice, generateInvoiceNumber, getCompanySettings } from '@/lib/database'
import { useAuth } from '@/providers/auth-provider'

export default function NewInvoicePage() {
  const router = useRouter()
  const queryClient = useQueryClient()
  const { userProfile } = useAuth()

  // Fetch company settings
  const { data: companySettings, isLoading: settingsLoading } = useQuery({
    queryKey: ['company-settings'],
    queryFn: getCompanySettings,
  })

  // Create invoice mutation
  const createMutation = useMutation({
    mutationFn: async (invoiceData) => {
      // Generate invoice number
      const invoiceNumber = await generateInvoiceNumber()
      
      // Prepare invoice data
      const invoice = {
        invoice_number: invoiceNumber,
        client_name: invoiceData.clientName,
        client_email: invoiceData.clientEmail,
        items: invoiceData.items,
        total_amount: invoiceData.totalAmount,
        status: invoiceData.status,
        created_by: userProfile?.id,
      }

      return createInvoice(invoice)
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['invoices'] })
      queryClient.invalidateQueries({ queryKey: ['dashboard-metrics'] })
      toast.success('Invoice created successfully')
      router.push(`/admin/invoices/${data.id}`)
    },
    onError: (error) => {
      console.error('Error creating invoice:', error)
      toast.error('Failed to create invoice')
    },
  })

  const handleSubmit = (data) => {
    createMutation.mutate(data)
  }

  const handleCancel = () => {
    router.push('/admin/invoices')
  }

  if (settingsLoading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Create New Invoice</h1>
          <p className="text-muted-foreground">
            Generate a new invoice for your client.
          </p>
        </div>
        
        <Card>
          <CardContent className="flex items-center justify-center py-12">
            <LoadingSpinner className="h-8 w-8" />
            <span className="ml-2">Loading company settings...</span>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!companySettings) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Create New Invoice</h1>
          <p className="text-muted-foreground">
            Generate a new invoice for your client.
          </p>
        </div>
        
        <Card>
          <CardContent className="flex items-center justify-center py-12">
            <div className="text-center">
              <h3 className="text-lg font-medium text-muted-foreground mb-2">
                Company Settings Required
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Please configure your company banking details before creating invoices.
              </p>
              <button
                onClick={() => router.push('/admin/settings')}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
              >
                Configure Settings
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Create New Invoice</h1>
        <p className="text-muted-foreground">
          Generate a new invoice for your client.
        </p>
      </div>

      <InvoiceForm
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        isLoading={createMutation.isPending}
        companySettings={companySettings}
      />
    </div>
  )
}