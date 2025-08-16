import { CompanySettingsPage } from '@/components/admin/settings/company-settings-page'

export const metadata = {
  title: 'Company Settings | Admin Dashboard',
  description: 'Manage company banking details and payment information',
}

export default function SettingsPage() {
  return <CompanySettingsPage />
}