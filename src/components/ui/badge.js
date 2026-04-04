"use client";

import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

// Variants
const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold",
  {
    variants: {
      variant: {
        default: "bg-black text-white",
        secondary: "bg-gray-200 text-black",
        destructive: "bg-red-500 text-white",
        outline: "border text-black",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

// Component
export function Badge({ className, variant, ...props }) {
  return (
    <div
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

// export variants if needed
export { badgeVariants };