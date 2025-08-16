'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { Badge } from '@/components/ui/badge'
import TestimonialUpload from './testimonial-upload'
import TestimonialsList from './testimonials-list'
import { Video, Upload, Eye, Trash2, Plus } from 'lucide-react'

export default function AdminTestimonialsPage() {
  const [testimonials, setTestimonials] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showUpload, setShowUpload] = useState(false)
  const [stats, setStats] = useState({
    total: 0,
    thisMonth: 0,
    active: 0
  })

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

      const testimonialsData = result.testimonials || []
      setTestimonials(testimonialsData)
      
      // Calculate stats
      const now = new Date()
      const thisMonth = testimonialsData.filter(t => {
        const createdAt = new Date(t.created_at)
        return createdAt.getMonth() === now.getMonth() && 
               createdAt.getFullYear() === now.getFullYear()
      }).length

      setStats({
        total: testimonialsData.length,
        thisMonth,
        active: testimonialsData.length // All testimonials are active in our mock data
      })
    } catch (err) {
      console.error('Error fetching testimonials:', err)
      setError('Failed to load testimonials. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  const handleUploadSuccess = (newTestimonial) => {
    setTestimonials(prev => [newTestimonial, ...prev])
    setShowUpload(false)
    // Update stats
    setStats(prev => ({
      ...prev,
      total: prev.total + 1,
      active: prev.active + 1,
      thisMonth: prev.thisMonth + 1
    }))
  }

  const handleDelete = async (testimonialId) => {
    try {
      const response = await fetch(`/api/testimonials/${testimonialId}`, {
        method: 'DELETE'
      })

      if (!response.ok) {
        throw new Error('Failed to delete testimonial')
      }

      setTestimonials(prev => prev.filter(t => t.id !== testimonialId))
      setStats(prev => ({
        ...prev,
        total: prev.total - 1,
        active: prev.active - 1
      }))
    } catch (err) {
      console.error('Error deleting testimonial:', err)
      alert('Failed to delete testimonial. Please try again.')
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Testimonials Management</h1>
            <p className="text-slate-600 mt-2">Manage customer video testimonials</p>
          </div>
        </div>
        
        <div className="flex items-center justify-center py-16">
          <LoadingSpinner size="lg" className="text-blue-600" />
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Testimonials Management</h1>
          <p className="text-slate-600 mt-2">Manage customer video testimonials</p>
        </div>
        
        <Button 
          onClick={() => setShowUpload(true)}
          className="hover-lift"
        >
          <Plus className="w-4 h-4 mr-2" />
          Upload Testimonial
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="hover-lift">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              Total Testimonials
            </CardTitle>
            <Video className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">{stats.total}</div>
            <p className="text-xs text-slate-600 mt-1">
              All time testimonials
            </p>
          </CardContent>
        </Card>

        <Card className="hover-lift">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              This Month
            </CardTitle>
            <Upload className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">{stats.thisMonth}</div>
            <p className="text-xs text-slate-600 mt-1">
              New testimonials
            </p>
          </CardContent>
        </Card>

        <Card className="hover-lift">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              Active
            </CardTitle>
            <Eye className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">{stats.active}</div>
            <p className="text-xs text-slate-600 mt-1">
              Visible to public
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Error State */}
      {error && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                <Trash2 className="w-4 h-4 text-red-600" />
              </div>
              <div>
                <p className="text-red-800 font-medium">Error Loading Testimonials</p>
                <p className="text-red-600 text-sm">{error}</p>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={fetchTestimonials}
                className="ml-auto"
              >
                Retry
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Upload Modal */}
      {showUpload && (
        <TestimonialUpload
          onClose={() => setShowUpload(false)}
          onSuccess={handleUploadSuccess}
        />
      )}

      {/* Testimonials List */}
      <TestimonialsList
        testimonials={testimonials}
        onDelete={handleDelete}
        onRefresh={fetchTestimonials}
      />
    </div>
  )
}