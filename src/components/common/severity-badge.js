"use client";

import { motion } from "framer-motion";

// Config
const config = {
  critical: {
    label: "Critical",
    emoji: "🚨",
    bg: "bg-critical/20",
    text: "text-red-400",
    glow: "shadow-[0_0_12px_hsl(0,72%,51%,0.5)]",
  },
  high: {
    label: "High",
    emoji: "⚠️",
    bg: "bg-high/20",
    text: "text-orange-400",
    glow: "shadow-[0_0_12px_hsl(25,95%,53%,0.4)]",
  },
  medium: {
    label: "Medium",
    emoji: "🧠",
    bg: "bg-medium/20",
    text: "text-amber-400",
    glow: "",
  },
  low: {
    label: "Low",
    emoji: "✅",
    bg: "bg-low/20",
    text: "text-green-400",
    glow: "",
  },
};

export default function SeverityBadge({ severity }) {
  const c = config[severity];

  return (
    <motion.span
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${c.bg} ${c.text} ${c.glow}`}
    >
      <span>{c.emoji}</span>
      {c.label}

      {(severity === "critical" || severity === "high") && (
        <motion.span
          className="w-1.5 h-1.5 rounded-full bg-current"
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        />
      )}
    </motion.span>
  );
}