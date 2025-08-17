'use client'

import * as React from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { useSupabaseAuth } from '@/hooks/use-supabase-auth'
import { usePermissions } from '@/components/auth/protected-route'
import { cn } from '@/lib/utils'
import {
  Menu,
  X,
  Home,
  FileText,
  Video,
  Users,
  Settings,
  Truck,
  Mail,
  BarChart3,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Shield,
  User
} from '@/components/ui/icons'

const sidebarNavigation = [
  {
    name: 'Dashboard',
    href: '/admin',
    icon: Home,
    description: 'Overview and metrics'
  },
  {
    name: 'Invoices',
    href: '/admin/invoices',
    icon: FileText,
    description: 'Manage billing and payments'
  },
  {
    name: 'Testimonials',
    href: '/admin/testimonials',
    icon: Video,
    description: 'Customer video testimonials'
  },
  {
    name: 'Container Tracking',
    href: '/admin/tracking',
    icon: Truck,
    description: 'Track shipments and containers'
  },
  {
    name: 'Contact Inquiries',
    href: '/admin/contacts',
    icon: Mail,
    description: 'Customer messages and leads'
  },
  {
    name: 'Analytics',
    href: '/admin/analytics',
    icon: BarChart3,
    description: 'Business insights and reports'
  },
]

const adminOnlyNavigation = [
  {
    name: 'User Management',
    href: '/admin/users',
    icon: Users,
    description: 'Manage admin accounts'
  },
  {
    name: 'Company Settings',
    href: '/admin/settings',
    icon: Settings,
    description: 'Banking and company details'
  },
]

