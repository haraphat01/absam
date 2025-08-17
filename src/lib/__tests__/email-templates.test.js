import { generateInvoiceEmailTemplate, generatePaymentReminderTemplate } from '../email-templates'

describe('Email Templates', () => {
  const mockInvoice = {
    invoice_number: 'INV-202412-0001',
    client_name: 'Test Client',
    client_email: 'test@example.com',
    total_amount: 1500.00,
    status: 'UNPAID',
    created_at: '2024-12-01T10:00:00Z',
    items: [
      {
        description: 'Premium Charcoal - 50kg bags',
        quantity: 10,
        price: 100.00,
        total: 1000.00
      },
      {
        description: 'Quality Firewood - 25kg bundles',
        quantity: 20,
        price: 25.00,
        total: 500.00
      }
    ]
  }

  const mockCompanySettings = {
    bank_name: 'Test Bank',
    account_name: 'Absad MultiSynergy Limited',
    account_number: '1234567890',
    swift_code: 'TESTSWIFT',
    currency: 'USD'
  }

  describe('generateInvoiceEmailTemplate', () => {
    it('should include invoice items in HTML template', () => {
      const template = generateInvoiceEmailTemplate(mockInvoice, mockCompanySettings)
      
      // Check that invoice items section exists
      expect(template.html).toContain('Invoice Items')
      expect(template.html).toContain('invoice-items')
      
      // Check that both items are included
      expect(template.html).toContain('Premium Charcoal - 50kg bags')
      expect(template.html).toContain('Quality Firewood - 25kg bundles')
      expect(template.html).toContain('10')
      expect(template.html).toContain('20')
      expect(template.html).toContain('$100.00')
      expect(template.html).toContain('$25.00')
      expect(template.html).toContain('$1,000.00')
      expect(template.html).toContain('$500.00')
      
      // Check that subtotal is included
      expect(template.html).toContain('Subtotal:')
      expect(template.html).toContain('$1,500.00')
    })

    it('should include invoice items in text template', () => {
      const template = generateInvoiceEmailTemplate(mockInvoice, mockCompanySettings)
      
      // Check that invoice items section exists in text version
      expect(template.text).toContain('Invoice Items:')
      expect(template.text).toContain('Premium Charcoal - 50kg bags: 10 × $100.00 = $1,000.00')
      expect(template.text).toContain('Quality Firewood - 25kg bundles: 20 × $25.00 = $500.00')
      expect(template.text).toContain('Subtotal: $1,500.00')
    })

    it('should handle invoice without items', () => {
      const invoiceWithoutItems = {
        ...mockInvoice,
        items: []
      }
      
      const template = generateInvoiceEmailTemplate(invoiceWithoutItems, mockCompanySettings)
      
      expect(template.html).toContain('No items specified')
      expect(template.text).toContain('No items specified')
    })

    it('should handle invoice with null items', () => {
      const invoiceWithNullItems = {
        ...mockInvoice,
        items: null
      }
      
      const template = generateInvoiceEmailTemplate(invoiceWithNullItems, mockCompanySettings)
      
      expect(template.html).toContain('No items specified')
      expect(template.text).toContain('No items specified')
    })
  })

  describe('generatePaymentReminderTemplate', () => {
    it('should include invoice items in HTML template', () => {
      const template = generatePaymentReminderTemplate(mockInvoice, mockCompanySettings)
      
      // Check that invoice items section exists
      expect(template.html).toContain('Invoice Items')
      expect(template.html).toContain('invoice-items')
      
      // Check that both items are included
      expect(template.html).toContain('Premium Charcoal - 50kg bags')
      expect(template.html).toContain('Quality Firewood - 25kg bundles')
      expect(template.html).toContain('10')
      expect(template.html).toContain('20')
      expect(template.html).toContain('$100.00')
      expect(template.html).toContain('$25.00')
      expect(template.html).toContain('$1,000.00')
      expect(template.html).toContain('$500.00')
      
      // Check that subtotal is included
      expect(template.html).toContain('Subtotal:')
      expect(template.html).toContain('$1,500.00')
    })

    it('should include invoice items in text template', () => {
      const template = generatePaymentReminderTemplate(mockInvoice, mockCompanySettings)
      
      // Check that invoice items section exists in text version
      expect(template.text).toContain('Invoice Items:')
      expect(template.text).toContain('Premium Charcoal - 50kg bags: 10 × $100.00 = $1,000.00')
      expect(template.text).toContain('Quality Firewood - 25kg bundles: 20 × $25.00 = $500.00')
      expect(template.text).toContain('Subtotal: $1,500.00')
    })

    it('should handle invoice without items', () => {
      const invoiceWithoutItems = {
        ...mockInvoice,
        items: []
      }
      
      const template = generatePaymentReminderTemplate(invoiceWithoutItems, mockCompanySettings)
      
      expect(template.html).toContain('No items specified')
      expect(template.text).toContain('No items specified')
    })
  })
})
