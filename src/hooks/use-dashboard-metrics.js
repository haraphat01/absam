'use client'

import { useQuery } from '@tanstack/react-query'

async function fetchDashboardMetrics() {
  const response = await fetch('/api/dashboard/metrics')
  
  if (!response.ok) {
    throw new Error('Failed to fetch dashboard metrics')
  }
  
  const result = await response.json()
  
  if (!result.success) {
    throw new Error(result.error?.message || 'Failed to fetch dashboard metrics')
  }
  
  return result.data
}

export function useDashboardMetrics() {
  return useQuery({
    queryKey: ['dashboard-metrics'],
    queryFn: fetchDashboardMetrics,
    staleTime: 1000 * 60 * 2, // 2 minutes
    cacheTime: 1000 * 60 * 5, // 5 minutes
    refetchInterval: 1000 * 60 * 2, // Refetch every 2 minutes for real-time updates
    refetchIntervalInBackground: false,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  })
}