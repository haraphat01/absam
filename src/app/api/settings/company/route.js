import { NextResponse } from 'next/server'
import { getCompanySettings, updateCompanySettings } from '@/lib/database'
import { companySettingsSchema } from '@/lib/validations'
import { createServerClient } from '@/lib/supabase'
import { sanitize } from '@/lib/security'

export async function GET() {
  try {
    const supabase = createServerClient()
    
    // Check if user is authenticated and has admin role
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get user profile to check role
    const { data: userProfile, error: profileError } = await supabase
      .from('users')
      .select('role')
      .eq('id', user.id)
      .single()

    if (profileError || !userProfile || userProfile.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const settings = await getCompanySettings()
    
    return NextResponse.json({
      success: true,
      data: settings
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
  try {
    const supabase = createServerClient()
    
    // Check if user is authenticated and has admin role
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get user profile to check role
    const { data: userProfile, error: profileError } = await supabase
      .from('users')
      .select('role')
      .eq('id', user.id)
      .single()

    if (profileError || !userProfile || userProfile.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const body = await request.json()
    
    // Sanitize input
    const sanitizedBody = sanitize.object(body)
    
    // Validate the request data
    const validationResult = companySettingsSchema.safeParse(sanitizedBody)
    if (!validationResult.success) {
      return NextResponse.json({
        success: false,
        error: 'Validation failed',
        details: validationResult.error.flatten().fieldErrors
      }, { status: 400 })
    }

    const settingsData = {
      ...validationResult.data,
      bank_name: validationResult.data.bankName,
      account_name: validationResult.data.accountName,
      account_number: validationResult.data.accountNumber,
      swift_code: validationResult.data.swiftCode,
      currency: validationResult.data.currency,
      updated_by: user.id
    }

    // Remove the camelCase keys to avoid conflicts
    delete settingsData.bankName
    delete settingsData.accountName
    delete settingsData.accountNumber
    delete settingsData.swiftCode

    const updatedSettings = await updateCompanySettings(settingsData)
    
    return NextResponse.json({
      success: true,
      data: updatedSettings,
      message: 'Company settings updated successfully'
    })
  } catch (error) {
    console.error('Error updating company settings:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to update company settings'
    }, { status: 500 })
  }
}