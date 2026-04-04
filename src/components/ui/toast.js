"use client";

import * as React from "react";
import * as ToastPrimitives from "@radix-ui/react-toast";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

// Provider
export const ToastProvider = ToastPrimitives.Provider;

// Viewport (position)
export const ToastViewport = React.forwardRef(function ToastViewport(
  { className, ...props },
  ref
) {
  return (
    <ToastPrimitives.Viewport
      ref={ref}
      className={cn(
        "fixed bottom-4 right-4 flex flex-col gap-2 w-[350px]",
        className
      )}
      {...props}
    />
  );
});

// Toast
export const Toast = React.forwardRef(function Toast(
  { className, ...props },
  ref
) {
  return (
    <ToastPrimitives.Root
      ref={ref}
      className={cn(
        "bg-white border shadow rounded p-4 flex justify-between items-start",
        className
      )}
      {...props}
    />
  );
});

// Title
export const ToastTitle = React.forwardRef(function ToastTitle(
  { className, ...props },
  ref
) {
  return (
    <ToastPrimitives.Title
      ref={ref}
      className={cn("font-semibold text-sm", className)}
      {...props}
    />
  );
});

// Description
export const ToastDescription = React.forwardRef(function ToastDescription(
  { className, ...props },
  ref
) {
  return (
    <ToastPrimitives.Description
      ref={ref}
      className={cn("text-sm text-gray-500", className)}
      {...props}
    />
  );
});

// Close button
export const ToastClose = React.forwardRef(function ToastClose(
  { className, ...props },
  ref
) {
  return (
    <ToastPrimitives.Close
      ref={ref}
      className={cn("ml-2", className)}
      {...props}
    >
      <X className="w-4 h-4" />
    </ToastPrimitives.Close>
  );
});

// Action button
export const ToastAction = React.forwardRef(function ToastAction(
  { className, ...props },
  ref
) {
  return (
    <ToastPrimitives.Action
      ref={ref}
      className={cn("text-sm px-2 py-1 border rounded", className)}
      {...props}
    />
  );
});