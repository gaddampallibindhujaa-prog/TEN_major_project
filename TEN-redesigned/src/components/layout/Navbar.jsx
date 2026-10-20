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

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-stone-200/80 dark:border-stone-700 bg-[#fffdf9]/90 dark:bg-[#252722]/90 backdrop-blur-xl">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 h-[68px] flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="relative w-10 h-10 rounded-2xl bg-brand-600 flex items-center justify-center text-white shadow-[0_8px_18px_rgba(196,84,56,.22)] group-hover:-rotate-2 transition-transform">
            <ClipboardCheck className="w-5 h-5" />
          </div>
          <div>
            <span className="font-extrabold text-[17px] tracking-[-0.02em] text-stone-900 dark:text-stone-50">
              Code<span className="text-brand-600 dark:text-brand-400">Judge</span>
            </span>
            <span className="hidden sm:block text-[9px] uppercase tracking-[0.18em] text-stone-400 font-bold">
              assessment workspace
            </span>
          </div>
        </Link>

        {role === "public" && (
          <nav className="hidden md:flex items-center gap-7 text-sm font-semibold text-stone-500 dark:text-stone-300">
            <Link to="/" className="hover:text-brand-600 transition-colors">Home</Link>
            <a href="#features" className="hover:text-brand-600 transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-brand-600 transition-colors">How it works</a>
            <a href="#categories" className="hover:text-brand-600 transition-colors">Domains</a>
          </nav>
        )}

        <div className="flex items-center gap-2.5">
          <button
            onClick={toggleTheme}
            className="w-9 h-9 rounded-xl flex items-center justify-center text-stone-500 hover:text-brand-600 hover:bg-brand-50 dark:hover:bg-stone-800 transition-colors"
            title="Toggle theme"
          >
            {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {user ? (
            <div className="flex items-center gap-3 border-l border-stone-200 dark:border-stone-700 pl-3 ml-1">
              {role === "candidate" && (
                <Link to="/candidate/notifications" className="relative w-9 h-9 rounded-xl flex items-center justify-center text-stone-500 hover:bg-stone-100 dark:hover:bg-stone-800">
                  <Bell className="w-4 h-4" />
                  <span className="w-2 h-2 rounded-full bg-brand-500 absolute top-2 right-2 ring-2 ring-[#fffdf9] dark:ring-[#252722]" />
                </Link>
              )}
              <div className="flex items-center gap-2">
                <Avatar name={user.fullName || "User"} size="sm" />
                <span className="hidden md:inline text-xs font-bold text-stone-700 dark:text-stone-200">{user.fullName}</span>
              </div>
              <button onClick={handleLogout} className="w-9 h-9 rounded-xl flex items-center justify-center text-stone-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors" title="Logout">
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/login" className="hidden sm:block px-3 py-2 text-xs font-bold text-stone-600 dark:text-stone-200 hover:text-brand-600 transition-colors">
                Sign in
              </Link>
              <Link to="/register" className="px-4 py-2.5 text-xs font-bold bg-brand-600 hover:bg-brand-700 text-white rounded-xl shadow-[0_7px_16px_rgba(196,84,56,.20)] transition-all">
                Get started
              </Link>
              <Link to="/admin/login" className="w-9 h-9 rounded-xl flex items-center justify-center text-stone-400 hover:text-brand-600 hover:bg-brand-50 dark:hover:bg-stone-800 transition-colors" title="Admin Portal">
                <Shield className="w-4 h-4" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
