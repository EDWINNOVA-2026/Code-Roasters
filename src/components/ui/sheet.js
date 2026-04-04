"use client";

import * as React from "react";
import * as SheetPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";

// Root
export const Sheet = SheetPrimitive.Root;
export const SheetTrigger = SheetPrimitive.Trigger;
export const SheetClose = SheetPrimitive.Close;
export const SheetPortal = SheetPrimitive.Portal;

// Overlay
export const SheetOverlay = React.forwardRef(function SheetOverlay(
  { className, ...props },
  ref
) {
  return (
    <SheetPrimitive.Overlay
      ref={ref}
      className={cn("fixed inset-0 bg-black/80", className)}
      {...props}
    />
  );
});

// Content (sliding panel)
export const SheetContent = React.forwardRef(function SheetContent(
  { side = "right", className, children, ...props },
  ref
) {
  return (
    <SheetPortal>
      <SheetOverlay />

      <SheetPrimitive.Content
        ref={ref}
        className={cn(
          "fixed z-50 bg-white p-6 shadow-lg",
          side === "right" && "top-0 right-0 h-full w-80",
          side === "left" && "top-0 left-0 h-full w-80",
          side === "top" && "top-0 left-0 w-full h-40",
          side === "bottom" && "bottom-0 left-0 w-full h-40",
          className
        )}
        {...props}
      >
        {children}

        <SheetPrimitive.Close className="absolute top-4 right-4">
          <X className="w-4 h-4" />
        </SheetPrimitive.Close>
      </SheetPrimitive.Content>
    </SheetPortal>
  );
});

// Header
export function SheetHeader({ className, ...props }) {
  return <div className={cn("mb-4", className)} {...props} />;
}

// Footer
export function SheetFooter({ className, ...props }) {
  return <div className={cn("mt-4", className)} {...props} />;
}

// Title
export const SheetTitle = React.forwardRef(function SheetTitle(
  { className, ...props },
  ref
) {
  return (
    <SheetPrimitive.Title
      ref={ref}
      className={cn("text-lg font-semibold", className)}
      {...props}
    />
  );
});

// Description
export const SheetDescription = React.forwardRef(function SheetDescription(
  { className, ...props },
  ref
) {
  return (
    <SheetPrimitive.Description
      ref={ref}
      className={cn("text-sm text-gray-500", className)}
      {...props}
    />
  );
});