'use client'

import Image from 'next/image'
import { useState } from 'react'
import { cn } from '@/lib/utils'

/**
 * OptimizedImage component with progressive loading and blur placeholder
 * Provides responsive images with smooth loading animations
 */
export function OptimizedImage({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
  quality = 85,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  placeholder = "blur",
  blurDataURL,
  fill = false,
  ...props
}) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  // Generate a simple blur placeholder if none provided
  const defaultBlurDataURL = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="

  const handleLoad = () => {
    setIsLoading(false)
  }

  const handleError = () => {
    setIsLoading(false)
    setHasError(true)
  }

  if (hasError) {
    return (
      <div 
        className={cn(
          "flex items-center justify-center bg-slate-100 text-slate-400 text-sm",
          className
        )}
        style={{ width, height }}
      >
        Failed to load image
      </div>
    )
  }

  return (
    <div className={cn("relative overflow-hidden", className)}>
      <Image
        src={src}
        alt={alt}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        fill={fill}
        priority={priority}
        quality={quality}
        sizes={sizes}
        placeholder={placeholder}
        blurDataURL={blurDataURL || defaultBlurDataURL}
        onLoad={handleLoad}
        onError={handleError}
        className={cn(
          "transition-all duration-500 ease-out",
          isLoading ? "scale-105 blur-sm" : "scale-100 blur-0",
          fill ? "object-cover" : ""
        )}
        {...props}
      />
      
      {/* Loading overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-slate-100 animate-pulse" />
      )}
    </div>
  )
}

/**
 * ProductImage component specifically for product images
 * Includes hover effects and optimized sizing
 */
export function ProductImage({
  src,
  alt,
  className,
  showHoverEffect = true,
  ...props
}) {
  return (
    <div className={cn(
      "relative overflow-hidden rounded-lg",
      showHoverEffect && "group cursor-pointer",
      className
    )}>
      <OptimizedImage
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className={cn(
          "transition-transform duration-300 ease-out",
          showHoverEffect && "group-hover:scale-110"
        )}
        {...props}
      />
      
      {showHoverEffect && (
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
      )}
    </div>
  )
}

/**
 * HeroImage component for hero sections
 * Optimized for large viewport images
 */
export function HeroImage({
  src,
  alt,
  className,
  overlay = true,
  ...props
}) {
  return (
    <div className={cn("relative overflow-hidden", className)}>
      <OptimizedImage
        src={src}
        alt={alt}
        fill
        priority
        quality={90}
        sizes="100vw"
        className="object-cover"
        {...props}
      />
      
      {overlay && (
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/25 to-transparent" />
      )}
    </div>
  )
}