import { createClient } from '@supabase/supabase-js'
import { Database } from './database.types'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder_anon_key'

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
})

// Server-side client with service role key
export const createServerClient = () => {
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'placeholder_service_role_key'
  
  return createClient<Database>(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  })
}

// Type exports for convenience
export type { Database, User, UserInsert, UserUpdate, Testimonial, TestimonialInsert, TestimonialUpdate, Invoice, InvoiceInsert, InvoiceUpdate, CompanySettings, CompanySettingsInsert, CompanySettingsUpdate, ContactInquiry, ContactInquiryInsert, ContactInquiryUpdate, InvoiceItem, UserRole, InvoiceStatus } from './database.types'