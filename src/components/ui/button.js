"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

// Variants
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-black text-white hover:bg-gray-800",
        destructive: "bg-red-500 text-white hover:bg-red-600",
        outline: "border border-gray-300 hover:bg-gray-100",
        secondary: "bg-gray-200 text-black hover:bg-gray-300",
        ghost: "hover:bg-gray-100",
        link: "text-blue-500 underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 px-3",
        lg: "h-12 px-6",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

// Component
export const Button = React.forwardRef(function Button(
  { className, variant, size, asChild = false, ...props },
  ref
) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      ref={ref}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
});

// export variants
export { buttonVariants };