"use client";

import { motion } from "framer-motion";

// Color mapping
const colorMap = {
  amber: "text-primary bg-primary/10",
  red: "text-emergency bg-emergency/10",
  blue: "text-info bg-info/10",
  green: "text-success bg-success/10",
};

export default function StatCard({
  icon: Icon,
  label,
  value,
  trend,
  color = "amber",
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      className="glass-panel p-5 flex flex-col gap-3 cursor-default"
    >
      <div className="flex items-center justify-between">
        <div className={`p-2.5 rounded-xl ${colorMap[color]}`}>
          <Icon size={20} />
        </div>

        {trend && (
          <span className="text-xs text-success font-medium">
            {trend}
          </span>
        )}
      </div>

      <div>
        <p className="text-2xl font-bold font-display">{value}</p>
        <p className="text-xs text-muted-foreground mt-0.5">
          {label}
        </p>
      </div>
    </motion.div>
  );
}