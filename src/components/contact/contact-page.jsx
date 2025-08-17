'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  MessageCircle,
  Building2,
  Globe,
  Users
} from 'lucide-react'

import { ContactForm } from './contact-form'
import { cn } from '@/lib/utils'

const contactInfo = [
  {
    icon: Phone,
    title: 'Phone',
    details: ['+2347018222950', '+234 8071340418'],
    description: 'Call us during business hours'
  },
  {
    icon: Mail,
    title: 'Email',
    details: ['contact@absadmultisynergy.com'],
    description: 'Send us an email anytime'
  },
  {
    icon: MapPin,
    title: 'Address',
    details: ['Jebba, Kwara State, Nigeria'],
    description: 'Visit our main office'
  },
  {
    icon: Clock,
    title: 'Business Hours',
    details: ['Mon - Fri: 8:00 AM - 6:00 PM', 'Sat: 9:00 AM - 4:00 PM'],
    description: 'We are closed on Sundays'
  }
]

const features = [
  {
    icon: MessageCircle,
    title: 'Quick Response',
    description: 'We respond to all inquiries within 24 hours'
  },
  {
    icon: Users,
    title: 'Expert Team',
    description: 'Our experienced team is ready to help you'
  },
  {
    icon: Globe,
    title: 'Global Reach',
    description: 'We handle international trade worldwide'
  },
  {
    icon: Building2,
    title: 'Professional Service',
    description: 'Reliable and professional import/export services'
  }
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
}

function ContactInfoCard({ info, index }) {
  const Icon = info.icon

  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ 
        scale: 1.05,
        y: -5,
        transition: { duration: 0.3, ease: "easeOut" }
      }}
      className="group relative overflow-hidden rounded-xl bg-white dark:bg-gray-900 p-6 shadow-elegant hover:shadow-elegant-lg transition-all duration-300 border border-border/50"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="relative">
        <div className="flex items-center gap-4 mb-4">
          <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <Icon className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
              {info.title}
            </h3>
            <p className="text-sm text-muted-foreground">
              {info.description}
            </p>
          </div>
        </div>
        
        <div className="space-y-2">
          {info.details.map((detail, idx) => (
            <p key={idx} className="text-foreground font-medium">
              {detail}
            </p>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

function FeatureCard({ feature, index }) {
  const Icon = feature.icon

  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ 
        scale: 1.05,
        transition: { duration: 0.2 }
      }}
      className="group text-center p-6 rounded-xl bg-white dark:bg-gray-900 shadow-elegant hover:shadow-elegant-lg transition-all duration-300 border border-border/50"
    >
      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
        <Icon className="h-8 w-8 text-white" />
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
        {feature.title}
      </h3>
      <p className="text-muted-foreground text-sm">
        {feature.description}
      </p>
    </motion.div>
  )
}

export function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
        <div className="container-wide relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Get in{' '}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Touch
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
              Ready to start your import/export journey? We&apos;re here to help you every step of the way. 
              Contact our expert team today.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 lg:py-24">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="order-2 lg:order-1"
            >
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  Send us a Message
                </h2>
                <p className="text-muted-foreground text-lg">
                  Fill out the form below and we&apos;ll get back to you within 24 hours.
                </p>
              </div>
              <ContactForm />
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="order-1 lg:order-2"
            >
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  Contact Information
                </h2>
                <p className="text-muted-foreground text-lg">
                  Reach out to us through any of these channels.
                </p>
              </div>

              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-6"
              >
                {contactInfo.map((info, index) => (
                  <ContactInfoCard key={index} info={info} index={index} />
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 lg:py-24 bg-muted/30">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Choose Us?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We&apos;re committed to providing exceptional service and building lasting relationships with our clients.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {features.map((feature, index) => (
              <FeatureCard key={index} feature={feature} index={index} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center bg-gradient-to-br from-primary to-secondary rounded-2xl p-12 lg:p-16 text-white"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Join hundreds of satisfied clients who trust us with their import and export needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+2341234567890"
                className="inline-flex items-center justify-center px-8 py-3 bg-white text-primary font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-200"
              >
                <Phone className="mr-2 h-5 w-5" />
                Call Now
              </a>
              <a
                href="mailto:contact@absadmultisynergy.com"
                className="inline-flex items-center justify-center px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-primary transition-colors duration-200"
              >
                <Mail className="mr-2 h-5 w-5" />
                Email Us
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}