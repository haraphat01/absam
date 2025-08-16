'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { SkeletonCard } from '@/components/ui/skeleton'
import VideoPlayer from './video-player'
import TestimonialsGrid from './testimonials-grid'
import { MessageSquare, Star, Users } from 'lucide-react'

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchTestimonials()
  }, [])

  const fetchTestimonials = async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await fetch('/api/testimonials')
      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Failed to fetch testimonials')
      }

      setTestimonials(result.testimonials || [])
    } catch (err) {
      console.error('Error fetching testimonials:', err)
      setError('Failed to load testimonials. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  const handleRetry = () => {
    fetchTestimonials()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="container-wide">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6 animate-fade-in">
              <MessageSquare className="w-4 h-4" />
              Customer Stories
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 animate-fade-in-up">
              What Our{' '}
              <span className="text-gradient bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                Customers Say
              </span>
            </h1>
            
            <p className="text-xl text-slate-600 mb-8 leading-relaxed animate-fade-in-up [animation-delay:0.1s]">
              Discover why businesses trust Absad MultiSynergy Limited for their import and export needs. 
              Watch real testimonials from our satisfied customers.
            </p>

            <div className="flex items-center justify-center gap-8 text-slate-600 animate-fade-in-up [animation-delay:0.2s]">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-500 fill-current" />
                <span className="font-semibold">5.0 Rating</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-500" />
                <span className="font-semibold">{testimonials.length}+ Reviews</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Content */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="container-wide">
          {loading ? (
            <TestimonialsLoadingSkeleton />
          ) : error ? (
            <ErrorState error={error} onRetry={handleRetry} />
          ) : testimonials.length === 0 ? (
            <EmptyState />
          ) : (
            <TestimonialsGrid testimonials={testimonials} />
          )}
        </div>
      </section>
    </div>
  )
}

// Loading skeleton component
function TestimonialsLoadingSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="animate-fade-in" style={{ animationDelay: `${i * 0.1}s` }}>
          <Card className="overflow-hidden hover-lift">
            <div className="aspect-video bg-slate-200 animate-pulse" />
            <div className="p-6 space-y-4">
              <div className="h-4 bg-slate-200 rounded animate-pulse" />
              <div className="h-4 bg-slate-200 rounded w-3/4 animate-pulse" />
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-slate-200 rounded-full animate-pulse" />
                <div className="space-y-2 flex-1">
                  <div className="h-3 bg-slate-200 rounded animate-pulse" />
                  <div className="h-3 bg-slate-200 rounded w-2/3 animate-pulse" />
                </div>
              </div>
            </div>
          </Card>
        </div>
      ))}
    </div>
  )
}

// Error state component
function ErrorState({ error, onRetry }) {
  return (
    <div className="text-center py-16 animate-fade-in">
      <div className="max-w-md mx-auto">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <MessageSquare className="w-8 h-8 text-red-600" />
        </div>
        <h3 className="text-xl font-semibold text-slate-900 mb-2">
          Unable to Load Testimonials
        </h3>
        <p className="text-slate-600 mb-6">{error}</p>
        <button
          onClick={onRetry}
          className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 hover:scale-105 transition-all duration-200"
        >
          <LoadingSpinner size="sm" className="hidden" />
          Try Again
        </button>
      </div>
    </div>
  )
}

// Empty state component
function EmptyState() {
  return (
    <div className="text-center py-16 animate-fade-in">
      <div className="max-w-md mx-auto">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <MessageSquare className="w-8 h-8 text-blue-600" />
        </div>
        <h3 className="text-xl font-semibold text-slate-900 mb-2">
          No Testimonials Yet
        </h3>
        <p className="text-slate-600">
          We&apos;re working on gathering customer testimonials. Check back soon to see what our customers have to say!
        </p>
      </div>
    </div>
  )
}