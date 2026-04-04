"use client";

import * as React from "react";
import * as SeparatorPrimitive from "@radix-ui/react-separator";
import { cn } from "@/lib/utils";

export const Separator = React.forwardRef(function Separator(
  { className, orientation = "horizontal", ...props },
  ref
) {
  return (
    <SeparatorPrimitive.Root
      ref={ref}
      orientation={orientation}
      className={cn(
        orientation === "horizontal"
          ? "w-full h-[1px] bg-gray-300"
          : "h-full w-[1px] bg-gray-300",
        className
      )}
      {...props}
    />
  );
});