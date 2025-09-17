'use client'

import { useState, useRef } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { Progress } from '@/components/ui/progress'
import { Upload, X, Video, AlertCircle, CheckCircle, Shield } from 'lucide-react'
import { fileUpload } from '@/lib/security'
import { videoUploadSchema } from '@/lib/validations'

const MAX_FILE_SIZE = 50 * 1024 * 1024 // 50MB (reduced for security)
const ALLOWED_TYPES = ['video/mp4', 'video/webm', 'video/ogg']
const ALLOWED_EXTENSIONS = ['mp4', 'webm', 'ogg']

export default function TestimonialUpload({ onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    title: '',
    client_name: '',
    video_file: null
  })
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [error, setError] = useState(null)
  const [dragActive, setDragActive] = useState(false)
  const [validationErrors, setValidationErrors] = useState({})
  const fileInputRef = useRef(null)

  const validateForm = () => {
    // Validate form data using Zod schema
    const validation = videoUploadSchema.safeParse({
      title: formData.title,
      client_name: formData.client_name
    })
    
    const errors = {}
    
    if (!validation.success) {
      validation.error.errors.forEach(error => {
        errors[error.path[0]] = error.message
      })
    }
    
    if (!formData.video_file) {
      errors.video_file = 'Video file is required'
    }
    
    setValidationErrors(errors)
    return Object.keys(errors).length === 0
  }

  const validateFile = (file) => {
    const validation = fileUpload.validate(file, {
      allowedTypes: ALLOWED_TYPES,
      maxSize: MAX_FILE_SIZE,
      allowedExtensions: ALLOWED_EXTENSIONS
    })
    
    return validation.valid ? null : validation.error
  }

  const handleFileSelect = (file) => {
    const fileError = validateFile(file)
    
    if (fileError) {
      setError(fileError)
      return
    }
    
    setError(null)
    setFormData(prev => ({ ...prev, video_file: file }))
    setValidationErrors(prev => ({ ...prev, video_file: null }))
  }

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0])
    }
  }

  const handleFileInputChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelect(e.target.files[0])
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    // Clear validation error when user starts typing
    if (validationErrors[name]) {
      setValidationErrors(prev => ({ ...prev, [name]: null }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }
    
    setUploading(true)
    setError(null)
    setUploadProgress(0)
    
    try {
      // Create FormData for file upload
      const uploadFormData = new FormData()
      uploadFormData.append('video_file', formData.video_file)
      uploadFormData.append('title', formData.title)
      uploadFormData.append('client_name', formData.client_name)

      // Try to include current access token if available (improves reliability on some setups)
      let accessToken
      try {
        const { supabase } = await import('@/lib/supabase')
        const { data } = await supabase.auth.getSession()
        accessToken = data?.session?.access_token
      } catch {}

      const response = await fetch('/api/testimonials/upload', {
        method: 'POST',
        body: uploadFormData,
        credentials: 'include',
        headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : undefined,
      })

      const result = await response.json().catch(() => ({}))

      if (!response.ok) {
        const serverMessage = result?.error?.message || result?.message
        const statusHint = response.status === 401
          ? 'You may need to log in again as an admin.'
          : response.status === 403
          ? 'Your account lacks permission (ADMIN required).'
          : null
        const details = serverMessage || statusHint || response.statusText || 'Upload failed.'
        throw new Error(details)
      }

      // Call success callback with the uploaded testimonial
      onSuccess(result.data)
    } catch (err) {
      console.error('Upload error:', err)
      setError(err.message || 'Failed to upload testimonial. Please try again.')
    } finally {
      setUploading(false)
      setUploadProgress(0)
    }
  }

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-scale-in">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div>
            <CardTitle className="text-xl font-bold text-slate-900">
              Upload New Testimonial
            </CardTitle>
            <p className="text-slate-600 text-sm mt-1">
              Add a customer video testimonial to showcase on the website
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </Button>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title Input */}
            <div className="space-y-2">
              <Label htmlFor="title">Testimonial Title *</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="e.g., Excellent Service and Quality Products"
                className={validationErrors.title ? 'border-red-500' : ''}
              />
              {validationErrors.title && (
                <p className="text-red-600 text-sm flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {validationErrors.title}
                </p>
              )}
            </div>

            {/* Client Name Input */}
            <div className="space-y-2">
              <Label htmlFor="client_name">Client Name *</Label>
              <Input
                id="client_name"
                name="client_name"
                value={formData.client_name}
                onChange={handleInputChange}
                placeholder="e.g., John Smith"
                className={validationErrors.client_name ? 'border-red-500' : ''}
              />
              {validationErrors.client_name && (
                <p className="text-red-600 text-sm flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {validationErrors.client_name}
                </p>
              )}
            </div>

            {/* File Upload */}
            <div className="space-y-2">
              <Label>Video File *</Label>
              <div
                className={`
                  relative border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200
                  ${dragActive ? 'border-blue-500 bg-blue-50' : 'border-slate-300 hover:border-slate-400'}
                  ${validationErrors.video_file ? 'border-red-500 bg-red-50' : ''}
                `}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="video/*"
                  onChange={handleFileInputChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                
                {formData.video_file ? (
                  <div className="space-y-3">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium text-slate-900">{formData.video_file.name}</p>
                      <p className="text-sm text-slate-600">
                        {formatFileSize(formData.video_file.size)}
                      </p>
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      Change File
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto">
                      <Video className="w-6 h-6 text-slate-600" />
                    </div>
                    <div>
                      <p className="font-medium text-slate-900">
                        Drop your video here, or click to browse
                      </p>
                      <p className="text-sm text-slate-600">
                        MP4, WebM, OGG up to 50MB
                      </p>
                      <div className="flex items-center justify-center gap-1 mt-2 text-xs text-slate-500">
                        <Shield className="w-3 h-3" />
                        <span>Files are scanned for security</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              {validationErrors.video_file && (
                <p className="text-red-600 text-sm flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {validationErrors.video_file}
                </p>
              )}
            </div>

            {/* Upload Progress */}
            {uploading && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600">Uploading...</span>
                  <span className="font-medium">{Math.round(uploadProgress)}%</span>
                </div>
                <Progress value={uploadProgress} className="h-2" />
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-800 text-sm flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  {error}
                </p>
              </div>
            )}

            {/* Form Actions */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={uploading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={uploading}
                className="hover-lift"
              >
                {uploading ? (
                  <>
                    <LoadingSpinner size="sm" className="mr-2" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Testimonial
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}