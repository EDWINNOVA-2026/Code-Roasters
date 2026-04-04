"use client";

import * as React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { cn } from "@/lib/utils";

// Root
export const Popover = PopoverPrimitive.Root;

// Trigger
export const PopoverTrigger = PopoverPrimitive.Trigger;

// Content
export const PopoverContent = React.forwardRef(function PopoverContent(
  { className, align = "center", sideOffset = 4, ...props },
  ref
) {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        ref={ref}
        align={align}
        sideOffset={sideOffset}
        className={cn(
          "w-72 rounded-md border bg-white p-4 shadow-md",
          className
        )}
        {...props}
      />
    </PopoverPrimitive.Portal>
  );
});