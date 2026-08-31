"use client";
import React, { createContext, useContext, useState } from "react";

interface SidebarContextType {
  isOpen: boolean;       // mobile overlay open
  collapsed: boolean;    // desktop collapsed (icon-only)
  toggle: () => void;    // mobile toggle
  close: () => void;     // mobile close
  toggleCollapse: () => void; // desktop collapse toggle
}

const SidebarContext = createContext<SidebarContextType>({
  isOpen: false,
  collapsed: false,
  toggle: () => {},
  close: () => {},
  toggleCollapse: () => {},
});

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  return (
    <SidebarContext.Provider
      value={{
        isOpen,
        collapsed,
        toggle: () => setIsOpen((v) => !v),
        close: () => setIsOpen(false),
        toggleCollapse: () => setCollapsed((v) => !v),
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  return useContext(SidebarContext);
}
