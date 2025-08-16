import { NextResponse } from 'next/server'
import DOMPurify from 'isomorphic-dompurify'

// Rate limiting store (in production, use Redis or similar)
const rateLimitStore = new Map()

/**
 * Rate limiting middleware
 * @param {string} identifier - Unique identifier (IP, user ID, etc.)
 * @param {number} maxRequests - Maximum requests allowed
 * @param {number} windowMs - Time window in milliseconds
 * @returns {boolean} - Whether request is allowed
 */
export function rateLimit(identifier, maxRequests = 100, windowMs = 15 * 60 * 1000) {
  const now = Date.now()
  const windowStart = now - windowMs
  
  // Get or create rate limit data for this identifier
  if (!rateLimitStore.has(identifier)) {
    rateLimitStore.set(identifier, [])
  }
  
  const requests = rateLimitStore.get(identifier)
  
  // Remove old requests outside the window
  const validRequests = requests.filter(timestamp => timestamp > windowStart)
  
  // Check if limit exceeded
  if (validRequests.length >= maxRequests) {
    return false
  }
  
  // Add current request
  validRequests.push(now)
  rateLimitStore.set(identifier, validRequests)
  
  return true
}

/**
 * Get client IP address from request
 * @param {Request} request - Next.js request object
 * @returns {string} - Client IP address
 */
export function getClientIP(request) {
  // Check various headers for IP address
  const forwarded = request.headers.get('x-forwarded-for')
  const realIP = request.headers.get('x-real-ip')
  const cfConnectingIP = request.headers.get('cf-connecting-ip')
  
  if (forwarded) {
    return forwarded.split(',')[0].trim()
  }
  
  if (realIP) {
    return realIP
  }
  
  if (cfConnectingIP) {
    return cfConnectingIP
  }
  
  return 'unknown'
}

/**
 * Rate limiting middleware for API routes
 * @param {Function} handler - API route handler
 * @param {Object} options - Rate limiting options
 * @returns {Function} - Wrapped handler with rate limiting
 */
export function withRateLimit(handler, options = {}) {
  const {
    maxRequests = 100,
    windowMs = 15 * 60 * 1000, // 15 minutes
    message = 'Too many requests, please try again later.',
    skipSuccessfulRequests = false,
    keyGenerator = (request) => getClientIP(request)
  } = options

  return async (request, context) => {
    const identifier = keyGenerator(request)
    
    if (!rateLimit(identifier, maxRequests, windowMs)) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'RATE_LIMIT_EXCEEDED',
            message
          }
        },
        { 
          status: 429,
          headers: {
            'Retry-After': Math.ceil(windowMs / 1000).toString()
          }
        }
      )
    }
    
    return handler(request, context)
  }
}

/**
 * Input sanitization utilities
 */
export const sanitize = {
  /**
   * Sanitize HTML content
   * @param {string} html - HTML content to sanitize
   * @returns {string} - Sanitized HTML
   */
  html: (html) => {
    if (typeof html !== 'string') return ''
    return DOMPurify.sanitize(html, {
      ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'p', 'br', 'ul', 'ol', 'li'],
      ALLOWED_ATTR: []
    })
  },

  /**
   * Sanitize plain text
   * @param {string} text - Text to sanitize
   * @returns {string} - Sanitized text
   */
  text: (text) => {
    if (typeof text !== 'string') return ''
    return text
      .replace(/<[^>]*>/g, '') // Remove HTML tags
      .replace(/javascript:/gi, '') // Remove javascript: protocol
      .replace(/on\w+=/gi, '') // Remove event handlers
      .replace(/[<>{}]/g, '') // Remove remaining dangerous characters
      .trim()
  },

  /**
   * Sanitize email address
   * @param {string} email - Email to sanitize
   * @returns {string} - Sanitized email
   */
  email: (email) => {
    if (typeof email !== 'string') return ''
    return email.toLowerCase().trim().replace(/[^\w@.-]/g, '')
  },

  /**
   * Sanitize filename
   * @param {string} filename - Filename to sanitize
   * @returns {string} - Sanitized filename
   */
  filename: (filename) => {
    if (typeof filename !== 'string') return ''
    return filename
      .replace(/[^a-zA-Z0-9.-]/g, '_') // Replace special chars with underscore
      .replace(/_{2,}/g, '_') // Replace multiple underscores with single
      .replace(/^_+|_+$/g, '') // Remove leading/trailing underscores
      .substring(0, 255) // Limit length
  },

  /**
   * Sanitize object recursively
   * @param {Object} obj - Object to sanitize
   * @returns {Object} - Sanitized object
   */
  object: (obj) => {
    if (!obj || typeof obj !== 'object') return obj
    
    const sanitized = {}
    for (const [key, value] of Object.entries(obj)) {
      if (typeof value === 'string') {
        sanitized[key] = sanitize.text(value)
      } else if (typeof value === 'object' && value !== null) {
        sanitized[key] = sanitize.object(value)
      } else {
        sanitized[key] = value
      }
    }
    return sanitized
  }
}

