import * as React from "react"
import { createPortal } from "react-dom"
import { X } from "@/components/ui/icons"
import { cn } from "@/lib/utils"

const ModalContext = React.createContext()

function ModalProvider({ children }) {
  const [modals, setModals] = React.useState([])

  const openModal = React.useCallback((modal) => {
    const id = Math.random().toString(36).substr(2, 9)
    const newModal = { id, ...modal }
    setModals((prev) => [...prev, newModal])
    return id
  }, [])

  const closeModal = React.useCallback((id) => {
    setModals((prev) => prev.filter((modal) => modal.id !== id))
  }, [])

  const value = React.useMemo(() => ({
    modals,
    openModal,
    closeModal,
  }), [modals, openModal, closeModal])

  return (
    <ModalContext.Provider value={value}>
      {children}
      <ModalContainer />
    </ModalContext.Provider>
  )
}

function useModal() {
  const context = React.useContext(ModalContext)
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider")
  }
  return context
}

function ModalContainer() {
  const { modals, closeModal } = useModal()

  if (typeof window === "undefined") return null

  return createPortal(
    <>
      {modals.map((modal) => (
        <Modal key={modal.id} modal={modal} onClose={() => closeModal(modal.id)} />
      ))}
    </>,
    document.body
  )
}

function Modal({ modal, onClose }) {
  const [isVisible, setIsVisible] = React.useState(false)
  const modalRef = React.useRef(null)

  React.useEffect(() => {
    setIsVisible(true)
    document.body.style.overflow = "hidden"
    
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [])

  const handleClose = () => {
    setIsVisible(false)
    setTimeout(() => onClose(), 300)
  }

  const handleBackdropClick = (e) => {
    if (e.target === modalRef.current) {
      handleClose()
    }
  }

  return (
    <div
      ref={modalRef}
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center p-4",
        "bg-black/50 backdrop-blur-sm transition-all duration-300 ease-out",
        isVisible ? "opacity-100" : "opacity-0"
      )}
      onClick={handleBackdropClick}
    >
      <div
        className={cn(
          "relative w-full max-w-lg max-h-[90vh] overflow-hidden",
          "bg-background rounded-2xl border border-border/50 shadow-elegant-xl",
          "transition-all duration-300 ease-out",
          isVisible 
            ? "translate-y-0 opacity-100 scale-100" 
            : "translate-y-4 opacity-0 scale-95"
        )}
      >
        {modal.header && (
          <ModalHeader onClose={handleClose}>
            {modal.header}
          </ModalHeader>
        )}
        
        <ModalContent>
          {modal.content}
        </ModalContent>
        
        {modal.footer && (
          <ModalFooter>
            {modal.footer}
          </ModalFooter>
        )}
      </div>
    </div>
  )
}

function ModalHeader({ children, onClose, className, ...props }) {
  return (
    <div
      className={cn(
        "flex items-center justify-between p-6 border-b border-border/50",
        className
      )}
      {...props}
    >
      <div className="flex-1">
        {children}
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className="h-8 w-8 rounded-full bg-muted hover:bg-muted/80 transition-colors duration-200 flex items-center justify-center"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  )
}

function ModalContent({ children, className, ...props }) {
  return (
    <div
      className={cn("p-6 overflow-y-auto", className)}
      {...props}
    >
      {children}
    </div>
  )
}

function ModalFooter({ children, className, ...props }) {
  return (
    <div
      className={cn(
        "flex items-center justify-end space-x-3 p-6 border-t border-border/50",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

function ModalTitle({ children, className, ...props }) {
  return (
    <h2
      className={cn("text-lg font-semibold text-foreground", className)}
      {...props}
    >
      {children}
    </h2>
  )
}

function ModalDescription({ children, className, ...props }) {
  return (
    <p
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    >
      {children}
    </p>
  )
}

// Modal trigger component
function ModalTrigger({ children, modal, ...props }) {
  const { openModal } = useModal()

  const handleClick = () => {
    openModal(modal)
  }

  return (
    <div onClick={handleClick} {...props}>
      {children}
    </div>
  )
}

// Modal close component
function ModalClose({ children, ...props }) {
  const { closeModal } = useModal()

  const handleClick = () => {
    closeModal()
  }

  return (
    <div onClick={handleClick} {...props}>
      {children}
    </div>
  )
}

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
}