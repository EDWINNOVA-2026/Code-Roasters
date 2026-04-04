"use client";

import * as React from "react";
import * as ContextMenuPrimitive from "@radix-ui/react-context-menu";
import { Check, ChevronRight, Circle } from "lucide-react";

import { cn } from "@/lib/utils";

// Root exports
export const ContextMenu = ContextMenuPrimitive.Root;
export const ContextMenuTrigger = ContextMenuPrimitive.Trigger;
export const ContextMenuGroup = ContextMenuPrimitive.Group;
export const ContextMenuPortal = ContextMenuPrimitive.Portal;
export const ContextMenuSub = ContextMenuPrimitive.Sub;
export const ContextMenuRadioGroup = ContextMenuPrimitive.RadioGroup;

// Content
export const ContextMenuContent = React.forwardRef(function ContextMenuContent(
  { className, ...props },
  ref
) {
  return (
    <ContextMenuPrimitive.Portal>
      <ContextMenuPrimitive.Content
        ref={ref}
        className={cn(
          "min-w-[150px] rounded-md border bg-white p-1 shadow-md",
          className
        )}
        {...props}
      />
    </ContextMenuPrimitive.Portal>
  );
});

// Item
export const ContextMenuItem = React.forwardRef(function ContextMenuItem(
  { className, ...props },
  ref
) {
  return (
    <ContextMenuPrimitive.Item
      ref={ref}
      className={cn(
        "px-2 py-2 text-sm cursor-pointer hover:bg-gray-100 rounded",
        className
      )}
      {...props}
    />
  );
});

// Checkbox Item
export const ContextMenuCheckboxItem = React.forwardRef(function ContextMenuCheckboxItem(
  { className, children, checked, ...props },
  ref
) {
  return (
    <ContextMenuPrimitive.CheckboxItem
      ref={ref}
      checked={checked}
      className={cn("pl-8 pr-2 py-2 text-sm", className)}
      {...props}
    >
      <span className="absolute left-2">
        <ContextMenuPrimitive.ItemIndicator>
          <Check className="w-4 h-4" />
        </ContextMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </ContextMenuPrimitive.CheckboxItem>
  );
});

// Radio Item
export const ContextMenuRadioItem = React.forwardRef(function ContextMenuRadioItem(
  { className, children, ...props },
  ref
) {
  return (
    <ContextMenuPrimitive.RadioItem
      ref={ref}
      className={cn("pl-8 pr-2 py-2 text-sm", className)}
      {...props}
    >
      <span className="absolute left-2">
        <ContextMenuPrimitive.ItemIndicator>
          <Circle className="w-2 h-2 fill-current" />
        </ContextMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </ContextMenuPrimitive.RadioItem>
  );
});

// Label
export const ContextMenuLabel = React.forwardRef(function ContextMenuLabel(
  { className, ...props },
  ref
) {
  return (
    <ContextMenuPrimitive.Label
      ref={ref}
      className={cn("px-2 py-1 text-sm font-semibold", className)}
      {...props}
    />
  );
});

// Separator
export const ContextMenuSeparator = React.forwardRef(function ContextMenuSeparator(
  { className, ...props },
  ref
) {
  return (
    <ContextMenuPrimitive.Separator
      ref={ref}
      className={cn("h-px bg-gray-200 my-1", className)}
      {...props}
    />
  );
});

// Sub Trigger
export const ContextMenuSubTrigger = React.forwardRef(function ContextMenuSubTrigger(
  { className, children, ...props },
  ref
) {
  return (
    <ContextMenuPrimitive.SubTrigger
      ref={ref}
      className={cn("flex justify-between px-2 py-2 text-sm", className)}
      {...props}
    >
      {children}
      <ChevronRight className="w-4 h-4" />
    </ContextMenuPrimitive.SubTrigger>
  );
});

// Sub Content
export const ContextMenuSubContent = React.forwardRef(function ContextMenuSubContent(
  { className, ...props },
  ref
) {
  return (
    <ContextMenuPrimitive.SubContent
      ref={ref}
      className={cn("bg-white border rounded shadow p-1", className)}
      {...props}
    />
  );
});

// Shortcut
export function ContextMenuShortcut({ className, ...props }) {
  return (
    <span className={cn("ml-auto text-xs text-gray-400", className)} {...props} />
  );
}