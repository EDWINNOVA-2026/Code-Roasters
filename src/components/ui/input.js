"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export const Input = React.forwardRef(function Input(
  { className, type = "text", ...props },
  ref
) {
  return (
    <input
      ref={ref}
      type={type}
      className={cn(
        "w-full h-10 px-3 py-2 border rounded-md text-sm",
        "focus:outline-none focus:ring-2 focus:ring-black",
        "disabled:opacity-50",
        className
      )}
      {...props}
    />
  );
});