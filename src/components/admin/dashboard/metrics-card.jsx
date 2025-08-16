'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'

export function MetricsCard({ 
  title, 
  value, 
  change, 
  changeType = 'neutral',
  icon: Icon, 
  gradient,
  isLoading = false,
  className 
}) {
  if (isLoading) {
    return (
      <Card className={cn("relative overflow-hidden", className)}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-4 rounded" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-8 w-16 mb-2" />
          <Skeleton className="h-3 w-20" />
        </CardContent>
      </Card>
    )
  }

  const changeColor = {
    positive: 'text-emerald-600',
    negative: 'text-red-600',
    neutral: 'text-muted-foreground'
  }[changeType]

  const changeIcon = {
    positive: '↗',
    negative: '↘',
    neutral: ''
  }[changeType]

  return (
    <Card className={cn(
      "relative overflow-hidden group cursor-pointer",
      "hover:shadow-elegant-lg hover:-translate-y-1",
      "transition-all duration-300 ease-elegant",
      "border-0 shadow-elegant",
      className
    )}>
      {/* Gradient Background */}
      <div className={cn(
        "absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-300",
        gradient
      )} />
      
      {/* Gradient Border */}
      <div className={cn(
        "absolute inset-0 rounded-lg opacity-20 group-hover:opacity-40 transition-opacity duration-300",
        "bg-gradient-to-r p-[1px]",
        gradient
      )}>
        <div className="h-full w-full rounded-lg bg-background" />
      </div>

      <CardHeader className="relative flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors duration-200">
          {title}
        </CardTitle>
        {Icon && (
          <div className={cn(
            "p-2 rounded-lg transition-all duration-200",
            "group-hover:scale-110 group-hover:shadow-lg",
            gradient,
            "text-white shadow-elegant"
          )}>
            <Icon className="h-4 w-4" />
          </div>
        )}
      </CardHeader>
      
      <CardContent className="relative">
        <div className="text-3xl font-bold text-foreground group-hover:scale-105 transition-transform duration-200">
          {typeof value === 'number' ? value.toLocaleString() : value}
        </div>
        {change && (
          <p className={cn(
            "text-xs mt-1 flex items-center gap-1 transition-colors duration-200",
            changeColor
          )}>
            <span className="text-sm">{changeIcon}</span>
            {change}
          </p>
        )}
      </CardContent>
    </Card>
  )
}

export function MetricsCardSkeleton({ className }) {
  return (
    <Card className={cn("relative overflow-hidden", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-8 w-8 rounded-lg" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-8 w-16 mb-2" />
        <Skeleton className="h-3 w-20" />
      </CardContent>
    </Card>
  )
}