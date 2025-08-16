'use client'

import { useAuth } from '@/providers/auth-provider'
import { usePermissions } from '@/components/auth/protected-route'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { User, Shield, Settings, BarChart3, TrendingUp, Users, FileText, DollarSign, MessageSquare, CheckCircle, XCircle } from '@/components/ui/icons'
import { MetricsCard } from '@/components/admin/dashboard/metrics-card'
import { SimpleBarChart, SimpleDonutChart } from '@/components/admin/dashboard/simple-chart'
import { useDashboardMetrics } from '@/hooks/use-dashboard-metrics'
import { useMemo } from 'react'

export default function AdminDashboard() {
  const { userProfile } = useAuth()
  const { isAdmin, isStaff, canManageUsers, canManageSettings } = usePermissions()
  const { data: metrics, isLoading, error, isRefetching } = useDashboardMetrics()

  // Prepare chart data
  const invoiceChartData = useMemo(() => {
    if (!metrics) return []
    
    return [
      {
        label: 'Paid Invoices',
        value: metrics.invoices.paid,
        color: 'bg-gradient-to-r from-emerald-500 to-emerald-600'
      },
      {
        label: 'Unpaid Invoices', 
        value: metrics.invoices.unpaid,
        color: 'bg-gradient-to-r from-amber-500 to-amber-600'
      }
    ]
  }, [metrics])

  const overviewChartData = useMemo(() => {
    if (!metrics) return []
    
    return [
      {
        label: 'Total Invoices',
        value: metrics.invoices.total,
        color: 'border-blue-500'
      },
      {
        label: 'Testimonials',
        value: metrics.testimonials,
        color: 'border-purple-500'
      },
      {
        label: 'Inquiries',
        value: metrics.inquiries,
        color: 'border-green-500'
      }
    ]
  }, [metrics])

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Welcome Header */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome back, {userProfile?.email?.split('@')[0]}! Here&apos;s what&apos;s happening with your business.
            </p>
          </div>
          {isRefetching && (
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-current border-t-transparent" />
              <span>Updating...</span>
            </div>
          )}
        </div>
      </div>

      {/* Error State */}
      {error && (
        <Card className="border-destructive/50 bg-destructive/5">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2 text-destructive">
              <XCircle className="h-5 w-5" />
              <span>Failed to load dashboard metrics. Please try refreshing the page.</span>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
        <MetricsCard
          title="Total Invoices"
          value={metrics?.invoices?.total}
          change={`${metrics?.invoices?.total || 0} this month`}
          changeType="neutral"
          icon={FileText}
          gradient="bg-gradient-to-br from-blue-500 to-blue-600"
          isLoading={isLoading}
        />
        
        <MetricsCard
          title="Paid Invoices"
          value={metrics?.invoices?.paid}
          change={metrics?.invoices?.total > 0 ? `${Math.round((metrics.invoices.paid / metrics.invoices.total) * 100)}% completion rate` : 'No invoices yet'}
          changeType={metrics?.invoices?.paid > 0 ? "positive" : "neutral"}
          icon={CheckCircle}
          gradient="bg-gradient-to-br from-emerald-500 to-emerald-600"
          isLoading={isLoading}
        />
        
        <MetricsCard
          title="Unpaid Invoices"
          value={metrics?.invoices?.unpaid}
          change={metrics?.invoices?.unpaid > 0 ? "Requires attention" : "All caught up!"}
          changeType={metrics?.invoices?.unpaid > 0 ? "negative" : "positive"}
          icon={DollarSign}
          gradient="bg-gradient-to-br from-amber-500 to-amber-600"
          isLoading={isLoading}
        />
        
        <MetricsCard
          title="New Testimonials"
          value={metrics?.testimonials}
          change={`${metrics?.testimonials || 0} uploaded this month`}
          changeType={metrics?.testimonials > 0 ? "positive" : "neutral"}
          icon={BarChart3}
          gradient="bg-gradient-to-br from-purple-500 to-purple-600"
          isLoading={isLoading}
        />
        
        <MetricsCard
          title="Contact Inquiries"
          value={metrics?.inquiries}
          change={`${metrics?.inquiries || 0} new this month`}
          changeType={metrics?.inquiries > 0 ? "positive" : "neutral"}
          icon={MessageSquare}
          gradient="bg-gradient-to-br from-green-500 to-green-600"
          isLoading={isLoading}
          className="sm:col-span-2 lg:col-span-1 xl:col-span-1"
        />
      </div>

      {/* Charts and Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {/* Invoice Status Chart */}
        <SimpleBarChart
          title="Invoice Status Breakdown"
          data={invoiceChartData}
          isLoading={isLoading}
          className="lg:col-span-1"
        />
        
        {/* Monthly Overview */}
        <SimpleDonutChart
          title="Monthly Activity Overview"
          data={overviewChartData}
          isLoading={isLoading}
          className="lg:col-span-1"
        />

        {/* Quick Stats Card */}
        <Card className="hover:shadow-elegant-lg transition-all duration-300 ease-elegant xl:col-span-1 lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="mr-2 h-5 w-5" />
              Quick Insights
            </CardTitle>
            <CardDescription>Key performance indicators</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-blue-100 text-blue-600">
                    <FileText className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="font-medium">Invoice Completion</div>
                    <div className="text-sm text-muted-foreground">Payment success rate</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-lg">
                    {metrics?.invoices?.total > 0 
                      ? `${Math.round((metrics.invoices.paid / metrics.invoices.total) * 100)}%`
                      : '0%'
                    }
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-purple-100 text-purple-600">
                    <BarChart3 className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="font-medium">Content Growth</div>
                    <div className="text-sm text-muted-foreground">New testimonials</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-lg">{metrics?.testimonials || 0}</div>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-green-100 text-green-600">
                    <MessageSquare className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="font-medium">Customer Engagement</div>
                    <div className="text-sm text-muted-foreground">New inquiries</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-lg">{metrics?.inquiries || 0}</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - User Info & Permissions */}
        <div className="space-y-6">
          {/* User Info Card */}
          <Card className="hover:shadow-elegant-lg transition-all duration-300 ease-elegant">
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="mr-2 h-5 w-5" />
                User Information
              </CardTitle>
              <CardDescription>Your account details and status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Email:</span>
                  <span className="text-sm text-muted-foreground">{userProfile?.email}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Role:</span>
                  <Badge variant={isAdmin ? "default" : "secondary"}>
                    {userProfile?.role}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Status:</span>
                  <Badge variant={userProfile?.is_active ? "default" : "destructive"}>
                    {userProfile?.is_active ? 'Active' : 'Inactive'}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Member since:</span>
                  <span className="text-sm text-muted-foreground">
                    {new Date(userProfile?.created_at).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Permissions Card */}
          <Card className="hover:shadow-elegant-lg transition-all duration-300 ease-elegant">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="mr-2 h-5 w-5" />
                Permissions & Access
              </CardTitle>
              <CardDescription>Your current access levels and capabilities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Manage Users:</span>
                  <Badge variant={canManageUsers ? "default" : "secondary"}>
                    {canManageUsers ? 'Allowed' : 'Restricted'}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Manage Settings:</span>
                  <Badge variant={canManageSettings ? "default" : "secondary"}>
                    {canManageSettings ? 'Allowed' : 'Restricted'}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Admin Access:</span>
                  <Badge variant={isAdmin ? "default" : "secondary"}>
                    {isAdmin ? 'Full Access' : 'Limited Access'}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Staff Level:</span>
                  <Badge variant={isStaff ? "default" : "secondary"}>
                    {isStaff ? 'Staff Member' : 'Basic User'}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions & Status */}
        <div className="space-y-6">
          <Card className="hover:shadow-elegant-lg transition-all duration-300 ease-elegant">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Settings className="mr-2 h-5 w-5" />
                Quick Actions
              </CardTitle>
              <CardDescription>
                Common administrative tasks and shortcuts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-3">
                <Button variant="outline" className="justify-start hover:scale-105 hover:shadow-lg transition-all duration-200" disabled>
                  <FileText className="mr-2 h-4 w-4" />
                  Create New Invoice
                </Button>
                <Button variant="outline" className="justify-start hover:scale-105 hover:shadow-lg transition-all duration-200" disabled>
                  <BarChart3 className="mr-2 h-4 w-4" />
                  Upload Testimonial
                </Button>
                {canManageUsers && (
                  <Button variant="outline" className="justify-start hover:scale-105 hover:shadow-lg transition-all duration-200" disabled>
                    <Users className="mr-2 h-4 w-4" />
                    Add New User
                  </Button>
                )}
                {canManageSettings && (
                  <Button variant="outline" className="justify-start hover:scale-105 hover:shadow-lg transition-all duration-200" disabled>
                    <Settings className="mr-2 h-4 w-4" />
                    Update Settings
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* System Status */}
          <Card className="hover:shadow-elegant-lg transition-all duration-300 ease-elegant">
            <CardHeader>
              <CardTitle>System Status</CardTitle>
              <CardDescription>
                Current system health and authentication status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 rounded-lg bg-emerald-50 border border-emerald-200 hover:bg-emerald-100 transition-colors duration-200">
                  <div className="text-2xl font-bold text-emerald-600 mb-1">✓</div>
                  <div className="text-sm font-medium text-emerald-800">Authenticated</div>
                </div>
                <div className="text-center p-3 rounded-lg bg-emerald-50 border border-emerald-200 hover:bg-emerald-100 transition-colors duration-200">
                  <div className="text-2xl font-bold text-emerald-600 mb-1">✓</div>
                  <div className="text-sm font-medium text-emerald-800">Database Connected</div>
                </div>
                <div className={`text-center p-3 rounded-lg transition-colors duration-200 ${
                  isAdmin 
                    ? 'bg-emerald-50 border-emerald-200 hover:bg-emerald-100' 
                    : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                }`}>
                  <div className={`text-2xl font-bold mb-1 ${isAdmin ? 'text-emerald-600' : 'text-gray-400'}`}>
                    {isAdmin ? '✓' : '○'}
                  </div>
                  <div className={`text-sm font-medium ${isAdmin ? 'text-emerald-800' : 'text-gray-600'}`}>
                    Admin Role
                  </div>
                </div>
                <div className="text-center p-3 rounded-lg bg-blue-50 border border-blue-200 hover:bg-blue-100 transition-colors duration-200">
                  <div className="text-2xl font-bold text-blue-600 mb-1">⚡</div>
                  <div className="text-sm font-medium text-blue-800">System Online</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}