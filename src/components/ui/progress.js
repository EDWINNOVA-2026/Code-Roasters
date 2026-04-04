"use client";

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import { cn } from "@/lib/utils";

export const Progress = React.forwardRef(function Progress(
  { className, value = 0, ...props },
  ref
) {
  return (
    <ProgressPrimitive.Root
      ref={ref}
      className={cn(
        "w-full h-4 bg-gray-200 rounded-full overflow-hidden",
        className
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        className="h-full bg-black transition-all"
        style={{
          transform: `translateX(-${100 - value}%)`,
        }}
      />
    </ProgressPrimitive.Root>
  );
});