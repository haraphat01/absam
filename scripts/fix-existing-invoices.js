#!/usr/bin/env node

/**
 * Fix existing invoices for Absad MultiSynergy website
 * This script updates existing invoices to have the created_by field set
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

async function fixExistingInvoices() {
  console.log('🔧 Fixing existing invoices...')
  
  // Get the first admin user to use as created_by
  const { data: adminUser, error: userError } = await supabase
    .from('users')
    .select('id')
    .eq('role', 'ADMIN')
    .eq('is_active', true)
    .limit(1)
    .single()
  
  if (userError || !adminUser) {
    console.error('❌ No active admin user found:', userError?.message)
    return
  }
  
  console.log(`👤 Using admin user ${adminUser.id} as created_by`)
  
  // Find invoices without created_by field
  const { data: invoicesWithoutCreatedBy, error: fetchError } = await supabase
    .from('invoices')
    .select('id, invoice_number, client_name')
    .is('created_by', null)
  
  if (fetchError) {
    console.error('❌ Error fetching invoices:', fetchError.message)
    return
  }
  
  if (!invoicesWithoutCreatedBy || invoicesWithoutCreatedBy.length === 0) {
    console.log('✅ All invoices already have created_by field set')
    return
  }
  
  console.log(`📋 Found ${invoicesWithoutCreatedBy.length} invoices without created_by field:`)
  invoicesWithoutCreatedBy.forEach(invoice => {
    console.log(`   - ${invoice.invoice_number} (${invoice.client_name})`)
  })
  
  let successCount = 0
  let errorCount = 0
  
  // Update each invoice
  for (const invoice of invoicesWithoutCreatedBy) {
    try {
      const { data, error } = await supabase
        .from('invoices')
        .update({ created_by: adminUser.id })
        .eq('id', invoice.id)
        .select()
        .single()
      
      if (error) {
        console.error(`❌ Failed to update invoice ${invoice.invoice_number}:`, error.message)
        errorCount++
      } else {
        console.log(`✅ Updated invoice ${invoice.invoice_number}`)
        successCount++
      }
    } catch (err) {
      console.error(`❌ Error updating invoice ${invoice.invoice_number}:`, err.message)
      errorCount++
    }
  }
  
  console.log(`\n📊 Results:`)
  console.log(`   ✅ Successfully updated: ${successCount} invoices`)
  console.log(`   ❌ Failed to update: ${errorCount} invoices`)
  
  if (successCount > 0) {
    console.log('\n🎉 Invoice fixes completed successfully!')
    console.log('You should now be able to see all invoices in the admin panel.')
  } else {
    console.log('\n❌ No invoices were updated. Please check the errors above.')
  }
}

async function checkInvoices() {
  console.log('🔍 Checking invoice status...')
  
  const { data: allInvoices, error } = await supabase
    .from('invoices')
    .select('id, invoice_number, client_name, created_by')
    .order('created_at', { ascending: false })
  
  if (error) {
    console.error('❌ Error checking invoices:', error.message)
    return
  }
  
  if (allInvoices && allInvoices.length > 0) {
    console.log(`📋 Found ${allInvoices.length} total invoices:`)
    
    const withCreatedBy = allInvoices.filter(invoice => invoice.created_by)
    const withoutCreatedBy = allInvoices.filter(invoice => !invoice.created_by)
    
    console.log(`   ✅ ${withCreatedBy.length} invoices with created_by field`)
    console.log(`   ❌ ${withoutCreatedBy.length} invoices without created_by field`)
    
    if (withoutCreatedBy.length > 0) {
      console.log('\n📋 Invoices without created_by field:')
      withoutCreatedBy.forEach(invoice => {
        console.log(`   - ${invoice.invoice_number} (${invoice.client_name})`)
      })
    }
  } else {
    console.log('📋 No invoices found.')
  }
  console.log()
}

async function main() {
  console.log('🚀 Fixing existing invoices for Absad MultiSynergy...\n')
  
  await checkInvoices()
  await fixExistingInvoices()
}

main().catch(console.error)
