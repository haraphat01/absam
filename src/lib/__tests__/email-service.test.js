import { EmailService, EMAIL_TYPES, EMAIL_STATUS } from '../email-service'

// Mock Supabase
jest.mock('../supabase', () => ({
  createServerClient: () => ({
    from: jest.fn(() => ({
      insert: jest.fn(() => ({
        select: jest.fn(() => ({
          single: jest.fn(() => ({ data: { id: 'test-log-id' }, error: null }))
        }))
      })),
      update: jest.fn(() => ({
        eq: jest.fn(() => ({
          select: jest.fn(() => ({ data: [{ id: 'test-log-id' }], error: null }))
        }))
      })),
      select: jest.fn(() => ({
        eq: jest.fn(() => ({
          single: jest.fn(() => ({ data: { id: 'test-log-id' }, error: null }))
        })),
        order: jest.fn(() => ({
          limit: jest.fn(() => ({ data: [], error: null }))
        })),
        gte: jest.fn(() => ({
          lte: jest.fn(() => ({ data: [], error: null }))
        }))
      }))
    }))
  })
}))

// Mock Resend
jest.mock('../resend', () => ({
  resend: {
    emails: {
      send: jest.fn(() => Promise.resolve({
        data: { id: 'test-email-id' },
        error: null
      }))
    }
  },
  FROM_EMAIL: 'test@example.com'
}))

describe('EmailService', () => {
  let emailService

  beforeEach(() => {
    emailService = new EmailService()
    jest.clearAllMocks()
  })

  describe('logEmail', () => {
    it('should log email successfully', async () => {
      const emailData = {
        recipientEmail: 'test@example.com',
        emailType: EMAIL_TYPES.GENERAL,
        subject: 'Test Subject',
        status: EMAIL_STATUS.SENT
      }

      const result = await emailService.logEmail(emailData)
      expect(result).toEqual({ id: 'test-log-id' })
    })
  })

  describe('sendEmail', () => {
    it('should send email successfully', async () => {
      const emailData = {
        to: 'test@example.com',
        subject: 'Test Subject',
        html: '<p>Test HTML</p>',
        emailType: EMAIL_TYPES.GENERAL
      }

      const result = await emailService.sendEmail(emailData)
      
      expect(result.success).toBe(true)
      expect(result.emailId).toBe('test-email-id')
      expect(result.emailLogId).toBe('test-log-id')
    })

    it('should handle email sending errors', async () => {
      // Mock Resend to return an error
      const { resend } = require('../resend')
      resend.emails.send.mockResolvedValueOnce({
        data: null,
        error: { message: 'Test error' }
      })

      const emailData = {
        to: 'test@example.com',
        subject: 'Test Subject',
        html: '<p>Test HTML</p>',
        emailType: EMAIL_TYPES.GENERAL
      }

      const result = await emailService.sendEmail(emailData)
      
      expect(result.success).toBe(false)
      expect(result.error).toBe('Test error')
    })
  })

  describe('updateEmailStatus', () => {
    it('should update email status successfully', async () => {
      const result = await emailService.updateEmailStatus(
        'test-email-id',
        EMAIL_STATUS.DELIVERED,
        new Date()
      )

      expect(result).toEqual([{ id: 'test-log-id' }])
    })
  })

  describe('getEmailStats', () => {
    it('should return email statistics', async () => {
      // Mock data for statistics
      emailService.supabase.from().select().gte().lte.mockResolvedValueOnce({
        data: [
          { email_type: EMAIL_TYPES.INVOICE, status: EMAIL_STATUS.SENT },
          { email_type: EMAIL_TYPES.INVOICE, status: EMAIL_STATUS.DELIVERED },
          { email_type: EMAIL_TYPES.GENERAL, status: EMAIL_STATUS.FAILED }
        ],
        error: null
      })

      const stats = await emailService.getEmailStats()
      
      expect(stats.total).toBe(3)
      expect(stats.sent).toBe(1)
      expect(stats.delivered).toBe(1)
      expect(stats.failed).toBe(1)
      expect(stats.byType[EMAIL_TYPES.INVOICE]).toBe(2)
      expect(stats.byType[EMAIL_TYPES.GENERAL]).toBe(1)
    })
  })
})

describe('Email Templates', () => {
  it('should generate contact response template', async () => {
    const { generateContactResponseTemplate } = await import('../email-templates')
    
    const inquiry = {
      name: 'John Doe',
      email: 'john@example.com',
      message: 'Test inquiry message',
      created_at: new Date().toISOString()
    }

    const template = generateContactResponseTemplate(inquiry, 'Thank you for your inquiry.')
    
    expect(template.subject).toContain('Re: Your inquiry')
    expect(template.html).toContain('John Doe')
    expect(template.html).toContain('Thank you for your inquiry.')
    expect(template.text).toContain('John Doe')
  })

  it('should generate welcome email template', async () => {
    const { generateWelcomeEmailTemplate } = await import('../email-templates')
    
    const template = generateWelcomeEmailTemplate('Jane Smith', 'jane@example.com')
    
    expect(template.subject).toContain('Welcome')
    expect(template.html).toContain('Jane Smith')
    expect(template.html).toContain('Absad MultiSynergy')
    expect(template.text).toContain('Jane Smith')
  })
})