"use client";

import * as React from "react";
import * as ResizablePrimitive from "react-resizable-panels";
import { GripVertical } from "lucide-react";

import { cn } from "@/lib/utils";

// Panel Group
export function ResizablePanelGroup({ className, ...props }) {
  return (
    <ResizablePrimitive.PanelGroup
      className={cn("flex w-full h-full", className)}
      {...props}
    />
  );
}

// Panel
export const ResizablePanel = ResizablePrimitive.Panel;

// Handle (drag line)
export function ResizableHandle({ withHandle, className, ...props }) {
  return (
    <ResizablePrimitive.PanelResizeHandle
      className={cn(
        "relative w-1 bg-gray-300 flex items-center justify-center",
        className
      )}
      {...props}
    >
      {withHandle && (
        <div className="flex items-center justify-center">
          <GripVertical className="w-3 h-3" />
        </div>
      )}
    </ResizablePrimitive.PanelResizeHandle>
  );
}