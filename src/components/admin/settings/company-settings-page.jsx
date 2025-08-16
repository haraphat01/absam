'use client'

import * as React from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { CompanySettingsForm } from './company-settings-form'
import { Settings, Building2, CreditCard, AlertCircle, CheckCircle } from '@/components/ui/icons'

export function CompanySettingsPage() {
  const queryClient = useQueryClient()

  // Fetch current company settings
  const { data: settings, isLoading, error } = useQuery({
    queryKey: ['company-settings'],
    queryFn: async () => {
      const response = await fetch('/api/settings/company')
      if (!response.ok) {
        throw new Error('Failed to fetch company settings')
      }
      const result = await response.json()
      return result.data
    }
  })

  // Update company settings mutation
  const updateSettingsMutation = useMutation({
    mutationFn: async (settingsData) => {
      const response = await fetch('/api/settings/company', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(settingsData),
      })
      
      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to update settings')
      }
      
      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['company-settings'] })
    }
  })

  const handleUpdateSettings = (settingsData) => {
    updateSettingsMutation.mutate(settingsData)
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-2">
          <Settings className="h-6 w-6 text-primary" />
          <div>
            <h1 className="text-2xl font-bold text-foreground">Company Settings</h1>
            <p className="text-muted-foreground">Manage banking details and payment information</p>
          </div>
        </div>
        
        <Card>
          <CardContent className="flex items-center justify-center py-12">
            <div className="flex items-center space-x-2">
              <LoadingSpinner size="sm" />
              <span className="text-muted-foreground">Loading settings...</span>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-2">
          <Settings className="h-6 w-6 text-primary" />
          <div>
            <h1 className="text-2xl font-bold text-foreground">Company Settings</h1>
            <p className="text-muted-foreground">Manage banking details and payment information</p>
          </div>
        </div>
        
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Failed to load company settings. Please try refreshing the page.
          </AlertDescription>
        </Alert>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center space-x-2">
        <Settings className="h-6 w-6 text-primary" />
        <div>
          <h1 className="text-2xl font-bold text-foreground">Company Settings</h1>
          <p className="text-muted-foreground">Manage banking details and payment information</p>
        </div>
      </div>

      {/* Success Message */}
      {updateSettingsMutation.isSuccess && (
        <Alert className="border-green-200 bg-green-50 text-green-800">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertDescription>
            Company settings have been updated successfully. All new invoices will use the updated banking details.
          </AlertDescription>
        </Alert>
      )}

      {/* Error Message */}
      {updateSettingsMutation.isError && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            {updateSettingsMutation.error?.message || 'Failed to update company settings. Please try again.'}
          </AlertDescription>
        </Alert>
      )}

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Settings Form */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <CreditCard className="h-5 w-5 text-primary" />
                <CardTitle>Banking Details</CardTitle>
              </div>
              <CardDescription>
                Configure your company's banking information for invoice payments. 
                These details will be automatically included in all generated invoices.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CompanySettingsForm
                initialData={settings}
                onSubmit={handleUpdateSettings}
                isLoading={updateSettingsMutation.isPending}
              />
            </CardContent>
          </Card>
        </div>

        {/* Information Panel */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Building2 className="h-5 w-5 text-primary" />
                <CardTitle>Important Information</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h4 className="font-medium text-foreground">Automatic Integration</h4>
                <p className="text-sm text-muted-foreground">
                  Banking details are automatically included in all generated invoices and email communications.
                </p>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-medium text-foreground">Security</h4>
                <p className="text-sm text-muted-foreground">
                  Only administrators can view and modify these settings. All changes are logged with timestamps.
                </p>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-medium text-foreground">Validation</h4>
                <p className="text-sm text-muted-foreground">
                  All banking information is validated before saving to ensure accuracy and completeness.
                </p>
              </div>
            </CardContent>
          </Card>

          {settings && (
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Last Updated</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {settings.updated_at 
                    ? new Date(settings.updated_at).toLocaleString()
                    : 'Never updated'
                  }
                </p>
                {settings.updated_by && (
                  <p className="text-xs text-muted-foreground mt-1">
                    Updated by admin user
                  </p>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}