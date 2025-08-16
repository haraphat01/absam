import * as React from "react"
import { cn } from "@/lib/utils"

const Textarea = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex min-h-[120px] w-full rounded-xl border-2 border-input/50 bg-background/50 backdrop-blur-sm px-4 py-3 text-base font-medium ring-offset-background placeholder:text-muted-foreground shadow-elegant transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:border-primary/50 focus-visible:shadow-glow focus-visible:bg-background/80 hover:border-primary/30 hover:bg-background/70 hover:shadow-elegant disabled:cursor-not-allowed disabled:opacity-50 resize-none",
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
Textarea.displayName = "Textarea"

export { Textarea }