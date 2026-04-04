"use client";

import * as React from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";
import { cn } from "@/lib/utils";

export const Switch = React.forwardRef(function Switch(
  { className, ...props },
  ref
) {
  return (
    <SwitchPrimitives.Root
      ref={ref}
      className={cn(
        "w-11 h-6 bg-gray-300 rounded-full flex items-center cursor-pointer transition",
        "data-[state=checked]:bg-black",
        className
      )}
      {...props}
    >
      <SwitchPrimitives.Thumb
        className={cn(
          "w-5 h-5 bg-white rounded-full shadow transform transition",
          "data-[state=checked]:translate-x-5"
        )}
      />
    </SwitchPrimitives.Root>
  );
});