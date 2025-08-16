'use client'

import * as React from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu'
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { useAuth } from '@/providers/auth-provider'
import { 
  MoreHorizontal, 
  Shield, 
  User, 
  UserCheck, 
  UserX, 
  Trash2,
  Calendar
} from '@/components/ui/icons'
// Using built-in date formatting instead of date-fns

export function UserList({ 
  users = [], 
  onToggleStatus, 
  onDeleteUser, 
  isUpdating = false, 
  isDeleting = false 
}) {
  const { userProfile } = useAuth()

  const getInitials = (email) => {
    return email?.split('@')[0]?.slice(0, 2)?.toUpperCase() || 'U'
  }

  const getRoleBadgeVariant = (role) => {
    return role === 'ADMIN' ? 'destructive' : 'secondary'
  }

  const getStatusBadgeVariant = (isActive) => {
    return isActive ? 'default' : 'outline'
  }

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString)
      const now = new Date()
      const diffTime = Math.abs(now - date)
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      
      if (diffDays === 1) return '1 day ago'
      if (diffDays < 7) return `${diffDays} days ago`
      if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`
      if (diffDays < 365) return `${Math.ceil(diffDays / 30)} months ago`
      return `${Math.ceil(diffDays / 365)} years ago`
    } catch {
      return 'Unknown'
    }
  }

  if (users.length === 0) {
    return (
      <div className="text-center py-12">
        <User className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-medium text-foreground mb-2">No users found</h3>
        <p className="text-muted-foreground">
          Create your first user to get started with user management.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created</TableHead>
              <TableHead className="w-[70px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-muted text-muted-foreground text-sm">
                        {getInitials(user.email)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium text-foreground">
                        {user.email}
                      </div>
                      {user.id === userProfile?.id && (
                        <div className="text-xs text-muted-foreground">
                          (You)
                        </div>
                      )}
                    </div>
                  </div>
                </TableCell>
                
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <Badge variant={getRoleBadgeVariant(user.role)} className="text-xs">
                      {user.role === 'ADMIN' ? (
                        <>
                          <Shield className="h-3 w-3 mr-1" />
                          Admin
                        </>
                      ) : (
                        <>
                          <User className="h-3 w-3 mr-1" />
                          Staff
                        </>
                      )}
                    </Badge>
                  </div>
                </TableCell>
                
                <TableCell>
                  <Badge variant={getStatusBadgeVariant(user.is_active)} className="text-xs">
                    {user.is_active ? (
                      <>
                        <div className="h-1.5 w-1.5 rounded-full bg-green-500 mr-1.5" />
                        Active
                      </>
                    ) : (
                      <>
                        <div className="h-1.5 w-1.5 rounded-full bg-gray-400 mr-1.5" />
                        Inactive
                      </>
                    )}
                  </Badge>
                </TableCell>
                
                <TableCell>
                  <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    <span>{formatDate(user.created_at)}</span>
                  </div>
                </TableCell>
                
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8"
                        disabled={isUpdating || isDeleting}
                      >
                        {(isUpdating || isDeleting) ? (
                          <LoadingSpinner size="sm" />
                        ) : (
                          <MoreHorizontal className="h-4 w-4" />
                        )}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      
                      {/* Toggle Status */}
                      <DropdownMenuItem
                        onClick={() => onToggleStatus(user.id, user.is_active)}
                        disabled={user.id === userProfile?.id}
                        className="cursor-pointer"
                      >
                        {user.is_active ? (
                          <>
                            <UserX className="h-4 w-4 mr-2" />
                            Deactivate User
                          </>
                        ) : (
                          <>
                            <UserCheck className="h-4 w-4 mr-2" />
                            Activate User
                          </>
                        )}
                      </DropdownMenuItem>
                      
                      <DropdownMenuSeparator />
                      
                      {/* Delete User */}
                      <DropdownMenuItem
                        onClick={() => onDeleteUser(user.id)}
                        disabled={user.id === userProfile?.id}
                        className="cursor-pointer text-destructive focus:text-destructive"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete User
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      {/* Info Text */}
      <div className="text-xs text-muted-foreground">
        Showing {users.length} user{users.length !== 1 ? 's' : ''}
      </div>
    </div>
  )
}