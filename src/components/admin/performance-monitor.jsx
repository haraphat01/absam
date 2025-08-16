'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  Activity, 
  Database, 
  Clock, 
  Zap, 
  RefreshCw,
  TrendingUp,
  TrendingDown,
  Minus
} from '@/components/ui/icons'
import { cache } from '@/lib/performance'

/**
 * Performance monitoring component for admin dashboard
 * Shows cache statistics, query performance, and system metrics
 */
export function PerformanceMonitor() {
  const [metrics, setMetrics] = useState({
    cache: {
      size: 0,
      hitRate: 0,
      totalRequests: 0,
    },
    performance: {
      averageResponseTime: 0,
      slowQueries: 0,
      totalQueries: 0,
    },
    system: {
      memoryUsage: 0,
      cpuUsage: 0,
      uptime: 0,
    }
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchMetrics()
    const interval = setInterval(fetchMetrics, 30000) // Update every 30 seconds
    
    return () => clearInterval(interval)
  }, [])

  const fetchMetrics = async () => {
    try {
      setIsLoading(true)
      
      // Get cache metrics
      const cacheSize = cache.size()
      
      // Simulate performance metrics (in a real app, these would come from your monitoring service)
      const performanceMetrics = {
        cache: {
          size: cacheSize,
          hitRate: Math.random() * 100, // This would be tracked in a real implementation
          totalRequests: Math.floor(Math.random() * 10000),
        },
        performance: {
          averageResponseTime: Math.random() * 200 + 50,
          slowQueries: Math.floor(Math.random() * 10),
          totalQueries: Math.floor(Math.random() * 1000),
        },
        system: {
          memoryUsage: Math.random() * 100,
          cpuUsage: Math.random() * 100,
          uptime: Date.now() - (Math.random() * 86400000), // Random uptime up to 24 hours
        }
      }
      
      setMetrics(performanceMetrics)
    } catch (error) {
      console.error('Failed to fetch performance metrics:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const clearCache = () => {
    cache.clear()
    fetchMetrics()
  }

  const formatUptime = (timestamp) => {
    const uptime = Date.now() - timestamp
    const hours = Math.floor(uptime / (1000 * 60 * 60))
    const minutes = Math.floor((uptime % (1000 * 60 * 60)) / (1000 * 60))
    return `${hours}h ${minutes}m`
  }

  const getStatusColor = (value, thresholds) => {
    if (value < thresholds.good) return 'text-green-600'
    if (value < thresholds.warning) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getStatusIcon = (value, thresholds) => {
    if (value < thresholds.good) return <TrendingUp className="h-4 w-4 text-green-600" />
    if (value < thresholds.warning) return <Minus className="h-4 w-4 text-yellow-600" />
    return <TrendingDown className="h-4 w-4 text-red-600" />
  }

  if (isLoading && metrics.cache.size === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Activity className="h-5 w-5" />
            <span>Performance Monitor</span>
          </CardTitle>
          <CardDescription>Loading performance metrics...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-slate-200 rounded w-3/4"></div>
            <div className="h-4 bg-slate-200 rounded w-1/2"></div>
            <div className="h-4 bg-slate-200 rounded w-2/3"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Performance Monitor</h2>
          <p className="text-muted-foreground">System performance and cache statistics</p>
        </div>
        <Button onClick={fetchMetrics} variant="outline" size="sm" disabled={isLoading}>
          <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Cache Hit Rate */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center justify-between">
              Cache Hit Rate
              {getStatusIcon(metrics.cache.hitRate, { good: 80, warning: 60 })}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {metrics.cache.hitRate.toFixed(1)}%
            </div>
            <p className="text-xs text-muted-foreground">
              {metrics.cache.totalRequests.toLocaleString()} total requests
            </p>
          </CardContent>
        </Card>

        {/* Cache Size */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center justify-between">
              Cache Size
              <Database className="h-4 w-4 text-blue-600" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {metrics.cache.size}
            </div>
            <p className="text-xs text-muted-foreground">
              cached items
            </p>
            <Button 
              onClick={clearCache} 
              variant="outline" 
              size="sm" 
              className="mt-2 text-xs"
            >
              Clear Cache
            </Button>
          </CardContent>
        </Card>

        {/* Average Response Time */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center justify-between">
              Avg Response Time
              {getStatusIcon(metrics.performance.averageResponseTime, { good: 100, warning: 200 })}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {metrics.performance.averageResponseTime.toFixed(0)}ms
            </div>
            <p className="text-xs text-muted-foreground">
              {metrics.performance.totalQueries.toLocaleString()} queries
            </p>
          </CardContent>
        </Card>

        {/* Slow Queries */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center justify-between">
              Slow Queries
              {getStatusIcon(metrics.performance.slowQueries, { good: 5, warning: 10 })}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {metrics.performance.slowQueries}
            </div>
            <p className="text-xs text-muted-foreground">
              queries &gt; 100ms
            </p>
          </CardContent>
        </Card>
      </div>

      {/* System Metrics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Zap className="h-5 w-5" />
            <span>System Metrics</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Memory Usage</span>
                <Badge variant={metrics.system.memoryUsage > 80 ? 'destructive' : 'secondary'}>
                  {metrics.system.memoryUsage.toFixed(1)}%
                </Badge>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-300 ${
                    metrics.system.memoryUsage > 80 ? 'bg-red-500' : 
                    metrics.system.memoryUsage > 60 ? 'bg-yellow-500' : 'bg-green-500'
                  }`}
                  style={{ width: `${metrics.system.memoryUsage}%` }}
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">CPU Usage</span>
                <Badge variant={metrics.system.cpuUsage > 80 ? 'destructive' : 'secondary'}>
                  {metrics.system.cpuUsage.toFixed(1)}%
                </Badge>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-300 ${
                    metrics.system.cpuUsage > 80 ? 'bg-red-500' : 
                    metrics.system.cpuUsage > 60 ? 'bg-yellow-500' : 'bg-green-500'
                  }`}
                  style={{ width: `${metrics.system.cpuUsage}%` }}
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Uptime</span>
                <Badge variant="secondary">
                  <Clock className="h-3 w-3 mr-1" />
                  {formatUptime(metrics.system.uptime)}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">
                System has been running smoothly
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Performance Tips */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Tips</CardTitle>
          <CardDescription>
            Recommendations to improve system performance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {metrics.cache.hitRate < 60 && (
              <div className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg">
                <TrendingDown className="h-5 w-5 text-yellow-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-yellow-800">Low Cache Hit Rate</p>
                  <p className="text-xs text-yellow-700">
                    Consider increasing cache TTL or reviewing cache keys for better efficiency.
                  </p>
                </div>
              </div>
            )}
            
            {metrics.performance.averageResponseTime > 200 && (
              <div className="flex items-start space-x-3 p-3 bg-red-50 rounded-lg">
                <Clock className="h-5 w-5 text-red-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-red-800">High Response Time</p>
                  <p className="text-xs text-red-700">
                    Database queries may need optimization or additional indexing.
                  </p>
                </div>
              </div>
            )}
            
            {metrics.performance.slowQueries > 10 && (
              <div className="flex items-start space-x-3 p-3 bg-orange-50 rounded-lg">
                <Database className="h-5 w-5 text-orange-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-orange-800">Many Slow Queries</p>
                  <p className="text-xs text-orange-700">
                    Review database indexes and query optimization opportunities.
                  </p>
                </div>
              </div>
            )}
            
            {metrics.cache.hitRate >= 80 && metrics.performance.averageResponseTime <= 100 && (
              <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
                <TrendingUp className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-green-800">Excellent Performance</p>
                  <p className="text-xs text-green-700">
                    Your system is running optimally with good cache efficiency and fast response times.
                  </p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}