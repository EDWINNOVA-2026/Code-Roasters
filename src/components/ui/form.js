"use client";

import * as React from "react";
import { FormProvider, useFormContext, Controller } from "react-hook-form";
import { cn } from "@/lib/utils";

// Provider
export const Form = FormProvider;

// Context
const FormFieldContext = React.createContext({});

// FormField
export function FormField(props) {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  );
}

// Hook
export function useFormField() {
  const field = React.useContext(FormFieldContext);
  const { getFieldState, formState } = useFormContext();

  const fieldState = getFieldState(field.name, formState);

  return {
    name: field.name,
    ...fieldState,
  };
}

// Wrapper
export function FormItem({ className, ...props }) {
  return (
    <div className={cn("space-y-2", className)} {...props} />
  );
}

// Label
export function FormLabel({ className, ...props }) {
  return (
    <label className={cn("text-sm font-medium", className)} {...props} />
  );
}

// Control
export function FormControl({ ...props }) {
  return <div {...props} />;
}

// Description
export function FormDescription({ className, ...props }) {
  return (
    <p className={cn("text-sm text-gray-500", className)} {...props} />
  );
}

// Error Message
export function FormMessage({ className, children }) {
  return (
    <p className={cn("text-sm text-red-500", className)}>
      {children}
    </p>
  );
}