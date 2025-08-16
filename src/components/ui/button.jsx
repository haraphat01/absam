import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-semibold transition-all duration-300 ease-elegant disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive active:scale-95 hover:scale-105",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-r from-primary to-secondary text-white shadow-elegant hover:shadow-elegant-lg hover:shadow-primary/25 hover:-translate-y-0.5",
        destructive:
          "bg-gradient-to-r from-red-500 to-red-600 text-white shadow-elegant hover:shadow-elegant-lg hover:shadow-red-500/25 hover:-translate-y-0.5 focus-visible:ring-red-500/20 dark:focus-visible:ring-red-500/40",
        outline:
          "border-2 border-primary/20 bg-background/80 backdrop-blur-sm shadow-elegant hover:bg-primary/5 hover:border-primary/30 hover:shadow-elegant-lg hover:-translate-y-0.5 dark:bg-background/50 dark:border-primary/30 dark:hover:bg-primary/10",
        secondary:
          "bg-gradient-to-r from-secondary to-secondary/80 text-white shadow-elegant hover:shadow-elegant-lg hover:shadow-secondary/25 hover:-translate-y-0.5",
        ghost:
          "hover:bg-accent/50 hover:text-accent-foreground hover:scale-105 dark:hover:bg-accent/30",
        link: "text-primary underline-offset-4 hover:underline hover:scale-105 hover:text-primary/80",
        gradient:
          "bg-gradient-to-r from-primary via-secondary to-accent text-white shadow-elegant hover:shadow-elegant-lg hover:shadow-primary/25 hover:-translate-y-0.5 animate-gradient-shift",
        success:
          "bg-gradient-to-r from-green-500 to-green-600 text-white shadow-elegant hover:shadow-elegant-lg hover:shadow-green-500/25 hover:-translate-y-0.5",
        warning:
          "bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-elegant hover:shadow-elegant-lg hover:shadow-yellow-500/25 hover:-translate-y-0.5",
        glass:
          "bg-white/10 backdrop-blur-md border border-white/20 text-white shadow-elegant hover:bg-white/20 hover:border-white/30 hover:shadow-elegant-lg hover:-translate-y-0.5",
        glassDark:
          "bg-black/10 backdrop-blur-md border border-white/10 text-white shadow-elegant hover:bg-black/20 hover:border-white/20 hover:shadow-elegant-lg hover:-translate-y-0.5",
        glow:
          "bg-primary text-white shadow-glow hover:shadow-glow-lg hover:-translate-y-0.5 animate-pulse-glow",
      },
      size: {
        default: "h-10 px-6 py-2.5 has-[>svg]:px-5",
        sm: "h-8 rounded-md gap-1.5 px-4 has-[>svg]:px-3.5 text-xs",
        lg: "h-12 rounded-xl gap-2 px-8 has-[>svg]:px-7 text-base",
        xl: "h-14 rounded-xl gap-2 px-10 has-[>svg]:px-9 text-lg",
        icon: "size-10",
        "icon-sm": "size-8",
        "icon-lg": "size-12",
        "icon-xl": "size-14",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props} />
  );
}

export { Button, buttonVariants }
