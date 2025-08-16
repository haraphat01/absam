'use client'

import * as React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { 
  Ship, 
  MapPin, 
  Clock, 
  Package, 
  Truck, 
  AlertCircle, 
  RefreshCw,
  CheckCircle,
  ArrowRight,
  Calendar,
  Globe
} from '@/components/ui/icons'
import { cn } from '@/lib/utils'

const statusConfig = {
  'In Transit': {
    color: 'bg-blue-500',
    bgColor: 'bg-blue-50',
    textColor: 'text-blue-700',
    borderColor: 'border-blue-200',
    icon: Ship
  },
  'At Port': {
    color: 'bg-yellow-500',
    bgColor: 'bg-yellow-50',
    textColor: 'text-yellow-700',
    borderColor: 'border-yellow-200',
    icon: MapPin
  },
  'Delivered': {
    color: 'bg-green-500',
    bgColor: 'bg-green-50',
    textColor: 'text-green-700',
    borderColor: 'border-green-200',
    icon: CheckCircle
  },
  'Delayed': {
    color: 'bg-red-500',
    bgColor: 'bg-red-50',
    textColor: 'text-red-700',
    borderColor: 'border-red-200',
    icon: AlertCircle
  },
  'Loading': {
    color: 'bg-purple-500',
    bgColor: 'bg-purple-50',
    textColor: 'text-purple-700',
    borderColor: 'border-purple-200',
    icon: Package
  },
  'Customs': {
    color: 'bg-orange-500',
    bgColor: 'bg-orange-50',
    textColor: 'text-orange-700',
    borderColor: 'border-orange-200',
    icon: Globe
  }
}

