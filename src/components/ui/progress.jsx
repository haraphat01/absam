import * as React from "react"
import { cn } from "@/lib/utils"

const Progress = React.forwardRef(({ 
  className, 
  value = 0, 
  max = 100,
  variant = "default",
  size = "default",
  showLabel = false,
  animated = true,
  ...props 
}, ref) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100)
  
  const sizeClasses = {
    sm: "h-2",
    default: "h-3",
    lg: "h-4",
    xl: "h-6"
  }

  const variantClasses = {
    default: "bg-primary",
    secondary: "bg-secondary",
    accent: "bg-accent",
    success: "bg-green-500",
    warning: "bg-yellow-500",
    error: "bg-red-500"
  }

  return (
    <div className="w-full space-y-2">
      {showLabel && (
        <div className="flex justify-between text-sm font-medium text-muted-foreground">
          <span>Progress</span>
          <span>{Math.round(percentage)}%</span>
        </div>
      )}
      <div
        ref={ref}
        className={cn(
          "relative w-full overflow-hidden rounded-full bg-muted",
          sizeClasses[size],
          className
        )}
        {...props}
      >
        <div
          className={cn(
            "h-full rounded-full transition-all duration-500 ease-out",
            variantClasses[variant],
            animated && "animate-pulse"
          )}
          style={{ 
            width: `${percentage}%`,
            transition: animated ? "width 0.5s ease-out" : "none"
          }}
        />
      </div>
    </div>
  )
})

Progress.displayName = "Progress"

// Circular Progress Component
const CircularProgress = React.forwardRef(({ 
  className, 
  value = 0, 
  max = 100,
  size = "default",
  variant = "default",
  showLabel = true,
  animated = true,
  strokeWidth = 4,
  ...props 
}, ref) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100)
  const radius = 50 - strokeWidth / 2
  const circumference = 2 * Math.PI * radius
  const strokeDasharray = circumference
  const strokeDashoffset = circumference - (percentage / 100) * circumference
  
  const sizeClasses = {
    sm: "w-16 h-16",
    default: "w-24 h-24",
    lg: "w-32 h-32",
    xl: "w-40 h-40"
  }

  const variantClasses = {
    default: "stroke-primary",
    secondary: "stroke-secondary",
    accent: "stroke-accent",
    success: "stroke-green-500",
    warning: "stroke-yellow-500",
    error: "stroke-red-500"
  }

  return (
    <div className="relative inline-flex items-center justify-center" ref={ref} {...props}>
      <svg
        className={cn("transform -rotate-90", sizeClasses[size])}
        viewBox="0 0 100 100"
      >
        {/* Background circle */}
        <circle
          cx="50"
          cy="50"
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="transparent"
          className="text-muted"
        />
        {/* Progress circle */}
        <circle
          cx="50"
          cy="50"
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className={cn(
            variantClasses[variant],
            "transition-all duration-500 ease-out"
          )}
          style={{
            transition: animated ? "stroke-dashoffset 0.5s ease-out" : "none"
          }}
        />
      </svg>
      
      {showLabel && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-sm font-bold text-foreground">
            {Math.round(percentage)}%
          </span>
        </div>
      )}
    </div>
  )
})

CircularProgress.displayName = "CircularProgress"

// Gradient Progress Component
const GradientProgress = React.forwardRef(({ 
  className, 
  value = 0, 
  max = 100,
  size = "default",
  showLabel = false,
  animated = true,
  ...props 
}, ref) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100)
  
  const sizeClasses = {
    sm: "h-2",
    default: "h-3",
    lg: "h-4",
    xl: "h-6"
  }

  return (
    <div className="w-full space-y-2">
      {showLabel && (
        <div className="flex justify-between text-sm font-medium text-muted-foreground">
          <span>Progress</span>
          <span>{Math.round(percentage)}%</span>
        </div>
      )}
      <div
        ref={ref}
        className={cn(
          "relative w-full overflow-hidden rounded-full bg-muted",
          sizeClasses[size],
          className
        )}
        {...props}
      >
        <div
          className="h-full rounded-full bg-gradient-to-r from-primary via-secondary to-accent transition-all duration-500 ease-out"
          style={{ 
            width: `${percentage}%`,
            transition: animated ? "width 0.5s ease-out" : "none"
          }}
        />
      </div>
    </div>
  )
})

GradientProgress.displayName = "GradientProgress"

export { Progress, CircularProgress, GradientProgress }