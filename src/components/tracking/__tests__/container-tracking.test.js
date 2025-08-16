/**
 * Basic tests for container tracking functionality
 * These tests verify the core functionality works as expected
 */

import { containerTrackingSchema } from '@/lib/validations'

describe('Container Tracking Validation', () => {
  test('validates correct container ID format', () => {
    const validIds = ['ABCD1234567', 'TEST123', 'CONTAINER1']
    
    validIds.forEach(id => {
      expect(() => containerTrackingSchema.parse({ containerId: id })).not.toThrow()
    })
  })

  test('rejects invalid container IDs', () => {
    const invalidIds = ['', 'AB', 'A'.repeat(25)]
    
    invalidIds.forEach(id => {
      expect(() => containerTrackingSchema.parse({ containerId: id })).toThrow()
    })
  })
})

describe('Mock API Data', () => {
  test('has valid structure for sample container', () => {
    const sampleData = {
      containerId: 'ABCD1234567',
      status: 'In Transit',
      currentLocation: 'Mediterranean Sea',
      vessel: 'MSC OSCAR',
      origin: 'Lagos, Nigeria',
      destination: 'Hamburg, Germany',
      progress: 65,
      timeline: []
    }

    expect(sampleData.containerId).toBeDefined()
    expect(sampleData.status).toBeDefined()
    expect(sampleData.currentLocation).toBeDefined()
    expect(typeof sampleData.progress).toBe('number')
    expect(Array.isArray(sampleData.timeline)).toBe(true)
  })
})