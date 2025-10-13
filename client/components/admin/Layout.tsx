"use client";
import React, { useState } from "react";
import { Sidebar } from "./Sidebar";
import { Navbar } from "./Navbar";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main content */}
     <div className="flex flex-1 flex-col overflow-visible">
  <Navbar onMenuClick={() => setSidebarOpen(true)} />
  <main className="flex-1 overflow-y-auto p-6">{children}</main>
</div>

    </div>
  );
}
