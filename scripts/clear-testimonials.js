#!/usr/bin/env node

/**
 * Script to clear all testimonials from the database
 * This removes any existing mock or test data
 */

require('dotenv').config({ path: '.env' });
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Supabase environment variables not found in .env file.');
  console.log('Please ensure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are set.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function clearTestimonials() {
  try {
    console.log('🔍 Checking current testimonials...');
    
    // First, check what testimonials exist
    const { data: existingTestimonials, error: fetchError } = await supabase
      .from('testimonials')
      .select('id, title, client_name, created_at')
      .order('created_at', { ascending: false });

    if (fetchError) {
      console.error('❌ Error fetching testimonials:', fetchError);
      return;
    }

    if (!existingTestimonials || existingTestimonials.length === 0) {
      console.log('✅ No testimonials found in database. Database is already clean.');
      return;
    }

    console.log(`📊 Found ${existingTestimonials.length} testimonials:`);
    existingTestimonials.forEach((testimonial, index) => {
      console.log(`   ${index + 1}. ${testimonial.title} (${testimonial.client_name})`);
    });

    // Delete all testimonials
    console.log('\n🗑️  Deleting all testimonials...');
    const { error: deleteError } = await supabase
      .from('testimonials')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000'); // Delete all records

    if (deleteError) {
      console.error('❌ Error deleting testimonials:', deleteError);
      return;
    }

    console.log('✅ Successfully cleared all testimonials from database.');
    console.log('🎯 The testimonials section will now show an empty state until you upload real videos.');

  } catch (err) {
    console.error('❌ Unexpected error:', err);
  }
}

// Run the script
clearTestimonials();
