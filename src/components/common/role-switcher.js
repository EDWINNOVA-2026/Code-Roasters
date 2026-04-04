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

  const activeRole = pathname === "/" ? "user" : pathname.replace("/", "");

  return (
    <motion.div
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 120, damping: 20 }}
      className="fixed top-6 left-1/2 -translate-x-1/2 z-50"
    >
      {/* 🔥 MAIN CONTAINER */}
      <div className="relative flex gap-1 p-1.5 rounded-2xl 
        bg-card/80 backdrop-blur-xl border border-glass-border
        shadow-[0_0_30px_hsl(38,92%,50%,0.25)]">

        {roles.map((role) => {
          const Icon = role.icon;
          const isActive = activeRole === role.id;

          return (
            <motion.button
              key={role.id}
              onClick={() =>
                router.push(role.id === "user" ? "/" : `/${role.id}`)
              }
              whileTap={{ scale: 0.92 }}
              whileHover={{ scale: 1.05 }}
              className={`relative px-5 py-2.5 rounded-xl flex items-center gap-2 text-sm font-medium transition-all ${
                isActive
                  ? "text-black"
                  : "text-muted-foreground hover:text-white"
              }`}
            >
              {/* 🔥 ACTIVE SLIDER */}
              {isActive && (
                <motion.div
                  layoutId="activeRole"
                  className="absolute inset-0 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 shadow-[0_0_20px_rgba(255,180,0,0.6)]"
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 30,
                  }}
                />
              )}

              {/* CONTENT */}
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