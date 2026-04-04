"use client";

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { cn } from "@/lib/utils";

export const Slider = React.forwardRef(function Slider(
  { className, ...props },
  ref
) {
  return (
    <SliderPrimitive.Root
      ref={ref}
      className={cn("flex items-center w-full", className)}
      {...props}
    >
      <SliderPrimitive.Track className="w-full h-2 bg-gray-300 rounded-full">
        <SliderPrimitive.Range className="h-full bg-black" />
      </SliderPrimitive.Track>

      <SliderPrimitive.Thumb className="w-5 h-5 bg-white border-2 border-black rounded-full cursor-pointer" />
    </SliderPrimitive.Root>
  );
});