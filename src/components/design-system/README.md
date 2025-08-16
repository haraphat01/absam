# Design System Documentation

## Overview

This design system provides a comprehensive collection of reusable UI components, design tokens, and utilities built with Tailwind CSS and modern design principles. It ensures consistency, accessibility, and maintainability across the Absad MultiSynergy website.

## Design Principles

### 1. **Professional & Trustworthy**
- Clean, modern aesthetics that reflect the import/export business
- Consistent use of brand colors (blue, green, orange)
- Professional typography and spacing

### 2. **Mobile-First & Responsive**
- All components are designed mobile-first
- Responsive breakpoints: xs (475px), sm (640px), md (768px), lg (1024px), xl (1280px), 2xl (1536px)
- Touch-friendly interactions on mobile devices

### 3. **Smooth Animations**
- Subtle hover effects and transitions
- Consistent animation timing (200ms for quick interactions, 300ms for complex transitions)
- Elegant easing functions for natural motion

### 4. **Accessibility**
- Proper color contrast ratios
- Keyboard navigation support
- Screen reader friendly markup
- Focus indicators for all interactive elements

## Color System

### Brand Colors
```css
--brand-blue: oklch(0.45 0.15 220)    /* Primary brand color */
--brand-green: oklch(0.55 0.12 160)   /* Secondary brand color */
--brand-orange: oklch(0.65 0.18 45)   /* Accent color */
```

### Semantic Colors
```css
--success: oklch(0.55 0.12 160)       /* Success states */
--warning: oklch(0.75 0.15 85)        /* Warning states */
--error: oklch(0.577 0.245 27.325)    /* Error states */
```

### Usage
```jsx
// Using brand colors
<div className="bg-primary text-primary-foreground">Primary</div>
<div className="bg-secondary text-secondary-foreground">Secondary</div>
<div className="bg-accent text-accent-foreground">Accent</div>

// Using semantic colors
<div className="bg-green-600 text-white">Success</div>
<div className="bg-yellow-600 text-white">Warning</div>
<div className="bg-destructive text-destructive-foreground">Error</div>
```

## Typography

### Font Scale
- **xs**: 0.75rem (12px)
- **sm**: 0.875rem (14px)
- **base**: 1rem (16px) - Default body text
- **lg**: 1.125rem (18px)
- **xl**: 1.25rem (20px)
- **2xl**: 1.5rem (24px)
- **3xl**: 1.875rem (30px)
- **4xl**: 2.25rem (36px)
- **5xl**: 3rem (48px)
- **6xl**: 3.75rem (60px)

### Usage
```jsx
<h1 className="text-4xl font-bold">Main Heading</h1>
<h2 className="text-2xl font-semibold">Section Heading</h2>
<p className="text-base">Body text</p>
<span className="text-sm text-muted-foreground">Caption text</span>
```

## Spacing System

Based on a 4px grid system:
- **1**: 0.25rem (4px)
- **2**: 0.5rem (8px)
- **4**: 1rem (16px)
- **6**: 1.5rem (24px)
- **8**: 2rem (32px)
- **12**: 3rem (48px)
- **16**: 4rem (64px)

## Components

### Buttons

```jsx
import { Button } from '@/components/ui/button'

// Variants
<Button variant="default">Default</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="gradient">Gradient</Button>

// Sizes
<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>
<Button size="xl">Extra Large</Button>

// With icons
<Button><Home className="mr-2 h-4 w-4" />Home</Button>
```

### Cards

```jsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'

<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card description</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Card content goes here</p>
  </CardContent>
</Card>
```

### Form Elements

```jsx
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

<div className="space-y-2">
  <Label htmlFor="email">Email</Label>
  <Input id="email" type="email" placeholder="Enter your email" />
</div>
```

### Loading States

```jsx
import { LoadingSpinner, LoadingDots, Skeleton } from '@/components/ui'

// Spinners
<LoadingSpinner size="default" />
<LoadingDots />

// Skeleton screens
<Skeleton className="h-4 w-full" />
<SkeletonCard />
```

### Modals

