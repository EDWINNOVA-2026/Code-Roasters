"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Activity,
  Bed,
  Users,
  AlertTriangle,
  Clock,
  ChevronRight,
  Stethoscope,
  Brain,
} from "lucide-react";

import GlassPanel from "@/components/common/glass-panel";
import SeverityBadge from "@/components/common/severity-badge";
import StatCard from "@/components/common/stat-card";

// Mock data
const incomingCases = [
  {
    id: 1,
    patient: "John D.",
    age: 45,
    type: "Cardiac Arrest",
    severity: "critical",
    eta: "2 min",
    driver: "AMB-247",
    notes: "CPR in progress",
  },
  {
    id: 2,
    patient: "Maria S.",
    age: 32,
    type: "Vehicle Accident",
    severity: "high",
    eta: "5 min",
    driver: "AMB-112",
    notes: "Multiple fractures suspected",
  },
  {
    id: 3,
    patient: "Alex R.",
    age: 28,
    type: "Allergic Reaction",
    severity: "medium",
    eta: "8 min",
    driver: "AMB-089",
    notes: "Epinephrine administered",
  },
];

// AI recommendations
const aiRecommendations = {
  "Cardiac Arrest": {
    prep: ["Defibrillator ready", "ICU bed standby", "Cardiac surgeon on call"],
    team: "Trauma Team Alpha",
  },
  "Vehicle Accident": {
    prep: ["Trauma bay prepared", "X-ray standby", "Blood bank notified"],
    team: "Trauma Team Beta",
  },
  "Allergic Reaction": {
    prep: ["Epinephrine ready", "Airway management", "Observation bed"],
    team: "General ER",
  },
};

export default function HospitalPage() {
  const [selectedCase, setSelectedCase] = useState(null);

  return (
    <div className="relative z-10 min-h-screen pt-24 pb-8 px-4 max-w-5xl mx-auto">

      {/* Header */}
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl font-bold font-display mb-6"
      >
        Emergency <span className="text-gradient-amber">Command Center</span>
      </motion.h1>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <StatCard icon={Activity} label="Active Cases" value="3" color="red" />
        <StatCard icon={Bed} label="ICU Available" value="4/12" color="blue" />
        <StatCard icon={Users} label="Doctors On-Call" value="8" color="green" />
        <StatCard icon={AlertTriangle} label="Critical" value="1" color="red" />
      </div>

      <div className="grid md:grid-cols-5 gap-4">

        {/* Cases */}
        <div className="md:col-span-3 space-y-3">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
            Incoming Cases
          </h3>

          {incomingCases.map((c, i) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <GlassPanel
                glow={c.severity === "critical" ? "red" : "none"}
                className={`cursor-pointer ${
                  selectedCase === c.id ? "ring-1 ring-primary" : ""
                }`}
                onClick={() => setSelectedCase(c.id)}
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="font-semibold">
                      {c.patient}{" "}
                      <span className="text-muted-foreground text-xs">
                        ({c.age}y)
                      </span>
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {c.type}
                    </p>
                  </div>

                  <SeverityBadge severity={c.severity} />
                </div>

                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Clock size={12} /> ETA {c.eta}
                  </span>
                  <span>🚑 {c.driver}</span>
                  <span className="text-foreground/60">
                    "{c.notes}"
                  </span>
                </div>
              </GlassPanel>
            </motion.div>
          ))}
        </div>

        {/* AI Panel */}
        <div className="md:col-span-2">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
            <Brain size={14} className="text-primary" /> AI Triage
          </h3>

          <AnimatePresence mode="wait">
            {selectedCase ? (
              <motion.div
                key={selectedCase}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
              >
                {(() => {
                  const c = incomingCases.find(
                    (x) => x.id === selectedCase
                  );
                  const rec = aiRecommendations[c.type];

                  return (
                    <GlassPanel glow="blue">
                      
                      {/* Header */}
                      <div className="flex items-center gap-2 mb-4">
                        <motion.div
                          className="p-2 rounded-lg bg-info/20"
                          animate={{ rotate: [0, 5, -5, 0] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          <Stethoscope className="text-info" size={18} />
                        </motion.div>

                        <div>
                          <p className="font-semibold text-sm">AI Analysis</p>
                          <p className="text-xs text-muted-foreground">
                            {c.type}
                          </p>
                        </div>
                      </div>

                      {/* Severity */}
                      <div className="mb-4">
                        <p className="text-xs text-muted-foreground mb-1">
                          Severity Assessment
                        </p>
                        <SeverityBadge severity={c.severity} />
                      </div>

                      {/* Prep */}
                      <div className="mb-4">
                        <p className="text-xs text-muted-foreground mb-2">
                          Suggested Preparation
                        </p>

                        <div className="space-y-1.5">
                          {rec.prep.map((p, i) => (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, x: 10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.15 }}
                              className="flex items-center gap-2 text-sm"
                            >
                              <ChevronRight size={12} className="text-primary" />
                              {p}
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      {/* Team */}
                      <div className="glass-panel p-3">
                        <p className="text-xs text-muted-foreground">
                          Assigned Team
                        </p>
                        <p className="text-sm font-semibold text-info">
                          {rec.team}
                        </p>
                      </div>
                    </GlassPanel>
                  );
                })()}
              </motion.div>
            ) : (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <GlassPanel className="flex flex-col items-center justify-center py-12 text-center">
                  <Brain size={32} className="text-muted-foreground mb-3" />
                  <p className="text-sm text-muted-foreground">
                    Select a case to view
                    <br />
                    AI triage analysis
                  </p>
                </GlassPanel>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}