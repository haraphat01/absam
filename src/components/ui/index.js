// UI Components Index
// Centralized exports for all UI components

export { Button, buttonVariants } from './button'
export { Card, CardHeader, CardFooter, CardTitle, CardAction, CardDescription, CardContent } from './card'
export { Input } from './input'
export { Label } from './label'
export { Badge } from './badge'
export { Alert } from './alert'
export { Avatar } from './avatar'
export { Dialog } from './dialog'
export { DropdownMenu } from './dropdown-menu'
export { Form } from './form'
export { NavigationMenu } from './navigation-menu'
export { Sheet } from './sheet'

// New components
export { 
  ModalProvider, 
  useModal, 
  Modal, 
  ModalHeader, 
  ModalContent, 
  ModalFooter, 
  ModalTitle, 
  ModalDescription, 
  ModalTrigger, 
  ModalClose 
} from './modal'
export { LoadingSpinner, GradientSpinner, PulseSpinner, DotsSpinner } from './loading-spinner'
export { 
  Skeleton, 
  SkeletonText, 
  SkeletonTitle,
  SkeletonAvatar, 
  SkeletonCard,
  SkeletonButton,
  SkeletonInput,
  SkeletonTable,
  SkeletonGrid,
  SkeletonMetrics,
  SkeletonForm,
  SkeletonPage
} from './skeleton'
export { ToastProvider, useToast, useToastHook, Toast } from './toast'
export { Progress, CircularProgress, GradientProgress } from './progress'
export { Separator } from './separator'
export { Select, SelectGroup, SelectValue, SelectTrigger, SelectContent, SelectLabel, SelectItem, SelectSeparator } from './select'
export { Table, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell, TableCaption } from './table'

// Performance optimized components
export { OptimizedImage, ProductImage, HeroImage } from './optimized-image'
export { LazyComponent, FadeInSection, StaggeredList } from './lazy-component'
export { PageTransition, SectionTransition, CardHover, ButtonHover, StaggerContainer } from './page-transition'
export { 
  Skeleton, 
  CardSkeleton, 
  TableSkeleton, 
  MetricsSkeleton, 
  FormSkeleton, 
  ProductGridSkeleton, 
  TestimonialGridSkeleton, 
  PageSkeleton 
} from './skeleton'

// Icons
export * from './icons'