'use client'

import * as React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import {
  Phone,
  Mail,
  MapPin,
  Globe,
  Truck,
  Ship,
  ExternalLink,
  ArrowUp
} from '@/components/ui/icons'

const footerLinks = {
  company: [
    { name: 'About Us', href: '/about' },
    { name: 'Our Mission', href: '/about#mission' },
    { name: 'Investment Opportunities', href: '/about#investment' },
    { name: 'Warehouse & Facilities', href: '/about#facilities' },
  ],
  services: [
    { name: 'Charcoal Export', href: '/products#charcoal' },
    { name: 'Firewood Supply', href: '/products#firewood' },
    { name: 'Container Tracking', href: '/tracking' },
    { name: 'Logistics Solutions', href: '/products#logistics' },
  ],
  support: [
    { name: 'Contact Us', href: '/contact' },
    { name: 'Customer Testimonials', href: '/testimonials' },
    { name: 'Track Your Container', href: '/tracking' },
    { name: 'Get a Quote', href: '/contact#quote' },
  ],
}

export function Footer() {
  const [showScrollTop, setShowScrollTop] = React.useState(false)

  // Handle scroll to top visibility
  React.useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden">
      {/* Enhanced Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-pattern-dots bg-pattern" />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/5 via-transparent to-secondary/5" />

      <div className="container-wide relative">
        {/* Main Footer Content */}
        <div className="py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
            {/* Enhanced Company Info */}
            <div className="lg:col-span-1">
              <div className="flex items-center space-x-3 mb-8">
                <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-primary via-secondary to-accent flex items-center justify-center shadow-elegant-lg">
                  <span className="text-white font-bold text-xl">AM</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">Absad MultiSynergy</h3>
                  <p className="text-sm text-slate-300 font-medium">Import & Export Excellence</p>
                </div>
              </div>
              <p className="text-slate-300 mb-8 leading-relaxed text-base">
                Leading import and export company specializing in premium charcoal and firewood.
                We deliver quality products with reliable logistics solutions across global markets.
              </p>
              <div className="flex items-center space-x-3 text-sm text-slate-300 bg-green-500/10 rounded-xl px-4 py-3 border border-green-500/20">
                <div className="h-3 w-3 rounded-full bg-green-400 animate-pulse"></div>
                <span className="font-semibold">CAC Certified Business</span>
              </div>
            </div>

            {/* Enhanced Company Links */}
            <div>
              <h4 className="text-xl font-bold mb-8 text-white flex items-center space-x-2">
                <div className="h-1 w-8 bg-gradient-to-r from-primary to-secondary rounded-full"></div>
                <span>Company</span>
              </h4>
              <ul className="space-y-4">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-slate-300 hover:text-white hover:translate-x-2 transition-all duration-300 ease-out inline-block font-medium"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Enhanced Services Links */}
            <div>
              <h4 className="text-xl font-bold mb-8 text-white flex items-center space-x-2">
                <div className="h-1 w-8 bg-gradient-to-r from-secondary to-accent rounded-full"></div>
                <span>Services</span>
              </h4>
              <ul className="space-y-4">
                {footerLinks.services.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-slate-300 hover:text-white hover:translate-x-2 transition-all duration-300 ease-out inline-block font-medium"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Enhanced Contact & Support */}
            <div>
              <h4 className="text-xl font-bold mb-8 text-white flex items-center space-x-2">
                <div className="h-1 w-8 bg-gradient-to-r from-accent to-primary rounded-full"></div>
                <span>Get in Touch</span>
              </h4>
              <div className="space-y-6 mb-8">
                <div className="flex items-start space-x-4 bg-primary/5 rounded-xl p-4 border border-primary/20 hover:bg-primary/10 transition-colors duration-300">
                  <Phone className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-white font-bold">+2347018222950</p>
                    <p className="text-slate-300 text-sm">Mon-Fri 8AM-6PM WAT</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4 bg-secondary/5 rounded-xl p-4 border border-secondary/20 hover:bg-secondary/10 transition-colors duration-300">
                  <Mail className="h-6 w-6 text-secondary mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-white font-bold">info@absadmultisynergy.com</p>
                    <p className="text-slate-300 text-sm">24/7 Email Support</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4 bg-accent/5 rounded-xl p-4 border border-accent/20 hover:bg-accent/10 transition-colors duration-300">
                  <MapPin className="h-6 w-6 text-accent mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-white font-bold">Jebba, Kwara State, Nigeria</p>
                  </div>
                </div>
              </div>

              {/* Enhanced Quick Actions */}
              <div className="space-y-4">
                <Button asChild variant="glass" className="w-full hover-lift-glow">
                  <Link href="/tracking">
                    <Truck className="mr-2 h-4 w-4" />
                    Track Container
                  </Link>
                </Button>
                <Button asChild variant="gradient" className="w-full hover-lift-glow">
                  <Link href="/contact">
                    <Ship className="mr-2 h-4 w-4" />
                    Request Quote
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>

        <Separator className="bg-white/10" />

        {/* Enhanced Bottom Footer */}
        <div className="py-10">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
            <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8 text-sm text-slate-300">
              <p className="font-medium">&copy; 2025 Absad MultiSynergy Limited. All rights reserved.</p>
              <div className="flex items-center space-x-6">
                <Link href="/privacy" className="hover:text-white transition-colors duration-300 font-medium">
                  Privacy Policy
                </Link>
                <Link href="/terms" className="hover:text-white transition-colors duration-300 font-medium">
                  Terms of Service
                </Link>
              </div>
            </div>

            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-3 text-sm text-slate-300 bg-white/5 rounded-full px-4 py-2">
                <Globe className="h-4 w-4 text-primary" />
                <span className="font-medium">Serving Global Markets</span>
              </div>
              <div className="h-6 w-px bg-white/20" />
              <div className="text-sm text-slate-300 font-medium">
                Built with ❤️ by <Link href="https://pencildigitals.com" className="text-white hover:text-primary transition-colors">Pencil Digitals</Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Scroll to Top Button */}
      {showScrollTop && (
        <Button
          onClick={scrollToTop}
          size="icon"
          variant="glow"
          className="fixed bottom-8 right-8 z-50 rounded-full shadow-elegant-xl hover:scale-110 transition-all duration-300"
        >
          <ArrowUp className="h-5 w-5" />
          <span className="sr-only">Scroll to top</span>
        </Button>
      )}
    </footer>
  )
}