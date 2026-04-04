"use client";

import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { Circle } from "lucide-react";

import { cn } from "@/lib/utils";

// Group
export const RadioGroup = React.forwardRef(function RadioGroup(
  { className, ...props },
  ref
) {
  return (
    <RadioGroupPrimitive.Root
      ref={ref}
      className={cn("flex flex-col gap-2", className)}
      {...props}
    />
  );
});

// Item
export const RadioGroupItem = React.forwardRef(function RadioGroupItem(
  { className, ...props },
  ref
) {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(
        "w-4 h-4 rounded-full border border-black flex items-center justify-center",
        className
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator>
        <Circle className="w-2 h-2 fill-black" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  );
});