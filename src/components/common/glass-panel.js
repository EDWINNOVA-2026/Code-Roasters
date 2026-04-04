"use client";

import { motion } from "framer-motion";

const glowMap = {
  amber: "neon-glow-amber",
  red: "neon-glow-red",
  blue: "neon-glow-blue",
  none: "",
};

export default function GlassPanel({
  children,
  glow = "none",
  className = "",
  animate = true,
  ...props
}) {
  return (
    <motion.div
      initial={animate ? { opacity: 0, y: 20 } : false}
      animate={animate ? { opacity: 1, y: 0 } : false}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className={`glass-panel p-5 ${glowMap[glow]} ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
}