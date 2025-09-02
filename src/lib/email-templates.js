// Email templates for various communication types

// Contact form response template
export const generateContactResponseTemplate = (inquiry, responseMessage) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return {
    subject: `Re: Your inquiry to Absad MultiSynergy Limited`,
    html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Response to Your Inquiry</title>
        <style>
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f8f9fa;
          }
          .container {
            background-color: white;
            border-radius: 8px;
            padding: 30px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          }
          .header {
            text-align: center;
            border-bottom: 3px solid #2563eb;
            padding-bottom: 20px;
            margin-bottom: 30px;
          }
          .company-name {
            font-size: 28px;
            font-weight: bold;
            color: #1f2937;
            margin: 0;
          }
          .company-tagline {
            color: #6b7280;
            margin: 5px 0 0 0;
            font-size: 14px;
          }
          .response-section {
            background-color: #f0f9ff;
            border-left: 4px solid #2563eb;
            padding: 20px;
            margin: 20px 0;
            border-radius: 0 6px 6px 0;
          }
          .original-inquiry {
            background-color: #f8fafc;
            border-radius: 6px;
            padding: 20px;
            margin: 20px 0;
          }
          .inquiry-title {
            font-size: 16px;
            font-weight: bold;
            color: #374151;
            margin: 0 0 10px 0;
          }
          .inquiry-details {
            color: #6b7280;
            font-size: 14px;
            margin-bottom: 15px;
          }
          .inquiry-message {
            background-color: white;
            padding: 15px;
            border-radius: 4px;
            border-left: 3px solid #e5e7eb;
          }
          .footer {
            text-align: center;
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #e5e7eb;
            color: #6b7280;
            font-size: 14px;
          }
          .contact-info {
            margin-top: 15px;
            font-size: 13px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 class="company-name">Absad MultiSynergy Limited</h1>
            <p class="company-tagline">Import & Export Company - Specializing in Charcoal & Firewood</p>
          </div>

          <p>Dear ${inquiry.name},</p>
          
          <p>Thank you for contacting Absad MultiSynergy Limited. We have reviewed your inquiry and are pleased to provide you with the following response:</p>

          <div class="response-section">
            ${responseMessage.replace(/\n/g, '<br>')}
          </div>

          <div class="original-inquiry">
            <div class="inquiry-title">Your Original Inquiry</div>
            <div class="inquiry-details">
              Submitted on ${formatDate(inquiry.created_at)}
            </div>
            <div class="inquiry-message">
              ${inquiry.message.replace(/\n/g, '<br>')}
            </div>
          </div>

          <p>If you have any additional questions or would like to discuss this further, please don't hesitate to contact us.</p>

          <div class="footer">
            <p><strong>Best regards,</strong></p>
            <p><strong>The Absad MultiSynergy Team</strong></p>
            
            <div class="contact-info">
              <p>📧 Email: contact@absadmultisynergy.com</p>
              <p>📞 Phone: +2347018222950</p>
              <p>📍 Address: Jebba, Kwara State, Nigeria</p>
              <p>🌐 Website: www.absadmultisynergy.com</p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `,
    text: `
Dear ${inquiry.name},

Thank you for contacting Absad MultiSynergy Limited. We have reviewed your inquiry and are pleased to provide you with the following response:

${responseMessage}

Your Original Inquiry (submitted on ${formatDate(inquiry.created_at)}):
${inquiry.message}

If you have any additional questions or would like to discuss this further, please don't hesitate to contact us.

Best regards,
The Absad MultiSynergy Team

Contact Information:
Email: contact@absadmultisynergy.com
Phone: +2347018222950
Address: Jebba, Kwara State, Nigeria
Website: www.absadmultisynergy.com
    `
  }
}

// Welcome email template for new customers
export const generateWelcomeEmailTemplate = (customerName, customerEmail) => {
  return {
    subject: `Welcome to Absad MultiSynergy Limited - Your Import/Export Partner`,
    html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome to Absad MultiSynergy</title>
        <style>
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f8f9fa;
          }
          .container {
            background-color: white;
            border-radius: 8px;
            padding: 30px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          }
          .header {
            text-align: center;
            border-bottom: 3px solid #059669;
            padding-bottom: 20px;
            margin-bottom: 30px;
          }
          .welcome-badge {
            background-color: #ecfdf5;
            color: #059669;
            padding: 8px 16px;
            border-radius: 20px;
            font-weight: bold;
            display: inline-block;
            margin-bottom: 15px;
          }
          .company-name {
            font-size: 28px;
            font-weight: bold;
            color: #1f2937;
            margin: 0;
          }
          .company-tagline {
            color: #6b7280;
            margin: 5px 0 0 0;
            font-size: 14px;
          }
          .services-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
            margin: 25px 0;
          }
          .service-card {
            background-color: #f8fafc;
            padding: 20px;
            border-radius: 8px;
            text-align: center;
            border: 1px solid #e5e7eb;
          }
          .service-icon {
            font-size: 24px;
            margin-bottom: 10px;
          }
          .service-title {
            font-weight: bold;
            color: #374151;
            margin-bottom: 5px;
          }
          .service-desc {
            color: #6b7280;
            font-size: 14px;
          }
          .cta-section {
            background-color: #fef3c7;
            border: 1px solid #f59e0b;
            border-radius: 8px;
            padding: 25px;
            text-align: center;
            margin: 25px 0;
          }
          .cta-title {
            color: #92400e;
            font-size: 18px;
            font-weight: bold;
            margin: 0 0 10px 0;
          }
          .cta-text {
            color: #451a03;
            margin-bottom: 15px;
          }
          .footer {
            text-align: center;
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #e5e7eb;
            color: #6b7280;
            font-size: 14px;
          }
          @media (max-width: 600px) {
            .services-grid {
              grid-template-columns: 1fr;
            }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="welcome-badge">🎉 WELCOME</div>
            <h1 class="company-name">Absad MultiSynergy Limited</h1>
            <p class="company-tagline">Import & Export Company - Specializing in Charcoal & Firewood</p>
          </div>

          <p>Dear ${customerName},</p>
          
          <p>Welcome to Absad MultiSynergy Limited! We're thrilled to have you as our valued customer and partner in international trade.</p>

          <p>As a leading import/export company specializing in high-quality charcoal and firewood, we're committed to providing you with exceptional products and services that meet your business needs.</p>

          <div class="services-grid">
            <div class="service-card">
              <div class="service-icon">🔥</div>
              <div class="service-title">Premium Charcoal</div>
              <div class="service-desc">High-quality charcoal for various industrial and commercial applications</div>
            </div>
            <div class="service-card">
              <div class="service-icon">🪵</div>
              <div class="service-title">Quality Firewood</div>
              <div class="service-desc">Sustainably sourced firewood for heating and energy needs</div>
            </div>
            <div class="service-card">
              <div class="service-icon">🚢</div>
              <div class="service-title">Global Shipping</div>
              <div class="service-desc">Reliable international shipping with container tracking</div>
            </div>
            <div class="service-card">
              <div class="service-icon">💼</div>
              <div class="service-title">Business Solutions</div>
              <div class="service-desc">Tailored solutions for your import/export requirements</div>
            </div>
          </div>

          <div class="cta-section">
            <h3 class="cta-title">Ready to Get Started?</h3>
            <p class="cta-text">Contact our team today to discuss your requirements and receive a personalized quote.</p>
            <p><strong>📧 Email:</strong> contact@absadmultisynergy.com</p>
            <p><strong>📞 Phone:</strong> +234 123 456 7890</p>
          </div>

          <p>We look forward to building a successful and long-lasting business relationship with you.</p>

          <div class="footer">
            <p><strong>Welcome aboard!</strong></p>
            <p><strong>The Absad MultiSynergy Team</strong></p>
          </div>
        </div>
      </body>
      </html>
    `,
    text: `
Dear ${customerName},

Welcome to Absad MultiSynergy Limited! We're thrilled to have you as our valued customer and partner in international trade.

As a leading import/export company specializing in high-quality charcoal and firewood, we're committed to providing you with exceptional products and services that meet your business needs.

Our Services:
• Premium Charcoal - High-quality charcoal for various industrial and commercial applications
• Quality Firewood - Sustainably sourced firewood for heating and energy needs  
• Global Shipping - Reliable international shipping with container tracking
• Business Solutions - Tailored solutions for your import/export requirements

Ready to Get Started?
Contact our team today to discuss your requirements and receive a personalized quote.

Email: contact@absadmultisynergy.com
Phone: +2347018222950

We look forward to building a successful and long-lasting business relationship with you.

Welcome aboard!
The Absad MultiSynergy Team
    `
  }
}

