"use client";

import { motion } from "framer-motion";
import { User, Truck, Building2, Shield } from "lucide-react";

const roles = [
  { id: "user", label: "Patient", icon: User },
  { id: "driver", label: "Driver", icon: Truck },
  { id: "hospital", label: "Hospital", icon: Building2 },
  { id: "admin", label: "Admin", icon: Shield },
];

export default function RoleSwitcher({ role, setRole }) {
  return (
    <motion.div
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="mb-6"
    >
      <div className="relative flex gap-1 p-1.5 rounded-2xl 
        bg-card/80 backdrop-blur-xl border border-glass-border
        shadow-[0_0_30px_hsl(38,92%,50%,0.25)]">

        {roles.map((r) => {
          const Icon = r.icon;
          const isActive = role === r.id;

          return (
            <motion.button
              key={r.id}
              onClick={() => setRole(r.id)}
              whileTap={{ scale: 0.92 }}
              whileHover={{ scale: 1.05 }}
              className={`relative px-5 py-2.5 rounded-xl flex items-center gap-2 text-sm font-medium ${
                isActive
                  ? "text-black"
                  : "text-muted-foreground hover:text-white"
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeRole"
                  className="absolute inset-0 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500"
                />
              )}

              <span className="relative z-10 flex items-center gap-2">
                <Icon size={16} />
                <span className="hidden sm:inline">{r.label}</span>
              </span>
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}