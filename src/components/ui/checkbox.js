"use client";

import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";

import { cn } from "@/lib/utils";

export const Checkbox = React.forwardRef(function Checkbox(
  { className, ...props },
  ref
) {
  return (
    <CheckboxPrimitive.Root
      ref={ref}
      className={cn(
        "h-4 w-4 rounded-sm border border-black flex items-center justify-center",
        "data-[state=checked]:bg-black data-[state=checked]:text-white",
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator className="flex items-center justify-center">
        <Check className="w-3 h-3" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
});