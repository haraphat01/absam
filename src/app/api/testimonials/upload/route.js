import { NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase'
import { withAuth } from '@/lib/auth-server'
import { withRateLimit, fileUpload, sanitize } from '@/lib/security'
import { videoUploadSchema } from '@/lib/validations'

const MAX_FILE_SIZE = 50 * 1024 * 1024 // 50MB
const ALLOWED_TYPES = ['video/mp4', 'video/webm', 'video/ogg']
const ALLOWED_EXTENSIONS = ['mp4', 'webm', 'ogg']

async function POST(request) {
  try {
    const { userProfile } = request.auth
    
    // Only admins can upload testimonials
    if (userProfile.role !== 'ADMIN') {
      return NextResponse.json(
        { success: false, error: 'Insufficient permissions' },
        { status: 403 }
      )
    }

    const formData = await request.formData()
    const file = formData.get('video_file')
    const title = formData.get('title')
    const clientName = formData.get('client_name')

    // Validate form data
    const validation = videoUploadSchema.safeParse({
      title: sanitize.text(title),
      client_name: sanitize.text(clientName)
    })

    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'VALIDATION_ERROR',
            message: 'Please check your input and try again.',
            details: validation.error.flatten().fieldErrors
          }
        },
        { status: 400 }
      )
    }

    // Validate file
    if (!file || !(file instanceof File)) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'FILE_REQUIRED',
            message: 'Video file is required'
          }
        },
        { status: 400 }
      )
    }

    const fileValidation = fileUpload.validate(file, {
      allowedTypes: ALLOWED_TYPES,
      maxSize: MAX_FILE_SIZE,
      allowedExtensions: ALLOWED_EXTENSIONS
    })

    if (!fileValidation.valid) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'FILE_VALIDATION_ERROR',
            message: fileValidation.error
          }
        },
        { status: 400 }
      )
    }

    const supabase = createServerClient()

    // Generate secure filename
    const timestamp = Date.now()
    const randomString = Math.random().toString(36).substring(2, 15)
    const extension = file.name.split('.').pop().toLowerCase()
    const secureFilename = `testimonial-${timestamp}-${randomString}.${extension}`
    const filePath = `testimonials/${secureFilename}`

    // Upload file to Supabase Storage
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('testimonials')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false,
        contentType: file.type
      })

    if (uploadError) {
      console.error('File upload error:', uploadError)
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'UPLOAD_ERROR',
            message: 'Failed to upload video file'
          }
        },
        { status: 500 }
      )
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from('testimonials')
      .getPublicUrl(filePath)

    // Save testimonial record to database
    const { data: testimonial, error: dbError } = await supabase
      .from('testimonials')
      .insert({
        video_url: urlData.publicUrl,
        title: validation.data.title,
        client_name: validation.data.client_name,
        uploaded_by: userProfile.id,
        is_active: true
      })
      .select(`
        id,
        video_url,
        title,
        client_name,
        created_at,
        uploaded_by,
        users!uploaded_by(email)
      `)
      .single()

    if (dbError) {
      console.error('Database error:', dbError)
      
      // Cleanup: delete uploaded file if database insert fails
      await supabase.storage
        .from('testimonials')
        .remove([filePath])
      
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'DATABASE_ERROR',
            message: 'Failed to save testimonial record'
          }
        },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      data: testimonial,
      message: 'Testimonial uploaded successfully'
    }, { status: 201 })

  } catch (error) {
    console.error('Testimonial upload error:', error)
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: 'Something went wrong. Please try again later.'
        }
      },
      { status: 500 }
    )
  }
}

// Apply authentication and rate limiting
const AuthenticatedPOST = withAuth(POST, 'ADMIN')
const RateLimitedPOST = withRateLimit(AuthenticatedPOST, {
  maxRequests: 5, // 5 uploads per hour
  windowMs: 60 * 60 * 1000,
  message: 'Upload limit exceeded. Please wait before uploading more videos.'
})

export { RateLimitedPOST as POST }