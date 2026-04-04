"use client";

import * as React from "react";
import * as HoverCardPrimitive from "@radix-ui/react-hover-card";
import { cn } from "@/lib/utils";

// Root
export const HoverCard = HoverCardPrimitive.Root;

// Trigger
export const HoverCardTrigger = HoverCardPrimitive.Trigger;

// Content
export const HoverCardContent = React.forwardRef(function HoverCardContent(
  { className, align = "center", sideOffset = 4, ...props },
  ref
) {
  return (
    <HoverCardPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={cn(
        "w-64 rounded-md border bg-white p-4 shadow-md",
        className
      )}
      {...props}
    />
  );
});