/**
 * File upload security utilities
 */
export const fileUpload = {
  /**
   * Validate file type
   * @param {File} file - File to validate
   * @param {string[]} allowedTypes - Allowed MIME types
   * @returns {Object} - Validation result
   */
  validateType: (file, allowedTypes) => {
    if (!file || !file.type) {
      return { valid: false, error: 'No file or file type provided' }
    }
    
    if (!allowedTypes.includes(file.type)) {
      return { 
        valid: false, 
        error: `Invalid file type. Allowed types: ${allowedTypes.join(', ')}` 
      }
    }
    
    return { valid: true }
  },

  /**
   * Validate file size
   * @param {File} file - File to validate
   * @param {number} maxSize - Maximum size in bytes
   * @returns {Object} - Validation result
   */
  validateSize: (file, maxSize) => {
    if (!file || !file.size) {
      return { valid: false, error: 'No file or file size provided' }
    }
    
    if (file.size > maxSize) {
      const maxSizeMB = Math.round(maxSize / (1024 * 1024))
      return { 
        valid: false, 
        error: `File too large. Maximum size: ${maxSizeMB}MB` 
      }
    }
    
    return { valid: true }
  },

  /**
   * Validate file name
   * @param {File} file - File to validate
   * @returns {Object} - Validation result
   */
  validateName: (file) => {
    if (!file || !file.name) {
      return { valid: false, error: 'No file or filename provided' }
    }
    
    // Check for dangerous file extensions
    const dangerousExtensions = [
      '.exe', '.bat', '.cmd', '.com', '.pif', '.scr', '.vbs', '.js', '.jar',
      '.php', '.asp', '.aspx', '.jsp', '.py', '.rb', '.pl', '.sh'
    ]
    
    const fileName = file.name.toLowerCase()
    const hasDangerousExtension = dangerousExtensions.some(ext => 
      fileName.endsWith(ext)
    )
    
    if (hasDangerousExtension) {
      return { 
        valid: false, 
        error: 'File type not allowed for security reasons' 
      }
    }
    
    // Check for null bytes and other dangerous characters
    if (fileName.includes('\0') || fileName.includes('..')) {
      return { 
        valid: false, 
        error: 'Invalid filename characters' 
      }
    }
    
    return { valid: true }
  },

  /**
   * Comprehensive file validation
   * @param {File} file - File to validate
   * @param {Object} options - Validation options
   * @returns {Object} - Validation result
   */
  validate: (file, options = {}) => {
    const {
      allowedTypes = [],
      maxSize = 10 * 1024 * 1024, // 10MB default
      allowedExtensions = []
    } = options

    // Validate file exists
    if (!file) {
      return { valid: false, error: 'No file provided' }
    }

    // Validate file name
    const nameValidation = fileUpload.validateName(file)
    if (!nameValidation.valid) {
      return nameValidation
    }

    // Validate file type
    if (allowedTypes.length > 0) {
      const typeValidation = fileUpload.validateType(file, allowedTypes)
      if (!typeValidation.valid) {
        return typeValidation
      }
    }

    // Validate file size
    const sizeValidation = fileUpload.validateSize(file, maxSize)
    if (!sizeValidation.valid) {
      return sizeValidation
    }

    // Validate file extension if specified
    if (allowedExtensions.length > 0) {
      const extension = file.name.toLowerCase().split('.').pop()
      if (!allowedExtensions.includes(extension)) {
        return {
          valid: false,
          error: `Invalid file extension. Allowed: ${allowedExtensions.join(', ')}`
        }
      }
    }

    return { valid: true }
  }
}

