import RoleSwitcher from "@/components/common/role-switcher";
import MapBackground from "@/components/common/map-background";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen relative overflow-hidden">
          
          {/* Background */}
          <MapBackground />

          {/* Top role switcher */}
          <RoleSwitcher />

          {/* Brand */}
          <div className="fixed bottom-4 left-4 z-40">
            <p className="text-xs text-muted-foreground/50">
              1 Minute Ambulance ●
            </p>
          </div>

          {/* Pages render here */}
          {children}
        </div>
      </body>
    </html>
  );
}