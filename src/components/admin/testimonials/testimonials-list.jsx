'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import VideoPlayer from '@/components/testimonials/video-player'
import { 
  Search, 
  Eye, 
  Trash2, 
  Calendar, 
  User, 
  Video,
  MoreVertical,
  ExternalLink
} from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export default function TestimonialsList({ testimonials, onDelete, onRefresh }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTestimonial, setSelectedTestimonial] = useState(null)

  const filteredTestimonials = testimonials.filter(testimonial =>
    testimonial.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    testimonial.client_name?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const handleDelete = async (testimonial) => {
    if (window.confirm(`Are you sure you want to delete "${testimonial.title}"? This action cannot be undone.`)) {
      await onDelete(testimonial.id)
    }
  }

  const handleView = (testimonial) => {
    setSelectedTestimonial(testimonial)
  }

  const handleViewOnSite = () => {
    window.open('/testimonials', '_blank')
  }

  if (testimonials.length === 0) {
    return (
      <Card>
        <CardContent className="py-16 text-center">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Video className="w-8 h-8 text-slate-400" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900 mb-2">
            No Testimonials Yet
          </h3>
          <p className="text-slate-600 mb-6">
            Upload your first customer testimonial to get started.
          </p>
          <Button onClick={onRefresh} variant="outline">
            Refresh
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <>
      <Card>
        <CardContent className="p-6">
          {/* Search and Actions */}
          <div className="flex items-center justify-between mb-6">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <Input
                placeholder="Search testimonials..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleViewOnSite}
                className="hover-lift"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                View on Site
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={onRefresh}
              >
                Refresh
              </Button>
            </div>
          </div>

          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredTestimonials.map((testimonial) => (
              <TestimonialCard
                key={testimonial.id}
                testimonial={testimonial}
                onView={handleView}
                onDelete={handleDelete}
                formatDate={formatDate}
              />
            ))}
          </div>

          {/* No Results */}
          {filteredTestimonials.length === 0 && searchTerm && (
            <div className="text-center py-8">
              <p className="text-slate-600">
                No testimonials found matching &quot;{searchTerm}&quot;
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Video Modal */}
      {selectedTestimonial && (
        <VideoModal
          testimonial={selectedTestimonial}
          onClose={() => setSelectedTestimonial(null)}
          formatDate={formatDate}
        />
      )}
    </>
  )
}

function TestimonialCard({ testimonial, onView, onDelete, formatDate }) {
  return (
    <Card className="overflow-hidden hover-lift group">
      <div className="relative aspect-video bg-slate-100">
        <VideoPlayer
          src={testimonial.video_url}
          controls={false}
          muted
          preload="metadata"
          className="w-full h-full object-cover"
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <Button
            size="sm"
            onClick={() => onView(testimonial)}
            className="bg-white/90 text-slate-900 hover:bg-white"
          >
            <Eye className="w-4 h-4 mr-2" />
            Preview
          </Button>
        </div>

        {/* Actions Menu */}
        <div className="absolute top-2 right-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                size="icon"
                variant="ghost"
                className="w-8 h-8 bg-white/80 hover:bg-white/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              >
                <MoreVertical className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onView(testimonial)}>
                <Eye className="w-4 h-4 mr-2" />
                Preview
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => onDelete(testimonial)}
                className="text-red-600 hover:text-red-700"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <CardContent className="p-4">
        <div className="space-y-3">
          <div>
            <h3 className="font-semibold text-slate-900 line-clamp-2 leading-tight">
              {testimonial.title}
            </h3>
          </div>

          <div className="flex items-center gap-2 text-sm text-slate-600">
            <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center text-white text-xs font-medium">
              {testimonial.client_name?.charAt(0)?.toUpperCase() || 'C'}
            </div>
            <span className="font-medium">{testimonial.client_name}</span>
          </div>

          <div className="flex items-center justify-between text-xs text-slate-500">
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              <span>{formatDate(testimonial.created_at)}</span>
            </div>
            
            {testimonial.users?.email && (
              <div className="flex items-center gap-1">
                <User className="w-3 h-3" />
                <span>Verified</span>
              </div>
            )}
          </div>

          <div className="pt-2 border-t border-slate-100">
            <Badge variant="secondary" className="text-xs">
              Active
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function VideoModal({ testimonial, onClose, formatDate }) {
  return (
    <div 
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl overflow-hidden max-w-4xl w-full max-h-[90vh] animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Video Container */}
        <div className="relative aspect-video bg-black">
          <VideoPlayer
            src={testimonial.video_url}
            controls={true}
            autoPlay={true}
            className="w-full h-full"
          />
          
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-colors duration-200 z-10"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Video Info */}
        <div className="p-6 bg-white">
          <div className="space-y-4">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">
                {testimonial.title}
              </h2>
              <Badge variant="secondary">Active</Badge>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center text-white font-semibold">
                  {testimonial.client_name?.charAt(0)?.toUpperCase() || 'C'}
                </div>
                <div>
                  <p className="font-semibold text-slate-900">
                    {testimonial.client_name}
                  </p>
                  <p className="text-sm text-slate-600">
                    Verified Customer
                  </p>
                </div>
              </div>

              <div className="text-right text-sm text-slate-500">
                <p>Uploaded {formatDate(testimonial.created_at)}</p>
                {testimonial.users?.email && (
                  <p>by {testimonial.users.email}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}