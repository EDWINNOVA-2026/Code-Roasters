"use client";

import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { cn } from "@/lib/utils";

// Provider
export const TooltipProvider = TooltipPrimitive.Provider;

// Root
export const Tooltip = TooltipPrimitive.Root;

// Trigger (hover element)
export const TooltipTrigger = TooltipPrimitive.Trigger;

// Content (popup)
export const TooltipContent = React.forwardRef(function TooltipContent(
  { className, sideOffset = 4, ...props },
  ref
) {
  return (
    <TooltipPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        "bg-black text-white text-sm px-2 py-1 rounded shadow",
        className
      )}
      {...props}
    />
  );
});