import * as React from "react"
import { cn } from "@/lib/utils"

const LoadingSpinner = React.forwardRef(({ 
  className, 
  size = "default", 
  variant = "default",
  ...props 
}, ref) => {
  const sizeClasses = {
    sm: "h-4 w-4",
    default: "h-6 w-6", 
    lg: "h-8 w-8",
    xl: "h-12 w-12"
  }

  const variantClasses = {
    default: "text-primary",
    secondary: "text-secondary", 
    accent: "text-accent",
    white: "text-white",
    muted: "text-muted-foreground"
  }

  return (
    <div
      ref={ref}
      className={cn(
        "animate-spin rounded-full border-2 border-current border-t-transparent",
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
      {...props}
    >
      <span className="sr-only">Loading...</span>
    </div>
  )
})

LoadingSpinner.displayName = "LoadingSpinner"

// Enhanced loading spinner with gradient
const GradientSpinner = React.forwardRef(({ 
  className, 
  size = "default",
  ...props 
}, ref) => {
  const sizeClasses = {
    sm: "h-4 w-4",
    default: "h-6 w-6", 
    lg: "h-8 w-8",
    xl: "h-12 w-12"
  }

  return (
    <div
      ref={ref}
      className={cn(
        "relative",
        sizeClasses[size],
        className
      )}
      {...props}
    >
      <div className="absolute inset-0 rounded-full border-2 border-primary/20" />
      <div className="absolute inset-0 rounded-full border-2 border-t-primary border-r-secondary border-b-accent border-l-transparent animate-spin" />
      <span className="sr-only">Loading...</span>
    </div>
  )
})

GradientSpinner.displayName = "GradientSpinner"

// Pulse loading spinner
const PulseSpinner = React.forwardRef(({ 
  className, 
  size = "default",
  variant = "default",
  ...props 
}, ref) => {
  const sizeClasses = {
    sm: "h-4 w-4",
    default: "h-6 w-6", 
    lg: "h-8 w-8",
    xl: "h-12 w-12"
  }

  const variantClasses = {
    default: "bg-primary",
    secondary: "bg-secondary", 
    accent: "bg-accent",
    white: "bg-white",
    muted: "bg-muted-foreground"
  }

  return (
    <div
      ref={ref}
      className={cn(
        "rounded-full animate-pulse",
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
      {...props}
    >
      <span className="sr-only">Loading...</span>
    </div>
  )
})

PulseSpinner.displayName = "PulseSpinner"

// Dots loading spinner
const DotsSpinner = React.forwardRef(({ 
  className, 
  size = "default",
  variant = "default",
  ...props 
}, ref) => {
  const sizeClasses = {
    sm: "h-4 w-4",
    default: "h-6 w-6", 
    lg: "h-8 w-8",
    xl: "h-12 w-12"
  }

  const variantClasses = {
    default: "bg-primary",
    secondary: "bg-secondary", 
    accent: "bg-accent",
    white: "bg-white",
    muted: "bg-muted-foreground"
  }

  return (
    <div
      ref={ref}
      className={cn(
        "flex items-center space-x-1",
        className
      )}
      {...props}
    >
      <div className={cn(
        "rounded-full animate-bounce",
        sizeClasses[size],
        variantClasses[variant]
      )} style={{ animationDelay: '0ms' }} />
      <div className={cn(
        "rounded-full animate-bounce",
        sizeClasses[size],
        variantClasses[variant]
      )} style={{ animationDelay: '150ms' }} />
      <div className={cn(
        "rounded-full animate-bounce",
        sizeClasses[size],
        variantClasses[variant]
      )} style={{ animationDelay: '300ms' }} />
      <span className="sr-only">Loading...</span>
    </div>
  )
})

DotsSpinner.displayName = "DotsSpinner"

export { LoadingSpinner, GradientSpinner, PulseSpinner, DotsSpinner }