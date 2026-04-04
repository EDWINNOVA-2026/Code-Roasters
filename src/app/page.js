"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Clock,
  Heart,
  Navigation,
  ChevronUp,
  Zap,
  Stethoscope,
  Flame,
  Car,
  Shield,
  Activity,
  Users,
  PhoneCall,
} from "lucide-react";

import SOSButton from "@/components/common/sos-button";
import GlassPanel from "@/components/common/glass-panel";

// Emergency types
const emergencyTypes = [
  { id: "accident", label: "Accident", icon: Car, color: "bg-emergency/20 text-emergency" },
  { id: "cardiac", label: "Cardiac", icon: Heart, color: "bg-emergency/20 text-emergency" },
  { id: "fire", label: "Fire/Burns", icon: Flame, color: "bg-high/20 text-high" },
  { id: "medical", label: "Medical", icon: Stethoscope, color: "bg-info/20 text-info" },
];

// Stats
const liveStats = [
  { label: "Active Ambulances", value: "24", icon: Activity },
  { label: "Avg Response", value: "3.2m", icon: Clock },
  { label: "Lives Saved Today", value: "18", icon: Shield },
];

export default function HomePage() {
  const [isBooking, setIsBooking] = useState(false);
  const [isTracking, setIsTracking] = useState(false);
  const [selectedType, setSelectedType] = useState(null);

  const handleSOS = () => {
    setIsBooking(false);
    setIsTracking(true);
  };

  return (
    <div className="relative z-10 flex flex-col items-center min-h-screen pb-8 px-4">

      {/* Status bar */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed top-20 left-4 right-4 flex justify-between items-center z-30"
      >
        <div className="glass-panel px-4 py-2 flex items-center gap-2">
          <motion.div
            className="w-2 h-2 rounded-full bg-success"
            animate={{ opacity: [1, 0.4, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          <span className="text-xs text-muted-foreground">GPS Active</span>
        </div>

        <div className="glass-panel px-4 py-2">
          <span className="text-xs text-muted-foreground">📍 Downtown District</span>
        </div>
      </motion.div>

      <AnimatePresence mode="wait">
        {isTracking ? (
          <motion.div
            key="tracking"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 60 }}
            className="w-full max-w-md space-y-4 mt-32"
          >
            <GlassPanel glow="amber" className="text-center">
              <Zap className="mx-auto text-primary mb-2" size={32} />
              <h2 className="text-xl font-bold font-display">Ambulance En Route</h2>
              <p className="text-muted-foreground text-sm mt-1">
                Unit AMB-247 • Dr. Sarah K.
              </p>

              <div className="flex items-center justify-center gap-6 mt-4">
                <div className="text-center">
                  <p className="text-3xl font-bold text-primary">3:42</p>
                  <p className="text-xs text-muted-foreground">ETA</p>
                </div>

                <div className="w-px h-10 bg-border" />

                <div className="text-center">
                  <p className="text-3xl font-bold">
                    1.2 <span className="text-sm text-muted-foreground">km</span>
                  </p>
                  <p className="text-xs text-muted-foreground">Distance</p>
                </div>
              </div>
            </GlassPanel>

            <motion.button
              onClick={() => setIsTracking(false)}
              className="w-full py-3 rounded-xl bg-secondary text-secondary-foreground"
            >
              Cancel Request
            </motion.button>
          </motion.div>
        ) : (
          <motion.div className="w-full max-w-lg flex flex-col items-center mt-28">

            {/* Title */}
            <div className="text-center mb-6">
              <h1 className="text-4xl font-bold">
                Every Second <span className="text-primary">Counts</span>
              </h1>
              <p className="text-muted-foreground text-sm mt-2">
                AI-powered emergency response
              </p>
            </div>

            {/* SOS */}
            <SOSButton onPress={handleSOS} />

            {/* Stats */}
            <div className="flex gap-3 mt-6">
              {liveStats.map((s, i) => {
                const Icon = s.icon;
                return (
                  <div key={i} className="glass-panel px-3 py-2 text-xs flex gap-1">
                    <Icon size={12} />
                    {s.value}
                  </div>
                );
              })}
            </div>

            {/* Booking */}
            <div className="w-full mt-6">
              <button
                onClick={() => setIsBooking(!isBooking)}
                className="w-full glass-panel-strong p-3 flex justify-between"
              >
                Advanced Booking
                <ChevronUp />
              </button>

              {isBooking && (
                <div className="mt-4 space-y-3">

                  {/* Types */}
                  <div className="flex flex-wrap gap-2">
                    {emergencyTypes.map((t) => {
                      const Icon = t.icon;
                      return (
                        <button
                          key={t.id}
                          onClick={() => setSelectedType(t.id)}
                          className="glass-panel px-3 py-2 flex gap-1 text-sm"
                        >
                          <Icon size={14} /> {t.label}
                        </button>
                      );
                    })}
                  </div>

                  <button
                    onClick={handleSOS}
                    className="w-full py-3 bg-primary text-white rounded-xl"
                  >
                    Request Ambulance
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}