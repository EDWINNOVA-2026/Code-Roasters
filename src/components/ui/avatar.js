"use client";

import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { cn } from "@/lib/utils";

// Root
export const Avatar = React.forwardRef(function Avatar(
  { className, ...props },
  ref
) {
  return (
    <AvatarPrimitive.Root
      ref={ref}
      className={cn(
        "relative flex h-10 w-10 overflow-hidden rounded-full",
        className
      )}
      {...props}
    />
  );
});

// Image
export const AvatarImage = React.forwardRef(function AvatarImage(
  { className, ...props },
  ref
) {
  return (
    <AvatarPrimitive.Image
      ref={ref}
      className={cn("h-full w-full object-cover", className)}
      {...props}
    />
  );
});

// Fallback
export const AvatarFallback = React.forwardRef(function AvatarFallback(
  { className, ...props },
  ref
) {
  return (
    <AvatarPrimitive.Fallback
      ref={ref}
      className={cn(
        "flex h-full w-full items-center justify-center rounded-full bg-gray-300",
        className
      )}
      {...props}
    />
  );
});