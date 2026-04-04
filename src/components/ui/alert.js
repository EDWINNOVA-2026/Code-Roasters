"use client";

import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

// Variants
const alertVariants = cva(
  "relative w-full rounded-lg border p-4",
  {
    variants: {
      variant: {
        default: "bg-white text-black",
        destructive: "border-red-500 text-red-600",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

// Alert
export const Alert = React.forwardRef(function Alert(
  { className, variant, ...props },
  ref
) {
  return (
    <div
      ref={ref}
      role="alert"
      className={cn(alertVariants({ variant }), className)}
      {...props}
    />
  );
});

// Title
export const AlertTitle = React.forwardRef(function AlertTitle(
  { className, ...props },
  ref
) {
  return (
    <h5
      ref={ref}
      className={cn("mb-1 font-medium", className)}
      {...props}
    />
  );
});

// Description
export const AlertDescription = React.forwardRef(function AlertDescription(
  { className, ...props },
  ref
) {
  return (
    <div
      ref={ref}
      className={cn("text-sm", className)}
      {...props}
    />
  );
});