export function TrackingResults({ data, error, isLoading, onRetry }) {
  if (error) {
    return (
      <div className="max-w-4xl mx-auto">
        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-8 text-center">
            <div className="space-y-6">
              <div className="h-16 w-16 mx-auto rounded-full bg-red-100 flex items-center justify-center">
                <AlertCircle className="h-8 w-8 text-red-600" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-red-900">Tracking Error</h3>
                <p className="text-red-700">{error}</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={onRetry}
                  variant="outline"
                  className="border-red-300 text-red-700 hover:bg-red-100"
                >
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Try Again
                </Button>
                <Button
                  onClick={() => window.location.reload()}
                  variant="ghost"
                  className="text-red-700 hover:bg-red-100"
                >
                  Start Over
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!data) {
    return null
  }

  const statusInfo = statusConfig[data.status] || statusConfig['In Transit']
  const StatusIcon = statusInfo.icon

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in-up">
      {/* Container Overview Card */}
      <Card className="shadow-elegant-lg border-0 bg-white">
        <CardHeader className="pb-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="space-y-2">
              <CardTitle className="text-2xl font-bold text-foreground">
                Container {data.containerId}
              </CardTitle>
              <p className="text-muted-foreground">
                Last updated: {new Date(data.lastUpdated).toLocaleString()}
              </p>
            </div>
            <Badge 
              className={cn(
                "px-4 py-2 text-sm font-semibold rounded-full",
                statusInfo.bgColor,
                statusInfo.textColor,
                statusInfo.borderColor,
                "border"
              )}
            >
              <StatusIcon className="mr-2 h-4 w-4" />
              {data.status}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Key Information Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span className="text-sm font-medium">Current Location</span>
              </div>
              <p className="text-lg font-semibold text-foreground">{data.currentLocation}</p>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Ship className="h-4 w-4" />
                <span className="text-sm font-medium">Vessel</span>
              </div>
              <p className="text-lg font-semibold text-foreground">{data.vessel}</p>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span className="text-sm font-medium">ETA</span>
              </div>
              <p className="text-lg font-semibold text-foreground">
                {data.estimatedArrival ? new Date(data.estimatedArrival).toLocaleDateString() : 'TBD'}
              </p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-muted-foreground">Journey Progress</span>
              <span className="text-sm font-semibold text-foreground">{data.progress}%</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
              <div 
                className={cn(
                  "h-full rounded-full transition-all duration-1000 ease-out",
                  statusInfo.color
                )}
                style={{ width: `${data.progress}%` }}
              />
            </div>
          </div>

          {/* Route Information */}
          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
            <div className="flex items-center space-x-3">
              <div className="h-3 w-3 bg-green-500 rounded-full" />
              <span className="font-medium text-foreground">{data.origin}</span>
            </div>
            <ArrowRight className="h-5 w-5 text-muted-foreground" />
            <div className="flex items-center space-x-3">
              <div className={cn(
                "h-3 w-3 rounded-full",
                data.status === 'Delivered' ? 'bg-green-500' : 'bg-slate-300'
              )} />
              <span className="font-medium text-foreground">{data.destination}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Timeline Card */}
      <Card className="shadow-elegant-lg border-0 bg-white">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-foreground flex items-center">
            <Clock className="mr-3 h-5 w-5" />
            Tracking Timeline
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {data.timeline.map((event, index) => {
              const isLast = index === data.timeline.length - 1
              const isCurrent = index === 0
              const eventStatusInfo = statusConfig[event.status] || statusConfig['In Transit']
              const EventIcon = eventStatusInfo.icon

              return (
                <div key={index} className="relative">
                  {/* Timeline line */}
                  {!isLast && (
                    <div className="absolute left-6 top-12 w-0.5 h-16 bg-slate-200" />
                  )}
                  
                  <div className="flex items-start space-x-4">
                    {/* Timeline dot */}
                    <div className={cn(
                      "flex-shrink-0 h-12 w-12 rounded-full flex items-center justify-center border-4 border-white shadow-elegant",
                      isCurrent ? eventStatusInfo.color : "bg-slate-200",
                      isCurrent && "ring-4 ring-opacity-20",
                      isCurrent && eventStatusInfo.color.replace('bg-', 'ring-')
                    )}>
                      <EventIcon className={cn(
                        "h-5 w-5",
                        isCurrent ? "text-white" : "text-slate-500"
                      )} />
                    </div>
                    
                    {/* Event details */}
                    <div className="flex-1 min-w-0 pb-8">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                        <div className="space-y-1">
                          <h4 className={cn(
                            "font-semibold",
                            isCurrent ? "text-foreground" : "text-muted-foreground"
                          )}>
                            {event.status}
                          </h4>
                          <p className={cn(
                            "text-sm",
                            isCurrent ? "text-muted-foreground" : "text-slate-500"
                          )}>
                            {event.location}
                          </p>
                          {event.description && (
                            <p className="text-sm text-slate-600">{event.description}</p>
                          )}
                        </div>
                        <div className="text-sm text-slate-500 flex items-center space-x-2">
                          <Clock className="h-4 w-4" />
                          <span>{new Date(event.timestamp).toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Additional Information */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Container Details */}
        <Card className="shadow-elegant border-0 bg-white">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-foreground flex items-center">
              <Package className="mr-3 h-5 w-5" />
              Container Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Container Type:</span>
                <p className="font-semibold text-foreground">{data.containerType}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Size:</span>
                <p className="font-semibold text-foreground">{data.size}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Weight:</span>
                <p className="font-semibold text-foreground">{data.weight}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Seal Number:</span>
                <p className="font-semibold text-foreground">{data.sealNumber}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <Card className="shadow-elegant border-0 bg-white">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-foreground">
              Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <Button
                onClick={onRetry}
                variant="outline"
                className="w-full justify-start hover-lift"
              >
                <RefreshCw className="mr-3 h-4 w-4" />
                Refresh Tracking Data
              </Button>
              
              <Button
                onClick={() => window.print()}
                variant="outline"
                className="w-full justify-start hover-lift"
              >
                <Package className="mr-3 h-4 w-4" />
                Print Tracking Report
              </Button>
              
              <Button
                onClick={() => {
                  const url = `${window.location.origin}/tracking?id=${data.containerId}`
                  navigator.clipboard.writeText(url)
                  // You could add a toast notification here
                }}
                variant="outline"
                className="w-full justify-start hover-lift"
              >
                <Globe className="mr-3 h-4 w-4" />
                Share Tracking Link
              </Button>
            </div>
            
            <div className="pt-4 border-t border-slate-200">
              <p className="text-xs text-muted-foreground">
                Need help? Contact our support team at{' '}
                <a href="tel:+2348123456789" className="text-primary hover:underline">
                  +234 812 345 6789
                </a>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}