// Quote request follow-up template
export const generateQuoteFollowUpTemplate = (customerName, quoteDetails) => {
  return {
    subject: `Follow-up: Your Quote Request - Absad MultiSynergy Limited`,
    html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Quote Follow-up</title>
        <style>
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f8f9fa;
          }
          .container {
            background-color: white;
            border-radius: 8px;
            padding: 30px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          }
          .header {
            text-align: center;
            border-bottom: 3px solid #f59e0b;
            padding-bottom: 20px;
            margin-bottom: 30px;
          }
          .company-name {
            font-size: 24px;
            font-weight: bold;
            color: #1f2937;
            margin: 0;
          }
          .quote-section {
            background-color: #fef3c7;
            border: 1px solid #f59e0b;
            border-radius: 8px;
            padding: 20px;
            margin: 20px 0;
          }
          .quote-title {
            color: #92400e;
            font-size: 18px;
            font-weight: bold;
            margin: 0 0 15px 0;
          }
          .next-steps {
            background-color: #ecfdf5;
            border: 1px solid #10b981;
            border-radius: 8px;
            padding: 20px;
            margin: 20px 0;
          }
          .steps-title {
            color: #065f46;
            font-size: 16px;
            font-weight: bold;
            margin: 0 0 10px 0;
          }
          .steps-list {
            color: #047857;
            margin: 0;
            padding-left: 20px;
          }
          .footer {
            text-align: center;
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #e5e7eb;
            color: #6b7280;
            font-size: 14px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 class="company-name">Absad MultiSynergy Limited</h1>
          </div>

          <p>Dear ${customerName},</p>
          
          <p>Thank you for your interest in our products and services. We wanted to follow up on your recent quote request to ensure we're meeting your needs.</p>

          <div class="quote-section">
            <h3 class="quote-title">📋 Your Quote Request</h3>
            <p>${quoteDetails}</p>
          </div>

          <p>Our team has prepared a competitive quote based on your requirements. If you haven't received it yet, or if you have any questions about the pricing or terms, please don't hesitate to reach out.</p>

          <div class="next-steps">
            <h4 class="steps-title">Next Steps:</h4>
            <ol class="steps-list">
              <li>Review the quote details and terms</li>
              <li>Contact us with any questions or modifications</li>
              <li>Confirm your order to begin processing</li>
              <li>We'll handle all shipping and documentation</li>
            </ol>
          </div>

          <p>We're committed to providing you with the best possible service and competitive pricing. Your business is important to us, and we're here to support your success.</p>

          <div class="footer">
            <p><strong>Ready to move forward?</strong></p>
            <p>Contact us today: contact@absadmultisynergy.com | +234 123 456 7890</p>
            <p><strong>The Absad MultiSynergy Team</strong></p>
          </div>
        </div>
      </body>
      </html>
    `,
    text: `
Dear ${customerName},

Thank you for your interest in our products and services. We wanted to follow up on your recent quote request to ensure we're meeting your needs.

Your Quote Request:
${quoteDetails}

Our team has prepared a competitive quote based on your requirements. If you haven't received it yet, or if you have any questions about the pricing or terms, please don't hesitate to reach out.

Next Steps:
1. Review the quote details and terms
2. Contact us with any questions or modifications  
3. Confirm your order to begin processing
4. We'll handle all shipping and documentation

We're committed to providing you with the best possible service and competitive pricing. Your business is important to us, and we're here to support your success.

Ready to move forward?
Contact us today: contact@absadmultisynergy.com | +234 123 456 7890

The Absad MultiSynergy Team
    `
  }
}

export const generateInvoiceEmailTemplate = (invoice, companySettings) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(amount)
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    })
  }

  const dueDate = new Date(new Date(invoice.created_at).getTime() + 30 * 24 * 60 * 60 * 1000)

  // Ensure each item has a unit and computed total for safety
  const safeItems = Array.isArray(invoice.items) ? invoice.items.map(it => ({
    ...it,
    unit: it.unit || 'tons',
    total: (it.quantity || 0) * (it.price || 0),
  })) : []

  return {
    subject: `Invoice ${invoice.invoice_number} from Absad MultiSynergy Limited`,
    html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Invoice ${invoice.invoice_number}</title>
        <style>
          @media only screen and (max-width:600px) {
            .container { width: 100% !important; }
            /* Keep invoice items as a table on mobile; just reduce padding/size */
            table td { padding: 10px !important; }
            .px-24 { padding-left: 16px !important; padding-right: 16px !important; }
            .align-right { text-align: right !important; }
          }
        </style>
      </head>
      <body style="margin:0; padding:0; background-color:#f4f5f7;">
        <div style="display:none;max-height:0;overflow:hidden;color:transparent;opacity:0;">Invoice ${invoice.invoice_number} from Absad MultiSynergy Limited</div>
        <center style="width:100%; background:#f4f5f7;">
          <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" width="100%" style="max-width:640px; margin:0 auto;" class="container">
            <tr>
              <td style="padding:24px;" class="px-24">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#ffffff; border-radius:10px; overflow:hidden; box-shadow:0 1px 3px rgba(0,0,0,0.06);">
                  <tr>
                    <td style="text-align:center; border-bottom:2px solid #e5e7eb; padding:28px 24px 18px 24px;">
                      <div style="font-family:Segoe UI,Roboto,Helvetica,Arial,sans-serif; font-size:24px; font-weight:700; color:#111827;">Absad MultiSynergy Limited</div>
                      <div style="font-family:Segoe UI,Roboto,Helvetica,Arial,sans-serif; color:#6b7280; font-size:13px; margin-top:6px;">Import & Export • Charcoal & Firewood</div>
                      <div style="font-family:Segoe UI,Roboto,Helvetica,Arial,sans-serif; font-size:20px; color:#0ea5e9; margin-top:14px; letter-spacing:0.3px;">INVOICE</div>
                      <div style="font-family:Segoe UI,Roboto,Helvetica,Arial,sans-serif; font-size:14px; color:#6b7280;">No. ${invoice.invoice_number}</div>
                    </td>
                  </tr>

                  <tr>
                    <td style="padding:22px 24px 6px 24px;" class="px-24">
                      <div style="font-family:Segoe UI,Roboto,Helvetica,Arial,sans-serif; font-size:15px; color:#111827;">Dear ${invoice.client_name},</div>
                      <div style="font-family:Segoe UI,Roboto,Helvetica,Arial,sans-serif; font-size:14px; color:#374151; margin-top:8px;">Please find your invoice below and the PDF attached. Kindly make payment using the banking details provided.</div>
                    </td>
                  </tr>

                  <tr>
                    <td style="padding:18px 24px;" class="px-24">
                      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#f9fafb; border-radius:8px;">
                        <tr class="stack">
                          <td style="padding:12px 16px; font-family:Segoe UI,Roboto,Helvetica,Arial,sans-serif; font-weight:600; color:#374151; width:50%;">Invoice Date</td>
                          <td style="padding:12px 16px; font-family:Segoe UI,Roboto,Helvetica,Arial,sans-serif; color:#374151; width:50%;" class="align-right">${formatDate(invoice.created_at)}</td>
                        </tr>
                        <tr class="stack" style="border-top:1px solid #e5e7eb;">
                          <td style="padding:12px 16px; font-family:Segoe UI,Roboto,Helvetica,Arial,sans-serif; font-weight:600; color:#374151; width:50%;">Due Date</td>
                          <td style="padding:12px 16px; font-family:Segoe UI,Roboto,Helvetica,Arial,sans-serif; color:#374151; width:50%;" class="align-right">${formatDate(dueDate)}</td>
                        </tr>
                        <tr class="stack" style="border-top:1px solid #e5e7eb;">
                          <td style="padding:12px 16px; font-family:Segoe UI,Roboto,Helvetica,Arial,sans-serif; font-weight:600; color:#374151; width:50%;">Status</td>
                          <td style="padding:12px 16px; font-family:Segoe UI,Roboto,Helvetica,Arial,sans-serif; color:#374151; width:50%;" class="align-right">${invoice.status}</td>
                        </tr>
                        <tr class="stack" style="border-top:1px solid #e5e7eb;">
                          <td style="padding:12px 16px; font-family:Segoe UI,Roboto,Helvetica,Arial,sans-serif; font-weight:700; color:#065f46; width:50%;">Total Amount</td>
                          <td style="padding:12px 16px; font-family:Segoe UI,Roboto,Helvetica,Arial,sans-serif; font-weight:700; color:#065f46; width:50%;" class="align-right">${formatCurrency(invoice.total_amount)}</td>
                        </tr>
                      </table>
                    </td>
                  </tr>

                  <tr>
                    <td style="padding:0 24px 20px 24px;" class="px-24">
                      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="border:1px solid #e5e7eb; border-radius:8px; overflow:hidden;">
                        <thead>
                          <tr>
                            <th align="left" style="background:#0ea5e9; color:#ffffff; font-family:Segoe UI,Roboto,Helvetica,Arial,sans-serif; font-size:13px; letter-spacing:0.3px; text-transform:uppercase; padding:12px 12px;">Description</th>
                            <th align="center" style="background:#0ea5e9; color:#ffffff; font-family:Segoe UI,Roboto,Helvetica,Arial,sans-serif; font-size:13px; letter-spacing:0.3px; text-transform:uppercase; padding:12px 12px;">Qty</th>
                            <th align="center" style="background:#0ea5e9; color:#ffffff; font-family:Segoe UI,Roboto,Helvetica,Arial,sans-serif; font-size:13px; letter-spacing:0.3px; text-transform:uppercase; padding:12px 12px;">Unit (tons)</th>
                            <th align="center" style="background:#0ea5e9; color:#ffffff; font-family:Segoe UI,Roboto,Helvetica,Arial,sans-serif; font-size:13px; letter-spacing:0.3px; text-transform:uppercase; padding:12px 12px;">Unit Price</th>
                            <th align="right" style="background:#0ea5e9; color:#ffffff; font-family:Segoe UI,Roboto,Helvetica,Arial,sans-serif; font-size:13px; letter-spacing:0.3px; text-transform:uppercase; padding:12px 12px;">Total</th>
                          </tr>
                        </thead>
                        <tbody>
                          ${safeItems && safeItems.length > 0 ? safeItems.map((item, idx) => `
                          <tr style="background:${idx % 2 === 0 ? '#ffffff' : '#f9fafb'};">
                            <td valign="top" style="padding:12px; font-family:Segoe UI,Roboto,Helvetica,Arial,sans-serif; font-weight:600; color:#111827;">${item.description}</td>
                            <td valign="top" align="center" style="padding:12px; font-family:Segoe UI,Roboto,Helvetica,Arial,sans-serif; color:#374151;">${item.quantity}</td>
                            <td valign="top" align="center" style="padding:12px; font-family:Segoe UI,Roboto,Helvetica,Arial,sans-serif; color:#374151;">${item.unit}</td>
                            <td valign="top" align="center" style="padding:12px; font-family:Segoe UI,Roboto,Helvetica,Arial,sans-serif; color:#065f46;">${formatCurrency(item.price)}</td>
                            <td valign="top" align="right" style="padding:12px; font-family:Segoe UI,Roboto,Helvetica,Arial,sans-serif; font-weight:700; color:#111827;">${formatCurrency(item.total)}</td>
                          </tr>`).join('') : `
                          <tr>
                            <td colspan="5" align="center" style="padding:16px; font-family:Segoe UI,Tahoma,Geneva,Verdana,sans-serif; color:#6b7280; font-style:italic;">No items specified</td>
                          </tr>`}
                        </tbody>
                        <tfoot>
                          <tr style="border-top:2px solid #e5e7eb;">
                            <td colspan="4" align="right" style="padding:12px; font-family:Segoe UI,Roboto,Helvetica,Arial,sans-serif; font-weight:700; color:#374151;">Subtotal</td>
                            <td align="right" style="padding:12px; font-family:Segoe UI,Roboto,Helvetica,Arial,sans-serif; font-weight:700; color:#065f46;">${formatCurrency(invoice.total_amount)}</td>
                          </tr>
                        </tfoot>
                      </table>
                    </td>
                  </tr>

                  ${companySettings ? `
                  <tr>
                    <td style="padding:0 24px 20px 24px;" class="px-24">
                      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#fff7ed; border:1px solid #fde68a; border-radius:8px;">
                        <tr>
                          <td colspan="2" style="padding:14px 16px; font-family:Segoe UI,Roboto,Helvetica,Arial,sans-serif; font-weight:700; color:#92400e;">Payment Information</td>
                        </tr>
                        <tr class="stack">
                          <td style="padding:8px 16px; font-family:Segoe UI,Roboto,Helvetica,Arial,sans-serif; font-weight:600; color:#92400e; width:40%;">Bank Name</td>
                          <td style="padding:8px 16px; font-family:Segoe UI,Roboto,Helvetica,Arial,sans-serif; color:#451a03; width:60%;">${companySettings.bank_name}</td>
                        </tr>
                        <tr class="stack" style="border-top:1px solid #fde68a;">
                          <td style="padding:8px 16px; font-family:Segoe UI,Roboto,Helvetica,Arial,sans-serif; font-weight:600; color:#92400e; width:40%;">Account Name</td>
                          <td style="padding:8px 16px; font-family:Segoe UI,Roboto,Helvetica,Arial,sans-serif; color:#451a03; width:60%;">${companySettings.account_name}</td>
                        </tr>
                        <tr class="stack" style="border-top:1px solid #fde68a;">
                          <td style="padding:8px 16px; font-family:Segoe UI,Roboto,Helvetica,Arial,sans-serif; font-weight:600; color:#92400e; width:40%;">Account Number</td>
                          <td style="padding:8px 16px; font-family:Segoe UI,Roboto,Helvetica,Arial,sans-serif; color:#451a03; width:60%;">${companySettings.account_number}</td>
                        </tr>
                        ${companySettings.swift_code ? `
                        <tr class="stack" style="border-top:1px solid #fde68a;">
                          <td style="padding:8px 16px; font-family:Segoe UI,Roboto,Helvetica,Arial,sans-serif; font-weight:600; color:#92400e; width:40%;">SWIFT Code</td>
                          <td style="padding:8px 16px; font-family:Segoe UI,Roboto,Helvetica,Arial,sans-serif; color:#451a03; width:60%;">${companySettings.swift_code}</td>
                        </tr>` : ''}
                        <tr class="stack" style="border-top:1px solid #fde68a;">
                          <td style="padding:8px 16px; font-family:Segoe UI,Roboto,Helvetica,Arial,sans-serif; font-weight:600; color:#92400e; width:40%;">Currency</td>
                          <td style="padding:8px 16px; font-family:Segoe UI,Roboto,Helvetica,Arial,sans-serif; color:#451a03; width:60%;">${companySettings.currency}</td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  ` : ''}

                  <tr>
                    <td style="padding:0 24px 24px 24px;" class="px-24">
                      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#f0fdf4; border:1px solid #bbf7d0; border-radius:8px;">
                        <tr>
                          <td style="padding:14px 16px; font-family:Segoe UI,Roboto,Helvetica,Arial,sans-serif; color:#065f46; font-weight:700;">Payment Instructions</td>
                        </tr>
                        <tr>
                          <td style="padding:0 16px 14px 16px; font-family:Segoe UI,Roboto,Helvetica,Arial,sans-serif; color:#065f46; font-size:14px;">
                            • Please make payment within 30 days of the invoice date.<br/>
                            • Include the invoice number (${invoice.invoice_number}) as the payment reference.<br/>
                            • Send payment confirmation to this email address.<br/>
                            • Contact us if you have any questions about this invoice.
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>

                  <tr>
                    <td style="padding:0 24px 24px 24px; text-align:center; font-family:Segoe UI,Roboto,Helvetica,Arial,sans-serif; color:#6b7280; font-size:13px;" class="px-24">
                      <div style="font-size:14px; color:#111827;"><strong>Thank you for your business.</strong></div>
                      <div style="margin-top:4px;">We appreciate your prompt payment.</div>
                      <div style="margin-top:12px;">
                        Questions? Email <span style="color:#0ea5e9;">contact@absadmultisynergy.com</span><br/>
                        This is an automated email; please do not reply.
                      </div>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </center>
      </body>
      </html>
    `,
    text: `
Invoice ${invoice.invoice_number} from Absad MultiSynergy Limited

Dear ${invoice.client_name},

Hey, ${companySettings?.account_name || 'Absad MultiSynergy Limited'} sent you an invoice. Kindly find it attached and make payment with the banking info attached.

Invoice Details:
- Invoice Number: ${invoice.invoice_number}
- Invoice Date: ${formatDate(invoice.created_at)}
- Due Date: ${formatDate(dueDate)}
- Status: ${invoice.status}
- Total Amount: ${formatCurrency(invoice.total_amount)}

Invoice Items:
${invoice.items && invoice.items.length > 0 ? invoice.items.map(item => `- ${item.description}: ${item.quantity} ${item.unit || 'tons'} × ${formatCurrency(item.price)} = ${formatCurrency((item.quantity || 0) * (item.price || 0))}`).join('\n') : '- No items specified'}

Subtotal: ${formatCurrency(invoice.total_amount)}

${companySettings ? `
Payment Information:
- Bank Name: ${companySettings.bank_name}
- Account Name: ${companySettings.account_name}
- Account Number: ${companySettings.account_number}
${companySettings.swift_code ? `- SWIFT Code: ${companySettings.swift_code}` : ''}
- Currency: ${companySettings.currency}
` : ''}

Payment Instructions:
• Please make payment within 30 days of the invoice date
• Include the invoice number (${invoice.invoice_number}) as payment reference
• Send payment confirmation to this email address
• Contact us immediately if you have any questions about this invoice

Thank you for choosing Absad MultiSynergy Limited!
We appreciate your business and look forward to serving you again.

For questions about this invoice, please contact us:
Email: invoices@absadmultisynergy.com

This is an automated email. Please do not reply directly to this message.
    `
  }
}

