import { NextResponse } from 'next/server'
import { withRateLimit, sanitize, fileUpload } from './security'

/**
 * Security middleware factory for API routes
 * Combines multiple security features into a single middleware
 */
export function createSecureAPIRoute(handler, options = {}) {
  const {
    rateLimit: rateLimitOptions = {},
    validation = null,
    sanitization = true,
    fileUpload: fileUploadOptions = null,
    auth = null
  } = options

  return async (request, context) => {
    try {
      let body = null

      // Handle different content types
      const contentType = request.headers.get('content-type') || ''
      
      if (contentType.includes('application/json')) {
        body = await request.json()
        
        // Apply sanitization if enabled
        if (sanitization && body) {
          body = sanitize.object(body)
        }
        
        // Apply validation if provided
        if (validation && body) {
          const validationResult = validation.safeParse(body)
          if (!validationResult.success) {
            return NextResponse.json(
              {
                success: false,
                error: {
                  code: 'VALIDATION_ERROR',
                  message: 'Please check your input and try again.',
                  details: validationResult.error.flatten().fieldErrors
                }
              },
              { status: 400 }
            )
          }
          body = validationResult.data
        }
      } else if (contentType.includes('multipart/form-data')) {
        // Handle file uploads
        const formData = await request.formData()
        
        if (fileUploadOptions) {
          const files = []
          for (const [key, value] of formData.entries()) {
            if (value instanceof File) {
              const fileValidation = fileUpload.validate(value, fileUploadOptions)
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
              files.push({ key, file: value })
            }
          }
          
          // Add validated files to request context
          request.validatedFiles = files
        }
        
        body = formData
      }

      // Add processed body to request
      request.validatedBody = body

      // Call the original handler
      return await handler(request, context)

    } catch (error) {
      console.error('Security middleware error:', error)
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
}

/**
 * Common security configurations for different endpoint types
 */
export const securityConfigs = {
  // Contact form endpoints
  contactForm: {
    rateLimit: {
      maxRequests: 5,
      windowMs: 15 * 60 * 1000, // 15 minutes
      message: 'Too many contact form submissions. Please wait before trying again.'
    },
    sanitization: true
  },

  // User management endpoints
  userManagement: {
    rateLimit: {
      maxRequests: 10,
      windowMs: 60 * 60 * 1000, // 1 hour
      message: 'Too many user management requests. Please wait before trying again.'
    },
    sanitization: true
  },

  // File upload endpoints
  fileUpload: {
    rateLimit: {
      maxRequests: 5,
      windowMs: 60 * 60 * 1000, // 1 hour
      message: 'Upload limit exceeded. Please wait before uploading more files.'
    },
    fileUpload: {
      allowedTypes: ['video/mp4', 'video/webm', 'video/ogg'],
      maxSize: 50 * 1024 * 1024, // 50MB
      allowedExtensions: ['mp4', 'webm', 'ogg']
    },
    sanitization: true
  },

  // General API endpoints
  general: {
    rateLimit: {
      maxRequests: 100,
      windowMs: 15 * 60 * 1000, // 15 minutes
      message: 'Too many requests. Please try again later.'
    },
    sanitization: true
  },

  // Authentication endpoints
  auth: {
    rateLimit: {
      maxRequests: 20,
      windowMs: 15 * 60 * 1000, // 15 minutes
      message: 'Too many authentication attempts. Please wait before trying again.'
    },
    sanitization: true
  }
}

/**
 * Quick security middleware application
 */
export function secureEndpoint(handler, configType = 'general') {
  const config = securityConfigs[configType] || securityConfigs.general
  
  // Apply rate limiting
  const rateLimitedHandler = withRateLimit(handler, config.rateLimit)
  
  // Apply other security measures
  return createSecureAPIRoute(rateLimitedHandler, config)
}

/**
 * Security response helpers
 */
export const securityResponses = {
  validationError: (details) => NextResponse.json(
    {
      success: false,
      error: {
        code: 'VALIDATION_ERROR',
        message: 'Please check your input and try again.',
        details
      }
    },
    { status: 400 }
  ),

  rateLimitExceeded: (retryAfter = 900) => NextResponse.json(
    {
      success: false,
      error: {
        code: 'RATE_LIMIT_EXCEEDED',
        message: 'Too many requests. Please try again later.'
      }
    },
    { 
      status: 429,
      headers: {
        'Retry-After': retryAfter.toString()
      }
    }
  ),

  unauthorized: () => NextResponse.json(
    {
      success: false,
      error: {
        code: 'UNAUTHORIZED',
        message: 'Authentication required.'
      }
    },
    { status: 401 }
  ),

  forbidden: () => NextResponse.json(
    {
      success: false,
      error: {
        code: 'FORBIDDEN',
        message: 'Insufficient permissions.'
      }
    },
    { status: 403 }
  ),

  fileValidationError: (message) => NextResponse.json(
    {
      success: false,
      error: {
        code: 'FILE_VALIDATION_ERROR',
        message
      }
    },
    { status: 400 }
  ),

  internalError: () => NextResponse.json(
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