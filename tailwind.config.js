/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // Enhanced breakpoints for responsive design
      screens: {
        'xs': '475px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
        '3xl': '1920px',
      },
      
      // Enhanced colors for the brand
      colors: {
        brand: {
          blue: 'var(--brand-blue)',
          green: 'var(--brand-green)',
          orange: 'var(--brand-orange)',
          purple: 'var(--brand-purple)',
        },
        success: 'var(--success)',
        warning: 'var(--warning)',
        error: 'var(--error)',
        // Enhanced semantic colors
        primary: {
          50: 'oklch(0.98 0.02 220)',
          100: 'oklch(0.95 0.05 220)',
          200: 'oklch(0.90 0.08 220)',
          300: 'oklch(0.80 0.12 220)',
          400: 'oklch(0.65 0.15 220)',
          500: 'oklch(0.48 0.18 220)',
          600: 'oklch(0.35 0.20 220)',
          700: 'oklch(0.25 0.18 220)',
          800: 'oklch(0.18 0.15 220)',
          900: 'oklch(0.12 0.12 220)',
          950: 'oklch(0.08 0.08 220)',
          DEFAULT: 'var(--primary)',
        },
        secondary: {
          50: 'oklch(0.98 0.02 160)',
          100: 'oklch(0.95 0.05 160)',
          200: 'oklch(0.90 0.08 160)',
          300: 'oklch(0.80 0.12 160)',
          400: 'oklch(0.65 0.15 160)',
          500: 'oklch(0.58 0.15 160)',
          600: 'oklch(0.45 0.18 160)',
          700: 'oklch(0.35 0.20 160)',
          800: 'oklch(0.25 0.18 160)',
          900: 'oklch(0.18 0.15 160)',
          950: 'oklch(0.12 0.12 160)',
          DEFAULT: 'var(--secondary)',
        },
        accent: {
          DEFAULT: 'var(--accent)',
        },
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        card: {
          DEFAULT: 'var(--card)',
          foreground: 'var(--card-foreground)',
        },
        popover: {
          DEFAULT: 'var(--popover)',
          foreground: 'var(--popover-foreground)',
        },
        muted: {
          DEFAULT: 'var(--muted)',
          foreground: 'var(--muted-foreground)',
        },
        destructive: {
          DEFAULT: 'var(--destructive)',
        },
        border: 'var(--border)',
        input: 'var(--input)',
        ring: 'var(--ring)',
      },
      
      // Enhanced spacing scale
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
        '144': '36rem',
      },
      
      // Enhanced font sizes with better line heights
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.6rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1.1' }],
        '6xl': ['3.75rem', { lineHeight: '1.1' }],
        '7xl': ['4.5rem', { lineHeight: '1.1' }],
        '8xl': ['6rem', { lineHeight: '1.1' }],
        '9xl': ['8rem', { lineHeight: '1.1' }],
      },
      
      // Enhanced font weights
      fontWeight: {
        'thin': '100',
        'extralight': '200',
        'light': '300',
        'normal': '400',
        'medium': '500',
        'semibold': '600',
        'bold': '700',
        'extrabold': '800',
        'black': '900',
      },
      
      // Enhanced animations
      animation: {
        'fade-in': 'fadeIn 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'slide-in': 'slideIn 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'slide-in-from-right': 'slideInFromRight 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'slide-in-from-left': 'slideInFromLeft 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'scale-in': 'scaleIn 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'fade-in-up': 'fadeInUp 0.7s cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'fade-in-down': 'fadeInDown 0.7s cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'float': 'float 3s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'shimmer': 'shimmer 2s infinite',
        'gradient-shift': 'gradient-shift 3s ease infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 2s infinite',
      },
      
      // Enhanced keyframes
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          '0%': { opacity: '0', transform: 'translateX(-30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInFromRight: {
          '0%': { opacity: '0', transform: 'translateX(30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInFromLeft: {
          '0%': { opacity: '0', transform: 'translateX(-30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(59, 130, 246, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(59, 130, 246, 0.6)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'gradient-shift': {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
      },
      
      // Enhanced border radius
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
        '4xl': '2.5rem',
      },
      
      // Enhanced box shadows
      boxShadow: {
        'elegant': '0 4px 6px -1px rgba(0, 0, 0, 0.08), 0 2px 4px -1px rgba(0, 0, 0, 0.04)',
        'elegant-lg': '0 10px 25px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'elegant-xl': '0 25px 50px -12px rgba(0, 0, 0, 0.15), 0 10px 20px -5px rgba(0, 0, 0, 0.08)',
        'glow': '0 0 20px rgba(59, 130, 246, 0.15), 0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        'glow-lg': '0 0 40px rgba(59, 130, 246, 0.2), 0 10px 25px -3px rgba(0, 0, 0, 0.1)',
        'glow-xl': '0 0 60px rgba(59, 130, 246, 0.25), 0 20px 40px -10px rgba(0, 0, 0, 0.15)',
        'inner-elegant': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
        'inner-glow': 'inset 0 0 20px rgba(59, 130, 246, 0.1)',
      },
      
      // Enhanced backdrop blur
      backdropBlur: {
        'xs': '2px',
        'sm': '4px',
        'md': '12px',
        'lg': '16px',
        'xl': '24px',
        '2xl': '40px',
        '3xl': '64px',
      },
      
      // Enhanced container settings
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '4rem',
          xl: '5rem',
          '2xl': '6rem',
        },
      },
      
      // Enhanced background patterns
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-primary': 'linear-gradient(135deg, var(--brand-blue), var(--brand-green), var(--brand-purple))',
        'gradient-accent': 'linear-gradient(135deg, var(--brand-orange), var(--brand-blue), var(--brand-green))',
        'gradient-hero': 'linear-gradient(135deg, var(--brand-blue), var(--brand-green), var(--brand-orange), var(--brand-purple))',
        'pattern-dots': 'radial-gradient(circle, rgba(59, 130, 246, 0.1) 1px, transparent 1px)',
        'pattern-grid': 'linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)',
        'shimmer': 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
      },
      
      // Enhanced background sizes
      backgroundSize: {
        'pattern': '20px 20px',
        'shimmer': '200% 100%',
        'gradient-shift': '300% 300%',
      },
      
      // Enhanced transition timing functions
      transitionTimingFunction: {
        'elegant': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'bounce-in': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'smooth': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      },
      
      // Enhanced z-index scale
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
      },
      
      // Enhanced min/max heights
      minHeight: {
        'screen-75': '75vh',
        'screen-90': '90vh',
      },
      
      maxHeight: {
        'screen-75': '75vh',
        'screen-90': '90vh',
      },
      
      // Enhanced aspect ratios
      aspectRatio: {
        '4/3': '4 / 3',
        '3/2': '3 / 2',
        '2/3': '2 / 3',
        '9/16': '9 / 16',
      },
    },
  },
  plugins: [],
};