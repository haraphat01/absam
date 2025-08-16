export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          role: 'ADMIN' | 'STAFF'
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          role?: 'ADMIN' | 'STAFF'
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          role?: 'ADMIN' | 'STAFF'
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      testimonials: {
        Row: {
          id: string
          video_url: string
          title: string | null
          client_name: string | null
          uploaded_by: string | null
          is_active: boolean
          created_at: string
        }
        Insert: {
          id?: string
          video_url: string
          title?: string | null
          client_name?: string | null
          uploaded_by?: string | null
          is_active?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          video_url?: string
          title?: string | null
          client_name?: string | null
          uploaded_by?: string | null
          is_active?: boolean
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "testimonials_uploaded_by_fkey"
            columns: ["uploaded_by"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      invoices: {
        Row: {
          id: string
          invoice_number: string
          client_name: string
          client_email: string
          items: Json
          total_amount: number
          status: 'PAID' | 'UNPAID'
          pdf_url: string | null
          created_by: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          invoice_number?: string
          client_name: string
          client_email: string
          items: Json
          total_amount: number
          status?: 'PAID' | 'UNPAID'
          pdf_url?: string | null
          created_by?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          invoice_number?: string
          client_name?: string
          client_email?: string
          items?: Json
          total_amount?: number
          status?: 'PAID' | 'UNPAID'
          pdf_url?: string | null
          created_by?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "invoices_created_by_fkey"
            columns: ["created_by"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      company_settings: {
        Row: {
          id: string
          bank_name: string
          account_name: string
          account_number: string
          swift_code: string | null
          currency: string
          updated_by: string | null
          updated_at: string
        }
        Insert: {
          id?: string
          bank_name: string
          account_name: string
          account_number: string
          swift_code?: string | null
          currency?: string
          updated_by?: string | null
          updated_at?: string
        }
        Update: {
          id?: string
          bank_name?: string
          account_name?: string
          account_number?: string
          swift_code?: string | null
          currency?: string
          updated_by?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "company_settings_updated_by_fkey"
            columns: ["updated_by"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      contact_inquiries: {
        Row: {
          id: string
          name: string
          email: string
          message: string
          is_responded: boolean
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          message: string
          is_responded?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          message?: string
          is_responded?: boolean
          created_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      generate_invoice_number: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

// Helper types for common operations
export type User = Database['public']['Tables']['users']['Row']
export type UserInsert = Database['public']['Tables']['users']['Insert']
export type UserUpdate = Database['public']['Tables']['users']['Update']

export type Testimonial = Database['public']['Tables']['testimonials']['Row']
export type TestimonialInsert = Database['public']['Tables']['testimonials']['Insert']
export type TestimonialUpdate = Database['public']['Tables']['testimonials']['Update']

export type Invoice = Database['public']['Tables']['invoices']['Row']
export type InvoiceInsert = Database['public']['Tables']['invoices']['Insert']
export type InvoiceUpdate = Database['public']['Tables']['invoices']['Update']

export type CompanySettings = Database['public']['Tables']['company_settings']['Row']
export type CompanySettingsInsert = Database['public']['Tables']['company_settings']['Insert']
export type CompanySettingsUpdate = Database['public']['Tables']['company_settings']['Update']

export type ContactInquiry = Database['public']['Tables']['contact_inquiries']['Row']
export type ContactInquiryInsert = Database['public']['Tables']['contact_inquiries']['Insert']
export type ContactInquiryUpdate = Database['public']['Tables']['contact_inquiries']['Update']

// Invoice item structure
export interface InvoiceItem {
  id: string
  description: string
  quantity: number
  unit_price: number
  total: number
}

// User roles enum
export type UserRole = 'ADMIN' | 'STAFF'

// Invoice status enum
export type InvoiceStatus = 'PAID' | 'UNPAID'