'use client'

import * as React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, CheckCircle, AlertCircle, Mail, User, MessageSquare } from 'lucide-react'

import { contactFormSchema } from '@/lib/validations'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { useToast } from '@/components/ui/toast'
import { cn } from '@/lib/utils'

const FloatingLabelInput = React.forwardRef(({ 
  label, 
  icon: Icon, 
  error, 
  className,
  ...props 
}, ref) => {
  const [isFocused, setIsFocused] = React.useState(false)
  const [hasValue, setHasValue] = React.useState(false)

  const handleFocus = () => setIsFocused(true)
  const handleBlur = (e) => {
    setIsFocused(false)
    setHasValue(e.target.value.length > 0)
  }

  React.useEffect(() => {
    if (props.value) {
      setHasValue(props.value.length > 0)
    }
  }, [props.value])

  return (
    <div className={cn("relative", className)}>
      <div className="relative">
        {Icon && (
          <Icon className={cn(
            "absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 transition-colors duration-200",
            isFocused || hasValue ? "text-primary" : "text-muted-foreground",
            error && "text-destructive"
          )} />
        )}
        <Input
          ref={ref}
          {...props}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className={cn(
            "h-14 transition-all duration-200 ease-out",
            Icon && "pl-11",
            "focus:ring-2 focus:ring-primary/20 focus:border-primary",
            error && "border-destructive focus:border-destructive focus:ring-destructive/20",
            isFocused && "shadow-elegant scale-[1.02]"
          )}
        />
        <Label
          className={cn(
            "absolute left-3 transition-all duration-200 ease-out pointer-events-none",
            Icon && "left-11",
            isFocused || hasValue
              ? "-top-2 text-xs bg-background px-2 font-medium"
              : "top-1/2 -translate-y-1/2 text-muted-foreground",
            isFocused && "text-primary",
            error && "text-destructive"
          )}
        >
          {label}
        </Label>
      </div>
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-2 text-sm text-destructive flex items-center gap-1"
          >
            <AlertCircle className="h-4 w-4" />
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
})
FloatingLabelInput.displayName = "FloatingLabelInput"

const FloatingLabelTextarea = React.forwardRef(({ 
  label, 
  icon: Icon, 
  error, 
  className,
  ...props 
}, ref) => {
  const [isFocused, setIsFocused] = React.useState(false)
  const [hasValue, setHasValue] = React.useState(false)

  const handleFocus = () => setIsFocused(true)
  const handleBlur = (e) => {
    setIsFocused(false)
    setHasValue(e.target.value.length > 0)
  }

  React.useEffect(() => {
    if (props.value) {
      setHasValue(props.value.length > 0)
    }
  }, [props.value])

  return (
    <div className={cn("relative", className)}>
      <div className="relative">
        {Icon && (
          <Icon className={cn(
            "absolute left-3 top-4 h-5 w-5 transition-colors duration-200",
            isFocused || hasValue ? "text-primary" : "text-muted-foreground",
            error && "text-destructive"
          )} />
        )}
        <textarea
          ref={ref}
          {...props}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className={cn(
            "flex min-h-[120px] w-full rounded-md border border-input bg-transparent px-3 py-3 text-base shadow-xs transition-all duration-200 ease-out placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:border-primary disabled:cursor-not-allowed disabled:opacity-50 md:text-sm resize-none",
            Icon && "pl-11",
            error && "border-destructive focus-visible:border-destructive focus-visible:ring-destructive/20",
            isFocused && "shadow-elegant scale-[1.02]"
          )}
        />
        <Label
          className={cn(
            "absolute left-3 transition-all duration-200 ease-out pointer-events-none",
            Icon && "left-11",
            isFocused || hasValue
              ? "-top-2 text-xs bg-background px-2 font-medium"
              : "top-4 text-muted-foreground",
            isFocused && "text-primary",
            error && "text-destructive"
          )}
        >
          {label}
        </Label>
      </div>
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-2 text-sm text-destructive flex items-center gap-1"
          >
            <AlertCircle className="h-4 w-4" />
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
})
FloatingLabelTextarea.displayName = "FloatingLabelTextarea"

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [submitStatus, setSubmitStatus] = React.useState(null) // 'success' | 'error' | null
  const [submitMessage, setSubmitMessage] = React.useState('')
  const { addToast } = useToast()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch
  } = useForm({
    resolver: zodResolver(contactFormSchema),
    mode: 'onBlur'
  })

  const watchedValues = watch()

  const onSubmit = async (data) => {
    setIsSubmitting(true)
    setSubmitStatus(null)
    setSubmitMessage('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (result.success) {
        setSubmitStatus('success')
        setSubmitMessage(result.message)
        addToast({
          title: 'Message Sent!',
          description: result.message,
          variant: 'success'
        })
        reset() // Clear the form
      } else {
        setSubmitStatus('error')
        setSubmitMessage(result.error?.message || 'Something went wrong. Please try again.')
        addToast({
          title: 'Error',
          description: result.error?.message || 'Something went wrong. Please try again.',
          variant: 'destructive'
        })
      }
    } catch (error) {
      console.error('Contact form submission error:', error)
      setSubmitStatus('error')
      setSubmitMessage('Network error. Please check your connection and try again.')
      addToast({
        title: 'Network Error',
        description: 'Please check your connection and try again.',
        variant: 'destructive'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-2xl mx-auto"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FloatingLabelInput
            label="Full Name"
            icon={User}
            {...register('name')}
            error={errors.name?.message}
            value={watchedValues.name || ''}
            disabled={isSubmitting}
          />
          
          <FloatingLabelInput
            label="Email Address"
            icon={Mail}
            type="email"
            {...register('email')}
            error={errors.email?.message}
            value={watchedValues.email || ''}
            disabled={isSubmitting}
          />
        </div>

        <FloatingLabelTextarea
          label="Your Message"
          icon={MessageSquare}
          {...register('message')}
          error={errors.message?.message}
          value={watchedValues.message || ''}
          disabled={isSubmitting}
          placeholder=""
        />

        <AnimatePresence>
          {submitStatus && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className={cn(
                "p-4 rounded-lg border flex items-center gap-3",
                submitStatus === 'success' 
                  ? "bg-green-50 border-green-200 text-green-800 dark:bg-green-900/20 dark:border-green-800 dark:text-green-200"
                  : "bg-red-50 border-red-200 text-red-800 dark:bg-red-900/20 dark:border-red-800 dark:text-red-200"
              )}
            >
              {submitStatus === 'success' ? (
                <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
              ) : (
                <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
              )}
              <p className="text-sm font-medium">{submitMessage}</p>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-12 text-base font-semibold bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 shadow-elegant hover:shadow-elegant-lg transition-all duration-300"
          >
            {isSubmitting ? (
              <>
                <LoadingSpinner size="sm" className="mr-2" />
                Sending Message...
              </>
            ) : (
              <>
                <Send className="mr-2 h-5 w-5" />
                Send Message
              </>
            )}
          </Button>
        </motion.div>
      </form>
    </motion.div>
  )
}