// Layout Components Index
// Centralized exports for all layout components

// Main Layout Components
export { Header } from './header'
export { Footer } from './footer'
export { PublicLayout } from './public-layout'
export { AdminLayout } from './admin-layout'

// Loading States
export {
  PageLoading,
  SectionLoading,
  ButtonLoading,
  DashboardSkeleton,
  TableSkeleton,
  FormSkeleton,
  CardGridSkeleton,
  ListSkeleton,
  NavigationSkeleton,
  ContentSkeleton
} from './loading-states'

// Error Handling
export {
  ErrorBoundary,
  NetworkError,
  ServerError,
  NotFound,
  Unauthorized,
  useErrorHandler
} from './error-boundary'