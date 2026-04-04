"use client";

import * as React from "react";
import {
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

import { cn } from "@/lib/utils";

// Container
export function ChartContainer({ className, children }) {
  return (
    <div className={cn("w-full h-[300px]", className)}>
      <ResponsiveContainer width="100%" height="100%">
        {children}
      </ResponsiveContainer>
    </div>
  );
}

// Tooltip
export function ChartTooltipContent({ active, payload }) {
  if (!active || !payload?.length) return null;

  return (
    <div className="bg-white border p-2 rounded shadow">
      {payload.map((item, i) => (
        <div key={i} className="text-sm">
          {item.name}: {item.value}
        </div>
      ))}
    </div>
  );
}

export const ChartTooltip = Tooltip;
export const ChartLegend = Legend;