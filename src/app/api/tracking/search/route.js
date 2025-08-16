import { NextResponse } from 'next/server'

// Mock tracking data for demonstration
const mockTrackingData = {
  'ABCD1234567': {
    containerId: 'ABCD1234567',
    status: 'In Transit',
    currentLocation: 'Mediterranean Sea',
    vessel: 'MSC OSCAR',
    origin: 'Lagos, Nigeria',
    destination: 'Hamburg, Germany',
    estimatedArrival: '2025-02-20T10:00:00Z',
    lastUpdated: '2025-01-15T14:30:00Z',
    progress: 65,
    containerType: '40ft High Cube',
    size: '40ft',
    weight: '28,500 kg',
    sealNumber: 'SL789456',
    timeline: [
      {
        status: 'In Transit',
        location: 'Mediterranean Sea',
        timestamp: '2025-01-15T14:30:00Z',
        description: 'Container is aboard vessel MSC OSCAR, sailing towards Hamburg'
      },
      {
        status: 'At Port',
        location: 'Port Said, Egypt',
        timestamp: '2025-01-14T08:15:00Z',
        description: 'Container transited through Suez Canal'
      },
      {
        status: 'In Transit',
        location: 'Red Sea',
        timestamp: '2025-01-12T16:45:00Z',
        description: 'Vessel departed from Jeddah Port'
      },
      {
        status: 'At Port',
        location: 'Jeddah, Saudi Arabia',
        timestamp: '2025-01-10T09:20:00Z',
        description: 'Container loaded onto connecting vessel'
      },
      {
        status: 'Loading',
        location: 'Lagos, Nigeria',
        timestamp: '2025-01-08T12:00:00Z',
        description: 'Container loaded at Apapa Port, Lagos'
      }
    ]
  },
  'EFGH9876543': {
    containerId: 'EFGH9876543',
    status: 'At Port',
    currentLocation: 'Hamburg Port, Germany',
    vessel: 'MAERSK ESSEX',
    origin: 'Lagos, Nigeria',
    destination: 'Hamburg, Germany',
    estimatedArrival: '2025-01-16T08:00:00Z',
    lastUpdated: '2025-01-15T16:45:00Z',
    progress: 95,
    containerType: '20ft Standard',
    size: '20ft',
    weight: '18,200 kg',
    sealNumber: 'SL123789',
    timeline: [
      {
        status: 'Customs',
        location: 'Hamburg Port, Germany',
        timestamp: '2025-01-15T16:45:00Z',
        description: 'Container undergoing customs clearance'
      },
      {
        status: 'At Port',
        location: 'Hamburg Port, Germany',
        timestamp: '2025-01-15T06:30:00Z',
        description: 'Container discharged from vessel'
      },
      {
        status: 'In Transit',
        location: 'North Sea',
        timestamp: '2025-01-13T14:20:00Z',
        description: 'Vessel approaching Hamburg Port'
      },
      {
        status: 'Loading',
        location: 'Lagos, Nigeria',
        timestamp: '2025-01-05T10:15:00Z',
        description: 'Container loaded at Apapa Port, Lagos'
      }
    ]
  },
  'IJKL5555555': {
    containerId: 'IJKL5555555',
    status: 'Delivered',
    currentLocation: 'Hamburg Warehouse District',
    vessel: 'CMA CGM MARCO POLO',
    origin: 'Lagos, Nigeria',
    destination: 'Hamburg, Germany',
    estimatedArrival: '2025-01-10T12:00:00Z',
    lastUpdated: '2025-01-12T09:15:00Z',
    progress: 100,
    containerType: '40ft Standard',
    size: '40ft',
    weight: '25,800 kg',
    sealNumber: 'SL456123',
    timeline: [
      {
        status: 'Delivered',
        location: 'Hamburg Warehouse District',
        timestamp: '2025-01-12T09:15:00Z',
        description: 'Container delivered to final destination'
      },
      {
        status: 'At Port',
        location: 'Hamburg Port, Germany',
        timestamp: '2025-01-10T14:30:00Z',
        description: 'Container cleared customs and ready for pickup'
      },
      {
        status: 'Customs',
        location: 'Hamburg Port, Germany',
        timestamp: '2025-01-10T08:45:00Z',
        description: 'Container undergoing customs inspection'
      },
      {
        status: 'At Port',
        location: 'Hamburg Port, Germany',
        timestamp: '2025-01-10T06:00:00Z',
        description: 'Container discharged from vessel'
      },
      {
        status: 'Loading',
        location: 'Lagos, Nigeria',
        timestamp: '2025-01-02T11:30:00Z',
        description: 'Container loaded at Apapa Port, Lagos'
      }
    ]
  }
}

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export async function POST(request) {
  try {
    const { containerId } = await request.json()

    // Validate input
    if (!containerId) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'VALIDATION_ERROR',
            message: 'Container ID is required'
          }
        },
        { status: 400 }
      )
    }

    // Simulate API processing time
    await delay(1500)

    // Check if container exists in our mock data
    const trackingData = mockTrackingData[containerId.toUpperCase()]

    if (!trackingData) {
      // Simulate different types of errors randomly for demo
      const errorTypes = [
        {
          code: 'CONTAINER_NOT_FOUND',
          message: 'Container not found. Please check the container ID and try again.'
        },
        {
          code: 'SERVICE_UNAVAILABLE',
          message: 'Tracking service is temporarily unavailable. Please try again later.'
        },
        {
          code: 'INVALID_CONTAINER_ID',
          message: 'Invalid container ID format. Please enter a valid container ID.'
        }
      ]

      const randomError = errorTypes[Math.floor(Math.random() * errorTypes.length)]

      return NextResponse.json(
        {
          success: false,
          error: randomError
        },
        { status: 404 }
      )
    }

    // Return successful tracking data
    return NextResponse.json({
      success: true,
      data: trackingData
    })

  } catch (error) {
    console.error('Tracking API error:', error)
    
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: 'An unexpected error occurred. Please try again later.'
        }
      },
      { status: 500 }
    )
  }
}

// Handle GET requests for direct URL access
export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const containerId = searchParams.get('id')

  if (!containerId) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Container ID parameter is required'
        }
      },
      { status: 400 }
    )
  }

  // Reuse POST logic
  return POST(new Request(request.url, {
    method: 'POST',
    body: JSON.stringify({ containerId })
  }))
}