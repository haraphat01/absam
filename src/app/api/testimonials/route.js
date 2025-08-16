import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// Mock data for development/testing
const mockTestimonials = [
  {
    id: '1',
    video_url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    title: 'Excellent Service and Quality Products',
    client_name: 'John Smith',
    created_at: '2024-01-15T10:30:00Z',
    uploaded_by: null,
    users: null
  },
  {
    id: '2',
    video_url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    title: 'Reliable Import Partner for Our Business',
    client_name: 'Sarah Johnson',
    created_at: '2024-01-10T14:20:00Z',
    uploaded_by: null,
    users: null
  },
  {
    id: '3',
    video_url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    title: 'Outstanding Customer Support',
    client_name: 'Michael Brown',
    created_at: '2024-01-05T09:15:00Z',
    uploaded_by: null,
    users: null
  },
  {
    id: '4',
    video_url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    title: 'High Quality Charcoal Products',
    client_name: 'Emily Davis',
    created_at: '2023-12-28T16:45:00Z',
    uploaded_by: null,
    users: null
  },
  {
    id: '5',
    video_url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    title: 'Professional and Timely Delivery',
    client_name: 'David Wilson',
    created_at: '2023-12-20T11:30:00Z',
    uploaded_by: null,
    users: null
  },
  {
    id: '6',
    video_url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
    title: 'Trusted Export Partner',
    client_name: 'Lisa Anderson',
    created_at: '2023-12-15T13:20:00Z',
    uploaded_by: null,
    users: null
  }
]

export async function GET() {
  try {
    // Try to fetch from database first
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

    // If database is not set up or has no data, return mock data
    if (error || !data || data.length === 0) {
      console.log('Using mock testimonials data for development')
      return NextResponse.json({ testimonials: mockTestimonials })
    }

    return NextResponse.json({ testimonials: data })
  } catch (error) {
    console.error('API error:', error)
    // Return mock data as fallback
    return NextResponse.json({ testimonials: mockTestimonials })
  }
}