'use client'

import * as React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Menu, X, Phone, Mail } from '@/components/ui/icons'
import { cn } from '@/lib/utils'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Products', href: '/products' },
  { name: 'Testimonials', href: '/testimonials' },
  { name: 'Tracking', href: '/tracking' },
  { name: 'Contact', href: '/contact' },
]

export function Header() {
  const [isOpen, setIsOpen] = React.useState(false)
  const [isScrolled, setIsScrolled] = React.useState(false)
  const pathname = usePathname()

  // Handle scroll effect
  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full transition-all duration-500 ease-out',
        isScrolled
          ? 'bg-white/95 backdrop-blur-xl shadow-elegant-lg border-b border-border/50'
          : 'bg-white/80 backdrop-blur-md'
      )}
    >
      <div className="container-wide">
        <div className="flex h-16 lg:h-20 items-center justify-between">
          {/* Enhanced Logo */}
          <Link
            href="/"
            className="flex items-center space-x-3 hover:opacity-80 transition-all duration-300 ease-out hover:scale-105"
          >
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 lg:h-12 lg:w-12 rounded-xl lg:rounded-2xl bg-gradient-to-br from-primary via-secondary to-accent flex items-center justify-center shadow-elegant hover:shadow-elegant-lg transition-all duration-300 ease-out hover:scale-110">
                <span className="text-white font-bold text-base lg:text-lg">AM</span>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-lg lg:text-xl font-bold text-foreground leading-tight">
                  Absad MultiSynergy
                </h1>
                <p className="text-xs lg:text-sm text-muted-foreground -mt-1 font-medium">
                  Import & Export Excellence
                </p>
              </div>
            </div>
          </Link>

          {/* Enhanced Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ease-out hover:scale-105 hover:shadow-elegant',
                  pathname === item.href
                    ? 'bg-gradient-to-r from-primary/10 to-secondary/10 text-primary font-semibold shadow-elegant'
                    : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Enhanced Contact Info & CTA */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Compact Contact Info */}
            <div className="hidden xl:flex items-center space-x-3 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2 bg-primary/5 rounded-full px-3 py-1.5 hover:bg-primary/10 transition-colors duration-300">
                <Phone className="h-3.5 w-3.5 text-primary" />
                <span className="font-medium text-xs">+234 701 822 2950</span>
              </div>
            </div>
            
            {/* CTA Button */}
            <Button asChild variant="gradient" size="sm" className="hover-lift-glow">
              <Link href="/admin/login">Login</Link>
            </Button>
          </div>

          {/* Enhanced Mobile menu button */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden hover:bg-accent/50 hover:scale-105 transition-all duration-300"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80 p-0 bg-white/95 backdrop-blur-xl">
              <div className="flex flex-col h-full">
                {/* Enhanced Mobile header */}
                <div className="flex items-center justify-between p-6 border-b border-border/50">
                  <Link
                    href="/"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center space-x-3"
                  >
                    <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary via-secondary to-accent flex items-center justify-center shadow-elegant">
                      <span className="text-white font-bold text-sm">AM</span>
                    </div>
                    <div>
                      <h1 className="text-lg font-bold text-foreground leading-tight">
                        Absad MultiSynergy
                      </h1>
                      <p className="text-xs text-muted-foreground -mt-1 font-medium">
                        Import & Export Excellence
                      </p>
                    </div>
                  </Link>
                </div>

                {/* Enhanced Mobile navigation */}
                <nav className="flex-1 px-6 py-8">
                  <div className="space-y-3">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className={cn(
                          'block px-6 py-4 rounded-xl text-base font-semibold transition-all duration-300 ease-out hover:translate-x-2 hover:shadow-elegant',
                          pathname === item.href
                            ? 'bg-gradient-to-r from-primary/10 to-secondary/10 text-primary font-bold shadow-elegant border-l-4 border-primary'
                            : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
                        )}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </nav>

                {/* Enhanced Mobile contact info */}
                <div className="p-6 border-t border-border/50 bg-muted/30">
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3 bg-primary/5 rounded-xl p-4">
                        <Phone className="h-5 w-5 text-primary" />
                        <div>
                          <p className="text-foreground font-semibold">+234 701 822 2950</p>
                          <p className="text-muted-foreground text-sm">Mon-Fri 8AM-6PM WAT</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3 bg-secondary/5 rounded-xl p-4">
                        <Mail className="h-5 w-5 text-secondary" />
                        <div>
                          <p className="text-foreground font-semibold">contact@absadmultisynergy.com</p>
                          <p className="text-muted-foreground text-sm">24/7 Email Support</p>
                        </div>
                      </div>
                    </div>
                    <Button asChild variant="gradient" className="w-full hover-lift-glow">
                      <Link href="/admin/login" onClick={() => setIsOpen(false)}>
                        Login
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}