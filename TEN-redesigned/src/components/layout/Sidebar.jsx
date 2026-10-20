import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard, FileCheck2, FileCode, Users, Trophy, BarChart3,
  FileSpreadsheet, Settings, History
} from "lucide-react";

export const Sidebar = ({ role = "candidate" }) => {
  const candidateLinks = [
    { label: "Overview", to: "/candidate/dashboard", icon: LayoutDashboard },
    { label: "Available Tests", to: "/candidate/tests", icon: FileCheck2 },
    { label: "Test History", to: "/candidate/history", icon: History },
    { label: "Leaderboard", to: "/candidate/leaderboard", icon: Trophy },
    { label: "Analytics", to: "/candidate/analytics", icon: BarChart3 },
    { label: "Settings", to: "/candidate/settings", icon: Settings },
  ];

  const adminLinks = [
    { label: "Overview", to: "/admin/dashboard", icon: LayoutDashboard },
    { label: "Test Management", to: "/admin/tests", icon: FileCheck2 },
    { label: "Question Bank", to: "/admin/questions", icon: FileCode },
    { label: "Candidates", to: "/admin/candidates", icon: Users },
    { label: "Results & Submissions", to: "/admin/results", icon: Trophy },
    { label: "Analytics", to: "/admin/analytics", icon: BarChart3 },
    { label: "Leaderboard", to: "/admin/leaderboard", icon: Trophy },
    { label: "Report Export", to: "/admin/reports", icon: FileSpreadsheet },
    { label: "Platform Settings", to: "/admin/settings", icon: Settings },
  ];

  const links = role === "admin" ? adminLinks : candidateLinks;

  return (
    <aside className="w-[250px] shrink-0 hidden lg:block border-r border-stone-200/80 dark:border-stone-700 bg-[#fbfaf6]/75 dark:bg-[#232520]/75 h-[calc(100vh-68px)] sticky top-[68px] p-4">
      <div className="px-3 pt-2 pb-3">
        <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-stone-400">
          {role === "admin" ? "Management" : "Workspace"}
        </p>
      </div>
      <nav className="space-y-1">
        {links.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `group flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm transition-all ${
                  isActive
                    ? "bg-brand-50 dark:bg-brand-950/35 text-brand-700 dark:text-brand-300 font-bold shadow-sm"
                    : "text-stone-500 dark:text-stone-400 hover:bg-stone-100/80 dark:hover:bg-stone-800/70 hover:text-stone-800 dark:hover:text-stone-100 font-medium"
                }`
              }
            >
              <Icon className="w-[17px] h-[17px] shrink-0" />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      <div className="mt-8 mx-2 p-4 rounded-2xl bg-sage-50 dark:bg-sage-700/10 border border-sage-100 dark:border-sage-700/30">
        <p className="text-xs font-bold text-sage-700 dark:text-sage-300">Stay focused</p>
        <p className="text-[11px] leading-relaxed text-sage-600 dark:text-sage-400 mt-1">
          Keep your assessments organized and your progress visible.
        </p>
      </div>
    </aside>
  );
};