/**
 * Security headers configuration
 */
export const securityHeaders = {
  'X-Frame-Options': 'DENY',
  'X-Content-Type-Options': 'nosniff',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
  'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https:; media-src 'self' https:; object-src 'none'; frame-src 'none';"
}

/**
 * Apply security headers to response
 * @param {NextResponse} response - Response object
 * @returns {NextResponse} - Response with security headers
 */
export function applySecurityHeaders(response) {
  Object.entries(securityHeaders).forEach(([key, value]) => {
    response.headers.set(key, value)
  })
  return response
}

/**
 * CSRF protection utilities
 */
export const csrf = {
  /**
   * Generate CSRF token
   * @returns {string} - CSRF token
   */
  generateToken: () => {
    return crypto.randomUUID()
  },

  /**
   * Validate CSRF token
   * @param {string} token - Token to validate
   * @param {string} sessionToken - Session token
   * @returns {boolean} - Whether token is valid
   */
  validateToken: (token, sessionToken) => {
    return token === sessionToken && token && sessionToken
  }
}

/**
 * SQL injection prevention utilities
 */
export const sqlSafe = {
  /**
   * Escape SQL string
   * @param {string} str - String to escape
   * @returns {string} - Escaped string
   */
  escapeString: (str) => {
    if (typeof str !== 'string') return str
    return str.replace(/'/g, "''").replace(/;/g, '\\;')
  },

  /**
   * Validate SQL identifier (table/column names)
   * @param {string} identifier - Identifier to validate
   * @returns {boolean} - Whether identifier is safe
   */
  validateIdentifier: (identifier) => {
    if (typeof identifier !== 'string') return false
    return /^[a-zA-Z_][a-zA-Z0-9_]*$/.test(identifier)
  }
}

/**
 * Password security utilities
 */
export const password = {
  /**
   * Validate password strength
   * @param {string} password - Password to validate
   * @returns {Object} - Validation result with strength score
   */
  validate: (password) => {
    if (!password || typeof password !== 'string') {
      return { valid: false, error: 'Password is required', strength: 0 }
    }

    const minLength = 8
    const hasUpperCase = /[A-Z]/.test(password)
    const hasLowerCase = /[a-z]/.test(password)
    const hasNumbers = /\d/.test(password)
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password)

    let strength = 0
    const errors = []

    if (password.length < minLength) {
      errors.push(`Password must be at least ${minLength} characters long`)
    } else {
      strength += 1
    }

    if (!hasUpperCase) {
      errors.push('Password must contain at least one uppercase letter')
    } else {
      strength += 1
    }

    if (!hasLowerCase) {
      errors.push('Password must contain at least one lowercase letter')
    } else {
      strength += 1
    }

    if (!hasNumbers) {
      errors.push('Password must contain at least one number')
    } else {
      strength += 1
    }

    if (!hasSpecialChar) {
      errors.push('Password must contain at least one special character')
    } else {
      strength += 1
    }

    const strengthLabels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong']
    return {
      valid: errors.length === 0,
      errors,
      strength,
      strengthLabel: strengthLabels[Math.min(strength, strengthLabels.length - 1)]
    }
  }
}