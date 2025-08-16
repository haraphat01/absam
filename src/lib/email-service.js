import { resend, FROM_EMAIL } from './resend'
import { createServerClient } from './supabase'
import { 
  generateInvoiceEmailTemplate, 
  generatePaymentReminderTemplate,
  generateContactResponseTemplate,
  generateWelcomeEmailTemplate,
  generateQuoteFollowUpTemplate
} from './email-templates'

// Email types for tracking
export const EMAIL_TYPES = {
  INVOICE: 'invoice',
  REMINDER: 'reminder', 
  OVERDUE: 'overdue',
  CONTACT_RESPONSE: 'contact_response',
  WELCOME: 'welcome',
  QUOTE_FOLLOWUP: 'quote_followup',
  GENERAL: 'general'
}

// Email status types
export const EMAIL_STATUS = {
  SENT: 'sent',
  DELIVERED: 'delivered',
  FAILED: 'failed',
  BOUNCED: 'bounced'
}

/**
 * Enhanced email service with delivery tracking and error logging
 */
export class EmailService {
  constructor() {
    this.supabase = createServerClient()
  }

  /**
   * Log email to database for tracking
   */
  async logEmail({
    invoiceId = null,
    contactInquiryId = null,
    recipientEmail,
    emailType,
    subject,
    status = EMAIL_STATUS.SENT,
    resendEmailId = null,
    errorMessage = null,
    sentBy = null
  }) {
    try {
      const { data, error } = await this.supabase
        .from('email_logs')
        .insert([{
          invoice_id: invoiceId,
          contact_inquiry_id: contactInquiryId,
          recipient_email: recipientEmail,
          email_type: emailType,
          subject,
          status,
          resend_email_id: resendEmailId,
          error_message: errorMessage,
          sent_by: sentBy
        }])
        .select()
        .single()

      if (error) {
        console.error('Failed to log email:', error)
        return null
      }

      return data
    } catch (error) {
      console.error('Email logging error:', error)
      return null
    }
  }

  /**
   * Update email status (for webhook processing)
   */
  async updateEmailStatus(resendEmailId, status, deliveredAt = null, openedAt = null, clickedAt = null) {
    try {
      const updateData = { status }
      
      if (deliveredAt) updateData.delivered_at = deliveredAt
      if (openedAt) updateData.opened_at = openedAt
      if (clickedAt) updateData.clicked_at = clickedAt

      const { data, error } = await this.supabase
        .from('email_logs')
        .update(updateData)
        .eq('resend_email_id', resendEmailId)
        .select()

      if (error) {
        console.error('Failed to update email status:', error)
        return null
      }

      return data
    } catch (error) {
      console.error('Email status update error:', error)
      return null
    }
  }

  /**
   * Send email with automatic logging and error handling
   */
  async sendEmail({
    to,
    subject,
    html,
    text = null,
    attachments = [],
    emailType = EMAIL_TYPES.GENERAL,
    invoiceId = null,
    contactInquiryId = null,
    sentBy = null
  }) {
    let emailLogId = null
    
    try {
      // Pre-log the email attempt
      const emailLog = await this.logEmail({
        invoiceId,
        contactInquiryId,
        recipientEmail: Array.isArray(to) ? to[0] : to,
        emailType,
        subject,
        status: EMAIL_STATUS.SENT,
        sentBy
      })
      
      emailLogId = emailLog?.id

      // Prepare email data
      const emailData = {
        from: FROM_EMAIL,
        to: Array.isArray(to) ? to : [to],
        subject,
        html
      }

      // Add text version if provided
      if (text) {
        emailData.text = text
      }

      // Add attachments if provided
      if (attachments && attachments.length > 0) {
        emailData.attachments = attachments
      }

      // Send email via Resend
      const result = await resend.emails.send(emailData)

      if (result.error) {
        throw new Error(result.error.message || 'Failed to send email')
      }

      // Update log with Resend email ID
      if (emailLogId && result.data?.id) {
        await this.supabase
          .from('email_logs')
          .update({ resend_email_id: result.data.id })
          .eq('id', emailLogId)
      }

      return {
        success: true,
        emailId: result.data?.id,
        emailLogId,
        message: 'Email sent successfully'
      }

    } catch (error) {
      console.error('Email sending error:', error)

      // Update log with error if we have a log ID
      if (emailLogId) {
        await this.supabase
          .from('email_logs')
          .update({ 
            status: EMAIL_STATUS.FAILED,
            error_message: error.message 
          })
          .eq('id', emailLogId)
      } else {
        // Create error log if initial logging failed
        await this.logEmail({
          invoiceId,
          contactInquiryId,
          recipientEmail: Array.isArray(to) ? to[0] : to,
          emailType,
          subject,
          status: EMAIL_STATUS.FAILED,
          errorMessage: error.message,
          sentBy
        })
      }

      return {
        success: false,
        error: error.message,
        emailLogId
      }
    }
  }

