import { createServerClient } from './supabase.js'

// Server-side database functions that bypass RLS policies
// These should only be used in API routes

const supabase = createServerClient()

// Invoice functions
export const getInvoicesServer = async (filters = {}) => {
  let query = supabase
    .from('invoices')
    .select('*')
    .order('created_at', { ascending: false })
  
  if (filters.status) {
    query = query.eq('status', filters.status)
  }
  
  if (filters.month) {
    const startOfMonth = new Date(filters.month)
    const endOfMonth = new Date(startOfMonth.getFullYear(), startOfMonth.getMonth() + 1, 0)
    query = query
      .gte('created_at', startOfMonth.toISOString())
      .lte('created_at', endOfMonth.toISOString())
  }
  
  const { data, error } = await query
  
  if (error) throw error
  return data
}

export const getInvoiceByIdServer = async (id) => {
  const { data, error } = await supabase
    .from('invoices')
    .select('*')
    .eq('id', id)
    .single()
  
  if (error && error.code !== 'PGRST116') throw error
  return data
}

export const createInvoiceServer = async (invoiceData) => {
  const { data, error } = await supabase
    .from('invoices')
    .insert(invoiceData)
    .select()
    .single()
  
  if (error) throw error
  return data
}

export const updateInvoiceServer = async (id, updateData) => {
  const { data, error } = await supabase
    .from('invoices')
    .update(updateData)
    .eq('id', id)
    .select()
    .single()
  
  if (error) throw error
  return data
}

export const updateInvoiceStatusServer = async (id, status) => {
  const { data, error } = await supabase
    .from('invoices')
    .update({ status })
    .eq('id', id)
    .select()
    .single()
  
  if (error) throw error
  return data
}

export const deleteInvoiceServer = async (id) => {
  const { error } = await supabase
    .from('invoices')
    .delete()
    .eq('id', id)
  
  if (error) throw error
}

export const updateInvoicePdfUrlServer = async (id, pdfUrl) => {
  const { data, error } = await supabase
    .from('invoices')
    .update({ pdf_url: pdfUrl })
    .eq('id', id)
    .select()
    .single()
  
  if (error) throw error
  return data
}

// Company settings functions
export const getCompanySettingsServer = async () => {
  const { data, error } = await supabase
    .from('company_settings')
    .select('*')
    .order('updated_at', { ascending: false })
    .limit(1)
    .single()
  
  if (error && error.code !== 'PGRST116') throw error
  return data
}

export const updateCompanySettingsServer = async (settingsData) => {
  // First try to update existing settings
  const { data: existingSettings } = await supabase
    .from('company_settings')
    .select('id')
    .limit(1)
    .single()
  
  if (existingSettings) {
    const { data, error } = await supabase
      .from('company_settings')
      .update(settingsData)
      .eq('id', existingSettings.id)
      .select()
      .single()
    
    if (error) throw error
    return data
  } else {
    // Create new settings if none exist
    const { data, error } = await supabase
      .from('company_settings')
      .insert(settingsData)
      .select()
      .single()
    
    if (error) throw error
    return data
  }
}

// User functions
export const getUserByIdServer = async (id) => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', id)
    .single()
  
  if (error && error.code !== 'PGRST116') throw error
  return data
}

export const getUsersServer = async () => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .order('created_at', { ascending: false })
  
  if (error) throw error
  return data
}

// Testimonials functions
export const getTestimonialsServer = async () => {
  const { data, error } = await supabase
    .from('testimonials')
    .select('*')
    .order('created_at', { ascending: false })
  
  if (error) throw error
  return data
}

export const getActiveTestimonialsServer = async () => {
  const { data, error } = await supabase
    .from('testimonials')
    .select('*')
    .eq('is_active', true)
    .order('created_at', { ascending: false })
  
  if (error) throw error
  return data
}

// Contact inquiries functions
export const getContactInquiriesServer = async () => {
  const { data, error } = await supabase
    .from('contact_inquiries')
    .select('*')
    .order('created_at', { ascending: false })
  
  if (error) throw error
  return data
}

// Storage functions
export const uploadFile = async (bucket, path, file) => {
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(path, file, {
      cacheControl: '3600',
      upsert: false
    })
  
  if (error) throw error
  return data
}
