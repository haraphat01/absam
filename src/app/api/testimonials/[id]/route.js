import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function DELETE(request, { params }) {
  try {
    const { id } = await params

    if (!id) {
      return NextResponse.json(
        { error: 'Testimonial ID is required' },
        { status: 400 }
      )
    }

    // In a real implementation, you would delete from Supabase
    // const { error } = await supabase
    //   .from('testimonials')
    //   .delete()
    //   .eq('id', id)

    // if (error) {
    //   console.error('Database error:', error)
    //   return NextResponse.json(
    //     { error: 'Failed to delete testimonial' },
    //     { status: 500 }
    //   )
    // }

    // For now, just return success (mock implementation)
    console.log(`Mock: Deleting testimonial with ID: ${id}`)

    return NextResponse.json({ 
      success: true, 
      message: 'Testimonial deleted successfully' 
    })
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET(request, { params }) {
  try {
    const { id } = await params

    if (!id) {
      return NextResponse.json(
        { error: 'Testimonial ID is required' },
        { status: 400 }
      )
    }

    // In a real implementation, you would fetch from Supabase
    // const { data, error } = await supabase
    //   .from('testimonials')
    //   .select(`
    //     id,
    //     video_url,
    //     title,
    //     client_name,
    //     created_at,
    //     uploaded_by,
    //     users:uploaded_by (
    //       email
    //     )
    //   `)
    //   .eq('id', id)
    //   .single()

    // For now, return mock data
    const mockTestimonial = {
      id,
      video_url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      title: 'Sample Testimonial',
      client_name: 'John Doe',
      created_at: new Date().toISOString(),
      uploaded_by: null,
      users: null
    }

    return NextResponse.json({ testimonial: mockTestimonial })
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}