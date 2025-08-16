'use client'

import * as React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { userSchema } from '@/lib/validations'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { Eye, EyeOff, AlertCircle } from '@/components/ui/icons'

export function UserForm({ onSubmit, isLoading = false }) {
  const [showPassword, setShowPassword] = React.useState(false)
  
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid },
    reset
  } = useForm({
    resolver: zodResolver(userSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
      role: 'STAFF'
    }
  })

  const watchedRole = watch('role')

  const handleFormSubmit = (data) => {
    onSubmit(data)
    reset()
  }

  const handleRoleChange = (value) => {
    setValue('role', value, { shouldValidate: true })
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      {/* Email Field */}
      <div className="space-y-2">
        <Label htmlFor="email">Email Address</Label>
        <Input
          id="email"
          type="email"
          placeholder="user@example.com"
          {...register('email')}
          className={errors.email ? 'border-destructive' : ''}
        />
        {errors.email && (
          <p className="text-sm text-destructive">{errors.email.message}</p>
        )}
      </div>

      {/* Password Field */}
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter a secure password"
            {...register('password')}
            className={errors.password ? 'border-destructive pr-10' : 'pr-10'}
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4 text-muted-foreground" />
            ) : (
              <Eye className="h-4 w-4 text-muted-foreground" />
            )}
          </Button>
        </div>
        {errors.password && (
          <p className="text-sm text-destructive">{errors.password.message}</p>
        )}
        <p className="text-xs text-muted-foreground">
          Password must be at least 8 characters long
        </p>
      </div>

      {/* Role Field */}
      <div className="space-y-2">
        <Label htmlFor="role">Role</Label>
        <Select value={watchedRole} onValueChange={handleRoleChange}>
          <SelectTrigger className={errors.role ? 'border-destructive' : ''}>
            <SelectValue placeholder="Select a role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="STAFF">
              <div className="flex items-center space-x-2">
                <div className="h-2 w-2 rounded-full bg-blue-500" />
                <div>
                  <div className="font-medium">Staff</div>
                  <div className="text-xs text-muted-foreground">
                    Can manage invoices and testimonials
                  </div>
                </div>
              </div>
            </SelectItem>
            <SelectItem value="ADMIN">
              <div className="flex items-center space-x-2">
                <div className="h-2 w-2 rounded-full bg-red-500" />
                <div>
                  <div className="font-medium">Administrator</div>
                  <div className="text-xs text-muted-foreground">
                    Full access to all features
                  </div>
                </div>
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
        {errors.role && (
          <p className="text-sm text-destructive">{errors.role.message}</p>
        )}
      </div>

      {/* Role Description */}
      {watchedRole && (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            {watchedRole === 'ADMIN' ? (
              <>
                <strong>Administrator</strong> users have full access to all features including user management, 
                company settings, and all other administrative functions.
              </>
            ) : (
              <>
                <strong>Staff</strong> users can manage invoices, testimonials, and view the dashboard, 
                but cannot manage other users or company settings.
              </>
            )}
          </AlertDescription>
        </Alert>
      )}

      {/* Submit Button */}
      <div className="flex justify-end space-x-2 pt-4">
        <Button
          type="submit"
          disabled={!isValid || isLoading}
          className="min-w-[100px]"
        >
          {isLoading ? (
            <>
              <LoadingSpinner size="sm" className="mr-2" />
              Creating...
            </>
          ) : (
            'Create User'
          )}
        </Button>
      </div>
    </form>
  )
}