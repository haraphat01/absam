'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'

export function SimpleBarChart({ 
  title, 
  data = [], 
  isLoading = false,
  className 
}) {
  if (isLoading) {
    return (
      <Card className={cn("", className)}>
        <CardHeader>
          <Skeleton className="h-5 w-32" />
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex items-center space-x-3">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 flex-1" />
                <Skeleton className="h-4 w-8" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  const maxValue = Math.max(...data.map(item => item.value))

  return (
    <Card className={cn(
      "hover:shadow-elegant-lg transition-all duration-300 ease-elegant",
      className
    )}>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {data.map((item, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium text-foreground">{item.label}</span>
                <span className="text-muted-foreground">{item.value}</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                <div 
                  className={cn(
                    "h-full rounded-full transition-all duration-1000 ease-elegant",
                    item.color || "bg-primary"
                  )}
                  style={{ 
                    width: `${maxValue > 0 ? (item.value / maxValue) * 100 : 0}%`,
                    animationDelay: `${index * 100}ms`
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export function SimpleDonutChart({ 
  title, 
  data = [], 
  isLoading = false,
  className 
}) {
  if (isLoading) {
    return (
      <Card className={cn("", className)}>
        <CardHeader>
          <Skeleton className="h-5 w-32" />
        </CardHeader>
        <CardContent className="flex items-center justify-center">
          <Skeleton className="h-32 w-32 rounded-full" />
        </CardContent>
      </Card>
    )
  }

  const total = data.reduce((sum, item) => sum + item.value, 0)
  let cumulativePercentage = 0

  return (
    <Card className={cn(
      "hover:shadow-elegant-lg transition-all duration-300 ease-elegant",
      className
    )}>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-center space-x-8">
          {/* Simple Visual Representation */}
          <div className="relative">
            <div className="w-32 h-32 rounded-full bg-muted flex items-center justify-center">
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">{total}</div>
                <div className="text-xs text-muted-foreground">Total</div>
              </div>
            </div>
            {/* Colored segments around the circle */}
            {data.map((item, index) => {
              const percentage = total > 0 ? (item.value / total) * 100 : 0
              const rotation = cumulativePercentage * 3.6 // Convert to degrees
              cumulativePercentage += percentage
              
              return (
                <div
                  key={index}
                  className={cn(
                    "absolute top-0 left-0 w-full h-full rounded-full border-4 border-transparent",
                    item.color || "border-primary"
                  )}
                  style={{
                    transform: `rotate(${rotation}deg)`,
                    clipPath: `polygon(50% 50%, 50% 0%, ${50 + 50 * Math.sin((percentage * 3.6) * Math.PI / 180)}% ${50 - 50 * Math.cos((percentage * 3.6) * Math.PI / 180)}%)`
                  }}
                />
              )
            })}
          </div>
          
          {/* Legend */}
          <div className="space-y-3">
            {data.map((item, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div 
                  className={cn(
                    "w-3 h-3 rounded-full",
                    item.color || "bg-primary"
                  )}
                />
                <div className="text-sm">
                  <div className="font-medium text-foreground">{item.label}</div>
                  <div className="text-muted-foreground">
                    {item.value} ({total > 0 ? Math.round((item.value / total) * 100) : 0}%)
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}