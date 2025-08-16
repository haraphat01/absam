'use client'

import * as React from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { Search, AlertCircle } from '@/components/ui/icons'
import { cn } from '@/lib/utils'
import { containerTrackingSchema } from '@/lib/validations'

export function ContainerSearchForm({ onSearch, isLoading }) {
  const [containerId, setContainerId] = React.useState('')
  const [validationError, setValidationError] = React.useState('')
  const [isFocused, setIsFocused] = React.useState(false)

  const validateContainerId = (id) => {
    try {
      containerTrackingSchema.parse({ containerId: id })
      
      // Additional format validation for demo purposes
      if (!/^[A-Z0-9]+$/i.test(id)) {
        return 'Container ID can only contain letters and numbers'
      }
      
      return ''
    } catch (error) {
      return error.errors[0]?.message || 'Invalid container ID'
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    const error = validateContainerId(containerId)
    if (error) {
      setValidationError(error)
      return
    }
    
    setValidationError('')
    onSearch(containerId.toUpperCase())
  }

  const handleInputChange = (e) => {
    const value = e.target.value.toUpperCase()
    setContainerId(value)
    
    // Clear validation error when user starts typing
    if (validationError) {
      setValidationError('')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <div className="relative">
          <div 
            className={cn(
              "relative transition-all duration-300 ease-elegant",
              isFocused && "transform scale-[1.02]"
            )}
          >
            <Input
              type="text"
              placeholder="Enter container ID (e.g., ABCD1234567)"
              value={containerId}
              onChange={handleInputChange}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              disabled={isLoading}
              className={cn(
                "h-14 text-lg pl-14 pr-4 rounded-xl border-2 transition-all duration-300 ease-elegant",
                "focus:border-primary focus:ring-primary/20 focus:ring-4",
                "hover:border-primary/50 hover:shadow-elegant",
                validationError && "border-red-500 focus:border-red-500 focus:ring-red-500/20",
                isLoading && "opacity-50 cursor-not-allowed"
              )}
              aria-invalid={!!validationError}
              aria-describedby={validationError ? "container-id-error" : undefined}
            />
            <div className="absolute left-4 top-1/2 -translate-y-1/2">
              <Search className={cn(
                "h-6 w-6 transition-colors duration-300",
                isFocused ? "text-primary" : "text-muted-foreground"
              )} />
            </div>
          </div>
          
          {/* Floating label effect */}
          <div className={cn(
            "absolute left-14 top-1/2 -translate-y-1/2 pointer-events-none transition-all duration-300 ease-elegant text-muted-foreground",
            (isFocused || containerId) && "opacity-0 transform -translate-y-8 scale-90"
          )}>
            <span className="text-lg">Enter container ID...</span>
          </div>
        </div>
        
        {validationError && (
          <div 
            id="container-id-error"
            className="flex items-center space-x-2 text-red-600 text-sm animate-fade-in"
          >
            <AlertCircle className="h-4 w-4 flex-shrink-0" />
            <span>{validationError}</span>
          </div>
        )}
        
        <div className="text-xs text-muted-foreground space-y-1">
          <p>• Container ID format: 4 letters followed by 7 numbers (e.g., ABCD1234567)</p>
          <p>• You can find this on your shipping documents or booking confirmation</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <Button
          type="submit"
          size="lg"
          disabled={isLoading || !containerId.trim()}
          className={cn(
            "flex-1 h-14 text-lg font-semibold rounded-xl transition-all duration-300 ease-elegant",
            "hover:shadow-elegant-lg hover:scale-105 active:scale-95",
            "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          )}
        >
          {isLoading ? (
            <>
              <LoadingSpinner className="mr-3 h-5 w-5" />
              Tracking Container...
            </>
          ) : (
            <>
              <Search className="mr-3 h-5 w-5" />
              Track Container
            </>
          )}
        </Button>
        
        {containerId && !isLoading && (
          <Button
            type="button"
            variant="outline"
            size="lg"
            onClick={() => {
              setContainerId('')
              setValidationError('')
            }}
            className="h-14 px-6 rounded-xl hover:scale-105 active:scale-95 transition-all duration-300 ease-elegant"
          >
            Clear
          </Button>
        )}
      </div>

      {/* Example container IDs for demo */}
      <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
        <p className="text-sm font-medium text-slate-700 mb-2">Try these sample container IDs:</p>
        <div className="flex flex-wrap gap-2">
          {['ABCD1234567', 'EFGH9876543', 'IJKL5555555'].map((sampleId) => (
            <button
              key={sampleId}
              type="button"
              onClick={() => setContainerId(sampleId)}
              disabled={isLoading}
              className={cn(
                "px-3 py-1 text-xs font-mono bg-white border border-slate-300 rounded-md",
                "hover:bg-primary hover:text-white hover:border-primary transition-all duration-200",
                "disabled:opacity-50 disabled:cursor-not-allowed"
              )}
            >
              {sampleId}
            </button>
          ))}
        </div>
      </div>
    </form>
  )
}