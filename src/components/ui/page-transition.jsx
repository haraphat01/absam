'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

/**
 * PageTransition component for smooth page transitions
 * Uses Framer Motion for fluid animations between routes
 */
export function PageTransition({ children, className }) {
  const pathname = usePathname()

  const pageVariants = {
    initial: {
      opacity: 0,
      y: 20,
      scale: 0.98,
    },
    in: {
      opacity: 1,
      y: 0,
      scale: 1,
    },
    out: {
      opacity: 0,
      y: -20,
      scale: 1.02,
    },
  }

  const pageTransition = {
    type: 'tween',
    ease: 'anticipate',
    duration: 0.4,
  }

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
        className={cn("w-full", className)}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}

/**
 * SectionTransition component for smooth section reveals
 */
export function SectionTransition({
  children,
  className,
  delay = 0,
  duration = 0.6,
  direction = 'up',
}) {
  const variants = {
    hidden: {
      opacity: 0,
      y: direction === 'up' ? 30 : direction === 'down' ? -30 : 0,
      x: direction === 'left' ? 30 : direction === 'right' ? -30 : 0,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
    },
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.25, 0.25, 0.75],
      }}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/**
 * CardHover component for interactive card animations
 */
export function CardHover({
  children,
  className,
  hoverScale = 1.02,
  tapScale = 0.98,
}) {
  return (
    <motion.div
      whileHover={{
        scale: hoverScale,
        y: -4,
        transition: { duration: 0.2, ease: 'easeOut' },
      }}
      whileTap={{
        scale: tapScale,
        transition: { duration: 0.1 },
      }}
      className={cn("cursor-pointer", className)}
    >
      {children}
    </motion.div>
  )
}

/**
 * ButtonHover component for button micro-interactions
 */
export function ButtonHover({
  children,
  className,
  whileHover = { scale: 1.05 },
  whileTap = { scale: 0.95 },
}) {
  return (
    <motion.div
      whileHover={whileHover}
      whileTap={whileTap}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/**
 * StaggerContainer component for staggered child animations
 */
export function StaggerContainer({
  children,
  className,
  staggerChildren = 0.1,
  delayChildren = 0,
}) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren,
        delayChildren,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.25, 0.25, 0.75],
      },
    },
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      variants={containerVariants}
      className={className}
    >
      {Array.isArray(children)
        ? children.map((child, index) => (
            <motion.div key={index} variants={itemVariants}>
              {child}
            </motion.div>
          ))
        : children}
    </motion.div>
  )
}