export function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = React.useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false)
  const { userProfile, signOut } = useSupabaseAuth()
  const { isAdmin, canManageUsers, canManageSettings } = usePermissions()
  const pathname = usePathname()
  const router = useRouter()

  const handleSignOut = async () => {
    await signOut()
    router.push('/admin/login')
  }

  const getInitials = (email) => {
    return email?.split('@')[0]?.slice(0, 2)?.toUpperCase() || 'AD'
  }

  const filteredAdminNavigation = adminOnlyNavigation.filter(item => {
    if (item.href === '/admin/users') return canManageUsers
    if (item.href === '/admin/settings') return canManageSettings
    return true
  })

  const allNavigation = [...sidebarNavigation, ...filteredAdminNavigation]

  return (
    <div className="min-h-screen bg-slate-50/50">
      {/* Desktop Sidebar */}
      <div
        className={cn(
          'hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:flex-col transition-all duration-300 ease-out',
          sidebarCollapsed ? 'lg:w-16' : 'lg:w-72'
        )}
      >
        <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white border-r border-border shadow-elegant">
          {/* Sidebar Header */}
          <div className="flex h-16 shrink-0 items-center justify-between px-4">
            {!sidebarCollapsed && (
              <Link href="/admin" className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                  <span className="text-white font-bold text-sm">AM</span>
                </div>
                <div>
                  <h1 className="text-lg font-bold text-foreground">Admin Panel</h1>
                  <p className="text-xs text-muted-foreground -mt-1">Absad MultiSynergy</p>
                </div>
              </Link>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="hover:bg-accent hover:scale-105"
            >
              {sidebarCollapsed ? (
                <ChevronRight className="h-4 w-4" />
              ) : (
                <ChevronLeft className="h-4 w-4" />
              )}
            </Button>
          </div>

          {/* User Profile Section */}
          <div className="px-4">
            <div className={cn(
              'flex items-center space-x-3 p-3 rounded-lg bg-muted/50 border',
              sidebarCollapsed && 'justify-center'
            )}>
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                  {getInitials(userProfile?.email)}
                </AvatarFallback>
              </Avatar>
              {!sidebarCollapsed && (
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">
                    {userProfile?.email}
                  </p>
                  <div className="flex items-center space-x-2">
                    <Badge variant={isAdmin ? "default" : "secondary"} className="text-xs">
                      {userProfile?.role}
                    </Badge>
                    <div className="h-1 w-1 rounded-full bg-green-500"></div>
                    <span className="text-xs text-muted-foreground">Online</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4">
            <ul role="list" className="space-y-1">
              {allNavigation.map((item) => {
                const isActive = pathname === item.href
                return (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className={cn(
                        'group flex items-center gap-x-3 rounded-lg p-3 text-sm font-medium transition-all duration-200 ease-out hover:bg-accent hover:text-accent-foreground hover:scale-[1.02]',
                        isActive
                          ? 'bg-primary/10 text-primary border border-primary/20'
                          : 'text-muted-foreground hover:text-foreground',
                        sidebarCollapsed && 'justify-center'
                      )}
                      title={sidebarCollapsed ? item.name : undefined}
                    >
                      <item.icon
                        className={cn(
                          'h-5 w-5 shrink-0',
                          isActive ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground'
                        )}
                      />
                      {!sidebarCollapsed && (
                        <div className="flex-1 min-w-0">
                          <div className="truncate">{item.name}</div>
                          <div className="text-xs text-muted-foreground truncate">
                            {item.description}
                          </div>
                        </div>
                      )}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>

          {/* Sidebar Footer */}
          <div className="px-4 pb-4">
            <Separator className="mb-4" />
            <div className="space-y-2">
              <Button
                variant="ghost"
                onClick={handleSignOut}
                className={cn(
                  'w-full justify-start text-muted-foreground hover:text-foreground hover:bg-destructive/10 hover:text-destructive',
                  sidebarCollapsed && 'justify-center px-2'
                )}
              >
                <LogOut className="h-4 w-4" />
                {!sidebarCollapsed && <span className="ml-3">Sign Out</span>}
              </Button>
              {!sidebarCollapsed && (
                <div className="text-xs text-muted-foreground text-center pt-2">
                  v1.0.0 • {new Date().getFullYear()}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-border bg-white px-4 shadow-sm lg:hidden">
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="hover:bg-accent">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Open sidebar</span>
            </Button>
          </SheetTrigger>
          
          <div className="flex flex-1 items-center justify-between">
            <Link href="/admin" className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <span className="text-white font-bold text-sm">AM</span>
              </div>
              <div>
                <h1 className="text-lg font-bold text-foreground">Admin Panel</h1>
              </div>
            </Link>
            
            <div className="flex items-center space-x-2">
              <Badge variant={isAdmin ? "default" : "secondary"}>
                {userProfile?.role}
              </Badge>
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                  {getInitials(userProfile?.email)}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>

        <SheetContent side="left" className="w-80 p-0">
          <div className="flex flex-col h-full">
            {/* Mobile Header */}
            <div className="flex items-center justify-between p-6 border-b">
              <Link href="/admin" className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                  <span className="text-white font-bold text-sm">AM</span>
                </div>
                <div>
                  <h1 className="text-lg font-bold text-foreground">Admin Panel</h1>
                  <p className="text-xs text-muted-foreground -mt-1">Absad MultiSynergy</p>
                </div>
              </Link>
            </div>

            {/* Mobile User Profile */}
            <div className="p-6 border-b">
              <div className="flex items-center space-x-3 p-3 rounded-lg bg-muted/50 border">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {getInitials(userProfile?.email)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">
                    {userProfile?.email}
                  </p>
                  <div className="flex items-center space-x-2">
                    <Badge variant={isAdmin ? "default" : "secondary"} className="text-xs">
                      {userProfile?.role}
                    </Badge>
                    <div className="h-1 w-1 rounded-full bg-green-500"></div>
                    <span className="text-xs text-muted-foreground">Online</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Navigation */}
            <nav className="flex-1 px-6 py-6">
              <ul role="list" className="space-y-2">
                {allNavigation.map((item) => {
                  const isActive = pathname === item.href
                  return (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        onClick={() => setSidebarOpen(false)}
                        className={cn(
                          'group flex items-center gap-x-3 rounded-lg p-3 text-sm font-medium transition-all duration-200 ease-out hover:bg-accent hover:text-accent-foreground hover:translate-x-1',
                          isActive
                            ? 'bg-primary/10 text-primary border border-primary/20'
                            : 'text-muted-foreground hover:text-foreground'
                        )}
                      >
                        <item.icon
                          className={cn(
                            'h-5 w-5 shrink-0',
                            isActive ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground'
                          )}
                        />
                        <div className="flex-1 min-w-0">
                          <div className="truncate">{item.name}</div>
                          <div className="text-xs text-muted-foreground truncate">
                            {item.description}
                          </div>
                        </div>
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </nav>

            {/* Mobile Footer */}
            <div className="p-6 border-t">
              <Button
                variant="ghost"
                onClick={handleSignOut}
                className="w-full justify-start text-muted-foreground hover:text-foreground hover:bg-destructive/10 hover:text-destructive"
              >
                <LogOut className="h-4 w-4 mr-3" />
                Sign Out
              </Button>
              <div className="text-xs text-muted-foreground text-center pt-4">
                v1.0.0 • {new Date().getFullYear()}
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <div className={cn(
        'transition-all duration-300 ease-out',
        'lg:pl-72',
        sidebarCollapsed && 'lg:pl-16'
      )}>
        <main className="py-6">
          <div className="px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}