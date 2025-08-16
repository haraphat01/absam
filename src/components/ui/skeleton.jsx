import * as React from "react"
import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}) {
  return (
    <div
      className={cn(
        "animate-shimmer bg-gradient-to-r from-slate-200 via-slate-300 to-slate-200 rounded-xl bg-pattern",
        className
      )}
      {...props} />
  )
}

// Enhanced skeleton components
function SkeletonText({ className, lines = 1, ...props }) {
  return (
    <div className="space-y-2" {...props}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          className={cn(
            "h-4 w-full",
            i === lines - 1 ? "w-3/4" : "w-full",
            className
          )}
        />
      ))}
    </div>
  )
}

function SkeletonTitle({ className, ...props }) {
  return (
    <Skeleton
      className={cn("h-8 w-3/4 mb-4", className)}
      {...props} />
  )
}

function SkeletonAvatar({ className, size = "default", ...props }) {
  const sizeClasses = {
    sm: "h-8 w-8",
    default: "h-10 w-10",
    lg: "h-12 w-12",
    xl: "h-16 w-16"
  }

  return (
    <Skeleton
      className={cn("rounded-full", sizeClasses[size], className)}
      {...props} />
  )
}

function SkeletonCard({ className, ...props }) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-border/50 p-6 space-y-4",
        className
      )}
      {...props}
    >
      <div className="flex items-center space-x-4">
        <SkeletonAvatar size="lg" />
        <div className="space-y-2 flex-1">
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-3 w-3/4" />
        </div>
      </div>
      <SkeletonText lines={3} />
      <div className="flex space-x-2">
        <Skeleton className="h-8 w-20" />
        <Skeleton className="h-8 w-24" />
      </div>
    </div>
  )
}

function SkeletonButton({ className, size = "default", ...props }) {
  const sizeClasses = {
    sm: "h-8 px-3",
    default: "h-10 px-4",
    lg: "h-12 px-6",
    xl: "h-14 px-8"
  }

  return (
    <Skeleton
      className={cn("rounded-lg", sizeClasses[size], className)}
      {...props} />
  )
}

function SkeletonInput({ className, ...props }) {
  return (
    <Skeleton
      className={cn("h-11 w-full rounded-xl", className)}
      {...props} />
  )
}

function SkeletonTable({ className, rows = 5, columns = 4, ...props }) {
  return (
    <div className={cn("space-y-3", className)} {...props}>
      {/* Header */}
      <div className="flex space-x-4">
        {Array.from({ length: columns }).map((_, i) => (
          <Skeleton key={i} className="h-4 flex-1" />
        ))}
      </div>
      {/* Rows */}
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div key={rowIndex} className="flex space-x-4">
          {Array.from({ length: columns }).map((_, colIndex) => (
            <Skeleton key={colIndex} className="h-4 flex-1" />
          ))}
        </div>
      ))}
    </div>
  )
}

function SkeletonGrid({ className, items = 6, columns = 3, ...props }) {
  return (
    <div 
      className={cn(
        "grid gap-6",
        columns === 2 && "grid-cols-1 md:grid-cols-2",
        columns === 3 && "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
        columns === 4 && "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
        className
      )}
      {...props}
    >
      {Array.from({ length: items }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  )
}

function SkeletonMetrics({ className, ...props }) {
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-3 gap-6", className)} {...props}>
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="space-y-4">
          <Skeleton className="h-8 w-1/2" />
          <Skeleton className="h-12 w-3/4" />
          <Skeleton className="h-4 w-full" />
        </div>
      ))}
    </div>
  )
}

function SkeletonForm({ className, fields = 4, ...props }) {
  return (
    <div className={cn("space-y-6", className)} {...props}>
      {Array.from({ length: fields }).map((_, i) => (
        <div key={i} className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <SkeletonInput />
        </div>
      ))}
      <div className="flex space-x-4 pt-4">
        <SkeletonButton size="lg" />
        <SkeletonButton size="lg" variant="outline" />
      </div>
    </div>
  )
}

function SkeletonPage({ className, ...props }) {
  return (
    <div className={cn("space-y-8", className)} {...props}>
      {/* Header */}
      <div className="space-y-4">
        <Skeleton className="h-12 w-1/3" />
        <Skeleton className="h-6 w-2/3" />
      </div>
      
      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <SkeletonCard />
          <SkeletonCard />
        </div>
        <div className="space-y-6">
          <SkeletonCard />
          <SkeletonForm fields={3} />
        </div>
      </div>
    </div>
  )
}

export {
  Skeleton,
  SkeletonText,
  SkeletonTitle,
  SkeletonAvatar,
  SkeletonCard,
  SkeletonButton,
  SkeletonInput,
  SkeletonTable,
  SkeletonGrid,
  SkeletonMetrics,
  SkeletonForm,
  SkeletonPage
}