  /**
   * Send invoice email with PDF attachment
   */
  async sendInvoiceEmail(invoice, companySettings, pdfBuffer, sentBy = null) {
    const emailTemplate = generateInvoiceEmailTemplate(invoice, companySettings)
    
    const attachments = [{
      filename: `invoice-${invoice.invoice_number}.pdf`,
      content: pdfBuffer,
      type: 'application/pdf'
    }]

    return await this.sendEmail({
      to: invoice.client_email,
      subject: emailTemplate.subject,
      html: emailTemplate.html,
      text: emailTemplate.text,
      attachments,
      emailType: EMAIL_TYPES.INVOICE,
      invoiceId: invoice.id,
      sentBy
    })
  }

  /**
   * Send payment reminder email
   */
  async sendPaymentReminderEmail(invoice, companySettings, sentBy = null) {
    const emailTemplate = generatePaymentReminderTemplate(invoice, companySettings)

    return await this.sendEmail({
      to: invoice.client_email,
      subject: emailTemplate.subject,
      html: emailTemplate.html,
      text: emailTemplate.text,
      emailType: EMAIL_TYPES.REMINDER,
      invoiceId: invoice.id,
      sentBy
    })
  }

  /**
   * Send contact form response
   */
  async sendContactResponse(inquiry, responseMessage, sentBy = null) {
    const emailTemplate = generateContactResponseTemplate(inquiry, responseMessage)

    return await this.sendEmail({
      to: inquiry.email,
      subject: emailTemplate.subject,
      html: emailTemplate.html,
      text: emailTemplate.text,
      emailType: EMAIL_TYPES.CONTACT_RESPONSE,
      contactInquiryId: inquiry.id,
      sentBy
    })
  }

  /**
   * Send welcome email to new customers
   */
  async sendWelcomeEmail(customerName, customerEmail, sentBy = null) {
    const emailTemplate = generateWelcomeEmailTemplate(customerName, customerEmail)

    return await this.sendEmail({
      to: customerEmail,
      subject: emailTemplate.subject,
      html: emailTemplate.html,
      text: emailTemplate.text,
      emailType: EMAIL_TYPES.WELCOME,
      sentBy
    })
  }

  /**
   * Send quote follow-up email
   */
  async sendQuoteFollowUp(customerName, customerEmail, quoteDetails, sentBy = null) {
    const emailTemplate = generateQuoteFollowUpTemplate(customerName, quoteDetails)

    return await this.sendEmail({
      to: customerEmail,
      subject: emailTemplate.subject,
      html: emailTemplate.html,
      text: emailTemplate.text,
      emailType: EMAIL_TYPES.QUOTE_FOLLOWUP,
      sentBy
    })
  }

  /**
   * Get email delivery statistics
   */
  async getEmailStats(dateFrom = null, dateTo = null) {
    try {
      let query = this.supabase
        .from('email_logs')
        .select('email_type, status, sent_at')

      if (dateFrom) {
        query = query.gte('sent_at', dateFrom)
      }
      
      if (dateTo) {
        query = query.lte('sent_at', dateTo)
      }

      const { data, error } = await query

      if (error) {
        throw error
      }

      // Calculate statistics
      const stats = {
        total: data.length,
        sent: data.filter(email => email.status === EMAIL_STATUS.SENT).length,
        delivered: data.filter(email => email.status === EMAIL_STATUS.DELIVERED).length,
        failed: data.filter(email => email.status === EMAIL_STATUS.FAILED).length,
        bounced: data.filter(email => email.status === EMAIL_STATUS.BOUNCED).length,
        byType: {}
      }

      // Group by email type
      Object.values(EMAIL_TYPES).forEach(type => {
        stats.byType[type] = data.filter(email => email.email_type === type).length
      })

      return stats
    } catch (error) {
      console.error('Error getting email stats:', error)
      return null
    }
  }

  /**
   * Get email logs for a specific invoice
   */
  async getInvoiceEmailLogs(invoiceId) {
    try {
      const { data, error } = await this.supabase
        .from('email_logs')
        .select('*')
        .eq('invoice_id', invoiceId)
        .order('sent_at', { ascending: false })

      if (error) {
        throw error
      }

      return data
    } catch (error) {
      console.error('Error getting invoice email logs:', error)
      return []
    }
  }

  /**
   * Get recent email activity
   */
  async getRecentEmailActivity(limit = 50) {
    try {
      const { data, error } = await this.supabase
        .from('email_logs')
        .select(`
          *,
          invoices(invoice_number, client_name),
          contact_inquiries(name)
        `)
        .order('sent_at', { ascending: false })
        .limit(limit)

      if (error) {
        throw error
      }

      return data
    } catch (error) {
      console.error('Error getting recent email activity:', error)
      return []
    }
  }
}

// Export singleton instance
export const emailService = new EmailService()

// Utility functions for backward compatibility
export const sendInvoiceEmail = (invoice, companySettings, pdfBuffer, sentBy) => 
  emailService.sendInvoiceEmail(invoice, companySettings, pdfBuffer, sentBy)

export const sendPaymentReminderEmail = (invoice, companySettings, sentBy) => 
  emailService.sendPaymentReminderEmail(invoice, companySettings, sentBy)

export const sendContactResponse = (inquiry, responseMessage, sentBy) => 
  emailService.sendContactResponse(inquiry, responseMessage, sentBy)

export const getEmailStats = (dateFrom, dateTo) => 
  emailService.getEmailStats(dateFrom, dateTo)

export const getInvoiceEmailLogs = (invoiceId) => 
  emailService.getInvoiceEmailLogs(invoiceId)