import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET() {
  try {
    // Fetch testimonials from database
    const { data, error } = await supabase
      .from('testimonials')
      .select(`
        id,
        video_url,
        title,
        client_name,
        created_at,
        uploaded_by,
        users:uploaded_by (
          email
        )
      `)
      .eq('is_active', true)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json(
        { error: 'Failed to fetch testimonials' },
        { status: 500 }
      )
    }

    // Return real testimonials data (empty array if no testimonials exist)
    return NextResponse.json({ testimonials: data || [] })
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}