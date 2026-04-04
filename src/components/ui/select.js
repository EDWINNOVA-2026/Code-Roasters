"use client";

import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { Check, ChevronDown, ChevronUp } from "lucide-react";

import { cn } from "@/lib/utils";

// Root
export const Select = SelectPrimitive.Root;
export const SelectGroup = SelectPrimitive.Group;
export const SelectValue = SelectPrimitive.Value;

// Trigger
export const SelectTrigger = React.forwardRef(function SelectTrigger(
  { className, children, ...props },
  ref
) {
  return (
    <SelectPrimitive.Trigger
      ref={ref}
      className={cn(
        "w-full h-10 px-3 border rounded-md flex items-center justify-between",
        className
      )}
      {...props}
    >
      {children}
      <ChevronDown className="w-4 h-4 opacity-50" />
    </SelectPrimitive.Trigger>
  );
});

// Content
export const SelectContent = React.forwardRef(function SelectContent(
  { className, children, ...props },
  ref
) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        ref={ref}
        className={cn("bg-white border rounded shadow p-1", className)}
        {...props}
      >
        <SelectPrimitive.ScrollUpButton>
          <ChevronUp className="w-4 h-4" />
        </SelectPrimitive.ScrollUpButton>

        <SelectPrimitive.Viewport className="p-1">
          {children}
        </SelectPrimitive.Viewport>

        <SelectPrimitive.ScrollDownButton>
          <ChevronDown className="w-4 h-4" />
        </SelectPrimitive.ScrollDownButton>
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  );
});

// Item
export const SelectItem = React.forwardRef(function SelectItem(
  { className, children, ...props },
  ref
) {
  return (
    <SelectPrimitive.Item
      ref={ref}
      className={cn("px-2 py-2 text-sm hover:bg-gray-100 rounded", className)}
      {...props}
    >
      <SelectPrimitive.ItemIndicator>
        <Check className="w-4 h-4" />
      </SelectPrimitive.ItemIndicator>

      <SelectPrimitive.ItemText>
        {children}
      </SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  );
});

// Label
export const SelectLabel = React.forwardRef(function SelectLabel(
  { className, ...props },
  ref
) {
  return (
    <SelectPrimitive.Label
      ref={ref}
      className={cn("px-2 py-1 text-sm font-semibold", className)}
      {...props}
    />
  );
});

// Separator
export const SelectSeparator = React.forwardRef(function SelectSeparator(
  { className, ...props },
  ref
) {
  return (
    <SelectPrimitive.Separator
      ref={ref}
      className={cn("h-px bg-gray-200 my-1", className)}
      {...props}
    />
  );
});