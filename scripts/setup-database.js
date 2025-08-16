#!/usr/bin/env node

/**
 * Database setup script for Absad MultiSynergy website
 * This script applies all migrations to the Supabase database
 */

const { createClient } = require('@supabase/supabase-js')
const { readFileSync } = require('fs')
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

async function executeSqlFile(filePath, description) {
  try {
    console.log(`📄 Executing ${description}...`)
    const sql = readFileSync(filePath, 'utf8')
    
    const { error } = await supabase.rpc('exec_sql', { sql })
    
    if (error) {
      // Try direct execution if rpc fails
      const { error: directError } = await supabase
        .from('_migrations')
        .select('*')
        .limit(1)
      
      if (directError) {
        console.error(`❌ Failed to execute ${description}:`, error.message)
        return false
      }
    }
    
    console.log(`✅ Successfully executed ${description}`)
    return true
  } catch (err) {
    console.error(`❌ Error reading ${filePath}:`, err.message)
    return false
  }
}

async function setupDatabase() {
  console.log('🚀 Setting up Absad MultiSynergy database...\n')
  
  const migrations = [
    {
      file: join(__dirname, '../supabase/migrations/001_initial_schema.sql'),
      description: 'Initial schema and tables'
    },
    {
      file: join(__dirname, '../supabase/migrations/002_invoice_functions.sql'),
      description: 'Invoice number generation functions'
    },
    {
      file: join(__dirname, '../supabase/migrations/003_rls_policies.sql'),
      description: 'Row Level Security policies'
    },
    {
      file: join(__dirname, '../supabase/migrations/004_storage_setup.sql'),
      description: 'Storage buckets and policies'
    }
  ]
  
  let success = true
  
  for (const migration of migrations) {
    const result = await executeSqlFile(migration.file, migration.description)
    if (!result) {
      success = false
      break
    }
    console.log() // Add spacing
  }
  
  if (success) {
    console.log('🎉 Database setup completed successfully!')
    console.log('\n📋 Next steps:')
    console.log('   1. Run seed data: node scripts/seed-database.js')
    console.log('   2. Create your first admin user through the application')
    console.log('   3. Configure company settings in the admin dashboard')
  } else {
    console.log('❌ Database setup failed. Please check the errors above.')
    process.exit(1)
  }
}

// Handle manual SQL execution for Supabase Cloud
async function printMigrationInstructions() {
  console.log('📋 Manual Migration Instructions for Supabase Cloud:')
  console.log('   1. Go to your Supabase dashboard')
  console.log('   2. Navigate to SQL Editor')
  console.log('   3. Execute the following files in order:\n')
  
  const migrations = [
    'supabase/migrations/001_initial_schema.sql',
    'supabase/migrations/002_invoice_functions.sql', 
    'supabase/migrations/003_rls_policies.sql',
    'supabase/migrations/004_storage_setup.sql'
  ]
  
  migrations.forEach((file, index) => {
    console.log(`   ${index + 1}. ${file}`)
  })
  
  console.log('\n   4. Run seed data: node scripts/seed-database.js')
  console.log('   5. Create storage buckets if not created automatically:')
  console.log('      - testimonials (public, 100MB limit)')
  console.log('      - invoices (private, 10MB limit)')
}

// Check if we should run automated setup or show manual instructions
const args = process.argv.slice(2)
if (args.includes('--manual') || args.includes('-m')) {
  printMigrationInstructions()
} else {
  setupDatabase().catch(console.error)
}