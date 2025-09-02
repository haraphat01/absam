'use client'

import * as React from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { Plus, Trash2, Calculator, DollarSign } from '@/components/ui/icons'
import { cn } from '@/lib/utils'

const invoiceItemSchema = z.object({
  description: z.string().min(1, 'Description is required'),
  quantity: z.preprocess((v) => (v === '' || v == null ? NaN : Number(v)), z.number().min(1, 'Quantity must be at least 1')),
  unit: z.preprocess((v) => (v === '' || v == null ? NaN : Number(v)), z.number().min(0, 'Unit (tons) must be >= 0')),
  price: z.preprocess((v) => (v === '' || v == null ? NaN : Number(v)), z.number().min(0, 'Price must be positive')),
})

const invoiceFormSchema = z.object({
  clientName: z.string().min(2, 'Client name must be at least 2 characters'),
  clientEmail: z.string().email('Please enter a valid email address'),
  items: z.array(invoiceItemSchema).min(1, 'At least one item is required'),
  status: z.enum(['PAID', 'UNPAID']).default('UNPAID'),
})

export function InvoiceForm({ 
  initialData, 
  onSubmit, 
  onCancel, 
  isLoading = false,
  companySettings 
}) {
  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: zodResolver(invoiceFormSchema),
    defaultValues: initialData || {
      clientName: '',
      clientEmail: '',
      items: [{ description: '', quantity: 1, unit: 0, price: 0 }],
      status: 'UNPAID'
    }
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items'
  })

  const watchedItems = watch('items')
  
  // Calculate totals (Unit (tons) * Price)
  const subtotal = watchedItems?.reduce((sum, item) => {
    const unit = Number(item.unit) || 0
    const price = Number(item.price) || 0
    return sum + (unit * price)
  }, 0) || 0

  const total = subtotal // No VAT

  const addItem = () => {
    append({ description: '', quantity: 1, unit: 0, price: 0 })
  }

  const removeItem = (index) => {
    if (fields.length > 1) {
      remove(index)
    }
  }

  const handleFormSubmit = (data) => {
    const formattedData = {
      ...data,
      items: data.items.map(item => ({
        ...item,
        quantity: Number(item.quantity),
        unit: Number(item.unit) || 0,
        price: Number(item.price),
        total: (Number(item.unit) || 0) * Number(item.price)
      })),
      subtotal,
      totalAmount: total
    }
    onSubmit(formattedData)
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      {/* Client Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <DollarSign className="h-5 w-5" />
            <span>Client Information</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="clientName">Client Name</Label>
              <Input
                id="clientName"
                {...register('clientName')}
                placeholder="Enter client name"
                className={cn(errors.clientName && 'border-destructive')}
              />
              {errors.clientName && (
                <p className="text-sm text-destructive">{errors.clientName.message}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="clientEmail">Client Email</Label>
              <Input
                id="clientEmail"
                type="email"
                {...register('clientEmail')}
                placeholder="Enter client email"
                className={cn(errors.clientEmail && 'border-destructive')}
              />
              {errors.clientEmail && (
                <p className="text-sm text-destructive">{errors.clientEmail.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Invoice Status</Label>
            <select
              id="status"
              {...register('status')}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <option value="UNPAID">Unpaid</option>
              <option value="PAID">Paid</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Invoice Items */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <Calculator className="h-5 w-5" />
              <span>Invoice Items</span>
            </CardTitle>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addItem}
              className="hover:bg-primary hover:text-primary-foreground"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Item
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {fields.map((field, index) => (
            <div key={field.id} className="space-y-4 p-4 border rounded-lg bg-muted/20">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">Item {index + 1}</h4>
                {fields.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeItem(index)}
                    className="text-destructive hover:text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                <div className="md:col-span-6 space-y-2">
                  <Label htmlFor={`items.${index}.description`}>Description</Label>
                  <Input
                    {...register(`items.${index}.description`)}
                    placeholder="Item description"
                    className={cn(errors.items?.[index]?.description && 'border-destructive')}
                  />
                  {errors.items?.[index]?.description && (
                    <p className="text-sm text-destructive">
                      {errors.items[index].description.message}
                    </p>
                  )}
                </div>
                
                <div className="md:col-span-2 space-y-2">
                  <Label htmlFor={`items.${index}.quantity`}>Quantity</Label>
                  <Input
                    type="number"
                    min="1"
                    step="1"
                    {...register(`items.${index}.quantity`, { valueAsNumber: true })}
                    className={cn(errors.items?.[index]?.quantity && 'border-destructive')}
                  />
                  {errors.items?.[index]?.quantity && (
                    <p className="text-sm text-destructive">
                      {errors.items[index].quantity.message}
                    </p>
                  )}
                </div>
                
                <div className="md:col-span-2 space-y-2">
                  <Label htmlFor={`items.${index}.unit`}>Unit (tons)</Label>
                  <Input
                    type="number"
                    min="0"
                    step="0.01"
                    {...register(`items.${index}.unit`, { valueAsNumber: true })}
                    className={cn(errors.items?.[index]?.unit && 'border-destructive')}
                  />
                  {errors.items?.[index]?.unit && (
                    <p className="text-sm text-destructive">
                      {errors.items[index].unit.message}
                    </p>
                  )}
                </div>
                
                <div className="md:col-span-2 space-y-2">
                  <Label htmlFor={`items.${index}.price`}>Price ($)</Label>
                  <Input
                    type="number"
                    min="0"
                    step="0.01"
                    {...register(`items.${index}.price`, { valueAsNumber: true })}
                    className={cn(errors.items?.[index]?.price && 'border-destructive')}
                  />
                  {errors.items?.[index]?.price && (
                    <p className="text-sm text-destructive">
                      {errors.items[index].price.message}
                    </p>
                  )}
                </div>
                
                <div className="md:col-span-2 space-y-2">
                  <Label>Total</Label>
                  <div className="h-10 px-3 py-2 bg-muted rounded-md flex items-center text-sm font-medium">
                    ${((watchedItems?.[index]?.unit || 0) * (watchedItems?.[index]?.price || 0)).toLocaleString()}
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {errors.items && (
            <p className="text-sm text-destructive">{errors.items.message}</p>
          )}
        </CardContent>
      </Card>

      {/* Invoice Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Invoice Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-lg font-semibold">
              <span>Total:</span>
              <span>${total.toLocaleString()}</span>
            </div>
          </div>

          {/* Banking Details Preview */}
          {companySettings && (
            <div className="mt-6 p-4 bg-muted/50 rounded-lg">
              <h4 className="font-medium mb-2">Banking Details (will be included in invoice)</h4>
              <div className="text-sm space-y-1">
                <p><strong>Bank:</strong> {companySettings.bank_name}</p>
                <p><strong>Account Name:</strong> {companySettings.account_name}</p>
                <p><strong>Account Number:</strong> {companySettings.account_number}</p>
                {companySettings.swift_code && (
                  <p><strong>SWIFT Code:</strong> {companySettings.swift_code}</p>
                )}
                <p><strong>Currency:</strong> {companySettings.currency}</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Form Actions */}
      <div className="flex items-center justify-end space-x-4">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isSubmitting || isLoading}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isSubmitting || isLoading}
          className="min-w-[120px]"
        >
          {(isSubmitting || isLoading) ? (
            <>
              <LoadingSpinner className="mr-2 h-4 w-4" />
              {initialData ? 'Updating...' : 'Creating...'}
            </>
          ) : (
            initialData ? 'Update Invoice' : 'Create Invoice'
          )}
        </Button>
      </div>
    </form>
  )
}