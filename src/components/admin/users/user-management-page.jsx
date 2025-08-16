'use client'

import * as React from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { UserForm } from './user-form'
import { UserList } from './user-list'
import { Plus, Users, Shield, AlertCircle } from '@/components/ui/icons'
import { toast } from 'sonner'

export function UserManagementPage() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = React.useState(false)
  const queryClient = useQueryClient()

  // Fetch users
  const { 
    data: users, 
    isLoading, 
    error,
    refetch 
  } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const response = await fetch('/api/users')
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to fetch users')
      }
      const data = await response.json()
      return data.data
    }
  })

  // Create user mutation
  const createUserMutation = useMutation({
    mutationFn: async (userData) => {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      })
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to create user')
      }
      
      return response.json()
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
      setIsCreateDialogOpen(false)
      toast.success(data.message || 'User created successfully')
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to create user')
    }
  })

  // Update user status mutation
  const updateUserMutation = useMutation({
    mutationFn: async ({ userId, is_active }) => {
      const response = await fetch(`/api/users/${userId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ is_active }),
      })
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to update user')
      }
      
      return response.json()
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
      toast.success(data.message || 'User updated successfully')
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to update user')
    }
  })

  // Delete user mutation
  const deleteUserMutation = useMutation({
    mutationFn: async (userId) => {
      const response = await fetch(`/api/users/${userId}`, {
        method: 'DELETE',
      })
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to delete user')
      }
      
      return response.json()
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
      toast.success(data.message || 'User deleted successfully')
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to delete user')
    }
  })

  const handleCreateUser = (userData) => {
    createUserMutation.mutate(userData)
  }

  const handleToggleUserStatus = (userId, currentStatus) => {
    updateUserMutation.mutate({ 
      userId, 
      is_active: !currentStatus 
    })
  }

  const handleDeleteUser = (userId) => {
    if (window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      deleteUserMutation.mutate(userId)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">User Management</h1>
            <p className="text-muted-foreground mt-2">Manage admin users and their roles</p>
          </div>
        </div>
        
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            {error.message || 'Failed to load users. Please try again.'}
          </AlertDescription>
        </Alert>
        
        <Button onClick={() => refetch()} variant="outline">
          Try Again
        </Button>
      </div>
    )
  }

  const activeUsers = users?.filter(user => user.is_active) || []
  const inactiveUsers = users?.filter(user => !user.is_active) || []
  const adminUsers = users?.filter(user => user.role === 'ADMIN') || []
  const staffUsers = users?.filter(user => user.role === 'STAFF') || []

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">User Management</h1>
          <p className="text-muted-foreground mt-2">Manage admin users and their roles</p>
        </div>
        
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add User
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Create New User</DialogTitle>
              <DialogDescription>
                Add a new admin or staff user to the system
              </DialogDescription>
            </DialogHeader>
            <UserForm 
              onSubmit={handleCreateUser}
              isLoading={createUserMutation.isPending}
            />
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{users?.length || 0}</div>
            <p className="text-xs text-muted-foreground">
              All registered users
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <div className="h-2 w-2 rounded-full bg-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeUsers.length}</div>
            <p className="text-xs text-muted-foreground">
              Currently active
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Administrators</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{adminUsers.length}</div>
            <p className="text-xs text-muted-foreground">
              Admin role users
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Staff Members</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{staffUsers.length}</div>
            <p className="text-xs text-muted-foreground">
              Staff role users
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Users List */}
      <Card>
        <CardHeader>
          <CardTitle>Users</CardTitle>
          <CardDescription>
            Manage user accounts, roles, and access permissions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <UserList
            users={users || []}
            onToggleStatus={handleToggleUserStatus}
            onDeleteUser={handleDeleteUser}
            isUpdating={updateUserMutation.isPending}
            isDeleting={deleteUserMutation.isPending}
          />
        </CardContent>
      </Card>
    </div>
  )
}