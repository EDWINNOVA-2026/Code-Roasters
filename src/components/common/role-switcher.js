"use client";

import { motion } from "framer-motion";
import { useRouter, usePathname } from "next/navigation";
import { User, Truck, Building2, Shield } from "lucide-react";

const roles = [
  { id: "user", label: "Patient", icon: User },
  { id: "driver", label: "Driver", icon: Truck },
  { id: "hospital", label: "Hospital", icon: Building2 },
  { id: "admin", label: "Admin", icon: Shield },
];

export default function RoleSwitcher() {
  const router = useRouter();
  const pathname = usePathname();

  const getActiveRole = () => {
    if (pathname === "/") return "user";
    return pathname.replace("/", "");
  };

  const activeRole = getActiveRole();

  return (
    <motion.div
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-6 left-1/2 -translate-x-1/2 z-50"
    >
      <div className="glass-panel-strong px-2 py-2 flex gap-1 neon-glow-amber">
        {roles.map((role) => {
          const Icon = role.icon;
          const isActive = activeRole === role.id;

          return (
            <motion.button
              key={role.id}
              onClick={() =>
                router.push(role.id === "user" ? "/" : `/${role.id}`)
              }
              className={`relative px-4 py-2.5 rounded-xl flex items-center gap-2 text-sm font-medium ${
                isActive
                  ? "text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              whileTap={{ scale: 0.95 }}
            >
              {isActive && (
                <motion.div
                  layoutId="activeRole"
                  className="absolute inset-0 bg-primary rounded-xl"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}

              <span className="relative z-10 flex items-center gap-2">
                <Icon size={16} />
                <span className="hidden sm:inline">{role.label}</span>
              </span>
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}