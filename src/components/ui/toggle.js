"use client";

import * as React from "react";
import * as TogglePrimitive from "@radix-ui/react-toggle";
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

// Variants (styles)
export const toggleVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        outline: "border bg-transparent hover:bg-gray-100",
      },
      size: {
        default: "h-10 px-3",
        sm: "h-8 px-2",
        lg: "h-12 px-5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

// Toggle Component
export const Toggle = React.forwardRef(function Toggle(
  { className, variant, size, ...props },
  ref
) {
  return (
    <TogglePrimitive.Root
      ref={ref}
      className={cn(
        toggleVariants({ variant, size }),
        "data-[state=on]:bg-black data-[state=on]:text-white",
        className
      )}
      {...props}
    />
  );
});