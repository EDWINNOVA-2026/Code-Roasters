"use client";
import { SessionProvider } from "next-auth/react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "sonner";

import MapBackground from "@/components/common/map-background";
import { AuthProvider } from "@/contexts/AuthContext";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <AuthProvider>
            <TooltipProvider>
              <MapBackground />


              {children}

              <Toaster
                position="top-center"
                richColors
                expand
              />
            </TooltipProvider>
          </AuthProvider>
        </SessionProvider>
      </body>
    </html>
  );
}