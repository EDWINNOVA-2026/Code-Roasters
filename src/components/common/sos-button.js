"use client";

import { motion } from "framer-motion";
import { Phone } from "lucide-react";
import { useState } from "react";

export default function SOSButton({ onPress }) {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    if (loading) return;

    try {
      setLoading(true);

      // 🔊 Sound
      const audio = new Audio("/sos.mp3");
      audio.play().catch(() => {});

      // 📳 Vibration
      navigator.vibrate?.([200, 100, 200]);

      await onPress?.();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  

  return (
    <div className="relative flex items-center justify-center select-none">

      {/* 🔥 OUTER GLOW (FROM FIRST CODE) */}
      <motion.div
        className="absolute w-40 h-40 rounded-full"
        style={{
          background:
            "radial-gradient(circle, hsl(0 72% 51% / 0.15) 0%, transparent 70%)",
        }}
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* 🔁 PULSE RINGS (BALANCED SIZE) */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute w-32 h-32 rounded-full border-2 border-emergency/30"
          animate={{ scale: [1, 2.8], opacity: [0.5, 0] }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            delay: i * 0.7,
            ease: "easeOut",
          }}
        />
      ))}

      {/* 🌀 ROTATING RING */}
      <motion.div
        className="absolute w-36 h-36 rounded-full border border-dashed border-emergency/20"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />

      {/* ⚡ CLICK FLASH (NEW FEATURE) */}
      {loading && (
        <motion.div
          className="absolute w-40 h-40 rounded-full bg-red-500/20"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.8, 0] }}
          transition={{ duration: 0.6 }}
        />
      )}

      {/* 🔴 MAIN BUTTON */}
      <motion.button
        onClick={handleClick}
        disabled={loading}
        className="relative w-28 h-28 rounded-full bg-gradient-to-br from-red-500 via-rose-600 to-red-800 flex items-center justify-center neon-glow-red cursor-pointer disabled:opacity-70"

        whileHover={
          !loading
            ? {
                scale: 1.1,
                boxShadow:
                  "0 0 40px hsl(0 72% 51% / 0.6), 0 0 80px hsl(0 72% 51% / 0.3)",
              }
            : {}
        }

        whileTap={!loading ? { scale: 0.88 } : {}}

        animate={
          loading
            ? { scale: [1, 0.95, 1] }
            : {}
        }

        transition={{ type: "spring", stiffness: 400, damping: 15 }}
      >
        {/* INNER RING */}
        <div className="absolute inset-2 rounded-full border border-white/10" />

        {/* CONTENT */}
        <div className="flex flex-col items-center gap-1">
          <Phone
            className={`text-emergency-foreground ${
              loading ? "animate-pulse" : ""
            }`}
            size={28}
          />

          <span className="text-emergency-foreground text-xs font-bold tracking-[0.2em]">
            {loading ? "..." : "SOS"}
          </span>
        </div>
      </motion.button>
    </div>
  );
}