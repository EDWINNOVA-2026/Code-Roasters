"use client";

import { motion } from "framer-motion";
import {
  BarChart3,
  Ambulance,
  Building2,
  Users,
  Clock,
  AlertTriangle,
  TrendingUp,
  Activity,
} from "lucide-react";

import GlassPanel from "@/components/common/glass-panel";
import StatCard from "@/components/common/stat-card";

// Data
const recentBookings = [
  {
    id: "B-2041",
    patient: "John D.",
    driver: "AMB-247",
    hospital: "City General",
    severity: "critical",
    status: "Completed",
    time: "2:35 PM",
  },
  {
    id: "B-2040",
    patient: "Maria S.",
    driver: "AMB-112",
    hospital: "St. Mary's",
    severity: "high",
    status: "In Progress",
    time: "2:20 PM",
  },
  {
    id: "B-2039",
    patient: "Alex R.",
    driver: "AMB-089",
    hospital: "City General",
    severity: "medium",
    status: "Completed",
    time: "1:45 PM",
  },
  {
    id: "B-2038",
    patient: "Lisa K.",
    driver: "AMB-305",
    hospital: "Metro Health",
    severity: "low",
    status: "Completed",
    time: "12:30 PM",
  },
];

// Color mapping
const severityColor = {
  critical: "text-critical",
  high: "text-high",
  medium: "text-medium",
  low: "text-low",
};

export default function AdminPage() {
  return (
    <div className="relative z-10 min-h-screen pt-24 pb-8 px-4 max-w-6xl mx-auto">
      
      {/* Header */}
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl font-bold font-display mb-6"
      >
        System <span className="text-gradient-amber">Control Panel</span>
      </motion.h1>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <StatCard icon={BarChart3} label="Total Rides Today" value="142" trend="+18%" color="amber" />
        <StatCard icon={Clock} label="Avg Response Time" value="3.8m" trend="-0.5m" color="blue" />
        <StatCard icon={AlertTriangle} label="Critical Cases" value="12" color="red" />
        <StatCard icon={TrendingUp} label="Success Rate" value="98.2%" trend="+1.2%" color="green" />
      </div>

      {/* Secondary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
        <StatCard icon={Ambulance} label="Active Drivers" value="24/31" color="blue" />
        <StatCard icon={Building2} label="Partner Hospitals" value="8" color="green" />
        <StatCard icon={Users} label="Users Today" value="89" color="amber" />
      </div>

      {/* Chart */}
      <GlassPanel className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold font-display flex items-center gap-2">
            <Activity size={16} className="text-primary" /> Live Activity
          </h3>

          <div className="flex gap-2">
            {["1H", "6H", "24H"].map((t) => (
              <button
                key={t}
                className="px-3 py-1 rounded-lg text-xs font-medium bg-secondary text-secondary-foreground hover:bg-accent transition-colors"
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="h-32 flex items-end gap-1">
          {Array.from({ length: 24 }).map((_, i) => {
            const h = 20 + Math.random() * 80;

            return (
              <motion.div
                key={i}
                initial={{ height: 0 }}
                animate={{ height: `${h}%` }}
                transition={{ delay: i * 0.03 }}
                className="flex-1 bg-gradient-to-t from-primary/60 to-primary/20 rounded-t-sm"
              />
            );
          })}
        </div>
      </GlassPanel>

      {/* Table */}
      <GlassPanel>
        <h3 className="font-semibold font-display mb-4">Recent Bookings</h3>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-muted-foreground text-xs uppercase tracking-wider">
                <th className="text-left pb-3">ID</th>
                <th className="text-left pb-3">Patient</th>
                <th className="text-left pb-3">Driver</th>
                <th className="text-left pb-3">Hospital</th>
                <th className="text-left pb-3">Severity</th>
                <th className="text-left pb-3">Status</th>
                <th className="text-left pb-3">Time</th>
              </tr>
            </thead>

            <tbody>
              {recentBookings.map((b, i) => (
                <motion.tr
                  key={b.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="border-b border-border/50"
                >
                  <td className="py-3 font-mono text-muted-foreground">{b.id}</td>
                  <td className="py-3">{b.patient}</td>
                  <td className="py-3 text-muted-foreground">{b.driver}</td>
                  <td className="py-3 text-muted-foreground">{b.hospital}</td>

                  <td className="py-3">
                    <span className={`font-semibold capitalize ${severityColor[b.severity]}`}>
                      {b.severity}
                    </span>
                  </td>

                  <td className="py-3">
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        b.status === "Completed"
                          ? "bg-success/20 text-success"
                          : "bg-primary/20 text-primary"
                      }`}
                    >
                      {b.status}
                    </span>
                  </td>

                  <td className="py-3 text-muted-foreground">{b.time}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassPanel>
    </div>
  );
}