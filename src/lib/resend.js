import { Resend } from 'resend'

const resendApiKey = process.env.RESEND_API_KEY || 'placeholder_resend_api_key'

export const resend = new Resend(resendApiKey)

export const FROM_EMAIL = process.env.NEXT_PUBLIC_FROM_EMAIL || 'invoices@absadmultisynergy.com'