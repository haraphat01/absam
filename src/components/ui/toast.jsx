"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from "@/components/ui/icons"

const ToastContext = React.createContext()

const toastVariants = {
  default: "bg-background border-border text-foreground",
  success: "bg-green-50 border-green-200 text-green-800 dark:bg-green-900/20 dark:border-green-800 dark:text-green-200",
  error: "bg-red-50 border-red-200 text-red-800 dark:bg-red-900/20 dark:border-red-800 dark:text-red-200",
  warning: "bg-yellow-50 border-yellow-200 text-yellow-800 dark:bg-yellow-900/20 dark:border-yellow-800 dark:text-yellow-200",
  info: "bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-200",
}

const toastIcons = {
  default: Info,
  success: CheckCircle,
  error: AlertCircle,
  warning: AlertTriangle,
  info: Info,
}

function ToastProvider({ children }) {
  const [toasts, setToasts] = React.useState([])

  const removeToast = React.useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }, [])

  const addToast = React.useCallback((toast) => {
    const id = Math.random().toString(36).substr(2, 9)
    const newToast = { id, ...toast, createdAt: Date.now() }
    setToasts((prev) => [...prev, newToast])

    // Auto remove after duration
    setTimeout(() => {
      removeToast(id)
    }, toast.duration || 5000)
  }, [removeToast])

  const value = React.useMemo(() => ({
    toasts,
    addToast,
    removeToast,
  }), [toasts, addToast, removeToast])

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastContainer />
    </ToastContext.Provider>
  )
}

function useToast() {
  const context = React.useContext(ToastContext)
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider")
  }
  return context
}

function ToastContainer() {
  const { toasts, removeToast } = useToast()

  return (
    <div className="fixed top-4 right-4 z-50 space-y-4 max-w-sm w-full">
      {toasts.map((toast) => (
        <Toast key={toast.id} toast={toast} onRemove={removeToast} />
      ))}
    </div>
  )
}

function Toast({ toast, onRemove }) {
  const [isVisible, setIsVisible] = React.useState(false)
  const Icon = toastIcons[toast.variant || "default"]

  React.useEffect(() => {
    setIsVisible(true)
  }, [])

  const handleRemove = () => {
    setIsVisible(false)
    setTimeout(() => onRemove(toast.id), 300)
  }

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl border-2 shadow-elegant-lg backdrop-blur-sm transition-all duration-300 ease-out",
        toastVariants[toast.variant || "default"],
        isVisible 
          ? "translate-x-0 opacity-100 scale-100" 
          : "translate-x-full opacity-0 scale-95"
      )}
    >
      <div className="flex items-start space-x-3 p-4">
        <Icon className="h-5 w-5 mt-0.5 flex-shrink-0" />
        <div className="flex-1 space-y-1">
          {toast.title && (
            <h4 className="font-semibold text-sm">{toast.title}</h4>
          )}
          {toast.description && (
            <p className="text-sm opacity-90">{toast.description}</p>
          )}
        </div>
        <button
          onClick={handleRemove}
          className="h-5 w-5 rounded-full bg-black/10 hover:bg-black/20 transition-colors duration-200 flex items-center justify-center"
        >
          <X className="h-3 w-3" />
        </button>
      </div>
      
      {/* Progress bar */}
      {toast.duration && (
        <div className="absolute bottom-0 left-0 h-1 bg-current opacity-20">
          <div 
            className="h-full bg-current transition-all duration-linear"
            style={{ 
              width: "100%",
              animation: `shrink ${toast.duration}ms linear forwards`
            }}
          />
        </div>
      )}
    </div>
  )
}

// Toast hook for easy usage
function useToastHook() {
  const { addToast } = useToast()

  return {
    toast: (props) => addToast({ variant: "default", ...props }),
    success: (props) => addToast({ variant: "success", ...props }),
    error: (props) => addToast({ variant: "error", ...props }),
    warning: (props) => addToast({ variant: "warning", ...props }),
    info: (props) => addToast({ variant: "info", ...props }),
  }
}

export { ToastProvider, useToast, useToastHook, Toast }