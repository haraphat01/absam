'use client'

import * as React from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { InvoiceList } from './invoice-list'

export function InvoicesPage() {
  const queryClient = useQueryClient()

  // Fetch invoices
  const { 
    data: invoices = [], 
    isLoading, 
    error,
    refetch 
  } = useQuery({
    queryKey: ['invoices'],
    queryFn: async () => {
      const response = await fetch('/api/invoices')
      if (!response.ok) {
        throw new Error('Failed to fetch invoices')
      }
      const result = await response.json()
      if (!result.success) {
        throw new Error(result.error || 'Failed to fetch invoices')
      }
      return result.data
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  })

  // Update invoice status mutation
  const updateStatusMutation = useMutation({
    mutationFn: async ({ invoiceId, status }) => {
      const response = await fetch(`/api/invoices/${invoiceId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      })
      if (!response.ok) {
        throw new Error('Failed to update invoice status')
      }
      return response.json()
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['invoices'] })
      queryClient.invalidateQueries({ queryKey: ['dashboard-metrics'] })
      toast.success(`Invoice ${variables.status.toLowerCase()} successfully`)
    },
    onError: (error) => {
      console.error('Error updating invoice status:', error)
      toast.error('Failed to update invoice status')
    },
  })

  // Delete invoice mutation
  const deleteMutation = useMutation({
    mutationFn: async (invoiceId) => {
      const response = await fetch(`/api/invoices/${invoiceId}`, {
        method: 'DELETE',
      })
      if (!response.ok) {
        throw new Error('Failed to delete invoice')
      }
      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['invoices'] })
      queryClient.invalidateQueries({ queryKey: ['dashboard-metrics'] })
      toast.success('Invoice deleted successfully')
    },
    onError: (error) => {
      console.error('Error deleting invoice:', error)
      toast.error('Failed to delete invoice')
    },
  })

  const handleStatusUpdate = async (invoiceId, newStatus) => {
    updateStatusMutation.mutate({ invoiceId, status: newStatus })
  }

  const handleDelete = async (invoiceId) => {
    deleteMutation.mutate(invoiceId)
  }

  const handleRefresh = () => {
    refetch()
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <h3 className="text-lg font-medium text-destructive mb-2">Error Loading Invoices</h3>
          <p className="text-sm text-muted-foreground mb-4">
            {error.message || 'Something went wrong while loading invoices.'}
          </p>
          <button
            onClick={handleRefresh}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Invoices</h1>
        <p className="text-muted-foreground">
          Manage your invoices, track payments, and generate billing documents.
        </p>
      </div>

      <InvoiceList
        invoices={invoices}
        isLoading={isLoading}
        onStatusUpdate={handleStatusUpdate}
        onDelete={handleDelete}
        onRefresh={handleRefresh}
      />
    </div>
  )
}