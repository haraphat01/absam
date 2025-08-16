'use client'

import { PublicLayout } from '@/components/layout/public-layout'
import { ContainerTrackingPage } from '@/components/tracking/container-tracking-page'

export default function TrackingPage() {
  return (
    <PublicLayout>
      <ContainerTrackingPage />
    </PublicLayout>
  )
}