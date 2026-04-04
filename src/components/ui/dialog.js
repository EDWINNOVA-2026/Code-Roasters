"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";

// Root
export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;
export const DialogPortal = DialogPrimitive.Portal;
export const DialogClose = DialogPrimitive.Close;

// Overlay
export const DialogOverlay = React.forwardRef(function DialogOverlay(
  { className, ...props },
  ref
) {
  return (
    <DialogPrimitive.Overlay
      ref={ref}
      className={cn("fixed inset-0 bg-black/80", className)}
      {...props}
    />
  );
});

// Content
export const DialogContent = React.forwardRef(function DialogContent(
  { className, children, ...props },
  ref
) {
  return (
    <DialogPortal>
      <DialogOverlay />

      <DialogPrimitive.Content
        ref={ref}
        className={cn(
          "fixed top-1/2 left-1/2 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg",
          className
        )}
        {...props}
      >
        {children}

        <DialogPrimitive.Close className="absolute right-4 top-4">
          <X className="w-4 h-4" />
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPortal>
  );
});

// Header
export function DialogHeader({ className, ...props }) {
  return (
    <div className={cn("flex flex-col gap-2", className)} {...props} />
  );
}

// Footer
export function DialogFooter({ className, ...props }) {
  return (
    <div className={cn("flex justify-end gap-2", className)} {...props} />
  );
}

// Title
export const DialogTitle = React.forwardRef(function DialogTitle(
  { className, ...props },
  ref
) {
  return (
    <DialogPrimitive.Title
      ref={ref}
      className={cn("text-lg font-semibold", className)}
      {...props}
    />
  );
});

// Description
export const DialogDescription = React.forwardRef(function DialogDescription(
  { className, ...props },
  ref
) {
  return (
    <DialogPrimitive.Description
      ref={ref}
      className={cn("text-sm text-gray-500", className)}
      {...props}
    />
  );
});