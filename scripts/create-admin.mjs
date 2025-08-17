#!/usr/bin/env node

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

async function createAdmin() {
  try {
    console.log('🚀 Creating admin user...')
    
    const adminEmail = 'admin@absadmultisynergy.com'
    const adminPassword = 'admin123456'
    
    // Create user in Supabase Auth
    console.log('📧 Creating auth user...')
    const { data: authUser, error: authError } = await supabase.auth.admin.createUser({
      email: adminEmail,
      password: adminPassword,
      email_confirm: true
    })
    
    if (authError) {
      if (authError.message.includes('already registered')) {
        console.log('ℹ️  User already exists in auth, getting user ID...')
        const { data: users } = await supabase.auth.admin.listUsers()
        const existingUser = users.users.find(u => u.email === adminEmail)
        if (existingUser) {
          console.log('👤 Found existing user:', existingUser.id)
          
          // Create/update user profile
          const { error: profileError } = await supabase
            .from('users')
            .upsert({
              id: existingUser.id,
              email: adminEmail,
              role: 'ADMIN',
              is_active: true
            })
          
          if (profileError) {
            console.error('❌ Error creating profile:', profileError)
          } else {
            console.log('✅ Admin profile updated!')
          }
        }
      } else {
        throw authError
      }
    } else {
      console.log('👤 User created with ID:', authUser.user.id)
      
      // Create user profile in users table
      console.log('📝 Creating user profile...')
      const { error: profileError } = await supabase
        .from('users')
        .insert({
          id: authUser.user.id,
          email: adminEmail,
          role: 'ADMIN',
          is_active: true
        })
      
      if (profileError) {
        console.error('❌ Error creating profile:', profileError)
      } else {
        console.log('✅ Admin profile created!')
      }
    }
    
    console.log('')
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

createAdmin()