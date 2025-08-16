# Absad MultiSynergy Limited - Website

A modern, full-stack Next.js application for Absad MultiSynergy Limited, an import/export company specializing in charcoal and firewood.

## Features

- **Public Website**: Professional company showcase with responsive design
- **Admin Dashboard**: Complete management system for invoices, testimonials, and settings
- **Container Tracking**: Real-time container tracking integration
- **Video Testimonials**: Customer testimonial management system
- **Invoice Management**: PDF generation and email distribution
- **Authentication**: Secure role-based access control

## Tech Stack

- **Frontend**: Next.js 15.4.6 with App Router
- **Styling**: Tailwind CSS 4 with Shadcn/UI components
- **Backend**: Supabase (PostgreSQL, Auth, Storage)
- **Email**: Resend API
- **PDF Generation**: react-pdf
- **State Management**: React Query (TanStack Query)
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Forms**: React Hook Form with Zod validation

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account
- Resend account

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd absad-multisynergy-website
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Update `.env.local` with your actual values:
```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Resend Configuration
RESEND_API_KEY=your_resend_api_key
NEXT_PUBLIC_FROM_EMAIL=invoices@absadmultisynergy.com

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
├── components/             # React components
│   └── ui/                # Shadcn/UI components
├── lib/                   # Utility functions and configurations
│   ├── supabase.js        # Supabase client setup
│   ├── react-query.js     # React Query configuration
│   ├── resend.js          # Resend email setup
│   ├── constants.js       # App constants
│   ├── validations.js     # Zod validation schemas
│   └── utils.js           # Utility functions
└── providers/             # React context providers
    ├── auth-provider.jsx  # Authentication context
    └── query-provider.jsx # React Query provider
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL | Yes |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key | Yes |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key | Yes |
| `RESEND_API_KEY` | Resend API key for emails | Yes |
| `NEXT_PUBLIC_FROM_EMAIL` | From email address | Yes |
| `NEXT_PUBLIC_APP_URL` | Application URL | Yes |

## Design System

The application uses a custom design system built on Tailwind CSS with:

- **Colors**: Professional blue and green palette for import/export industry
- **Typography**: Responsive typography scale with Geist fonts
- **Spacing**: Consistent spacing scale (4px, 8px, 16px, 24px, 32px, 48px, 64px)
- **Animations**: Smooth transitions and micro-interactions
- **Components**: Reusable UI components with consistent styling

## Deployment

The application is optimized for deployment on Vercel:

1. Connect your repository to Vercel
2. Set up environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

## Contributing

1. Follow the existing code style and conventions
2. Use TypeScript for new files where applicable
3. Write meaningful commit messages
4. Test your changes thoroughly

## License

This project is proprietary software for Absad MultiSynergy Limited.# absam
