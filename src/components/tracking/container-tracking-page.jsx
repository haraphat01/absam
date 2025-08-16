'use client'

import * as React from 'react'
import { ContainerSearchForm } from './container-search-form'
import { TrackingResults } from './tracking-results'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Ship, Search, Globe, Clock } from '@/components/ui/icons'

export function ContainerTrackingPage() {
  const [trackingData, setTrackingData] = React.useState(null)
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState(null)

  const handleSearch = async (containerId) => {
    setIsLoading(true)
    setError(null)
    setTrackingData(null)

    try {
      const response = await fetch('/api/tracking/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ containerId }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error?.message || 'Failed to fetch tracking data')
      }

      setTrackingData(data.data)
    } catch (err) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleRetry = () => {
    if (trackingData?.containerId) {
      handleSearch(trackingData.containerId)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white py-24">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%227%22%20cy%3D%227%22%20r%3D%221%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] animate-pulse" />
        </div>

        <div className="container-wide relative">
          <div className="text-center space-y-8 max-w-4xl mx-auto">
            <div className="space-y-6">
              <Badge className="bg-gradient-to-r from-blue-500/20 to-blue-400/20 text-blue-300 border-blue-400/30 px-6 py-3 text-base font-semibold">
                <Ship className="mr-3 h-5 w-5" />
                Real-Time Container Tracking
              </Badge>
              
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight tracking-tight">
                Track Your
                <span className="block text-gradient bg-gradient-to-r from-blue-400 via-green-400 to-purple-400 bg-clip-text text-transparent">
                  Container Shipment
                </span>
              </h1>
              
              <p className="text-xl lg:text-2xl text-slate-300 leading-relaxed max-w-3xl mx-auto">
                Monitor your container&apos;s journey in real-time with our advanced tracking system. 
                Get instant updates on location, status, and estimated delivery times.
              </p>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center justify-center space-x-12 pt-8 border-t border-white/20">
              <div className="text-center">
                <div className="text-3xl font-bold text-white">24/7</div>
                <div className="text-sm text-slate-400">Real-Time Updates</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">50+</div>
                <div className="text-sm text-slate-400">Global Ports</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">99.9%</div>
                <div className="text-sm text-slate-400">Tracking Accuracy</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-16 -mt-12 relative z-10">
        <div className="container-wide">
          <div className="max-w-4xl mx-auto">
            <Card className="shadow-elegant-xl border-0 bg-white/95 backdrop-blur-sm">
              <CardContent className="p-8">
                <div className="text-center space-y-6 mb-8">
                  <div className="h-16 w-16 mx-auto rounded-2xl bg-gradient-to-br from-primary/10 to-primary/20 flex items-center justify-center">
                    <Search className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-foreground mb-2">
                      Enter Container ID
                    </h2>
                    <p className="text-muted-foreground text-lg">
                      Track your shipment by entering the container identification number
                    </p>
                  </div>
                </div>

                <ContainerSearchForm 
                  onSearch={handleSearch}
                  isLoading={isLoading}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Results Section */}
      {(trackingData || error) && (
        <section className="py-16">
          <div className="container-wide">
            <TrackingResults 
              data={trackingData}
              error={error}
              isLoading={isLoading}
              onRetry={handleRetry}
            />
          </div>
        </section>
      )}

      {/* Features Section */}
      <section className="py-24 bg-gradient-to-b from-slate-50/50 to-white">
        <div className="container-wide">
          <div className="text-center space-y-6 mb-16">
            <Badge className="bg-primary/10 text-primary border-primary/20 px-4 py-2 text-sm font-semibold">
              Tracking Features
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground leading-tight">
              Advanced Tracking
              <span className="text-gradient bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {" "}Capabilities
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Our comprehensive tracking system provides detailed insights into your container&apos;s journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="hover-lift hover-glow group text-center">
              <CardContent className="p-8">
                <div className="space-y-6">
                  <div className="h-16 w-16 mx-auto rounded-2xl bg-gradient-to-br from-blue-500/10 to-blue-600/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Globe className="h-8 w-8 text-blue-600" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-foreground">Global Coverage</h3>
                    <p className="text-muted-foreground">
                      Track containers across all major shipping routes and ports worldwide
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover-lift hover-glow group text-center">
              <CardContent className="p-8">
                <div className="space-y-6">
                  <div className="h-16 w-16 mx-auto rounded-2xl bg-gradient-to-br from-green-500/10 to-green-600/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Clock className="h-8 w-8 text-green-600" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-foreground">Real-Time Updates</h3>
                    <p className="text-muted-foreground">
                      Get instant notifications when your container status changes
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover-lift hover-glow group text-center">
              <CardContent className="p-8">
                <div className="space-y-6">
                  <div className="h-16 w-16 mx-auto rounded-2xl bg-gradient-to-br from-purple-500/10 to-purple-600/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Ship className="h-8 w-8 text-purple-600" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-foreground">Detailed Timeline</h3>
                    <p className="text-muted-foreground">
                      View complete journey history with timestamps and locations
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}