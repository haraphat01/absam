import { z } from 'zod'
import { sanitize } from './security'

// Enhanced string validation with sanitization
const sanitizedString = (minLength = 1, maxLength = 255) => 
  z.string()
    .min(minLength)
    .max(maxLength)
    .transform(val => sanitize.text(val))
    .refine(val => val.length >= minLength, { message: `Must be at least ${minLength} characters after sanitization` })

const sanitizedEmail = () =>
  z.string()
    .email('Please enter a valid email address')
    .transform(val => sanitize.email(val))
    .refine(val => val.includes('@') && val.includes('.'), { message: 'Invalid email format' })

// Contact form validation
export const contactFormSchema = z.object({
  name: sanitizedString(2, 100).refine(
    val => !/[<>{}]/.test(val), 
    { message: 'Name contains invalid characters' }
  ),
  email: sanitizedEmail(),
  message: sanitizedString(10, 1000).refine(
    val => !/javascript:|<script|on\w+=/i.test(val),
    { message: 'Message contains potentially unsafe content' }
  ),
})

// Invoice validation
export const invoiceSchema = z.object({
  clientName: sanitizedString(2, 100).refine(
    val => !/[<>{}]/.test(val),
    { message: 'Client name contains invalid characters' }
  ),
  clientEmail: sanitizedEmail(),
  items: z.array(z.object({
    description: sanitizedString(1, 500).refine(
      val => !/javascript:|<script|on\w+=/i.test(val),
      { message: 'Description contains potentially unsafe content' }
    ),
    quantity: z.number().int().min(1, 'Quantity must be at least 1').max(10000, 'Quantity too large'),
    price: z.number().min(0, 'Price must be positive').max(1000000, 'Price too large'),
  })).min(1, 'At least one item is required').max(50, 'Too many items'),
})

// User creation validation
export const userSchema = z.object({
  email: sanitizedEmail(),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .max(128, 'Password too long')
    .refine(val => /[A-Z]/.test(val), { message: 'Password must contain at least one uppercase letter' })
    .refine(val => /[a-z]/.test(val), { message: 'Password must contain at least one lowercase letter' })
    .refine(val => /\d/.test(val), { message: 'Password must contain at least one number' })
    .refine(val => /[!@#$%^&*(),.?":{}|<>]/.test(val), { message: 'Password must contain at least one special character' }),
  role: z.enum(['ADMIN', 'STAFF'], 'Please select a valid role'),
})

// Company settings validation
export const companySettingsSchema = z.object({
  bankName: sanitizedString(2, 100).refine(
    val => !/[<>{}]/.test(val),
    { message: 'Bank name contains invalid characters' }
  ),
  accountName: sanitizedString(2, 100).refine(
    val => !/[<>{}]/.test(val),
    { message: 'Account name contains invalid characters' }
  ),
  accountNumber: z.string()
    .min(10, 'Account number must be at least 10 digits')
    .max(20, 'Account number too long')
    .regex(/^[0-9]+$/, 'Account number must contain only digits'),
  swiftCode: z.string()
    .optional()
    .refine(val => !val || /^[A-Z]{6}[A-Z0-9]{2}([A-Z0-9]{3})?$/.test(val), {
      message: 'Invalid SWIFT code format'
    }),
  currency: z.string()
    .length(3, 'Currency code must be exactly 3 characters')
    .regex(/^[A-Z]{3}$/, 'Currency code must be uppercase letters only'),
})

// Container tracking validation
export const containerTrackingSchema = z.object({
  containerId: z.string()
    .min(4, 'Container ID must be at least 4 characters')
    .max(20, 'Container ID must be less than 20 characters')
    .regex(/^[A-Z0-9]+$/, 'Container ID must contain only uppercase letters and numbers')
    .transform(val => val.toUpperCase().trim()),
})

// Login validation
export const loginSchema = z.object({
  email: sanitizedEmail(),
  password: z.string().min(1, 'Password is required').max(128, 'Password too long'),
})

// File upload validation schemas
export const videoUploadSchema = z.object({
  title: sanitizedString(2, 100).refine(
    val => !/[<>{}]/.test(val),
    { message: 'Title contains invalid characters' }
  ),
  client_name: sanitizedString(2, 100).refine(
    val => !/[<>{}]/.test(val),
    { message: 'Client name contains invalid characters' }
  ),
})

// API rate limiting validation
export const rateLimitSchema = z.object({
  maxRequests: z.number().int().min(1).max(1000).default(100),
  windowMs: z.number().int().min(1000).max(3600000).default(900000), // 15 minutes max
})