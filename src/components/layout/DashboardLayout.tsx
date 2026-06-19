import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { GlobalAnomalyToasts } from "../GlobalAnomalyToasts";
import { useState } from "react";

export function DashboardLayout() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="flex h-screen bg-[#0B0E14] overflow-hidden text-slate-200 selection:bg-indigo-500/30">
      <Sidebar isMobileMenuOpen={isMobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header setMobileMenuOpen={setMobileMenuOpen} />
        <main className="flex-1 overflow-y-auto w-full relative">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
            <Outlet />
          </div>
        </main>
      </div>
      <GlobalAnomalyToasts />
    </div>
  );
}
