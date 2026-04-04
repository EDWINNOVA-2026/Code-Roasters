"use client";

import * as React from "react";
import { Command as CommandPrimitive } from "cmdk";
import { Search } from "lucide-react";

import { cn } from "@/lib/utils";
import { Dialog, DialogContent } from "@/components/ui/dialog";

// Main Command
export const Command = React.forwardRef(function Command(
  { className, ...props },
  ref
) {
  return (
    <CommandPrimitive
      ref={ref}
      className={cn("flex flex-col rounded-md bg-white", className)}
      {...props}
    />
  );
});

// Dialog Wrapper
export function CommandDialog({ children, ...props }) {
  return (
    <Dialog {...props}>
      <DialogContent className="p-0">
        <Command>{children}</Command>
      </DialogContent>
    </Dialog>
  );
}

// Input
export const CommandInput = React.forwardRef(function CommandInput(
  { className, ...props },
  ref
) {
  return (
    <div className="flex items-center border-b px-3">
      <Search className="w-4 h-4 mr-2 opacity-50" />
      <CommandPrimitive.Input
        ref={ref}
        className={cn("w-full p-2 outline-none", className)}
        {...props}
      />
    </div>
  );
});

// List
export const CommandList = React.forwardRef(function CommandList(
  { className, ...props },
  ref
) {
  return (
    <CommandPrimitive.List
      ref={ref}
      className={cn("max-h-[300px] overflow-y-auto", className)}
      {...props}
    />
  );
});

// Empty
export const CommandEmpty = React.forwardRef(function CommandEmpty(
  props,
  ref
) {
  return (
    <CommandPrimitive.Empty
      ref={ref}
      className="p-4 text-center text-sm"
      {...props}
    />
  );
});

// Group
export const CommandGroup = React.forwardRef(function CommandGroup(
  { className, ...props },
  ref
) {
  return (
    <CommandPrimitive.Group
      ref={ref}
      className={cn("p-2", className)}
      {...props}
    />
  );
});

// Item
export const CommandItem = React.forwardRef(function CommandItem(
  { className, ...props },
  ref
) {
  return (
    <CommandPrimitive.Item
      ref={ref}
      className={cn(
        "px-2 py-2 cursor-pointer hover:bg-gray-100",
        className
      )}
      {...props}
    />
  );
});

// Separator
export const CommandSeparator = React.forwardRef(function CommandSeparator(
  { className, ...props },
  ref
) {
  return (
    <CommandPrimitive.Separator
      ref={ref}
      className={cn("h-px bg-gray-200", className)}
      {...props}
    />
  );
});

// Shortcut
export function CommandShortcut({ className, ...props }) {
  return (
    <span className={cn("ml-auto text-xs text-gray-400", className)} {...props} />
  );
}