"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { ChevronRight, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

// Wrapper
export const Breadcrumb = React.forwardRef(function Breadcrumb(props, ref) {
  return <nav ref={ref} aria-label="breadcrumb" {...props} />;
});

// List
export const BreadcrumbList = React.forwardRef(function BreadcrumbList(
  { className, ...props },
  ref
) {
  return (
    <ol
      ref={ref}
      className={cn(
        "flex flex-wrap items-center gap-2 text-sm text-gray-500",
        className
      )}
      {...props}
    />
  );
});

// Item
export const BreadcrumbItem = React.forwardRef(function BreadcrumbItem(
  { className, ...props },
  ref
) {
  return (
    <li
      ref={ref}
      className={cn("flex items-center gap-1", className)}
      {...props}
    />
  );
});

// Link
export const BreadcrumbLink = React.forwardRef(function BreadcrumbLink(
  { asChild, className, ...props },
  ref
) {
  const Comp = asChild ? Slot : "a";

  return (
    <Comp
      ref={ref}
      className={cn("hover:text-black transition-colors", className)}
      {...props}
    />
  );
});

// Current Page
export const BreadcrumbPage = React.forwardRef(function BreadcrumbPage(
  { className, ...props },
  ref
) {
  return (
    <span
      ref={ref}
      aria-current="page"
      className={cn("text-black font-medium", className)}
      {...props}
    />
  );
});

// Separator
export function BreadcrumbSeparator({ children, className, ...props }) {
  return (
    <li className={cn("", className)} {...props}>
      {children || <ChevronRight className="w-4 h-4" />}
    </li>
  );
}

// Ellipsis (...)
export function BreadcrumbEllipsis({ className, ...props }) {
  return (
    <span
      className={cn("flex items-center justify-center w-6 h-6", className)}
      {...props}
    >
      <MoreHorizontal className="w-4 h-4" />
    </span>
  );
}