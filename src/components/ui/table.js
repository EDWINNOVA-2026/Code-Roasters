"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

// Table wrapper
export const Table = React.forwardRef(function Table(
  { className, ...props },
  ref
) {
  return (
    <div className="w-full overflow-auto">
      <table
        ref={ref}
        className={cn("w-full text-sm", className)}
        {...props}
      />
    </div>
  );
});

// Header
export const TableHeader = React.forwardRef(function TableHeader(
  { className, ...props },
  ref
) {
  return <thead ref={ref} className={cn(className)} {...props} />;
});

// Body
export const TableBody = React.forwardRef(function TableBody(
  { className, ...props },
  ref
) {
  return <tbody ref={ref} className={cn(className)} {...props} />;
});

// Row
export const TableRow = React.forwardRef(function TableRow(
  { className, ...props },
  ref
) {
  return (
    <tr
      ref={ref}
      className={cn("border-b hover:bg-gray-100", className)}
      {...props}
    />
  );
});

// Head Cell
export const TableHead = React.forwardRef(function TableHead(
  { className, ...props },
  ref
) {
  return (
    <th
      ref={ref}
      className={cn("p-3 text-left font-medium text-gray-500", className)}
      {...props}
    />
  );
});

// Data Cell
export const TableCell = React.forwardRef(function TableCell(
  { className, ...props },
  ref
) {
  return (
    <td
      ref={ref}
      className={cn("p-3", className)}
      {...props}
    />
  );
});

// Footer
export const TableFooter = React.forwardRef(function TableFooter(
  { className, ...props },
  ref
) {
  return (
    <tfoot
      ref={ref}
      className={cn("bg-gray-100 font-medium", className)}
      {...props}
    />
  );
});

// Caption
export const TableCaption = React.forwardRef(function TableCaption(
  { className, ...props },
  ref
) {
  return (
    <caption
      ref={ref}
      className={cn("text-sm text-gray-500 mt-2", className)}
      {...props}
    />
  );
});