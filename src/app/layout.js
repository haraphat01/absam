import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "@/providers/query-provider";
import { AuthProvider } from "@/providers/auth-provider";
import { Toaster } from "sonner";
import { PerformanceProvider } from "@/providers/performance-provider";
import { ToastProvider } from "@/components/ui/toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap", // Optimize font loading
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap", // Optimize font loading
});

export const metadata = {
  title: "Absad MultiSynergy Limited - Import & Export Excellence",
  description: "Professional import and export services specializing in charcoal and firewood. Track your containers, view testimonials, and connect with our team.",
  keywords: "import, export, charcoal, firewood, container tracking, Nigeria, trade",
  authors: [{ name: "Absad MultiSynergy Limited" }],
  creator: "Absad MultiSynergy Limited",
  publisher: "Absad MultiSynergy Limited",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_APP_URL,
    title: 'Absad MultiSynergy Limited - Import & Export Excellence',
    description: 'Professional import and export services specializing in charcoal and firewood.',
    siteName: 'Absad MultiSynergy Limited',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Absad MultiSynergy Limited - Import & Export Excellence',
    description: 'Professional import and export services specializing in charcoal and firewood.',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Preconnect to external domains for better performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* DNS prefetch for external resources */}
        <link rel="dns-prefetch" href="//vercel.com" />
        
        {/* Viewport meta tag for responsive design */}
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        
        {/* Theme color for mobile browsers */}
        <meta name="theme-color" content="#1e40af" />
        
        {/* Preload critical resources */}
        <link rel="preload" href="/fonts/inter.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        
        {/* PWA manifest */}
        <link rel="manifest" href="/manifest.json" />
        
        {/* Apple touch icon */}
        <link rel="apple-touch-icon" href="/icon-192.png" />
        
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <PerformanceProvider>
          <QueryProvider>
            <AuthProvider>
              <ToastProvider>
                {children}
                <Toaster position="top-right" richColors />
              </ToastProvider>
            </AuthProvider>
          </QueryProvider>
        </PerformanceProvider>
      </body>
    </html>
  );
}
