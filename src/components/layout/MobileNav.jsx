import React from "react";
import { NavLink } from "react-router-dom";
import { LayoutDashboard, FileCheck2, Trophy, BarChart3, Settings } from "lucide-react";

export const MobileNav = ({ role = "candidate" }) => {
  const links = role === "admin"
    ? [
        { label: "Dashboard", to: "/admin/dashboard", icon: LayoutDashboard },
        { label: "Tests", to: "/admin/tests", icon: FileCheck2 },
        { label: "Results", to: "/admin/results", icon: Trophy },
        { label: "Analytics", to: "/admin/analytics", icon: BarChart3 },
        { label: "Settings", to: "/admin/settings", icon: Settings },
      ]
    : [
        { label: "Dashboard", to: "/candidate/dashboard", icon: LayoutDashboard },
        { label: "Tests", to: "/candidate/tests", icon: FileCheck2 },
        { label: "Leaderboard", to: "/candidate/leaderboard", icon: Trophy },
        { label: "Analytics", to: "/candidate/analytics", icon: BarChart3 },
        { label: "Settings", to: "/candidate/settings", icon: Settings },
      ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 flex justify-around border-t border-stone-200 bg-[#fffdf8]/95 px-2 py-1.5 shadow-[0_-8px_25px_rgba(54,47,38,.07)] backdrop-blur-xl dark:border-stone-700 dark:bg-stone-900/95 lg:hidden">
      {links.map((item) => {
        const Icon = item.icon;
        return <NavLink key={item.to} to={item.to} className={({ isActive }) => `flex min-w-[58px] flex-col items-center rounded-xl px-2 py-1 text-[10px] transition-all ${isActive ? "bg-brand-50 font-bold text-brand-600 dark:bg-brand-950/30 dark:text-brand-400" : "font-medium text-stone-400"}`}><Icon className="mb-0.5 h-5 w-5" /><span>{item.label}</span></NavLink>;
      })}
    </div>
  );
};
