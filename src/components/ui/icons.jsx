// Centralized icon system using Lucide React
// This provides consistent iconography across the application

export {
  // Navigation & UI
  Menu,
  X,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  ArrowDown,
  Home,
  Settings,
  User,
  Users,
  
  // Business & Commerce
  Package,
  Truck,
  Ship,
  Warehouse,
  DollarSign,
  CreditCard,
  Receipt,
  FileText,
  Download,
  Upload,
  Building2,
  
  // Communication
  Mail,
  Phone,
  MessageSquare,
  Send,
  
  // Media & Content
  Play,
  Pause,
  Video,
  Image,
  File,
  FileVideo,
  Camera,
  
  // Actions
  Plus,
  Minus,
  Edit,
  Trash2,
  Save,
  Search,
  Filter,
  MoreHorizontal,
  MoreVertical,
  UserCheck,
  UserX,
  
  // Status & Feedback
  Check,
  CheckCircle,
  AlertCircle,
  AlertTriangle,
  Info,
  XCircle,
  Clock,
  Award,
  Target,
  Building,
  Flame,
  Thermometer,
  Leaf,
  Zap,
  Droplets,
  Wind,
  TreePine,
  Factory,
  
  // System
  Eye,
  EyeOff,
  Lock,
  Unlock,
  Shield,
  Key,
  RefreshCw as Refresh,
  RefreshCw,
  RotateCcw,
  Power,
  LogOut,
  Bug,
  Wifi,
  Server,
  
  // Data & Analytics
  BarChart3,
  PieChart,
  TrendingUp,
  TrendingDown,
  Activity,
  Calculator,
  
  // Location & Tracking
  MapPin,
  Globe,
  Navigation,
  Compass,
  
  // Utility
  Calendar,
  Star,
  Heart,
  Bookmark,
  Share,
  Copy,
  ExternalLink,
  Link,
  
} from "lucide-react"
// Custom icon wrapper for consistent sizing and styling
import * as React from "react"
import { cn } from "@/lib/utils"

export const Icon = React.forwardRef(({ 
  className, 
  size = "default",
  children,
  ...props 
}, ref) => {
  const sizeClasses = {
    xs: "h-3 w-3",
    sm: "h-4 w-4", 
    default: "h-5 w-5",
    lg: "h-6 w-6",
    xl: "h-8 w-8",
    "2xl": "h-10 w-10"
  }

  return (
    <span
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center",
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
})
Icon.displayName = "Icon"
