import * as React from "react"

import { cn } from "@/lib/utils"

function Input({
  className,
  type,
  ...props
}) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary/20 selection:text-primary dark:bg-input/30 border-input/50 flex h-11 w-full min-w-0 rounded-xl border-2 bg-background/50 backdrop-blur-sm px-4 py-3 text-base shadow-elegant transition-all duration-300 ease-out outline-none file:inline-flex file:h-9 file:border-0 file:bg-transparent file:text-sm file:font-semibold disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-base font-medium",
        "focus-visible:border-primary/50 focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:shadow-glow focus-visible:bg-background/80",
        "hover:border-primary/30 hover:bg-background/70 hover:shadow-elegant",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className
      )}
      {...props} />
  );
}

export { Input }
