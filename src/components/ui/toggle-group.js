"use client";

import * as React from "react";
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group";

import { cn } from "@/lib/utils";

// Context (for shared styles)
const ToggleGroupContext = React.createContext({
  size: "default",
  variant: "default",
});

// Group
export const ToggleGroup = React.forwardRef(function ToggleGroup(
  { className, variant, size, children, ...props },
  ref
) {
  return (
    <ToggleGroupPrimitive.Root
      ref={ref}
      className={cn("flex gap-2", className)}
      {...props}
    >
      <ToggleGroupContext.Provider value={{ variant, size }}>
        {children}
      </ToggleGroupContext.Provider>
    </ToggleGroupPrimitive.Root>
  );
});

// Item
export const ToggleGroupItem = React.forwardRef(function ToggleGroupItem(
  { className, children, ...props },
  ref
) {
  return (
    <ToggleGroupPrimitive.Item
      ref={ref}
      className={cn(
        "px-3 py-1 border rounded cursor-pointer",
        "data-[state=on]:bg-black data-[state=on]:text-white",
        className
      )}
      {...props}
    >
      {children}
    </ToggleGroupPrimitive.Item>
  );
});