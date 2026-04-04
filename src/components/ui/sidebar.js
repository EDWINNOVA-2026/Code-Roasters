"use client";

import * as React from "react";
import { PanelLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

// Context
const SidebarContext = React.createContext();

// Hook
export function useSidebar() {
  return React.useContext(SidebarContext);
}

// Provider
export function SidebarProvider({ children }) {
  const [open, setOpen] = React.useState(true);

  const toggleSidebar = () => setOpen((prev) => !prev);

  return (
    <SidebarContext.Provider value={{ open, toggleSidebar }}>
      <div className="flex w-full">{children}</div>
    </SidebarContext.Provider>
  );
}

// Sidebar
export function Sidebar({ children }) {
  const { open } = useSidebar();

  return (
    <div
      className={cn(
        "bg-gray-100 h-screen transition-all",
        open ? "w-64" : "w-16"
      )}
    >
      {children}
    </div>
  );
}

// Trigger button
export function SidebarTrigger() {
  const { toggleSidebar } = useSidebar();

  return (
    <Button variant="ghost" size="icon" onClick={toggleSidebar}>
      <PanelLeft />
    </Button>
  );
}

// Content
export function SidebarContent({ children }) {
  return <div className="p-4">{children}</div>;
}

// Menu
export function SidebarMenu({ children }) {
  return <ul className="space-y-2">{children}</ul>;
}

// Menu Item
export function SidebarMenuItem({ children }) {
  return <li>{children}</li>;
}

// Button inside menu
export function SidebarMenuButton({ children }) {
  return (
    <button className="w-full text-left px-3 py-2 rounded hover:bg-gray-200">
      {children}
    </button>
  );
}

// Main content
export function SidebarInset({ children }) {
  return <div className="flex-1">{children}</div>;
}