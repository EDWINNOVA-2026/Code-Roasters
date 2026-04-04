"use client";

import { cn } from "@/lib/utils";

export function Skeleton({ className, ...props }) {
  return (
    <div
      className={cn(
        "animate-pulse bg-gray-300 rounded-md",
        className
      )}
      {...props}
    />
  );
}