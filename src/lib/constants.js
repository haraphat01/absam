// User roles
export const USER_ROLES = {
  ADMIN: 'ADMIN',
  STAFF: 'STAFF',
}

// Invoice statuses
export const INVOICE_STATUS = {
  PAID: 'PAID',
  UNPAID: 'UNPAID',
}

// Container tracking statuses
export const CONTAINER_STATUS = {
  IN_TRANSIT: 'In Transit',
  DELIVERED: 'Delivered',
  CUSTOMS: 'At Customs',
  LOADING: 'Loading',
  DISCHARGED: 'Discharged',
}

// File upload limits
export const FILE_LIMITS = {
  VIDEO_MAX_SIZE: 100 * 1024 * 1024, // 100MB
  VIDEO_ALLOWED_TYPES: ['video/mp4', 'video/webm', 'video/ogg'],
  PDF_MAX_SIZE: 10 * 1024 * 1024, // 10MB
}

// API endpoints
export const API_ENDPOINTS = {
  INVOICES: '/api/invoices',
  TESTIMONIALS: '/api/testimonials',
  TRACKING: '/api/tracking',
  CONTACT: '/api/contact',
  USERS: '/api/users',
  SETTINGS: '/api/settings',
}

// Company information
export const COMPANY_INFO = {
  name: 'Absad MultiSynergy Limited',
  address: 'Lagos, Nigeria',
  phone: '+234-XXX-XXX-XXXX',
  email: 'info@absadmultisynergy.com',
  website: 'www.absadmultisynergy.com',
}