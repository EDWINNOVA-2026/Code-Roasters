"use client";

import * as React from "react";
import * as MenubarPrimitive from "@radix-ui/react-menubar";
import { Check, ChevronRight, Circle } from "lucide-react";

import { cn } from "@/lib/utils";

// Root exports
export const Menubar = React.forwardRef(function Menubar(
  { className, ...props },
  ref
) {
  return (
    <MenubarPrimitive.Root
      ref={ref}
      className={cn(
        "flex items-center space-x-2 border p-1 rounded-md bg-white",
        className
      )}
      {...props}
    />
  );
});

export const MenubarMenu = MenubarPrimitive.Menu;
export const MenubarGroup = MenubarPrimitive.Group;
export const MenubarPortal = MenubarPrimitive.Portal;
export const MenubarSub = MenubarPrimitive.Sub;
export const MenubarRadioGroup = MenubarPrimitive.RadioGroup;

// Trigger
export const MenubarTrigger = React.forwardRef(function MenubarTrigger(
  { className, ...props },
  ref
) {
  return (
    <MenubarPrimitive.Trigger
      ref={ref}
      className={cn(
        "px-3 py-1 text-sm cursor-pointer hover:bg-gray-100 rounded",
        className
      )}
      {...props}
    />
  );
});

// Content
export const MenubarContent = React.forwardRef(function MenubarContent(
  { className, ...props },
  ref
) {
  return (
    <MenubarPrimitive.Portal>
      <MenubarPrimitive.Content
        ref={ref}
        className={cn(
          "bg-white border rounded shadow p-1 min-w-[150px]",
          className
        )}
        {...props}
      />
    </MenubarPrimitive.Portal>
  );
});

// Item
export const MenubarItem = React.forwardRef(function MenubarItem(
  { className, inset, ...props },
  ref
) {
  return (
    <MenubarPrimitive.Item
      ref={ref}
      className={cn(
        "px-2 py-2 text-sm hover:bg-gray-100 rounded",
        inset && "pl-8",
        className
      )}
      {...props}
    />
  );
});

// Checkbox Item
export const MenubarCheckboxItem = React.forwardRef(function MenubarCheckboxItem(
  { className, children, checked, ...props },
  ref
) {
  return (
    <MenubarPrimitive.CheckboxItem
      ref={ref}
      checked={checked}
      className={cn("pl-8 pr-2 py-2 text-sm", className)}
      {...props}
    >
      <span className="absolute left-2">
        <MenubarPrimitive.ItemIndicator>
          <Check className="w-4 h-4" />
        </MenubarPrimitive.ItemIndicator>
      </span>
      {children}
    </MenubarPrimitive.CheckboxItem>
  );
});

// Radio Item
export const MenubarRadioItem = React.forwardRef(function MenubarRadioItem(
  { className, children, ...props },
  ref
) {
  return (
    <MenubarPrimitive.RadioItem
      ref={ref}
      className={cn("pl-8 pr-2 py-2 text-sm", className)}
      {...props}
    >
      <span className="absolute left-2">
        <MenubarPrimitive.ItemIndicator>
          <Circle className="w-2 h-2 fill-current" />
        </MenubarPrimitive.ItemIndicator>
      </span>
      {children}
    </MenubarPrimitive.RadioItem>
  );
});

// Label
export const MenubarLabel = React.forwardRef(function MenubarLabel(
  { className, inset, ...props },
  ref
) {
  return (
    <MenubarPrimitive.Label
      ref={ref}
      className={cn("px-2 py-1 text-sm font-semibold", inset && "pl-8", className)}
      {...props}
    />
  );
});

// Separator
export const MenubarSeparator = React.forwardRef(function MenubarSeparator(
  { className, ...props },
  ref
) {
  return (
    <MenubarPrimitive.Separator
      ref={ref}
      className={cn("h-px bg-gray-200 my-1", className)}
      {...props}
    />
  );
});

// Sub Trigger
export const MenubarSubTrigger = React.forwardRef(function MenubarSubTrigger(
  { className, children, ...props },
  ref
) {
  return (
    <MenubarPrimitive.SubTrigger
      ref={ref}
      className={cn("flex justify-between px-2 py-2 text-sm", className)}
      {...props}
    >
      {children}
      <ChevronRight className="w-4 h-4" />
    </MenubarPrimitive.SubTrigger>
  );
});

// Sub Content
export const MenubarSubContent = React.forwardRef(function MenubarSubContent(
  { className, ...props },
  ref
) {
  return (
    <MenubarPrimitive.SubContent
      ref={ref}
      className={cn("bg-white border rounded shadow p-1", className)}
      {...props}
    />
  );
});

// Shortcut
export function MenubarShortcut({ className, ...props }) {
  return (
    <span className={cn("ml-auto text-xs text-gray-400", className)} {...props} />
  );
}