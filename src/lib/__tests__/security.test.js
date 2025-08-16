import { 
  rateLimit, 
  getClientIP, 
  sanitize, 
  fileUpload, 
  password,
  csrf,
  sqlSafe
} from '../security'

// Mock request object for testing
const mockRequest = (headers = {}) => ({
  headers: {
    get: (key) => headers[key] || null
  }
})

describe('Security Utilities', () => {
  describe('Rate Limiting', () => {
    beforeEach(() => {
      // Clear rate limit store before each test
      const rateLimitStore = new Map()
    })

    test('allows requests within limit', () => {
      const identifier = 'test-ip'
      const result = rateLimit(identifier, 5, 60000) // 5 requests per minute
      expect(result).toBe(true)
    })

    test('blocks requests exceeding limit', () => {
      const identifier = 'test-ip-2'
      
      // Make 5 requests (should all pass)
      for (let i = 0; i < 5; i++) {
        expect(rateLimit(identifier, 5, 60000)).toBe(true)
      }
      
      // 6th request should be blocked
      expect(rateLimit(identifier, 5, 60000)).toBe(false)
    })
  })

  describe('IP Address Extraction', () => {
    test('extracts IP from x-forwarded-for header', () => {
      const request = mockRequest({
        'x-forwarded-for': '192.168.1.1, 10.0.0.1'
      })
      expect(getClientIP(request)).toBe('192.168.1.1')
    })

    test('extracts IP from x-real-ip header', () => {
      const request = mockRequest({
        'x-real-ip': '192.168.1.2'
      })
      expect(getClientIP(request)).toBe('192.168.1.2')
    })

    test('returns unknown for missing headers', () => {
      const request = mockRequest({})
      expect(getClientIP(request)).toBe('unknown')
    })
  })

  describe('Input Sanitization', () => {
    test('sanitizes HTML content', () => {
      const maliciousHtml = '<script>alert("xss")</script><p>Safe content</p>'
      const sanitized = sanitize.html(maliciousHtml)
      expect(sanitized).not.toContain('<script>')
      expect(sanitized).toContain('<p>Safe content</p>')
    })

    test('sanitizes plain text', () => {
      const maliciousText = 'Hello <script>alert("xss")</script> World'
      const sanitized = sanitize.text(maliciousText)
      expect(sanitized).toBe('Hello  World')
    })

    test('sanitizes email addresses', () => {
      const email = '  TEST@EXAMPLE.COM  '
      const sanitized = sanitize.email(email)
      expect(sanitized).toBe('test@example.com')
    })

    test('sanitizes filenames', () => {
      const filename = '../../../etc/passwd'
      const sanitized = sanitize.filename(filename)
      expect(sanitized).toBe('___etc_passwd')
    })

    test('sanitizes objects recursively', () => {
      const obj = {
        name: '<script>alert("xss")</script>John',
        email: '  TEST@EXAMPLE.COM  ',
        nested: {
          value: 'javascript:alert("xss")'
        }
      }
      const sanitized = sanitize.object(obj)
      expect(sanitized.name).toBe('John')
      expect(sanitized.email).toBe('test@example.com')
      expect(sanitized.nested.value).toBe('alert("xss")')
    })
  })

  describe('File Upload Security', () => {
    const createMockFile = (name, type, size) => ({
      name,
      type,
      size
    })

    test('validates file type correctly', () => {
      const validFile = createMockFile('test.mp4', 'video/mp4', 1000)
      const invalidFile = createMockFile('test.exe', 'application/exe', 1000)
      
      const validResult = fileUpload.validateType(validFile, ['video/mp4'])
      const invalidResult = fileUpload.validateType(invalidFile, ['video/mp4'])
      
      expect(validResult.valid).toBe(true)
      expect(invalidResult.valid).toBe(false)
    })

    test('validates file size correctly', () => {
      const smallFile = createMockFile('test.mp4', 'video/mp4', 1000)
      const largeFile = createMockFile('test.mp4', 'video/mp4', 10000000)
      
      const smallResult = fileUpload.validateSize(smallFile, 5000)
      const largeResult = fileUpload.validateSize(largeFile, 5000)
      
      expect(smallResult.valid).toBe(true)
      expect(largeResult.valid).toBe(false)
    })

    test('validates dangerous file names', () => {
      const safeFile = createMockFile('video.mp4', 'video/mp4', 1000)
      const dangerousFile = createMockFile('malware.exe', 'application/exe', 1000)
      const pathTraversalFile = createMockFile('../../../etc/passwd', 'text/plain', 1000)
      
      expect(fileUpload.validateName(safeFile).valid).toBe(true)
      expect(fileUpload.validateName(dangerousFile).valid).toBe(false)
      expect(fileUpload.validateName(pathTraversalFile).valid).toBe(false)
    })

    test('comprehensive file validation', () => {
      const validFile = createMockFile('video.mp4', 'video/mp4', 1000)
      const result = fileUpload.validate(validFile, {
        allowedTypes: ['video/mp4'],
        maxSize: 5000,
        allowedExtensions: ['mp4']
      })
      
      expect(result.valid).toBe(true)
    })
  })

  describe('Password Security', () => {
    test('validates strong password', () => {
      const strongPassword = 'StrongP@ssw0rd123'
      const result = password.validate(strongPassword)
      
      expect(result.valid).toBe(true)
      expect(result.strength).toBe(5)
      expect(result.strengthLabel).toBe('Strong')
    })

    test('rejects weak password', () => {
      const weakPassword = 'weak'
      const result = password.validate(weakPassword)
      
      expect(result.valid).toBe(false)
      expect(result.strength).toBeLessThan(5)
      expect(result.errors.length).toBeGreaterThan(0)
    })

    test('validates password requirements', () => {
      const noUpperCase = 'password123!'
      const noLowerCase = 'PASSWORD123!'
      const noNumbers = 'Password!'
      const noSpecialChar = 'Password123'
      const tooShort = 'Pass1!'
      
      expect(password.validate(noUpperCase).valid).toBe(false)
      expect(password.validate(noLowerCase).valid).toBe(false)
      expect(password.validate(noNumbers).valid).toBe(false)
      expect(password.validate(noSpecialChar).valid).toBe(false)
      expect(password.validate(tooShort).valid).toBe(false)
    })
  })

  describe('CSRF Protection', () => {
    test('generates valid token', () => {
      const token = csrf.generateToken()
      expect(token).toBeDefined()
      expect(typeof token).toBe('string')
      expect(token.length).toBeGreaterThan(0)
    })

    test('validates token correctly', () => {
      const token = 'test-token'
      const sessionToken = 'test-token'
      const invalidToken = 'invalid-token'
      
      expect(csrf.validateToken(token, sessionToken)).toBe(true)
      expect(csrf.validateToken(invalidToken, sessionToken)).toBe(false)
      expect(csrf.validateToken(null, sessionToken)).toBe(false)
      expect(csrf.validateToken(token, null)).toBe(false)
    })
  })

  describe('SQL Safety', () => {
    test('escapes SQL strings', () => {
      const maliciousString = "'; DROP TABLE users; --"
      const escaped = sqlSafe.escapeString(maliciousString)
      expect(escaped).toBe("''; DROP TABLE users\\; --")
    })

    test('validates SQL identifiers', () => {
      expect(sqlSafe.validateIdentifier('valid_table_name')).toBe(true)
      expect(sqlSafe.validateIdentifier('_valid_name')).toBe(true)
      expect(sqlSafe.validateIdentifier('123invalid')).toBe(false)
      expect(sqlSafe.validateIdentifier('invalid-name')).toBe(false)
      expect(sqlSafe.validateIdentifier('invalid name')).toBe(false)
    })
  })
})