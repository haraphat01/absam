#!/usr/bin/env node

/**
 * Setup script to create admin user in Supabase
 */

import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

// Load environment variables
dotenv.config()

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase environment variables')
  console.log('Make sure you have NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in your .env file')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

async function setupAdmin() {
  try {
    console.log('🚀 Setting up admin user...')
    
    const adminEmail = 'admin@absadmultisynergy.com'
    const adminPassword = 'admin123456'
    
    // Create user in Supabase Auth
    console.log('📧 Creating auth user...')
    const { data: authUser, error: authError } = await supabase.auth.admin.createUser({
      email: adminEmail,
      password: adminPassword,
      email_confirm: true
    })
    
    if (authError && !authError.message.includes('already registered')) {
      throw authError
    }
    
    const userId = authUser?.user?.id || (await supabase.auth.admin.listUsers()).data.users.find(u => u.email === adminEmail)?.id
    
    if (!userId) {
      throw new Error('Failed to get user ID')
    }
    
    console.log('👤 User ID:', userId)
    
    // Create user profile in users table
    console.log('📝 Creating user profile...')
    const { error: profileError } = await supabase
      .from('users')
      .upsert({
        id: userId,
        email: adminEmail,
        role: 'ADMIN',
        is_active: true
      })
    
    if (profileError) {
      throw profileError
    }
    
    console.log('✅ Admin user setup complete!')
    console.log('📋 Login credentials:')
    console.log('   Email:', adminEmail)
    console.log('   Password:', adminPassword)
    console.log('')
    console.log('🌐 Access the admin dashboard at: http://localhost:3000/admin/login')
    
  } catch (error) {
    console.error('❌ Error setting up admin user:', error.message)
    process.exit(1)
  }
}

setupAdmin()