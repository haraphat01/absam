// Animation Utilities
// Centralized animation classes and utilities for consistent motion design

export const animations = {
  // Entrance Animations
  fadeIn: 'animate-fade-in',
  slideIn: 'animate-slide-in', 
  scaleIn: 'animate-scale-in',
  
  // Loading Animations
  spin: 'animate-spin',
  pulse: 'animate-pulse',
  bounce: 'animate-bounce',
  
  // Hover Animations
  hoverScale: 'hover:scale-105 transition-transform duration-200 ease-elegant',
  hoverLift: 'hover:-translate-y-1 hover:shadow-elegant-lg transition-all duration-200 ease-elegant',
  hoverGlow: 'hover:shadow-elegant-xl hover:shadow-primary/20 transition-all duration-300 ease-elegant',
  
  // Focus Animations
  focusRing: 'focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all duration-150',
  focusScale: 'focus:scale-105 transition-transform duration-150 ease-elegant',
  
  // State Transitions
  smooth: 'transition-all duration-300 ease-elegant',
  fast: 'transition-all duration-150 ease-elegant',
  slow: 'transition-all duration-500 ease-elegant',
  
  // Micro-interactions
  buttonPress: 'active:scale-95 transition-transform duration-75',
  cardHover: 'hover:shadow-elegant-lg hover:-translate-y-1 transition-all duration-200 ease-elegant',
  linkHover: 'hover:text-primary transition-colors duration-150',
}

// Animation presets for common UI patterns
export const animationPresets = {
  // Card animations
  card: {
    base: 'transition-all duration-200 ease-elegant',
    hover: 'hover:shadow-elegant-lg hover:-translate-y-1',
    active: 'active:scale-98'
  },
  
  // Button animations
  button: {
    base: 'transition-all duration-150 ease-elegant',
    hover: 'hover:scale-105',
    active: 'active:scale-95',
    focus: 'focus:ring-2 focus:ring-primary focus:ring-offset-2'
  },
  
  // Input animations
  input: {
    base: 'transition-all duration-150 ease-elegant',
    focus: 'focus:ring-2 focus:ring-primary focus:ring-offset-1 focus:border-primary',
    error: 'focus:ring-destructive focus:border-destructive'
  },
  
  // Modal animations
  modal: {
    overlay: 'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
    content: 'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95'
  },
  
  // Loading animations
  loading: {
    spinner: 'animate-spin',
    pulse: 'animate-pulse',
    bounce: 'animate-bounce',
    dots: 'animate-bounce [animation-delay:-0.3s]'
  }
}

// Utility function to combine animation classes
export const combineAnimations = (...animations) => {
  return animations.filter(Boolean).join(' ')
}

// Stagger animation utility for lists
export const staggerAnimation = (index, delay = 100) => {
  return {
    animationDelay: `${index * delay}ms`
  }
}

// Scroll-triggered animation classes
export const scrollAnimations = {
  fadeInUp: 'opacity-0 translate-y-8 transition-all duration-700 ease-elegant [&.in-view]:opacity-100 [&.in-view]:translate-y-0',
  fadeInLeft: 'opacity-0 -translate-x-8 transition-all duration-700 ease-elegant [&.in-view]:opacity-100 [&.in-view]:translate-x-0',
  fadeInRight: 'opacity-0 translate-x-8 transition-all duration-700 ease-elegant [&.in-view]:opacity-100 [&.in-view]:translate-x-0',
  scaleIn: 'opacity-0 scale-95 transition-all duration-700 ease-elegant [&.in-view]:opacity-100 [&.in-view]:scale-100',
}

// Page transition animations
export const pageTransitions = {
  fadeIn: 'animate-fade-in',
  slideInFromRight: 'animate-slide-in-from-right',
  slideInFromLeft: 'animate-slide-in-from-left',
  scaleIn: 'animate-scale-in'
}