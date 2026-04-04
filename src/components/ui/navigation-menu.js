"use client";

import * as React from "react";
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

// Root
export const NavigationMenu = React.forwardRef(function NavigationMenu(
  { className, children, ...props },
  ref
) {
  return (
    <NavigationMenuPrimitive.Root
      ref={ref}
      className={cn("flex items-center justify-center relative", className)}
      {...props}
    >
      {children}
      <NavigationMenuViewport />
    </NavigationMenuPrimitive.Root>
  );
});

// List
export const NavigationMenuList = React.forwardRef(function NavigationMenuList(
  { className, ...props },
  ref
) {
  return (
    <NavigationMenuPrimitive.List
      ref={ref}
      className={cn("flex space-x-2", className)}
      {...props}
    />
  );
});

// Item
export const NavigationMenuItem = NavigationMenuPrimitive.Item;

// Trigger
export const NavigationMenuTrigger = React.forwardRef(function NavigationMenuTrigger(
  { className, children, ...props },
  ref
) {
  return (
    <NavigationMenuPrimitive.Trigger
      ref={ref}
      className={cn(
        "flex items-center gap-1 px-4 py-2 text-sm hover:bg-gray-100 rounded",
        className
      )}
      {...props}
    >
      {children}
      <ChevronDown className="w-3 h-3" />
    </NavigationMenuPrimitive.Trigger>
  );
});

// Content
export const NavigationMenuContent = React.forwardRef(function NavigationMenuContent(
  { className, ...props },
  ref
) {
  return (
    <NavigationMenuPrimitive.Content
      ref={ref}
      className={cn("bg-white border rounded shadow p-4", className)}
      {...props}
    />
  );
});

// Link
export const NavigationMenuLink = NavigationMenuPrimitive.Link;

// Viewport
export const NavigationMenuViewport = React.forwardRef(function NavigationMenuViewport(
  { className, ...props },
  ref
) {
  return (
    <div className="absolute top-full left-0 flex justify-center">
      <NavigationMenuPrimitive.Viewport
        ref={ref}
        className={cn(
          "mt-2 bg-white border rounded shadow",
          className
        )}
        {...props}
      />
    </div>
  );
});

// Indicator
export const NavigationMenuIndicator = React.forwardRef(function NavigationMenuIndicator(
  { className, ...props },
  ref
) {
  return (
    <NavigationMenuPrimitive.Indicator
      ref={ref}
      className={cn("flex justify-center", className)}
      {...props}
    >
      <div className="w-2 h-2 rotate-45 bg-gray-300" />
    </NavigationMenuPrimitive.Indicator>
  );
});