import { UserManagementPage } from '@/components/admin/users'

export const metadata = {
  title: 'User Management - Admin Dashboard',
  description: 'Manage admin users and their roles',
}

export default function UsersPage() {
  return <UserManagementPage />
}