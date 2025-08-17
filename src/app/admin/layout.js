'use client'

import { usePathname } from 'next/navigation'
import { ProtectedRoute } from '@/components/auth/protected-route'
import { AdminLayout as AdminLayoutComponent } from '@/components/layout/admin-layout'

export default function AdminLayout({ children }) {
  const pathname = usePathname()
  
  // Don't apply protection to login pages
  const isLoginPage = pathname?.includes('/login') || pathname?.includes('/simple') || pathname?.includes('/debug')
  
  if (isLoginPage) {
    return children
  }

  return (
    <ProtectedRoute>
      <AdminLayoutComponent>
        {children}
      </AdminLayoutComponent>
    </ProtectedRoute>
  )
}