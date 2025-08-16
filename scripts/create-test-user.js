#!/usr/bin/env node

/**
 * Script to create a test admin user for development
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

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

async function createTestUser() {
  console.log('🚀 Creating test admin user...\n')
  
  const testEmail = 'admin@absadmultisynergy.com'
  const testPassword = 'admin123456'
  
  try {
    // Create auth user
    console.log('📧 Creating authentication user...')
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email: testEmail,
      password: testPassword,
      email_confirm: true
    })
    
    if (authError) {
      if (authError.message.includes('already registered') || authError.message.includes('already been registered')) {
        console.log('⚠️  User already exists in auth, checking profile...')
        
        // Get existing user
        const { data: existingUsers } = await supabase.auth.admin.listUsers()
        const existingUser = existingUsers.users.find(u => u.email === testEmail)
        
        if (existingUser) {
          // Check if profile exists
          const { data: profile, error: profileFetchError } = await supabase
            .from('users')
            .select('*')
            .eq('id', existingUser.id)
            .single()
          
          if (profile) {
            console.log('✅ Test user already exists and is configured')
            console.log(`📧 Email: ${testEmail}`)
            console.log(`🔑 Password: ${testPassword}`)
            console.log(`👤 Role: ${profile.role}`)
            console.log(`🟢 Status: ${profile.is_active ? 'Active' : 'Inactive'}`)
            return
          } else {
            console.log('👤 Creating user profile for existing auth user...')
            // Create profile for existing auth user
            const { error: profileError } = await supabase
              .from('users')
              .insert({
                id: existingUser.id,
                email: testEmail,
                role: 'ADMIN',
                is_active: true
              })
            
            if (profileError) {
              console.error('❌ Failed to create user profile:', profileError.message)
              return
            }
            
            console.log('✅ Created profile for existing auth user')
          }
        } else {
          console.error('❌ Could not find existing user in auth system')
          return
        }
      } else {
        console.error('❌ Failed to create auth user:', authError.message)
        return
      }
    } else {
      console.log('✅ Authentication user created successfully')
      
      // Create user profile
      console.log('👤 Creating user profile...')
      const { error: profileError } = await supabase
        .from('users')
        .insert({
          id: authData.user.id,
          email: testEmail,
          role: 'ADMIN',
          is_active: true
        })
      
      if (profileError) {
        console.error('❌ Failed to create user profile:', profileError.message)
        return
      }
      
      console.log('✅ User profile created successfully')
    }
    
    console.log('\n🎉 Test admin user is ready!')
    console.log('📋 Login credentials:')
    console.log(`   Email: ${testEmail}`)
    console.log(`   Password: ${testPassword}`)
    console.log('\n🔗 You can now test the authentication at: http://localhost:3000/admin/login')
    
  } catch (error) {
    console.error('❌ Unexpected error:', error.message)
  }
}

createTestUser().catch(console.error)