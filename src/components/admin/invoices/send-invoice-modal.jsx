'use client'

import * as React from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Mail, Send, Eye, AlertCircle, CheckCircle } from '@/components/ui/icons'
import { cn } from '@/lib/utils'

export function SendInvoiceModal({ 
  isOpen, 
  onClose, 
  invoice,
  onSendSuccess 
}) {
  const [isLoading, setIsLoading] = React.useState(false)
  const [isSending, setIsSending] = React.useState(false)
  const [message, setMessage] = React.useState('')
  const [emailPreview, setEmailPreview] = React.useState(null)
  const [showPreview, setShowPreview] = React.useState(false)
  const [sendResult, setSendResult] = React.useState(null)

  // Reset state when modal opens/closes
  React.useEffect(() => {
    if (isOpen) {
      setMessage('')
      setEmailPreview(null)
      setShowPreview(false)
      setSendResult(null)
    }
  }, [isOpen])

  const handlePreview = async () => {
    if (!invoice) return

    setIsLoading(true)
    try {
      const response = await fetch(`/api/invoices/${invoice.id}/send?action=preview`)
      const result = await response.json()

      if (result.success) {
        setEmailPreview(result.data.preview)
        setShowPreview(true)
      } else {
        throw new Error(result.error || 'Failed to generate preview')
      }
    } catch (error) {
      console.error('Error generating preview:', error)
      alert('Failed to generate email preview. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSend = async () => {
    if (!invoice) return

    setIsSending(true)
    setSendResult(null)

    try {
      const response = await fetch(`/api/invoices/${invoice.id}/send`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'invoice',
          message: message.trim() || undefined
        }),
      })

      const result = await response.json()

      if (result.success) {
        setSendResult({
          success: true,
          message: 'Invoice email sent successfully!',
          details: result.data
        })
        
        // Call success callback after a short delay
        setTimeout(() => {
          onSendSuccess?.(result.data)
          onClose()
        }, 2000)
      } else {
        setSendResult({
          success: false,
          message: result.error || 'Failed to send email',
          details: result.details
        })
      }
    } catch (error) {
      console.error('Error sending email:', error)
      setSendResult({
        success: false,
        message: 'Failed to send email. Please try again.',
        details: error.message
      })
    } finally {
      setIsSending(false)
    }
  }

  const formatCurrency = (amount) => {
    return `₦${Number(amount).toLocaleString()}`
  }

  if (!invoice) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Mail className="h-5 w-5" />
            <span>Send Invoice Email</span>
          </DialogTitle>
          <DialogDescription>
            Send invoice {invoice.invoice_number} to {invoice.client_name} via email with PDF attachment.
          </DialogDescription>
        </DialogHeader>

        {!showPreview ? (
          <div className="space-y-6">
            {/* Invoice Summary */}
            <div className="bg-muted/50 rounded-lg p-4">
              <h4 className="font-medium mb-3">Invoice Summary</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Invoice Number:</span>
                  <div className="font-mono">{invoice.invoice_number}</div>
                </div>
                <div>
                  <span className="text-muted-foreground">Amount:</span>
                  <div className="font-semibold">{formatCurrency(invoice.total_amount)}</div>
                </div>
                <div>
                  <span className="text-muted-foreground">Client:</span>
                  <div>{invoice.client_name}</div>
                </div>
                <div>
                  <span className="text-muted-foreground">Email:</span>
                  <div>{invoice.client_email}</div>
                </div>
                <div>
                  <span className="text-muted-foreground">Status:</span>
                  <Badge variant={invoice.status === 'PAID' ? 'default' : 'destructive'}>
                    {invoice.status}
                  </Badge>
                </div>
                <div>
                  <span className="text-muted-foreground">Date:</span>
                  <div>{new Date(invoice.created_at).toLocaleDateString()}</div>
                </div>
              </div>
            </div>

            {/* Email Details */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="recipient">Recipient Email</Label>
                <Input
                  id="recipient"
                  type="email"
                  value={invoice.client_email}
                  disabled
                  className="bg-muted"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Personal Message (Optional)</Label>
                <Textarea
                  id="message"
                  placeholder="Add a personal message to include with the invoice email..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={3}
                  className="resize-none"
                />
                <p className="text-xs text-muted-foreground">
                  This message will appear at the top of the email before the invoice details.
                </p>
              </div>
            </div>

            {/* Email Features */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h5 className="font-medium text-blue-900 mb-2">Email will include:</h5>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Professional invoice email template</li>
                <li>• PDF invoice attachment</li>
                <li>• Complete banking details for payment</li>
                <li>• Payment instructions and due date</li>
                <li>• Company branding and contact information</li>
              </ul>
            </div>

            {/* Send Result */}
            {sendResult && (
              <div className={cn(
                "rounded-lg p-4 border",
                sendResult.success 
                  ? "bg-green-50 border-green-200 text-green-800" 
                  : "bg-red-50 border-red-200 text-red-800"
              )}>
                <div className="flex items-center space-x-2">
                  {sendResult.success ? (
                    <CheckCircle className="h-5 w-5" />
                  ) : (
                    <AlertCircle className="h-5 w-5" />
                  )}
                  <span className="font-medium">{sendResult.message}</span>
                </div>
                {sendResult.details && (
                  <p className="text-sm mt-2 opacity-80">
                    {typeof sendResult.details === 'string' 
                      ? sendResult.details 
                      : JSON.stringify(sendResult.details)
                    }
                  </p>
                )}
              </div>
            )}
          </div>
        ) : (
          /* Email Preview */
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-medium">Email Preview</h4>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowPreview(false)}
              >
                Back to Edit
              </Button>
            </div>

            {emailPreview && (
              <div className="border rounded-lg">
                <div className="bg-muted/50 px-4 py-3 border-b">
                  <div className="text-sm space-y-1">
                    <div><strong>To:</strong> {emailPreview.to}</div>
                    <div><strong>Subject:</strong> {emailPreview.subject}</div>
                  </div>
                </div>
                <div className="p-4 max-h-96 overflow-y-auto">
                  <div 
                    className="prose prose-sm max-w-none"
                    dangerouslySetInnerHTML={{ __html: emailPreview.html }}
                  />
                </div>
              </div>
            )}
          </div>
        )}

        <DialogFooter className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {!showPreview && (
              <Button
                variant="outline"
                onClick={handlePreview}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <LoadingSpinner className="h-4 w-4 mr-2" />
                    Loading...
                  </>
                ) : (
                  <>
                    <Eye className="h-4 w-4 mr-2" />
                    Preview
                  </>
                )}
              </Button>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <Button variant="outline" onClick={onClose} disabled={isSending}>
              Cancel
            </Button>
            {!showPreview && (
              <Button
                onClick={handleSend}
                disabled={isSending || sendResult?.success}
              >
                {isSending ? (
                  <>
                    <LoadingSpinner className="h-4 w-4 mr-2" />
                    Sending...
                  </>
                ) : sendResult?.success ? (
                  <>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Sent!
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Send Email
                  </>
                )}
              </Button>
            )}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}