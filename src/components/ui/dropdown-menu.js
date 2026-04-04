"use client";

import * as React from "react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { Check, ChevronRight, Circle } from "lucide-react";

import { cn } from "@/lib/utils";

// Root exports
export const DropdownMenu = DropdownMenuPrimitive.Root;
export const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;
export const DropdownMenuGroup = DropdownMenuPrimitive.Group;
export const DropdownMenuPortal = DropdownMenuPrimitive.Portal;
export const DropdownMenuSub = DropdownMenuPrimitive.Sub;
export const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;

// Content
export const DropdownMenuContent = React.forwardRef(function DropdownMenuContent(
  { className, sideOffset = 4, ...props },
  ref
) {
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        ref={ref}
        sideOffset={sideOffset}
        className={cn(
          "min-w-[150px] rounded-md border bg-white p-1 shadow-md",
          className
        )}
        {...props}
      />
    </DropdownMenuPrimitive.Portal>
  );
});

// Item
export const DropdownMenuItem = React.forwardRef(function DropdownMenuItem(
  { className, inset, ...props },
  ref
) {
  return (
    <DropdownMenuPrimitive.Item
      ref={ref}
      className={cn(
        "px-2 py-2 text-sm cursor-pointer hover:bg-gray-100 rounded",
        inset && "pl-8",
        className
      )}
      {...props}
    />
  );
});

// Checkbox Item
export const DropdownMenuCheckboxItem = React.forwardRef(function DropdownMenuCheckboxItem(
  { className, children, checked, ...props },
  ref
) {
  return (
    <DropdownMenuPrimitive.CheckboxItem
      ref={ref}
      checked={checked}
      className={cn("pl-8 pr-2 py-2 text-sm", className)}
      {...props}
    >
      <span className="absolute left-2">
        <DropdownMenuPrimitive.ItemIndicator>
          <Check className="w-4 h-4" />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.CheckboxItem>
  );
});

// Radio Item
export const DropdownMenuRadioItem = React.forwardRef(function DropdownMenuRadioItem(
  { className, children, ...props },
  ref
) {
  return (
    <DropdownMenuPrimitive.RadioItem
      ref={ref}
      className={cn("pl-8 pr-2 py-2 text-sm", className)}
      {...props}
    >
      <span className="absolute left-2">
        <DropdownMenuPrimitive.ItemIndicator>
          <Circle className="w-2 h-2 fill-current" />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.RadioItem>
  );
});

// Label
export const DropdownMenuLabel = React.forwardRef(function DropdownMenuLabel(
  { className, inset, ...props },
  ref
) {
  return (
    <DropdownMenuPrimitive.Label
      ref={ref}
      className={cn("px-2 py-1 text-sm font-semibold", inset && "pl-8", className)}
      {...props}
    />
  );
});

// Separator
export const DropdownMenuSeparator = React.forwardRef(function DropdownMenuSeparator(
  { className, ...props },
  ref
) {
  return (
    <DropdownMenuPrimitive.Separator
      ref={ref}
      className={cn("h-px bg-gray-200 my-1", className)}
      {...props}
    />
  );
});

// Sub Trigger
export const DropdownMenuSubTrigger = React.forwardRef(function DropdownMenuSubTrigger(
  { className, children, ...props },
  ref
) {
  return (
    <DropdownMenuPrimitive.SubTrigger
      ref={ref}
      className={cn("flex justify-between px-2 py-2 text-sm", className)}
      {...props}
    >
      {children}
      <ChevronRight className="w-4 h-4" />
    </DropdownMenuPrimitive.SubTrigger>
  );
});

// Sub Content
export const DropdownMenuSubContent = React.forwardRef(function DropdownMenuSubContent(
  { className, ...props },
  ref
) {
  return (
    <DropdownMenuPrimitive.SubContent
      ref={ref}
      className={cn("bg-white border rounded shadow p-1", className)}
      {...props}
    />
  );
});

// Shortcut
export function DropdownMenuShortcut({ className, ...props }) {
  return (
    <span className={cn("ml-auto text-xs text-gray-400", className)} {...props} />
  );
}