"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Power,
  Navigation,
  DollarSign,
  Clock,
  MapPin,
  ChevronRight,
  Star,
} from "lucide-react";

import GlassPanel from "@/components/common/glass-panel";
import StatCard from "@/components/common/stat-card";

// Mock data
const mockRequests = [
  {
    id: 1,
    type: "Cardiac Arrest",
    distance: "0.8 km",
    eta: "2 min",
    severity: "critical",
    address: "142 Oak Avenue",
  },
  {
    id: 2,
    type: "Accident",
    distance: "1.5 km",
    eta: "4 min",
    severity: "high",
    address: "Highway 7, Exit 3",
  },
];

export default function DriverPage() {
  const [isOnline, setIsOnline] = useState(false);
  const [activeRequest, setActiveRequest] = useState(null);
  const [showHistory, setShowHistory] = useState(false);

  return (
    <div className="relative z-10 min-h-screen pt-24 pb-8 px-4 max-w-2xl mx-auto">

      {/* Online toggle */}
      <GlassPanel
        glow={isOnline ? "amber" : "none"}
        className="flex items-center justify-between mb-6"
      >
        <div className="flex items-center gap-3">
          <motion.div
            className={`w-3 h-3 rounded-full ${
              isOnline ? "bg-success" : "bg-muted-foreground"
            }`}
            animate={isOnline ? { scale: [1, 1.3, 1] } : {}}
            transition={{ duration: 1.5, repeat: Infinity }}
          />

          <div>
            <p className="font-semibold font-display">
              {isOnline ? "Online" : "Offline"}
            </p>
            <p className="text-xs text-muted-foreground">
              {isOnline ? "Accepting requests" : "Go online to start"}
            </p>
          </div>
        </div>

        <motion.button
          onClick={() => setIsOnline(!isOnline)}
          className={`p-3 rounded-xl ${
            isOnline
              ? "bg-primary text-primary-foreground"
              : "bg-secondary text-secondary-foreground"
          }`}
          whileTap={{ scale: 0.9 }}
        >
          <Power size={20} />
        </motion.button>
      </GlassPanel>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <StatCard icon={DollarSign} label="Today's Earnings" value="$284" trend="+12%" color="green" />
        <StatCard icon={Navigation} label="Rides Today" value="7" color="blue" />
        <StatCard icon={Clock} label="Avg Response" value="3.2m" color="amber" />
        <StatCard icon={Star} label="Rating" value="4.9" trend="⭐" color="amber" />
      </div>

      {/* Incoming Requests */}
      <AnimatePresence>
        {isOnline && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-3 mb-6"
          >
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
              Incoming Requests
            </h3>

            {mockRequests.map((req, i) => (
              <motion.div
                key={req.id}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.15 }}
              >
                <GlassPanel
                  glow={req.severity === "critical" ? "red" : "none"}
                  className="cursor-pointer"
                  onClick={() => setActiveRequest(req.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          className={`w-2 h-2 rounded-full ${
                            req.severity === "critical"
                              ? "bg-critical"
                              : "bg-high"
                          }`}
                        />
                        <p className="font-semibold text-sm">{req.type}</p>
                      </div>

                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <MapPin size={12} />
                          {req.address}
                        </span>
                        <span>{req.distance}</span>
                        <span>ETA {req.eta}</span>
                      </div>
                    </div>

                    <motion.div
                      className="px-4 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-bold"
                      whileTap={{ scale: 0.9 }}
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      Accept
                    </motion.div>
                  </div>
                </GlassPanel>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* History */}
      <div>
        <button
          onClick={() => setShowHistory(!showHistory)}
          className="flex items-center gap-2 text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3"
        >
          Recent Rides
          <motion.div animate={{ rotate: showHistory ? 90 : 0 }}>
            <ChevronRight size={14} />
          </motion.div>
        </button>

        <AnimatePresence>
          {showHistory && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden space-y-2"
            >
              {[
                { time: "2:30 PM", type: "Medical Emergency", earned: "$42" },
                { time: "11:15 AM", type: "Accident Response", earned: "$38" },
                { time: "9:00 AM", type: "Patient Transfer", earned: "$55" },
              ].map((ride, i) => (
                <GlassPanel key={i}>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm font-medium">{ride.type}</p>
                      <p className="text-xs text-muted-foreground">{ride.time}</p>
                    </div>
                    <span className="text-success font-semibold text-sm">
                      {ride.earned}
                    </span>
                  </div>
                </GlassPanel>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}