#!/usr/bin/env node

/**
 * Database seed script for Absad MultiSynergy website
 * This script inserts initial data into the database
 */

const { createClient } = require('@supabase/supabase-js')
const { join } = require('path')

// Load environment variables
require('dotenv').config({ path: join(__dirname, '../.env.local') })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing required environment variables:')
  console.error('   NEXT_PUBLIC_SUPABASE_URL')
  console.error('   SUPABASE_SERVICE_ROLE_KEY')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function seedCompanySettings() {
  console.log('🏢 Seeding company settings...')
  
  // Check if company settings already exist
  const { data: existing } = await supabase
    .from('company_settings')
    .select('id')
    .limit(1)
    .single()
  
  if (existing) {
    console.log('ℹ️  Company settings already exist, skipping...')
    return true
  }
  
  const companySettings = {
    bank_name: 'First Bank of Nigeria',
    account_name: 'Absad MultiSynergy Limited',
    account_number: '1234567890',
    swift_code: 'FBNGNGLA',
    currency: 'NGN'
  }
  
  const { error } = await supabase
    .from('company_settings')
    .insert(companySettings)
  
  if (error) {
    console.error('❌ Failed to seed company settings:', error.message)
    return false
  }
  
  console.log('✅ Company settings seeded successfully')
  return true
}

async function createStorageBuckets() {
  console.log('🪣 Creating storage buckets...')
  
  // Create testimonials bucket
  const { error: testimonialsError } = await supabase.storage
    .createBucket('testimonials', {
      public: true,
      fileSizeLimit: 104857600, // 100MB
      allowedMimeTypes: ['video/mp4', 'video/webm', 'video/quicktime', 'video/x-msvideo']
    })
  
  if (testimonialsError && !testimonialsError.message.includes('already exists')) {
    console.error('❌ Failed to create testimonials bucket:', testimonialsError.message)
    return false
  }
  
  // Create invoices bucket
  const { error: invoicesError } = await supabase.storage
    .createBucket('invoices', {
      public: false,
      fileSizeLimit: 10485760, // 10MB
      allowedMimeTypes: ['application/pdf']
    })
  
  if (invoicesError && !invoicesError.message.includes('already exists')) {
    console.error('❌ Failed to create invoices bucket:', invoicesError.message)
    return false
  }
  
  console.log('✅ Storage buckets created successfully')
  return true
}

async function seedDatabase() {
  console.log('🌱 Seeding Absad MultiSynergy database...\n')
  
  const tasks = [
    { name: 'Company Settings', fn: seedCompanySettings },
    { name: 'Storage Buckets', fn: createStorageBuckets }
  ]
  
  let success = true
  
  for (const task of tasks) {
    const result = await task.fn()
    if (!result) {
      success = false
      break
    }
    console.log() // Add spacing
  }
  
  if (success) {
    console.log('🎉 Database seeding completed successfully!')
    console.log('\n📋 Next steps:')
    console.log('   1. Create your first admin user:')
    console.log('      - Sign up through the application')
    console.log('      - Manually update the user role to ADMIN in the database')
    console.log('   2. Update company settings through the admin dashboard')
    console.log('   3. Upload testimonials and create invoices')
  } else {
    console.log('❌ Database seeding failed. Please check the errors above.')
    process.exit(1)
  }
}

seedDatabase().catch(console.error)