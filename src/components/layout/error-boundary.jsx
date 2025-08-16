'use client'

import * as React from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { 
  AlertTriangle, 
  RefreshCw, 
  Home, 
  ArrowLeft,
  Bug,
  Wifi,
  Server
} from '@/components/ui/icons'

// Main Error Boundary Class Component
export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null, errorInfo: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    })
    
    // Log error to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Error Boundary caught an error:', error, errorInfo)
    }
    
    // Here you could send error to logging service
    // logErrorToService(error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <ErrorFallback
          error={this.state.error}
          errorInfo={this.state.errorInfo}
          resetError={() => this.setState({ hasError: false, error: null, errorInfo: null })}
          {...this.props}
        />
      )
    }

    return this.props.children
  }
}

// Error Fallback Component
function ErrorFallback({ 
  error, 
  errorInfo, 
  resetError, 
  showDetails = false,
  title = "Something went wrong",
  description = "We're sorry, but something unexpected happened. Please try again.",
  showHomeButton = true,
  showRefreshButton = true,
  className = ""
}) {
  const [showErrorDetails, setShowErrorDetails] = React.useState(showDetails)

  const handleRefresh = () => {
    resetError?.()
    window.location.reload()
  }

  const handleGoHome = () => {
    window.location.href = '/'
  }

  const handleGoBack = () => {
    window.history.back()
  }

  return (
    <div className={`min-h-screen flex items-center justify-center bg-background p-4 ${className}`}>
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-destructive/10 flex items-center justify-center">
            <AlertTriangle className="h-8 w-8 text-destructive" />
          </div>
          <CardTitle className="text-2xl font-bold text-foreground">
            {title}
          </CardTitle>
          <CardDescription className="text-base">
            {description}
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            {showRefreshButton && (
              <Button onClick={handleRefresh} className="hover-lift">
                <RefreshCw className="mr-2 h-4 w-4" />
                Try Again
              </Button>
            )}
            <Button variant="outline" onClick={handleGoBack}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go Back
            </Button>
            {showHomeButton && (
              <Button variant="outline" onClick={handleGoHome}>
                <Home className="mr-2 h-4 w-4" />
                Go Home
              </Button>
            )}
          </div>

          {/* Error Details Toggle */}
          {(error || errorInfo) && (
            <div className="text-center">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowErrorDetails(!showErrorDetails)}
                className="text-muted-foreground hover:text-foreground"
              >
                <Bug className="mr-2 h-4 w-4" />
                {showErrorDetails ? 'Hide' : 'Show'} Error Details
              </Button>
            </div>
          )}

          {/* Error Details */}
          {showErrorDetails && (error || errorInfo) && (
            <Alert className="text-left">
              <Bug className="h-4 w-4" />
              <AlertDescription>
                <div className="space-y-2">
                  {error && (
                    <div>
                      <strong>Error:</strong>
                      <pre className="mt-1 text-xs bg-muted p-2 rounded overflow-auto">
                        {error.toString()}
                      </pre>
                    </div>
                  )}
                  {errorInfo && (
                    <div>
                      <strong>Component Stack:</strong>
                      <pre className="mt-1 text-xs bg-muted p-2 rounded overflow-auto">
                        {errorInfo.componentStack}
                      </pre>
                    </div>
                  )}
                </div>
              </AlertDescription>
            </Alert>
          )}

          {/* Help Text */}
          <div className="text-center text-sm text-muted-foreground">
            <p>If this problem persists, please contact our support team.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Network Error Component
export function NetworkError({ onRetry, message = "Network connection failed" }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 space-y-4">
      <div className="h-16 w-16 rounded-full bg-destructive/10 flex items-center justify-center">
        <Wifi className="h-8 w-8 text-destructive" />
      </div>
      <div className="text-center space-y-2">
        <h3 className="text-lg font-semibold text-foreground">Connection Error</h3>
        <p className="text-muted-foreground">{message}</p>
      </div>
      {onRetry && (
        <Button onClick={onRetry} variant="outline">
          <RefreshCw className="mr-2 h-4 w-4" />
          Retry
        </Button>
      )}
    </div>
  )
}

// Server Error Component
export function ServerError({ onRetry, message = "Server error occurred" }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 space-y-4">
      <div className="h-16 w-16 rounded-full bg-destructive/10 flex items-center justify-center">
        <Server className="h-8 w-8 text-destructive" />
      </div>
      <div className="text-center space-y-2">
        <h3 className="text-lg font-semibold text-foreground">Server Error</h3>
        <p className="text-muted-foreground">{message}</p>
      </div>
      {onRetry && (
        <Button onClick={onRetry} variant="outline">
          <RefreshCw className="mr-2 h-4 w-4" />
          Retry
        </Button>
      )}
    </div>
  )
}

// Not Found Component
export function NotFound({ 
  title = "Page Not Found",
  description = "The page you're looking for doesn't exist or has been moved.",
  showHomeButton = true 
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <div className="mx-auto mb-4 text-6xl font-bold text-muted-foreground">
            404
          </div>
          <CardTitle className="text-2xl font-bold text-foreground">
            {title}
          </CardTitle>
          <CardDescription>
            {description}
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button variant="outline" onClick={() => window.history.back()}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go Back
            </Button>
            {showHomeButton && (
              <Button onClick={() => window.location.href = '/'}>
                <Home className="mr-2 h-4 w-4" />
                Go Home
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Unauthorized Access Component
export function Unauthorized({ 
  title = "Access Denied",
  description = "You don't have permission to access this resource.",
  showLoginButton = true 
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-destructive/10 flex items-center justify-center">
            <AlertTriangle className="h-8 w-8 text-destructive" />
          </div>
          <CardTitle className="text-2xl font-bold text-foreground">
            {title}
          </CardTitle>
          <CardDescription>
            {description}
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            {showLoginButton && (
              <Button onClick={() => window.location.href = '/admin/login'}>
                Login
              </Button>
            )}
            <Button variant="outline" onClick={() => window.location.href = '/'}>
              <Home className="mr-2 h-4 w-4" />
              Go Home
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Hook for handling async errors
export function useErrorHandler() {
  const [error, setError] = React.useState(null)

  const resetError = React.useCallback(() => {
    setError(null)
  }, [])

  const handleError = React.useCallback((error) => {
    console.error('Async error caught:', error)
    setError(error)
  }, [])

  return { error, resetError, handleError }
}