"use client";

import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cn } from "@/lib/utils";

// Root
export const Tabs = TabsPrimitive.Root;

// List (tab buttons container)
export const TabsList = React.forwardRef(function TabsList(
  { className, ...props },
  ref
) {
  return (
    <TabsPrimitive.List
      ref={ref}
      className={cn(
        "flex gap-2 bg-gray-200 p-1 rounded-md",
        className
      )}
      {...props}
    />
  );
});

// Button
export const TabsTrigger = React.forwardRef(function TabsTrigger(
  { className, ...props },
  ref
) {
  return (
    <TabsPrimitive.Trigger
      ref={ref}
      className={cn(
        "px-3 py-1 rounded text-sm cursor-pointer",
        "data-[state=active]:bg-white data-[state=active]:shadow",
        className
      )}
      {...props}
    />
  );
});

// Content
export const TabsContent = React.forwardRef(function TabsContent(
  { className, ...props },
  ref
) {
  return (
    <TabsPrimitive.Content
      ref={ref}
      className={cn("mt-3", className)}
      {...props}
    />
  );
});