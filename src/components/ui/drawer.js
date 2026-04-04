"use client";

import * as React from "react";
import { Drawer as DrawerPrimitive } from "vaul";

import { cn } from "@/lib/utils";

// Root
export function Drawer({ shouldScaleBackground = true, ...props }) {
  return (
    <DrawerPrimitive.Root
      shouldScaleBackground={shouldScaleBackground}
      {...props}
    />
  );
}

export const DrawerTrigger = DrawerPrimitive.Trigger;
export const DrawerPortal = DrawerPrimitive.Portal;
export const DrawerClose = DrawerPrimitive.Close;

// Overlay
export const DrawerOverlay = React.forwardRef(function DrawerOverlay(
  { className, ...props },
  ref
) {
  return (
    <DrawerPrimitive.Overlay
      ref={ref}
      className={cn("fixed inset-0 bg-black/80", className)}
      {...props}
    />
  );
});

// Content
export const DrawerContent = React.forwardRef(function DrawerContent(
  { className, children, ...props },
  ref
) {
  return (
    <DrawerPortal>
      <DrawerOverlay />

      <DrawerPrimitive.Content
        ref={ref}
        className={cn(
          "fixed bottom-0 left-0 right-0 bg-white rounded-t-lg p-4",
          className
        )}
        {...props}
      >
        {/* drag handle */}
        <div className="mx-auto mb-2 h-1 w-16 bg-gray-300 rounded-full" />

        {children}
      </DrawerPrimitive.Content>
    </DrawerPortal>
  );
});

// Header
export function DrawerHeader({ className, ...props }) {
  return (
    <div className={cn("mb-2", className)} {...props} />
  );
}

// Footer
export function DrawerFooter({ className, ...props }) {
  return (
    <div className={cn("mt-4 flex flex-col gap-2", className)} {...props} />
  );
}

// Title
export const DrawerTitle = React.forwardRef(function DrawerTitle(
  { className, ...props },
  ref
) {
  return (
    <DrawerPrimitive.Title
      ref={ref}
      className={cn("text-lg font-semibold", className)}
      {...props}
    />
  );
});

// Description
export const DrawerDescription = React.forwardRef(function DrawerDescription(
  { className, ...props },
  ref
) {
  return (
    <DrawerPrimitive.Description
      ref={ref}
      className={cn("text-sm text-gray-500", className)}
      {...props}
    />
  );
});