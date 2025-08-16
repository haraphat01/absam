# Container Tracking System

A comprehensive container tracking system for Absad MultiSynergy Limited that allows customers to track their shipments in real-time.

## Features

### 🔍 Modern Search Interface
- Beautiful, responsive search form with validation feedback
- Real-time input validation with user-friendly error messages
- Sample container IDs for easy testing
- Loading states with smooth animations

### 📊 Elegant Results Display
- Status cards with color-coded indicators
- Progress bar showing journey completion
- Key information grid (location, vessel, ETA)
- Route visualization with origin and destination

### 📅 Timeline Visualization
- Complete journey history with timestamps
- Status-specific icons and colors
- Detailed event descriptions
- Visual timeline with connecting lines

### 🛠️ Error Handling & Retry
- Graceful error handling with user-friendly messages
- Retry functionality for failed requests
- Different error types (not found, service unavailable, invalid format)
- Clear error states with actionable buttons

### 📱 Responsive Design
- Mobile-first design approach
- Optimized layouts for all screen sizes
- Touch-friendly interactions
- Consistent spacing and typography

## Components

### ContainerTrackingPage
Main page component that orchestrates the tracking functionality.

**Props:** None

**Features:**
- Hero section with company branding
- Search form integration
- Results display management
- Error state handling

### ContainerSearchForm
Search form component with validation and user experience enhancements.

**Props:**
- `onSearch(containerId)` - Callback when search is submitted
- `isLoading` - Boolean indicating if search is in progress

**Features:**
- Input validation using Zod schema
- Floating label effects
- Sample container ID suggestions
- Clear functionality

### TrackingResults
Results display component showing container tracking information.

**Props:**
- `data` - Tracking data object
- `error` - Error message string
- `isLoading` - Loading state boolean
- `onRetry()` - Retry callback function

**Features:**
- Status cards with color coding
- Progress visualization
- Timeline display
- Action buttons (refresh, print, share)

## API Integration

### Endpoint: `/api/tracking/search`

**Method:** POST

**Request Body:**
```json
{
  "containerId": "ABCD1234567"
}
```

**Success Response:**
```json
{
  "success": true,
  "data": {
    "containerId": "ABCD1234567",
    "status": "In Transit",
    "currentLocation": "Mediterranean Sea",
    "vessel": "MSC OSCAR",
    "origin": "Lagos, Nigeria",
    "destination": "Hamburg, Germany",
    "estimatedArrival": "2025-02-20T10:00:00Z",
    "lastUpdated": "2025-01-15T14:30:00Z",
    "progress": 65,
    "containerType": "40ft High Cube",
    "size": "40ft",
    "weight": "28,500 kg",
    "sealNumber": "SL789456",
    "timeline": [...]
  }
}
```

**Error Response:**
```json
{
  "success": false,
  "error": {
    "code": "CONTAINER_NOT_FOUND",
    "message": "Container not found. Please check the container ID and try again."
  }
}
```

## Status Types

The system supports the following container statuses:

- **In Transit** - Container is on the vessel traveling
- **At Port** - Container is at a port facility
- **Delivered** - Container has reached final destination
- **Delayed** - Container shipment is delayed
- **Loading** - Container is being loaded onto vessel
- **Customs** - Container is undergoing customs processing

Each status has associated colors, icons, and styling for visual consistency.

## Sample Data

For testing purposes, the following container IDs are available:

- `ABCD1234567` - In Transit from Lagos to Hamburg
- `EFGH9876543` - At Port in Hamburg (customs clearance)
- `IJKL5555555` - Delivered to Hamburg Warehouse District

## Validation

Container ID validation includes:
- Minimum 4 characters
- Maximum 20 characters
- Alphanumeric characters only
- Required field validation

## Styling

The tracking system uses:
- Tailwind CSS for responsive design
- Custom design tokens for consistent colors
- Smooth animations and transitions
- Professional shadows and effects
- Mobile-first responsive breakpoints

## Error Handling

The system handles various error scenarios:
- Container not found
- Service unavailable
- Invalid container ID format
- Network errors
- Timeout errors

Each error type provides specific user guidance and retry options.

## Accessibility

- Proper ARIA labels and descriptions
- Keyboard navigation support
- Screen reader friendly
- High contrast color ratios
- Focus management

## Performance

- Lazy loading for non-critical components
- Optimized API calls with proper loading states
- Efficient re-rendering with React best practices
- Image optimization for hero sections
- Minimal bundle size impact

## Future Enhancements

Potential improvements for the tracking system:
- Real-time WebSocket updates
- Email/SMS notifications
- PDF tracking reports
- Multi-language support
- Advanced filtering and search
- Integration with actual shipping APIs
- Offline support with service workers