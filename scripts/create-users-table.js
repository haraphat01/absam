#!/usr/bin/env node

/**
 * Script to create the users table for authentication
 */

const { createClient } = require('@supabase/supabase-js')
const { join } = require('path')

// Load environment variables
require('dotenv').config({ path: join(__dirname, '../.env') })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing required environment variables')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

async function createUsersTable() {
  console.log('🚀 Creating users table...\n')
  
  try {
    // Create users table
    const createTableSQL = `
      CREATE TABLE IF NOT EXISTS public.users (
          id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
          email VARCHAR(255) UNIQUE NOT NULL,
          role VARCHAR(20) CHECK (role IN ('ADMIN', 'STAFF')) NOT NULL DEFAULT 'STAFF',
          is_active BOOLEAN DEFAULT true,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `
    
    // Since we can't use rpc, let's try a different approach
    // We'll insert a dummy record to test if table exists, if it fails, we know table doesn't exist
    const { error: testError } = await supabase
      .from('users')
      .select('id')
      .limit(1)
    
    if (testError && testError.message.includes('does not exist')) {
      console.log('❌ Users table does not exist. Please create it manually in Supabase dashboard.')
      console.log('\n📋 SQL to execute in Supabase SQL Editor:')
      console.log(createTableSQL)
      console.log('\n🔗 Go to: https://supabase.com/dashboard/project/[your-project]/sql')
    } else {
      console.log('✅ Users table already exists or is accessible')
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message)
  }
}

createUsersTable().catch(console.error)