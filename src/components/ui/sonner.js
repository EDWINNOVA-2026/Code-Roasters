"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner, toast } from "sonner";

export function Toaster(props) {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme}
      className="toaster"
      toastOptions={{
        classNames: {
          toast: "bg-white text-black border shadow-lg",
          description: "text-gray-500",
          actionButton: "bg-black text-white",
          cancelButton: "bg-gray-200 text-black",
        },
      }}
      {...props}
    />
  );
}

export { toast };