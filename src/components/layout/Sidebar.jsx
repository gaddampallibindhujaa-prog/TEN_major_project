import React from "react";
import { NavLink } from "react-router-dom";
import { LayoutDashboard, FileCheck2, FileCode, Users, Trophy, BarChart3, FileSpreadsheet, Settings, History, Sparkles } from "lucide-react";

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
    <aside className="sticky top-[68px] hidden h-[calc(100vh-68px)] w-[254px] shrink-0 border-r border-stone-200/80 bg-[#faf7f0]/80 p-4 dark:border-stone-700/80 dark:bg-[#20211e]/80 lg:block">
      <div className="mb-3 px-3 pt-1">
        <p className="muted-label">{role === "admin" ? "Management" : "Workspace"}</p>
      </div>
      <nav className="space-y-1">
        {links.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink key={item.to} to={item.to} className={({ isActive }) => `group relative flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm transition-all ${isActive ? "bg-brand-50 text-brand-700 shadow-sm dark:bg-brand-950/35 dark:text-brand-300" : "font-medium text-stone-500 hover:bg-stone-100/80 hover:text-stone-800 dark:text-stone-400 dark:hover:bg-stone-800/70 dark:hover:text-stone-100"}`}>
              {({ isActive }) => (
                <>
                  {isActive && <span className="absolute left-0 top-2.5 h-5 w-0.5 rounded-full bg-brand-600" />}
                  <Icon className={`h-[17px] w-[17px] shrink-0 ${isActive ? "text-brand-600" : "text-stone-400 group-hover:text-stone-600"}`} />
                  <span className={isActive ? "font-bold" : ""}>{item.label}</span>
                </>
              )}
            </NavLink>
          );
        })}
      </nav>

      <div className="mt-8 rounded-2xl border border-sage-100 bg-sage-50/80 p-4 dark:border-sage-700/30 dark:bg-sage-700/10">
        <div className="flex items-center gap-2 text-sage-700 dark:text-sage-300"><Sparkles className="h-3.5 w-3.5" /><p className="text-xs font-bold">Stay focused</p></div>
        <p className="mt-1 text-[11px] leading-relaxed text-sage-600 dark:text-sage-400">Keep assessments organized and progress visible.</p>
      </div>
    </aside>
  );
};
