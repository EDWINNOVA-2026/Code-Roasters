"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

// Wrapper
export function Pagination({ className, ...props }) {
  return (
    <nav
      role="navigation"
      className={cn("flex justify-center w-full", className)}
      {...props}
    />
  );
}

// Content
export const PaginationContent = React.forwardRef(function PaginationContent(
  { className, ...props },
  ref
) {
  return (
    <ul
      ref={ref}
      className={cn("flex items-center gap-2", className)}
      {...props}
    />
  );
});

// Item
export const PaginationItem = React.forwardRef(function PaginationItem(
  { className, ...props },
  ref
) {
  return <li ref={ref} className={cn(className)} {...props} />;
});

// Link
export function PaginationLink({
  className,
  isActive,
  size = "icon",
  ...props
}) {
  return (
    <a
      className={cn(
        buttonVariants({
          variant: isActive ? "outline" : "ghost",
          size,
        }),
        className
      )}
      {...props}
    />
  );
}

// Previous
export function PaginationPrevious({ className, ...props }) {
  return (
    <PaginationLink
      size="default"
      className={cn("flex items-center gap-1", className)}
      {...props}
    >
      <ChevronLeft className="w-4 h-4" />
      Previous
    </PaginationLink>
  );
}

// Next
export function PaginationNext({ className, ...props }) {
  return (
    <PaginationLink
      size="default"
      className={cn("flex items-center gap-1", className)}
      {...props}
    >
      Next
      <ChevronRight className="w-4 h-4" />
    </PaginationLink>
  );
}

// Ellipsis (...)
export function PaginationEllipsis({ className, ...props }) {
  return (
    <span
      className={cn("flex items-center justify-center w-9 h-9", className)}
      {...props}
    >
      <MoreHorizontal className="w-4 h-4" />
    </span>
  );
}