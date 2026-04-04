"use client";

import * as React from "react";
import { OTPInput, OTPInputContext } from "input-otp";
import { Dot } from "lucide-react";

import { cn } from "@/lib/utils";

// Main Input
export const InputOTP = React.forwardRef(function InputOTP(
  { className, containerClassName, ...props },
  ref
) {
  return (
    <OTPInput
      ref={ref}
      containerClassName={cn("flex items-center gap-2", containerClassName)}
      className={cn(className)}
      {...props}
    />
  );
});

// Group
export const InputOTPGroup = React.forwardRef(function InputOTPGroup(
  { className, ...props },
  ref
) {
  return (
    <div
      ref={ref}
      className={cn("flex items-center", className)}
      {...props}
    />
  );
});

// Slot (each box)
export const InputOTPSlot = React.forwardRef(function InputOTPSlot(
  { index, className, ...props },
  ref
) {
  const context = React.useContext(OTPInputContext);
  const { char, hasFakeCaret, isActive } = context.slots[index];

  return (
    <div
      ref={ref}
      className={cn(
        "relative flex h-10 w-10 items-center justify-center border text-sm",
        isActive && "ring-2 ring-black",
        className
      )}
      {...props}
    >
      {char}

      {hasFakeCaret && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-4 w-px bg-black animate-pulse" />
        </div>
      )}
    </div>
  );
});

// Separator (dot)
export const InputOTPSeparator = React.forwardRef(function InputOTPSeparator(
  props,
  ref
) {
  return (
    <div ref={ref} {...props}>
      <Dot />
    </div>
  );
});