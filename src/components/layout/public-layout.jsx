'use client'

import * as React from 'react'
import { Header } from './header'
import { Footer } from './footer'

export function PublicLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  )
}