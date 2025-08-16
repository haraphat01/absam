import { ContactPage } from '@/components/contact'
import { PublicLayout } from '@/components/layout'

export const metadata = {
  title: 'Contact Us - Absad MultiSynergy Limited',
  description: 'Get in touch with Absad MultiSynergy Limited for all your import and export needs. Contact our expert team for quotes, inquiries, and professional trade services.',
  keywords: 'contact, import export services, trade inquiries, Nigeria, charcoal, firewood, container shipping',
}

export default function Contact() {
  return (
    <PublicLayout>
      <ContactPage />
    </PublicLayout>
  )
}