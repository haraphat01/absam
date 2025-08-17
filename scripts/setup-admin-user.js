#!/usr/bin/env node

/**
 * Setup admin user for Absad MultiSynergy website
 * This script helps create an admin user for testing the admin panel
 */

const { createClient } = require('@supabase/supabase-js')
const { join } = require('path')

// Load environment variables
require('dotenv').config({ path: join(__dirname, '../.env') })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing required environment variables:')
  console.error('   NEXT_PUBLIC_SUPABASE_URL')
  console.error('   SUPABASE_SERVICE_ROLE_KEY')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function createAdminUser() {
  console.log('👤 Creating admin user...')
  
  // Admin user details
  const adminEmail = 'admin@absam.com'
  const adminPassword = 'admin123456'
  
  try {
    // First, create the user in Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email: adminEmail,
      password: adminPassword,
      email_confirm: true, // Auto-confirm email
    })
    
    if (authError) {
      console.error('❌ Error creating auth user:', authError.message)
      return false
    }
    
    console.log('✅ Auth user created successfully')
    
    // Then, create the user profile in the users table
    const { data: profileData, error: profileError } = await supabase
      .from('users')
      .insert({
        id: authData.user.id,
        email: adminEmail,
        role: 'ADMIN',
        is_active: true
      })
      .select()
      .single()
    
    if (profileError) {
      console.error('❌ Error creating user profile:', profileError.message)
      return false
    }
    
    console.log('✅ User profile created successfully')
    
    console.log('\n🎉 Admin user created successfully!')
    console.log('\n📋 Login Details:')
    console.log(`   Email: ${adminEmail}`)
    console.log(`   Password: ${adminPassword}`)
    console.log('\n🔗 You can now login at: http://localhost:3000/admin/login')
    
    return true
  } catch (error) {
    console.error('❌ Unexpected error:', error.message)
    return false
  }
}

async function checkExistingUsers() {
  console.log('🔍 Checking existing users...')
  
  const { data: users, error } = await supabase
    .from('users')
    .select('id, email, role, is_active')
    .order('created_at', { ascending: false })
  
  if (error) {
    console.error('❌ Error checking users:', error.message)
    return
  }
  
  if (users && users.length > 0) {
    console.log(`📋 Found ${users.length} existing users:`)
    users.forEach(user => {
      console.log(`   - ${user.email} (${user.role}) - ${user.is_active ? 'Active' : 'Inactive'}`)
    })
    console.log()
  } else {
    console.log('📋 No existing users found.')
    console.log()
  }
}

async function main() {
  console.log('🚀 Setting up admin user for Absad MultiSynergy...\n')
  
  await checkExistingUsers()
  await createAdminUser()
}

main().catch(console.error)
