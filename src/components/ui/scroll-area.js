"use client";

import * as React from "react";
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";
import { cn } from "@/lib/utils";

// Main Scroll Area
export const ScrollArea = React.forwardRef(function ScrollArea(
  { className, children, ...props },
  ref
) {
  return (
    <ScrollAreaPrimitive.Root
      ref={ref}
      className={cn("relative overflow-hidden", className)}
      {...props}
    >
      <ScrollAreaPrimitive.Viewport className="w-full h-full">
        {children}
      </ScrollAreaPrimitive.Viewport>

      <ScrollBar />

      <ScrollAreaPrimitive.Corner />
    </ScrollAreaPrimitive.Root>
  );
});

// Scrollbar
export const ScrollBar = React.forwardRef(function ScrollBar(
  { className, orientation = "vertical", ...props },
  ref
) {
  return (
    <ScrollAreaPrimitive.ScrollAreaScrollbar
      ref={ref}
      orientation={orientation}
      className={cn(
        orientation === "vertical"
          ? "w-2 h-full"
          : "h-2 w-full",
        className
      )}
      {...props}
    >
      <ScrollAreaPrimitive.ScrollAreaThumb className="bg-gray-400 rounded-full" />
    </ScrollAreaPrimitive.ScrollAreaScrollbar>
  );
});