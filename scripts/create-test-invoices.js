#!/usr/bin/env node

/**
 * Create test invoices for Absad MultiSynergy website
 * This script creates sample invoices for testing the invoice management system
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

// Generate invoice number in format INV-YYYYMM-XXXX
function generateInvoiceNumber() {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0')
  return `INV-${year}${month}-${random}`
}

// Sample invoice data
const sampleInvoices = [
  {
    invoice_number: generateInvoiceNumber(),
    client_name: 'Tech Solutions Ltd',
    client_email: 'accounts@techsolutions.com',
    items: [
      {
        description: 'Website Development',
        quantity: 1,
        price: 50000
      },
      {
        description: 'SEO Optimization',
        quantity: 3,
        price: 15000
      }
    ],
    total_amount: 95000,
    status: 'UNPAID'
  },
  {
    invoice_number: generateInvoiceNumber(),
    client_name: 'Global Logistics Inc',
    client_email: 'finance@globallogistics.com',
    items: [
      {
        description: 'Container Tracking System',
        quantity: 1,
        price: 75000
      },
      {
        description: 'System Maintenance',
        quantity: 6,
        price: 5000
      }
    ],
    total_amount: 105000,
    status: 'PAID'
  },
  {
    invoice_number: generateInvoiceNumber(),
    client_name: 'Nigerian Export Co',
    client_email: 'billing@nigerianexport.com',
    items: [
      {
        description: 'Custom Software Development',
        quantity: 1,
        price: 120000
      },
      {
        description: 'Database Setup',
        quantity: 1,
        price: 25000
      },
      {
        description: 'Training Sessions',
        quantity: 2,
        price: 15000
      }
    ],
    total_amount: 175000,
    status: 'UNPAID'
  },
  {
    invoice_number: generateInvoiceNumber(),
    client_name: 'Lagos Manufacturing',
    client_email: 'accounts@lagosmanufacturing.com',
    items: [
      {
        description: 'ERP System Implementation',
        quantity: 1,
        price: 200000
      },
      {
        description: 'Data Migration',
        quantity: 1,
        price: 30000
      }
    ],
    total_amount: 230000,
    status: 'PAID'
  },
  {
    invoice_number: generateInvoiceNumber(),
    client_name: 'Port Harcourt Shipping',
    client_email: 'finance@phshipping.com',
    items: [
      {
        description: 'Fleet Management Software',
        quantity: 1,
        price: 85000
      },
      {
        description: 'Mobile App Development',
        quantity: 1,
        price: 45000
      },
      {
        description: 'API Integration',
        quantity: 1,
        price: 20000
      }
    ],
    total_amount: 150000,
    status: 'UNPAID'
  }
]

async function createTestInvoices() {
  console.log('📄 Creating test invoices...')
  
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
  
  let successCount = 0
  let errorCount = 0
  
  for (const invoice of sampleInvoices) {
    try {
      const { data, error } = await supabase
        .from('invoices')
        .insert({
          ...invoice,
          created_by: adminUser.id
        })
        .select()
        .single()
      
      if (error) {
        console.error(`❌ Failed to create invoice ${invoice.invoice_number}:`, error.message)
        errorCount++
      } else {
        console.log(`✅ Created invoice ${invoice.invoice_number} for ${invoice.client_name}`)
        successCount++
      }
    } catch (err) {
      console.error(`❌ Error creating invoice ${invoice.invoice_number}:`, err.message)
      errorCount++
    }
  }
  
  console.log(`\n📊 Results:`)
  console.log(`   ✅ Successfully created: ${successCount} invoices`)
  console.log(`   ❌ Failed to create: ${errorCount} invoices`)
  
  if (successCount > 0) {
    console.log('\n🎉 Test invoices created successfully!')
    console.log('You can now view them in the admin invoice management section.')
  } else {
    console.log('\n❌ No invoices were created. Please check the errors above.')
  }
}

async function checkExistingInvoices() {
  console.log('🔍 Checking existing invoices...')
  
  const { data: existingInvoices, error } = await supabase
    .from('invoices')
    .select('invoice_number, client_name, status')
    .order('created_at', { ascending: false })
  
  if (error) {
    console.error('❌ Error checking existing invoices:', error.message)
    return
  }
  
  if (existingInvoices && existingInvoices.length > 0) {
    console.log(`📋 Found ${existingInvoices.length} existing invoices:`)
    existingInvoices.forEach(invoice => {
      console.log(`   - ${invoice.invoice_number} (${invoice.client_name}) - ${invoice.status}`)
    })
    console.log()
  } else {
    console.log('📋 No existing invoices found.')
    console.log()
  }
}

async function main() {
  console.log('🚀 Creating test invoices for Absad MultiSynergy...\n')
  
  await checkExistingInvoices()
  await createTestInvoices()
}

main().catch(console.error)
