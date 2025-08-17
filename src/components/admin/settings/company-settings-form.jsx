'use client'

import * as React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { companySettingsSchema } from '@/lib/validations'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { Save, RotateCcw } from '@/components/ui/icons'

const CURRENCY_OPTIONS = [
  { value: 'USD', label: 'US Dollar (USD)', symbol: '$' },
  { value: 'NGN', label: 'Nigerian Naira (NGN)', symbol: '₦' },
  { value: 'EUR', label: 'Euro (EUR)', symbol: '€' },
  { value: 'GBP', label: 'British Pound (GBP)', symbol: '£' },
]

export function CompanySettingsForm({ initialData, onSubmit, isLoading = false }) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isValid, isDirty }
  } = useForm({
    resolver: zodResolver(companySettingsSchema),
    mode: 'onChange',
    defaultValues: {
      bankName: initialData?.bank_name || '',
      accountName: initialData?.account_name || '',
      accountNumber: initialData?.account_number || '',
      swiftCode: initialData?.swift_code || '',
      currency: initialData?.currency || 'NGN'
    }
  })

  const watchedCurrency = watch('currency')

  // Update form when initialData changes
  React.useEffect(() => {
    if (initialData) {
      reset({
        bankName: initialData.bank_name || '',
        accountName: initialData.account_name || '',
        accountNumber: initialData.account_number || '',
        swiftCode: initialData.swift_code || '',
        currency: initialData.currency || 'NGN'
      })
    }
  }, [initialData, reset])

  const handleFormSubmit = (data) => {
    onSubmit(data)
  }

  const handleReset = () => {
    reset({
      bankName: initialData?.bank_name || '',
      accountName: initialData?.account_name || '',
      accountNumber: initialData?.account_number || '',
      swiftCode: initialData?.swift_code || '',
      currency: initialData?.currency || 'NGN'
    })
  }

  const handleCurrencyChange = (value) => {
    setValue('currency', value, { shouldValidate: true })
  }

  const selectedCurrency = CURRENCY_OPTIONS.find(option => option.value === watchedCurrency)

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        {/* Bank Name */}
        <div className="space-y-2">
          <Label htmlFor="bankName">Bank Name *</Label>
          <Input
            id="bankName"
            placeholder="e.g., First Bank of Nigeria"
            {...register('bankName')}
            className={errors.bankName ? 'border-destructive' : ''}
          />
          {errors.bankName && (
            <p className="text-sm text-destructive">{errors.bankName.message}</p>
          )}
        </div>

        {/* Account Name */}
        <div className="space-y-2">
          <Label htmlFor="accountName">Account Name *</Label>
          <Input
            id="accountName"
            placeholder="e.g., Absad MultiSynergy Limited"
            {...register('accountName')}
            className={errors.accountName ? 'border-destructive' : ''}
          />
          {errors.accountName && (
            <p className="text-sm text-destructive">{errors.accountName.message}</p>
          )}
        </div>

        {/* Account Number */}
        <div className="space-y-2">
          <Label htmlFor="accountNumber">Account Number *</Label>
          <Input
            id="accountNumber"
            placeholder="e.g., 1234567890"
            {...register('accountNumber')}
            className={errors.accountNumber ? 'border-destructive' : ''}
          />
          {errors.accountNumber && (
            <p className="text-sm text-destructive">{errors.accountNumber.message}</p>
          )}
          <p className="text-xs text-muted-foreground">
            Enter the complete account number without spaces or dashes
          </p>
        </div>

        {/* SWIFT Code */}
        <div className="space-y-2">
          <Label htmlFor="swiftCode">SWIFT/BIC Code</Label>
          <Input
            id="swiftCode"
            placeholder="e.g., FBNNNGLA"
            {...register('swiftCode')}
            className={errors.swiftCode ? 'border-destructive' : ''}
          />
          {errors.swiftCode && (
            <p className="text-sm text-destructive">{errors.swiftCode.message}</p>
          )}
          <p className="text-xs text-muted-foreground">
            Optional - Required for international transfers
          </p>
        </div>
      </div>

      {/* Currency */}
      <div className="space-y-2">
        <Label htmlFor="currency">Currency *</Label>
        <Select value={watchedCurrency} onValueChange={handleCurrencyChange}>
          <SelectTrigger className={errors.currency ? 'border-destructive' : ''}>
            <SelectValue placeholder="Select currency" />
          </SelectTrigger>
          <SelectContent>
            {CURRENCY_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                <div className="flex items-center space-x-2">
                  <span className="font-mono text-sm">{option.symbol}</span>
                  <span>{option.label}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.currency && (
          <p className="text-sm text-destructive">{errors.currency.message}</p>
        )}
        {selectedCurrency && (
          <p className="text-xs text-muted-foreground">
            All invoice amounts will be displayed in {selectedCurrency.label}
          </p>
        )}
      </div>

      {/* Form Actions */}
      <div className="flex items-center justify-between pt-6 border-t">
        <div className="text-sm text-muted-foreground">
          * Required fields
        </div>
        
        <div className="flex items-center space-x-3">
          <Button
            type="button"
            variant="outline"
            onClick={handleReset}
            disabled={!isDirty || isLoading}
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset
          </Button>
          
          <Button
            type="submit"
            disabled={!isValid || !isDirty || isLoading}
            className="min-w-[120px]"
          >
            {isLoading ? (
              <>
                <LoadingSpinner size="sm" className="mr-2" />
                Saving...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Save Settings
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Help Text */}
      <div className="bg-muted/50 rounded-lg p-4 space-y-2">
        <h4 className="font-medium text-foreground">Banking Information Usage</h4>
        <ul className="text-sm text-muted-foreground space-y-1">
          <li>• Banking details are automatically included in all generated invoices</li>
          <li>• Payment instructions are added to invoice emails sent to clients</li>
          <li>• Information is securely stored and only accessible to administrators</li>
          <li>• Changes take effect immediately for new invoices</li>
        </ul>
      </div>
    </form>
  )
}