```jsx
import { Modal, ModalTrigger, ModalContent, ModalHeader, ModalTitle } from '@/components/ui/modal'

<Modal>
  <ModalTrigger asChild>
    <Button>Open Modal</Button>
  </ModalTrigger>
  <ModalContent>
    <ModalHeader>
      <ModalTitle>Modal Title</ModalTitle>
    </ModalHeader>
    <p>Modal content</p>
  </ModalContent>
</Modal>
```

## Animation System

### Built-in Animations
```jsx
// Entrance animations
<div className="animate-fade-in">Fade in</div>
<div className="animate-slide-in">Slide in</div>
<div className="animate-scale-in">Scale in</div>

// Hover effects
<div className="hover-lift">Lifts on hover</div>
<div className="hover-scale">Scales on hover</div>
<div className="hover-glow">Glows on hover</div>
```

### Custom Animation Classes
```css
.elegant-transition {
  transition: all 200ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.card-hover {
  @apply hover:shadow-elegant-lg hover:-translate-y-1 transition-all duration-200;
}
```

## Icon System

Using Lucide React for consistent iconography:

```jsx
import { Home, Settings, User, Package } from '@/components/ui/icons'

<Home className="h-5 w-5" />
<Settings className="h-4 w-4" />
```

### Icon Sizes
- **xs**: h-3 w-3 (12px)
- **sm**: h-4 w-4 (16px)
- **default**: h-5 w-5 (20px)
- **lg**: h-6 w-6 (24px)
- **xl**: h-8 w-8 (32px)

## Utility Classes

### Gradients
```jsx
<div className="gradient-primary">Primary gradient</div>
<div className="gradient-accent">Accent gradient</div>
<div className="text-gradient">Gradient text</div>
```

### Shadows
```jsx
<div className="shadow-elegant">Elegant shadow</div>
<div className="shadow-elegant-lg">Large elegant shadow</div>
<div className="shadow-elegant-xl">Extra large elegant shadow</div>
```

### Glass Effects
```jsx
<div className="glass">Glass morphism effect</div>
<div className="glass-dark">Dark glass effect</div>
```

### Containers
```jsx
<div className="container-narrow">Narrow container (max-w-4xl)</div>
<div className="container-wide">Wide container (max-w-7xl)</div>
```

## Responsive Design

### Breakpoint Usage
```jsx
<div className="text-sm md:text-base lg:text-lg">
  Responsive text size
</div>

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
  Responsive grid
</div>
```

### Mobile-First Approach
Always start with mobile styles and enhance for larger screens:

```jsx
<div className="p-4 md:p-6 lg:p-8">
  Mobile: 16px padding
  Tablet: 24px padding
  Desktop: 32px padding
</div>
```

## Best Practices

### 1. **Consistent Spacing**
Use the spacing scale consistently:
```jsx
// Good
<div className="space-y-4">
<div className="space-y-6">

// Avoid arbitrary values
<div className="space-y-[17px]">
```

### 2. **Color Usage**
Use semantic color names:
```jsx
// Good
<Button variant="destructive">Delete</Button>
<div className="text-muted-foreground">

// Avoid direct color values
<Button className="bg-red-500">Delete</Button>
```

### 3. **Animation Performance**
Prefer transform and opacity for animations:
```jsx
// Good - GPU accelerated
<div className="hover:scale-105 hover:opacity-90">

// Avoid - causes layout shifts
<div className="hover:w-full hover:h-full">
```

### 4. **Accessibility**
Always include proper ARIA labels and focus states:
```jsx
<Button className="focus-ring" aria-label="Close dialog">
  <X className="h-4 w-4" />
</Button>
```

## Testing Components

Use the ComponentShowcase to test all components:

```jsx
import { ComponentShowcase } from '@/components/design-system/component-showcase'

// Add to a page to see all components
<ComponentShowcase />
```

## Customization

### Extending Colors
Add new colors in `tailwind.config.js`:
```js
colors: {
  brand: {
    purple: 'oklch(0.5 0.2 300)',
  }
}
```

### Custom Components
Follow the established patterns:
```jsx
const CustomCard = ({ children, className, ...props }) => (
  <div 
    className={cn(
      "bg-card border rounded-xl p-6 shadow-elegant hover-lift",
      className
    )}
    {...props}
  >
    {children}
  </div>
)
```

This design system provides a solid foundation for building beautiful, consistent, and accessible user interfaces across the entire application.