export const generatePaymentReminderTemplate = (invoice, companySettings) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(amount)
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    })
  }

  const dueDate = new Date(new Date(invoice.created_at).getTime() + 30 * 24 * 60 * 60 * 1000)
  const isOverdue = new Date() > dueDate

  return {
    subject: `${isOverdue ? 'Overdue' : 'Reminder'}: Invoice ${invoice.invoice_number} - Payment Required`,
    html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Payment ${isOverdue ? 'Overdue' : 'Reminder'}</title>
        <style>
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f8f9fa;
          }
          .container {
            background-color: white;
            border-radius: 8px;
            padding: 30px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          }
          .header {
            text-align: center;
            border-bottom: 3px solid ${isOverdue ? '#dc2626' : '#f59e0b'};
            padding-bottom: 20px;
            margin-bottom: 30px;
          }
          .reminder-badge {
            background-color: ${isOverdue ? '#fef2f2' : '#fef3c7'};
            color: ${isOverdue ? '#dc2626' : '#d97706'};
            padding: 8px 16px;
            border-radius: 20px;
            font-weight: bold;
            display: inline-block;
            margin-bottom: 15px;
          }
          .company-name {
            font-size: 24px;
            font-weight: bold;
            color: #1f2937;
            margin: 10px 0 5px 0;
          }
          .urgent-notice {
            background-color: ${isOverdue ? '#fef2f2' : '#fef3c7'};
            border: 2px solid ${isOverdue ? '#dc2626' : '#f59e0b'};
            border-radius: 6px;
            padding: 20px;
            margin: 20px 0;
            text-align: center;
          }
          .urgent-title {
            color: ${isOverdue ? '#dc2626' : '#d97706'};
            font-size: 20px;
            font-weight: bold;
            margin: 0 0 10px 0;
          }
          .urgent-text {
            color: ${isOverdue ? '#991b1b' : '#92400e'};
            font-size: 16px;
            margin: 0;
          }
          .invoice-details {
            background-color: #f8fafc;
            border-radius: 6px;
            padding: 20px;
            margin: 20px 0;
          }
          .detail-row {
            display: flex;
            justify-content: space-between;
            margin-bottom: 10px;
            padding: 5px 0;
          }
          .detail-label {
            font-weight: 600;
            color: #374151;
          }
          .detail-value {
            color: #6b7280;
          }
          .total-amount {
            font-size: 20px;
            font-weight: bold;
            color: ${isOverdue ? '#dc2626' : '#059669'};
            border-top: 2px solid #e5e7eb;
            padding-top: 10px;
            margin-top: 10px;
          }
          .invoice-items {
            background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
            border: 1px solid #e5e7eb;
            border-radius: 12px;
            padding: 25px;
            margin: 25px 0;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
          }
          .items-title {
            font-size: 20px;
            font-weight: 700;
            color: #1f2937;
            margin: 0 0 20px 0;
            border-bottom: 3px solid ${isOverdue ? '#dc2626' : '#2563eb'};
            padding-bottom: 12px;
            display: flex;
            align-items: center;
            gap: 8px;
          }
          .items-title::before {
            content: "📋";
            font-size: 18px;
          }
          .items-table {
            border: 1px solid #e5e7eb;
            border-radius: 8px;
            overflow: hidden;
            background: white;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          }
          .items-header {
            background: linear-gradient(135deg, ${isOverdue ? '#dc2626' : '#2563eb'} 0%, ${isOverdue ? '#b91c1c' : '#1d4ed8'} 100%);
            color: white;
            display: grid;
            grid-template-columns: 2fr 1fr 1fr 1fr 1fr;
            gap: 15px;
            padding: 15px 20px;
            font-weight: 600;
            font-size: 14px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }
          .item-row {
            display: grid;
            grid-template-columns: 2fr 1fr 1fr 1fr 1fr;
            gap: 15px;
            padding: 16px 20px;
            border-bottom: 1px solid #f3f4f6;
            align-items: center;
            transition: background-color 0.2s ease;
          }
          .item-row:nth-child(even) {
            background-color: #f9fafb;
          }
          .item-row:last-child {
            border-bottom: none;
          }
          .item-row:hover {
            background-color: #f3f4f6;
          }
          .item-description {
            font-weight: 600;
            color: #1f2937;
            line-height: 1.4;
          }
          .item-quantity {
            text-align: center;
            font-weight: 500;
            color: #374151;
            background: #f3f4f6;
            padding: 4px 8px;
            border-radius: 4px;
            font-size: 14px;
          }
          .item-price {
            text-align: center;
            font-weight: 500;
            color: #059669;
            font-size: 14px;
          }
          .item-total {
            text-align: right;
            font-weight: 700;
            color: #1f2937;
            font-size: 15px;
          }
          .items-summary {
            background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
            border-top: 2px solid #e5e7eb;
            padding: 20px;
            margin-top: 0;
          }
          .items-subtotal {
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-weight: 700;
            color: #1f2937;
            font-size: 18px;
            padding: 8px 0;
          }
          .subtotal-label {
            color: #6b7280;
            font-weight: 600;
          }
          .subtotal-amount {
            color: ${isOverdue ? '#dc2626' : '#059669'};
            font-weight: 700;
            font-size: 20px;
          }
          .banking-section {
            background-color: #fef3c7;
            border: 1px solid #f59e0b;
            border-radius: 6px;
            padding: 20px;
            margin: 25px 0;
          }
          .banking-title {
            font-size: 18px;
            font-weight: bold;
            color: #92400e;
            margin: 0 0 15px 0;
          }
          .banking-details {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 10px;
          }
          .banking-item {
            margin-bottom: 8px;
          }
          .banking-label {
            font-weight: 600;
            color: #92400e;
            font-size: 14px;
          }
          .banking-value {
            color: #451a03;
            font-size: 14px;
            margin-top: 2px;
          }
          .footer {
            text-align: center;
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #e5e7eb;
            color: #6b7280;
            font-size: 14px;
          }
          @media (max-width: 600px) {
            .banking-details {
              grid-template-columns: 1fr;
            }
            .detail-row {
              flex-direction: column;
            }
            .detail-label {
              margin-bottom: 5px;
            }
            .items-table {
              border-radius: 0;
            }
            .items-header { display: none; }
            .item-row { display: flex; flex-direction: column; gap: 8px; padding: 15px; border-bottom: 2px solid #e5e7eb; }
            .item-row:last-child {
              border-bottom: none;
            }
            .item-description {
              font-weight: 700;
              color: #1f2937;
              font-size: 16px;
              border-bottom: 1px solid #e5e7eb;
              padding-bottom: 8px;
            }
            .item-quantity {
              display: inline-block;
              background: ${isOverdue ? '#dc2626' : '#2563eb'};
              color: white;
              padding: 4px 12px;
              border-radius: 20px;
              font-size: 12px;
              font-weight: 600;
              text-align: center;
              width: fit-content;
            }
            .item-price { color: #059669; font-weight: 600; font-size: 14px; }
            .item-total {
              font-weight: 700;
              color: #1f2937;
              font-size: 16px;
              border-top: 1px solid #e5e7eb;
              padding-top: 8px;
            }
            .items-summary {
              margin-top: 15px;
            }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="reminder-badge">${isOverdue ? '⚠️ OVERDUE PAYMENT' : '📅 PAYMENT REMINDER'}</div>
            <h1 class="company-name">Absad MultiSynergy Limited</h1>
          </div>

          <div class="urgent-notice">
            <h2 class="urgent-title">${isOverdue ? 'Payment Overdue' : 'Payment Reminder'}</h2>
            <p class="urgent-text">
              ${isOverdue 
                ? `Your payment for invoice ${invoice.invoice_number} is now overdue. Please settle this amount immediately to avoid any service disruption.`
                : `This is a friendly reminder that payment for invoice ${invoice.invoice_number} is due soon.`
              }
            </p>
          </div>

          <p>Dear ${invoice.client_name},</p>
          <p>
            ${isOverdue 
              ? 'We notice that the payment for the invoice below is now past due. Please arrange payment as soon as possible.'
              : 'We hope this message finds you well. This is a reminder about the upcoming payment due date for your invoice.'
            }
          </p>

          <div class="invoice-details">
            <div class="detail-row">
              <span class="detail-label">Invoice Number:</span>
              <span class="detail-value">${invoice.invoice_number}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Invoice Date:</span>
              <span class="detail-value">${formatDate(invoice.created_at)}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Due Date:</span>
              <span class="detail-value">${formatDate(dueDate)}</span>
            </div>
            <div class="detail-row total-amount">
              <span class="detail-label">Amount Due:</span>
              <span class="detail-value">${formatCurrency(invoice.total_amount)}</span>
            </div>
          </div>

          <div class="invoice-items">
            <h3 class="items-title">Invoice Items</h3>
            ${invoice.items && invoice.items.length > 0 ? `
              <div class="items-table">
                <div class="items-header">
                  <div>Description</div>
                  <div>Quantity</div>
                  <div>Unit (tons)</div>
                  <div>Unit Price</div>
                  <div>Total</div>
                </div>
                ${invoice.items.map(item => `
                  <div class="item-row">
                    <div class="item-description">${item.description}</div>
                    <div class="item-quantity">${item.quantity}</div>
                    <div class="item-unit">${item.unit || 'tons'}</div>
                    <div class="item-price">${formatCurrency(item.price)}</div>
                    <div class="item-total">${formatCurrency((item.quantity || 0) * (item.price || 0))}</div>
                  </div>
                `).join('')}
              </div>
              <div class="items-summary">
                <div class="items-subtotal">
                  <span class="subtotal-label">Subtotal:</span>
                  <span class="subtotal-amount">${formatCurrency(invoice.total_amount)}</span>
                </div>
              </div>
            ` : '<p style="color: #6b7280; font-style: italic; text-align: center; padding: 20px;">No items specified</p>'}
          </div>

          ${companySettings ? `
          <div class="banking-section">
            <h3 class="banking-title">💳 Payment Information</h3>
            <div class="banking-details">
              <div class="banking-item">
                <div class="banking-label">Bank Name</div>
                <div class="banking-value">${companySettings.bank_name}</div>
              </div>
              <div class="banking-item">
                <div class="banking-label">Account Name</div>
                <div class="banking-value">${companySettings.account_name}</div>
              </div>
              <div class="banking-item">
                <div class="banking-label">Account Number</div>
                <div class="banking-value">${companySettings.account_number}</div>
              </div>
              ${companySettings.swift_code ? `
              <div class="banking-item">
                <div class="banking-label">SWIFT Code</div>
                <div class="banking-value">${companySettings.swift_code}</div>
              </div>
              ` : ''}
              <div class="banking-item">
                <div class="banking-label">Currency</div>
                <div class="banking-value">${companySettings.currency}</div>
              </div>
            </div>
          </div>
          ` : ''}

          <p>
            Please include the invoice number <strong>${invoice.invoice_number}</strong> as your payment reference 
            and send confirmation once payment has been made.
          </p>

          <p>
            If you have already made this payment, please disregard this message. 
            If you have any questions or concerns, please don't hesitate to contact us.
          </p>

          <div class="footer">
            <p><strong>Thank you for your prompt attention to this matter.</strong></p>
            <p>Absad MultiSynergy Limited</p>
            <p>Email: invoices@absadmultisynergy.com</p>
          </div>
        </div>
      </body>
      </html>
    `,
    text: `
${isOverdue ? 'OVERDUE PAYMENT' : 'PAYMENT REMINDER'} - Invoice ${invoice.invoice_number}

Dear ${invoice.client_name},

${isOverdue 
  ? `Your payment for invoice ${invoice.invoice_number} is now overdue. Please settle this amount immediately to avoid any service disruption.`
  : `This is a friendly reminder that payment for invoice ${invoice.invoice_number} is due soon.`
}

Invoice Details:
- Invoice Number: ${invoice.invoice_number}
- Invoice Date: ${formatDate(invoice.created_at)}
- Due Date: ${formatDate(dueDate)}
- Amount Due: ${formatCurrency(invoice.total_amount)}

Invoice Items:
${invoice.items && invoice.items.length > 0 ? invoice.items.map(item => `- ${item.description}: ${item.quantity} ${item.unit || 'tons'} × ${formatCurrency(item.price)} = ${formatCurrency((item.quantity || 0) * (item.price || 0))}`).join('\n') : '- No items specified'}

Subtotal: ${formatCurrency(invoice.total_amount)}

${companySettings ? `
Payment Information:
- Bank Name: ${companySettings.bank_name}
- Account Name: ${companySettings.account_name}
- Account Number: ${companySettings.account_number}
${companySettings.swift_code ? `- SWIFT Code: ${companySettings.swift_code}` : ''}
- Currency: ${companySettings.currency}
` : ''}

Please include the invoice number ${invoice.invoice_number} as your payment reference and send confirmation once payment has been made.

If you have already made this payment, please disregard this message. If you have any questions or concerns, please don't hesitate to contact us.

Thank you for your prompt attention to this matter.

Absad MultiSynergy Limited
Email: invoices@absadmultisynergy.com
    `
  }
}