import { NextResponse } from 'next/server'
import { contactFormSchema } from '@/lib/validations'
import { createServerClient } from '@/lib/supabase'
import { emailService, EMAIL_TYPES } from '@/lib/email-service'
import { withRateLimit, sanitize } from '@/lib/security'

async function handlePOST(request) {
  try {
    const body = await request.json()
    
    // Additional security: Sanitize the entire request body
    const sanitizedBody = sanitize.object(body)
    
    // Validate the request body
    const validationResult = contactFormSchema.safeParse(sanitizedBody)
    if (!validationResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'VALIDATION_ERROR',
            message: 'Please check your input and try again.',
            details: validationResult.error.flatten().fieldErrors
          }
        },
        { status: 400 }
      )
    }

    const { name, email, message } = validationResult.data

    // Additional security checks
    if (message.length > 1000) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'MESSAGE_TOO_LONG',
            message: 'Message is too long. Please keep it under 1000 characters.'
          }
        },
        { status: 400 }
      )
    }

    // Store contact inquiry in database
    let inquiry = null
    try {
      const supabase = createServerClient()
      const { data, error: dbError } = await supabase
        .from('contact_inquiries')
        .insert([
          {
            name,
            email,
            message,
            is_responded: false
          }
        ])
        .select()
        .single()

      if (dbError) {
        console.error('Database error:', dbError)
        // Continue without database for now - just log the inquiry
        console.log('Contact form submission (DB unavailable):', {
          name,
          email,
          message,
          timestamp: new Date().toISOString()
        })
        inquiry = {
          id: 'temp-' + Date.now(),
          created_at: new Date().toISOString()
        }
      } else {
        inquiry = data
      }
    } catch (dbError) {
      console.error('Database connection error:', dbError)
      // Continue without database - just log the inquiry
      console.log('Contact form submission (DB unavailable):', {
        name,
        email,
        message,
        timestamp: new Date().toISOString()
      })
      inquiry = {
        id: 'temp-' + Date.now(),
        created_at: new Date().toISOString()
      }
    }

    // Send email notifications using enhanced email service
    try {
      // Send notification to company
      await emailService.sendEmail({
        to: 'contact@absadmultisynergy.com',
        subject: `New Contact Inquiry from ${name}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #2563eb; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px;">
              New Contact Inquiry
            </h2>
            
            <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="margin-top: 0; color: #374151;">Contact Details</h3>
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
            </div>
            
            <div style="margin: 20px 0;">
              <h3 style="color: #374151;">Message</h3>
              <div style="background-color: #ffffff; padding: 15px; border-left: 4px solid #2563eb; border-radius: 4px;">
                ${message.replace(/\n/g, '<br>')}
              </div>
            </div>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 14px;">
              <p>This inquiry was submitted through the Absad MultiSynergy website contact form.</p>
              <p>Please respond to the customer at: <a href="mailto:${email}" style="color: #2563eb;">${email}</a></p>
            </div>
          </div>
        `,
        emailType: EMAIL_TYPES.GENERAL,
        contactInquiryId: inquiry.id
      })

      // Send confirmation email to the customer
      await emailService.sendEmail({
        to: email,
        subject: 'Thank you for contacting Absad MultiSynergy Limited',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #2563eb; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px;">
              Thank You for Your Inquiry
            </h2>
            
            <p>Dear ${name},</p>
            
            <p>Thank you for contacting Absad MultiSynergy Limited. We have received your inquiry and will respond within 24 hours.</p>
            
            <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="margin-top: 0; color: #374151;">Your Message</h3>
              <div style="background-color: #ffffff; padding: 15px; border-left: 4px solid #2563eb; border-radius: 4px;">
                ${message.replace(/\n/g, '<br>')}
              </div>
            </div>
            
            <div style="margin: 20px 0;">
              <h3 style="color: #374151;">Contact Information</h3>
              <p><strong>Phone:</strong> +2347018222950</p>
              <p><strong>Email:</strong> contact@absadmultisynergy.com</p>
              <p><strong>Address:</strong> Jebba, Kwara State, Nigeria</p>
            </div>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 14px;">
              <p>Best regards,<br>
              The Absad MultiSynergy Team</p>
            </div>
          </div>
        `,
        emailType: EMAIL_TYPES.GENERAL,
        contactInquiryId: inquiry.id
      })

    } catch (emailError) {
      console.error('Email error:', emailError)
      // Don't fail the request if email fails, but log it
      // The inquiry is still saved in the database
    }

    return NextResponse.json({
      success: true,
      message: 'Thank you for your inquiry! We will get back to you within 24 hours.',
      data: {
        id: inquiry.id,
        submittedAt: inquiry.created_at
      }
    })

  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: 'Something went wrong. Please try again later.'
        }
      },
      { status: 500 }
    )
  }
}

// Apply rate limiting: 5 requests per 15 minutes per IP
export const POST = withRateLimit(handlePOST, {
  maxRequests: 5,
  windowMs: 15 * 60 * 1000,
  message: 'Too many contact form submissions. Please wait before trying again.'
})