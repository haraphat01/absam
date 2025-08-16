import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-xl border-2 px-3 py-1.5 text-sm font-semibold w-fit whitespace-nowrap shrink-0 [&>svg]:size-4 gap-2 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-all duration-300 ease-out overflow-hidden shadow-elegant hover:shadow-elegant-lg hover:scale-105",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-gradient-to-r from-primary to-secondary text-white [a&]:hover:from-primary/90 [a&]:hover:to-secondary/90",
        secondary:
          "border-transparent bg-gradient-to-r from-secondary to-accent text-white [a&]:hover:from-secondary/90 [a&]:hover:to-accent/90",
        destructive:
          "border-transparent bg-gradient-to-r from-red-500 to-red-600 text-white [a&]:hover:from-red-600 [a&]:hover:to-red-700 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40",
        outline:
          "text-foreground border-primary/20 bg-primary/5 [a&]:hover:bg-primary/10 [a&]:hover:border-primary/30 [a&]:hover:text-primary",
        success:
          "border-transparent bg-gradient-to-r from-green-500 to-green-600 text-white [a&]:hover:from-green-600 [a&]:hover:to-green-700",
        warning:
          "border-transparent bg-gradient-to-r from-yellow-500 to-orange-500 text-white [a&]:hover:from-yellow-600 [a&]:hover:to-orange-600",
        glass:
          "border-white/20 bg-white/10 backdrop-blur-sm text-white [a&]:hover:bg-white/20 [a&]:hover:border-white/30",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot : "span"

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props} />
  );
}

export { Badge, badgeVariants }
