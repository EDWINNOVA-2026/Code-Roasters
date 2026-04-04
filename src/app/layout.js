import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import RoleSwitcher from "@/components/common/role-switcher";
import MapBackground from "@/components/common/map-background";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <TooltipProvider>
          <MapBackground />
          <RoleSwitcher />

          {children}

          <Toaster />
        </TooltipProvider>
      </body>
    </html>
  );
}