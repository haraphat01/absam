'use client'

import { ProtectedRoute } from '@/components/auth/protected-route'
import { AdminLayout as AdminLayoutComponent } from '@/components/layout/admin-layout'

export default function AdminLayout({ children }) {
  return (
    <ProtectedRoute>
      <AdminLayoutComponent>
        {children}
      </AdminLayoutComponent>
    </ProtectedRoute>
  )
}