import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import { Sun, Moon, LogOut, ClipboardCheck, Bell, Shield } from "lucide-react";
import { Avatar } from "../common/Avatar";

export const Navbar = ({ role = "public" }) => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const handleLogout = () => { logout(); navigate("/"); };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-stone-200/80 bg-[#fffdf8]/90 backdrop-blur-xl dark:border-stone-700/80 dark:bg-[#242522]/90">
      <div className="mx-auto flex h-[68px] max-w-[1450px] items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="group flex items-center gap-3">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-brand-600 text-white shadow-[0_8px_18px_rgba(196,93,61,.22)] transition-transform group-hover:-rotate-3"><ClipboardCheck className="h-5 w-5" /></div>
          <div><span className="block text-[17px] font-black tracking-[-.025em] text-stone-900 dark:text-stone-50">Code<span className="text-brand-600 dark:text-brand-400">Judge</span></span><span className="hidden text-[9px] font-bold uppercase tracking-[.18em] text-stone-400 sm:block">assessment workspace</span></div>
        </Link>

        {role === "public" && <nav className="hidden items-center gap-7 text-xs font-bold text-stone-500 md:flex"><Link to="/" className="hover:text-brand-600">Home</Link><a href="#features" className="hover:text-brand-600">Features</a><a href="#how-it-works" className="hover:text-brand-600">How it works</a><a href="#categories" className="hover:text-brand-600">Domains</a></nav>}

        <div className="flex items-center gap-2">
          <button onClick={toggleTheme} className="focus-ring flex h-9 w-9 items-center justify-center rounded-xl text-stone-500 transition-colors hover:bg-brand-50 hover:text-brand-600 dark:hover:bg-stone-800" title="Toggle theme">{theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}</button>
          {user ? <div className="ml-1 flex items-center gap-2 border-l border-stone-200 pl-3 dark:border-stone-700">
            {role === "candidate" && <Link to="/candidate/notifications" className="focus-ring relative flex h-9 w-9 items-center justify-center rounded-xl text-stone-500 hover:bg-stone-100 dark:hover:bg-stone-800"><Bell className="h-4 w-4" /><span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-brand-500 ring-2 ring-[#fffdf8] dark:ring-[#242522]" /></Link>}
            <div className="flex items-center gap-2"><Avatar name={user.fullName || "User"} size="sm" /><span className="hidden max-w-[150px] truncate text-xs font-bold text-stone-700 dark:text-stone-200 md:inline">{user.fullName}</span></div>
            <button onClick={handleLogout} className="focus-ring flex h-9 w-9 items-center justify-center rounded-xl text-stone-400 hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-950/30" title="Logout"><LogOut className="h-4 w-4" /></button>
          </div> : <div className="flex items-center gap-1.5"><Link to="/login" className="hidden px-3 py-2 text-xs font-bold text-stone-600 hover:text-brand-600 dark:text-stone-200 sm:block">Sign in</Link><Link to="/register" className="rounded-xl bg-brand-600 px-4 py-2.5 text-xs font-bold text-white shadow-[0_7px_16px_rgba(196,93,61,.20)] transition-all hover:-translate-y-px hover:bg-brand-700">Get started</Link><Link to="/admin/login" className="focus-ring flex h-9 w-9 items-center justify-center rounded-xl text-stone-400 hover:bg-brand-50 hover:text-brand-600 dark:hover:bg-stone-800" title="Admin Portal"><Shield className="h-4 w-4" /></Link></div>}
        </div>
      </div>
    </header>
  );
};
