"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";

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

import SOSButton from "../components/common/sos-button";
import GlassPanel from "../components/common/glass-panel";

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

export default function UserView() {
  const [isBooking, setIsBooking] = useState(false);
  const [isTracking, setIsTracking] = useState(false);
  const [selectedType, setSelectedType] = useState(null);
  const [user, setUser] = useState(null);
  const router = useRouter();


  const handleSOS = () => {
    setIsBooking(false);
    setIsTracking(true);
  };


const { data: session } = useSession();

useEffect(() => {
  const fetchUser = async () => {
    try {
      const res = await fetch("/api/auth/me", {
        credentials: "include",
        cache: "no-store",
      });

      const data = await res.json();

      // ✅ PRIORITY 1: custom login
      if (data.user) {
        setUser(data.user);
      }

      // ✅ PRIORITY 2: google login
      else if (session?.user) {
        setUser({
          name: session.user.name,
          email: session.user.email,
          role: "user",
        });
      }

      else {
        setUser(null);
      }

    } catch {
      setUser(null);
    }
  };

  fetchUser();
}, [session]);


const handleLogout = async () => {
  // clear your JWT
  await fetch("/api/auth/logout", {
    method: "POST",
    credentials: "include",
  });

  // clear Google session
  await signOut({ redirect: false });

  setUser(null);
  router.push("/login");
};
  return (

    <div className="relative z-10 flex flex-col items-center min-h-screen pb-8 px-4">

      {/* 🔐 LOGIN BUTTONS (TOP RIGHT) */}
      <div className="fixed top-6 right-6 z-50 flex gap-2 bg-black/40 backdrop-blur-xl border border-white/10 p-2 rounded-2xl shadow-[0_0_30px_rgba(255,165,0,0.2)]">

        {user ? (
          <div className="flex items-center gap-3">

            {/* USER NAME */}
            <div className="px-4 py-2 rounded-xl bg-white/5 text-xs text-white">
              👤 {user.name || user.email?.split("@")[0].charAt(0).toUpperCase() + user.email?.split("@")[0].slice(1) || "User"}
            </div>

            {/* LOGOUT */}
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-xl text-xs bg-red-500/20 border border-red-500/30 text-red-400 hover:bg-red-500/30 transition"
            >
              Logout
            </button>

          </div>
        ) : (
          <button
            onClick={() => router.push("/login")}
            className="px-5 py-2.5 rounded-xl text-xs font-semibold text-white 
    bg-gradient-to-r from-primary to-amber-500 
    shadow-[0_0_20px_rgba(255,165,0,0.35)] 
    hover:scale-105 transition"
          >
            Login
          </button>
        )}

      </div>
      {/* Status bar */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="fixed top-20 left-4 right-4 flex justify-between items-center z-30"
      >
        <div className="glass-panel px-4 py-2 flex items-center gap-2">
          <motion.div className="w-2 h-2 rounded-full bg-success" animate={{ opacity: [1, 0.4, 1] }} transition={{ duration: 1.5, repeat: Infinity }} />
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
            initial={{ opacity: 0, y: 80, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 60 }}
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
            className="w-full max-w-md space-y-5 mt-28"
          >
            {/* 🚑 MAIN CARD */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative rounded-3xl p-6 bg-card/80 backdrop-blur-xl border border-glass-border overflow-hidden"
            >
              {/* 🔥 GLOW BACKGROUND */}
              <div className="absolute inset-0 rounded-3xl pointer-events-none">
                <div className="absolute inset-0 rounded-3xl shadow-[0_0_60px_rgba(255,165,0,0.25)]" />
              </div>

              {/* ⚡ ICON ANIMATION */}
              <motion.div
                animate={{ opacity: [0.6, 1, 0.6], y: [0, -6, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="flex justify-center mb-2"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  ⚡
                </div>
              </motion.div>

              {/* TITLE */}
              <h2 className="text-xl font-bold text-center">
                Ambulance En Route
              </h2>

              <p className="text-xs text-muted-foreground text-center mt-1">
                Unit AMB-247 • Dr. Sarah K.
              </p>

              {/* ⏱ STATS */}
              <div className="flex items-center justify-center gap-8 mt-6">
                <div className="text-center">
                  <motion.p
                    className="text-3xl font-bold text-primary"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    3:42
                  </motion.p>
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

              {/* 📊 PROGRESS BAR */}
              <div className="mt-6">
                <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-primary to-amber-400 rounded-full"
                    initial={{ width: "10%" }}
                    animate={{ width: "70%" }}
                    transition={{ duration: 4, ease: "easeOut" }}
                  />
                </div>
              </div>
            </motion.div>

            {/* 📡 LIVE TRACKING CARD */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="glass-panel p-4 flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-full bg-info/20 flex items-center justify-center">
                📍
              </div>

              <div className="flex-1">
                <p className="text-sm font-medium">Live Tracking Active</p>
                <p className="text-xs text-muted-foreground">
                  Sharing with 2 emergency contacts
                </p>
              </div>

              {/* 🟢 LIVE DOT */}
              <motion.div
                className="w-2.5 h-2.5 rounded-full bg-green-400"

                animate={{ scale: [1, 1.4, 1], opacity: [1, 0.5, 1] }}
                transition={{ duration: 1.2, repeat: Infinity }}
              />
            </motion.div>

            {/* ❌ CANCEL BUTTON */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.96 }}
              className="w-full py-3 rounded-xl bg-secondary text-sm font-medium hover:bg-secondary/80 transition"
            >
              Cancel Request
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full max-w-lg flex flex-col items-center"
          >
            {/* Hero Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-center mt-28 mb-2"
            >
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.3 }}
                className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 flex items-center justify-center"
              >
                <Zap className="text-primary" size={24} />
              </motion.div>
              <h1 className="text-4xl md:text-5xl font-bold font-display leading-tight tracking-tight">
                <span className="text-foreground">Every Second</span>
                <br />
                <span className="text-gradient-amber">Counts</span>
              </h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-muted-foreground text-sm mt-3 max-w-xs mx-auto"
              >
                AI-powered emergency response at your fingertips.
                <br />
                <span className="text-primary/70">Average response: under 4 minutes.</span>
              </motion.p>
            </motion.div>

            {/* Live stats ticker */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex items-center gap-4 mt-4 mb-8"
            >
              {liveStats.map((stat, i) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8 + i * 0.1 }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-card/40 border border-glass-border"
                  >
                    <Icon size={12} className="text-primary" />
                    <span className="text-xs font-semibold text-foreground">{stat.value}</span>
                    <span className="text-[10px] text-muted-foreground hidden sm:inline">{stat.label}</span>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* SOS Button */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
              className="flex flex-col items-center gap-3 py-4"
            >
              <SOSButton onPress={handleSOS} />
              <motion.p
                className="text-muted-foreground text-xs tracking-widest uppercase"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                Tap for instant emergency
              </motion.p>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="w-full grid grid-cols-3 gap-3 mt-6 mb-4"
            >
              {[
                { icon: PhoneCall, label: "Call 911", color: "text-emergency" },
                { icon: Users, label: "Contacts", color: "text-info" },
                { icon: Heart, label: "Health ID", color: "text-success" },
              ].map((action, i) => {
                const Icon = action.icon;
                return (
                  <motion.button
                    key={action.label}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 + i * 0.1 }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="glass-panel flex flex-col items-center gap-2 py-4 px-2 cursor-pointer hover:border-primary/30 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-xl bg-card/80 border border-glass-border flex items-center justify-center">
                      <Icon size={18} className={action.color} />
                    </div>
                    <span className="text-[11px] font-medium text-muted-foreground">{action.label}</span>
                  </motion.button>
                );
              })}
            </motion.div>

            {/* Advanced booking toggle */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 }}
              className="w-full"
            >
              <motion.button
                onClick={() => setIsBooking(!isBooking)}
                className="w-full glass-panel-strong py-3.5 px-5 flex items-center justify-between cursor-pointer neon-glow-amber"
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Navigation size={14} className="text-primary" />
                  </div>
                  <div className="text-left">
                    <span className="text-sm font-semibold block">Advanced Booking</span>
                    <span className="text-[10px] text-muted-foreground">Choose type, location & hospital</span>
                  </div>
                </div>
                <motion.div animate={{ rotate: isBooking ? 180 : 0 }} transition={{ type: "spring", stiffness: 300 }}>
                  <ChevronUp size={18} className="text-primary" />
                </motion.div>
              </motion.button>

              <AnimatePresence>
                {isBooking && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="overflow-hidden"
                  >
                    <div className="space-y-4 pt-4">
                      {/* Emergency type chips */}
                      <div>
                        <p className="text-xs text-muted-foreground mb-2 uppercase tracking-wider font-medium">Emergency Type</p>
                        <div className="flex flex-wrap gap-2">
                          {emergencyTypes.map((type) => {
                            const Icon = type.icon;
                            const isSelected = selectedType === type.id;
                            return (
                              <motion.button
                                key={type.id}
                                onClick={() => setSelectedType(type.id)}
                                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${isSelected ? "bg-primary text-primary-foreground neon-glow-amber" : "glass-panel " + type.color
                                  }`}
                                whileTap={{ scale: 0.95 }}
                                whileHover={{ scale: 1.03 }}
                              >
                                <Icon size={14} /> {type.label}
                              </motion.button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Location */}
                      <GlassPanel className="!p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
                            <MapPin className="text-primary" size={16} />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium">Current Location</p>
                            <p className="text-xs text-muted-foreground">42 Main Street, Downtown</p>
                          </div>
                          <div className="w-2 h-2 rounded-full bg-success" />
                        </div>
                      </GlassPanel>

                      {/* ETA info */}
                      <GlassPanel className="!p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-info/10 flex items-center justify-center">
                            <Clock className="text-info" size={16} />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium">Nearest Ambulance</p>
                            <p className="text-xs text-muted-foreground">~4 min away • City General Hospital</p>
                          </div>
                        </div>
                      </GlassPanel>

                      <motion.button
                        onClick={handleSOS}
                        className="w-full py-3.5 rounded-xl bg-gradient-to-r from-primary to-amber-500 text-primary-foreground font-bold text-sm neon-glow-amber tracking-wide"
                        whileTap={{ scale: 0.97 }}
                        whileHover={{ scale: 1.01 }}
                      >
                        🚑 Request Ambulance Now
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}