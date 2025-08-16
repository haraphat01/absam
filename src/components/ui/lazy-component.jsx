'use client'

import { useState, useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'

/**
 * LazyComponent wrapper for lazy loading non-critical components
 * Uses Intersection Observer API for efficient loading
 */
export function LazyComponent({
  children,
  className,
  threshold = 0.1,
  rootMargin = '50px',
  fallback = null,
  animationDelay = 0,
  ...props
}) {
  const [isVisible, setIsVisible] = useState(false)
  const [hasLoaded, setHasLoaded] = useState(false)
  const elementRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasLoaded) {
          // Add animation delay if specified
          setTimeout(() => {
            setIsVisible(true)
            setHasLoaded(true)
          }, animationDelay)
        }
      },
      {
        threshold,
        rootMargin,
      }
    )

    const currentElement = elementRef.current
    if (currentElement) {
      observer.observe(currentElement)
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement)
      }
    }
  }, [threshold, rootMargin, hasLoaded, animationDelay])

  return (
    <div
      ref={elementRef}
      className={cn(
        "transition-all duration-700 ease-out",
        isVisible 
          ? "opacity-100 translate-y-0" 
          : "opacity-0 translate-y-4",
        className
      )}
      {...props}
    >
      {isVisible ? children : fallback}
    </div>
  )
}

/**
 * FadeInSection component for smooth section reveals
 */
export function FadeInSection({
  children,
  className,
  delay = 0,
  direction = 'up',
  ...props
}) {
  const [isVisible, setIsVisible] = useState(false)
  const elementRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true)
          }, delay)
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
      }
    )

    const currentElement = elementRef.current
    if (currentElement) {
      observer.observe(currentElement)
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement)
      }
    }
  }, [delay])

  const getTransform = () => {
    if (isVisible) return 'translate-y-0 translate-x-0'
    
    switch (direction) {
      case 'up':
        return 'translate-y-8'
      case 'down':
        return '-translate-y-8'
      case 'left':
        return 'translate-x-8'
      case 'right':
        return '-translate-x-8'
      default:
        return 'translate-y-8'
    }
  }

  return (
    <div
      ref={elementRef}
      className={cn(
        "transition-all duration-700 ease-out",
        isVisible ? "opacity-100" : "opacity-0",
        getTransform(),
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

/**
 * StaggeredList component for animating lists with staggered delays
 */
export function StaggeredList({
  children,
  className,
  staggerDelay = 100,
  ...props
}) {
  const [isVisible, setIsVisible] = useState(false)
  const elementRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
      }
    )

    const currentElement = elementRef.current
    if (currentElement) {
      observer.observe(currentElement)
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement)
      }
    }
  }, [])

  return (
    <div ref={elementRef} className={className} {...props}>
      {Array.isArray(children) 
        ? children.map((child, index) => (
            <div
              key={index}
              className={cn(
                "transition-all duration-500 ease-out",
                isVisible 
                  ? "opacity-100 translate-y-0" 
                  : "opacity-0 translate-y-4"
              )}
              style={{
                transitionDelay: isVisible ? `${index * staggerDelay}ms` : '0ms'
              }}
            >
              {child}
            </div>
          ))
        : children
      }
    </div>
  )
}