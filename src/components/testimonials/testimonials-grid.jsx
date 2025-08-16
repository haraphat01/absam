'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import VideoPlayer from './video-player'
import { Calendar, User } from 'lucide-react'

export default function TestimonialsGrid({ testimonials }) {
  const [selectedVideo, setSelectedVideo] = useState(null)

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const handleVideoSelect = (testimonial) => {
    setSelectedVideo(testimonial)
  }

  const handleCloseModal = () => {
    setSelectedVideo(null)
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
          <TestimonialCard
            key={testimonial.id}
            testimonial={testimonial}
            index={index}
            onVideoSelect={handleVideoSelect}
            formatDate={formatDate}
          />
        ))}
      </div>

      {/* Video Modal */}
      {selectedVideo && (
        <VideoModal
          testimonial={selectedVideo}
          onClose={handleCloseModal}
          formatDate={formatDate}
        />
      )}
    </>
  )
}

function TestimonialCard({ testimonial, index, onVideoSelect, formatDate }) {
  return (
    <div 
      className="animate-fade-in-up hover-lift cursor-pointer group"
      style={{ animationDelay: `${index * 0.1}s` }}
      onClick={() => onVideoSelect(testimonial)}
    >
      <Card className="overflow-hidden bg-white/80 backdrop-blur-sm border-0 shadow-elegant hover:shadow-elegant-xl transition-all duration-300 group-hover:scale-[1.02]">
        <div className="relative aspect-video bg-slate-100 overflow-hidden">
          <VideoPlayer
            src={testimonial.video_url}
            poster={null}
            className="w-full h-full object-cover"
            controls={false}
            muted
            preload="metadata"
          />
          
          {/* Play overlay */}
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 transition-transform duration-300">
              <div className="w-0 h-0 border-l-[12px] border-l-blue-600 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent ml-1" />
            </div>
          </div>

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
        </div>

        <CardContent className="p-6">
          <div className="space-y-4">
            {testimonial.title && (
              <h3 className="font-semibold text-slate-900 text-lg leading-tight group-hover:text-blue-600 transition-colors duration-200 overflow-hidden">
                <span className="block overflow-hidden text-ellipsis whitespace-nowrap">
                  {testimonial.title}
                </span>
              </h3>
            )}

            <div className="flex items-center gap-3 text-sm text-slate-600">
              {testimonial.client_name && (
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center text-white font-medium text-xs">
                    {testimonial.client_name.charAt(0).toUpperCase()}
                  </div>
                  <span className="font-medium text-slate-700">
                    {testimonial.client_name}
                  </span>
                </div>
              )}
            </div>

            <div className="flex items-center gap-4 text-xs text-slate-500 pt-2 border-t border-slate-100">
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
          </div>
        </CardContent>
      </Card>
    </div>
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
            {testimonial.title && (
              <h2 className="text-2xl font-bold text-slate-900">
                {testimonial.title}
              </h2>
            )}

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {testimonial.client_name && (
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center text-white font-semibold">
                      {testimonial.client_name.charAt(0).toUpperCase()}
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
                )}
              </div>

              <div className="text-right text-sm text-slate-500">
                <p>{formatDate(testimonial.created_at)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}