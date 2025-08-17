import { NextResponse } from 'next/server'
import { companySettingsSchema } from '@/lib/validations'
import { createServerClient } from '@/lib/supabase'
import { sanitize } from '@/lib/security'

export async function GET(request) {
  try {
    console.log('GET /api/settings/company - Starting request')
    
    const supabase = createServerClient()
    
    const { data, error } = await supabase
      .from('company_settings')
      .select('*')
      .order('updated_at', { ascending: false })
      .limit(1)
      .single()
    
    if (error && error.code !== 'PGRST116') {
      throw error
    }
    
    return NextResponse.json({
      success: true,
      data: data
    })
  } catch (error) {
    console.error('Error fetching company settings:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch company settings'
    }, { status: 500 })
  }
}

export async function PUT(request) {
  console.log('PUT /api/settings/company - Starting request')
  
  try {
    const body = await request.json()
    
    // Validate the request body
    const validatedData = companySettingsSchema.parse(body)
    
    // Sanitize the data
    const sanitizedData = {
      bank_name: sanitize.text(validatedData.bankName),
      account_name: sanitize.text(validatedData.accountName),
      account_number: validatedData.accountNumber,
      swift_code: validatedData.swiftCode ? sanitize.text(validatedData.swiftCode) : null,
      currency: validatedData.currency,
      updated_at: new Date().toISOString()
    }
    
    // Update the company settings using server client
    const supabase = createServerClient()
    
    // First try to update existing settings
    const { data: existingSettings } = await supabase
      .from('company_settings')
      .select('id')
      .limit(1)
      .single()
    
    let updatedSettings
    if (existingSettings) {
      const { data, error } = await supabase
        .from('company_settings')
        .update(sanitizedData)
        .eq('id', existingSettings.id)
        .select()
        .single()
      
      if (error) throw error
      updatedSettings = data
    } else {
      // Create new settings if none exist
      const { data, error } = await supabase
        .from('company_settings')
        .insert(sanitizedData)
        .select()
        .single()
      
      if (error) throw error
      updatedSettings = data
    }
    
    return NextResponse.json({
      success: true,
      data: updatedSettings,
      message: 'Company settings updated successfully'
    })
  } catch (error) {
    console.error('Error updating company settings:', error)
    
    if (error.name === 'ZodError') {
      return NextResponse.json({
        success: false,
        error: 'Validation failed',
        details: error.errors
      }, { status: 400 })
    }
    
    return NextResponse.json({
      success: false,
      error: 'Failed to update company settings',
      details: error.message
    }, { status: 500 })
  }
}