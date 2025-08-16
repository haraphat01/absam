#!/usr/bin/env node

/**
 * Database verification script for Absad MultiSynergy website
 * This script checks if the database is properly set up
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

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function checkTable(tableName) {
  try {
    const { data, error } = await supabase
      .from(tableName)
      .select('*')
      .limit(1)
    
    if (error) {
      console.log(`❌ Table '${tableName}': ${error.message}`)
      return false
    }
    
    console.log(`✅ Table '${tableName}': OK`)
    return true
  } catch (err) {
    console.log(`❌ Table '${tableName}': ${err.message}`)
    return false
  }
}

async function checkStorageBucket(bucketName) {
  try {
    const { data, error } = await supabase.storage
      .from(bucketName)
      .list('', { limit: 1 })
    
    if (error) {
      console.log(`❌ Bucket '${bucketName}': ${error.message}`)
      return false
    }
    
    console.log(`✅ Bucket '${bucketName}': OK`)
    return true
  } catch (err) {
    console.log(`❌ Bucket '${bucketName}': ${err.message}`)
    return false
  }
}

async function checkFunction(functionName) {
  try {
    const { data, error } = await supabase
      .rpc(functionName)
    
    if (error) {
      console.log(`❌ Function '${functionName}': ${error.message}`)
      return false
    }
    
    console.log(`✅ Function '${functionName}': OK (returned: ${data})`)
    return true
  } catch (err) {
    console.log(`❌ Function '${functionName}': ${err.message}`)
    return false
  }
}

async function verifyDatabase() {
  console.log('🔍 Verifying Absad MultiSynergy database setup...\n')
  
  console.log('📋 Checking tables:')
  const tables = ['users', 'testimonials', 'invoices', 'company_settings', 'contact_inquiries']
  const tableResults = await Promise.all(tables.map(checkTable))
  
  console.log('\n🪣 Checking storage buckets:')
  const buckets = ['testimonials', 'invoices']
  const bucketResults = await Promise.all(buckets.map(checkStorageBucket))
  
  console.log('\n⚙️ Checking functions:')
  const functions = ['generate_invoice_number']
  const functionResults = await Promise.all(functions.map(checkFunction))
  
  const allTablesOk = tableResults.every(result => result)
  const allBucketsOk = bucketResults.every(result => result)
  const allFunctionsOk = functionResults.every(result => result)
  
  console.log('\n📊 Summary:')
  console.log(`   Tables: ${allTablesOk ? '✅ All OK' : '❌ Some issues'}`)
  console.log(`   Storage: ${allBucketsOk ? '✅ All OK' : '❌ Some issues'}`)
  console.log(`   Functions: ${allFunctionsOk ? '✅ All OK' : '❌ Some issues'}`)
  
  if (allTablesOk && allBucketsOk && allFunctionsOk) {
    console.log('\n🎉 Database is fully set up and ready!')
    console.log('\n📋 Next steps:')
    console.log('   1. Run: npm run db:seed')
    console.log('   2. Create your first admin user')
    console.log('   3. Start the development server: npm run dev')
  } else {
    console.log('\n⚠️  Database setup is incomplete.')
    console.log('   Please run the migrations manually in your Supabase dashboard.')
    console.log('   Use: npm run db:setup:manual for instructions.')
  }
}

verifyDatabase().catch(console.error)