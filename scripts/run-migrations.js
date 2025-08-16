#!/usr/bin/env node

/**
 * Script to manually run database migrations
 */

const { createClient } = require('@supabase/supabase-js')
const { readFileSync } = require('fs')
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

async function runMigrations() {
  console.log('🚀 Running database migrations...\n')
  
  const migrations = [
    '001_initial_schema.sql',
    '002_invoice_functions.sql',
    '003_rls_policies.sql',
    '004_storage_setup.sql'
  ]
  
  for (const migration of migrations) {
    try {
      console.log(`📄 Running ${migration}...`)
      const sql = readFileSync(join(__dirname, '../supabase/migrations', migration), 'utf8')
      
      // Split SQL into individual statements and execute them
      const statements = sql.split(';').filter(stmt => stmt.trim().length > 0)
      
      for (const statement of statements) {
        if (statement.trim()) {
          const { error } = await supabase.rpc('exec', { sql: statement.trim() + ';' })
          if (error && !error.message.includes('already exists')) {
            console.error(`❌ Error in ${migration}:`, error.message)
            // Continue with other statements
          }
        }
      }
      
      console.log(`✅ Completed ${migration}`)
    } catch (error) {
      console.error(`❌ Failed to read ${migration}:`, error.message)
    }
  }
  
  console.log('\n🎉 Migrations completed!')
}

runMigrations().catch(console.error)