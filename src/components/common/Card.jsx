import React from "react";

export const Card = ({ children, className = "", hover = false, onClick }) => (
  <div
    onClick={onClick}
    className={`relative overflow-hidden rounded-2xl border border-stone-200/90 bg-white/85 p-5 shadow-[0_10px_30px_rgba(54,47,38,.055)] transition-all duration-200 dark:border-stone-700/80 dark:bg-stone-900/80 ${
      hover
        ? "cursor-pointer hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-[0_18px_38px_rgba(54,47,38,.10)] dark:hover:border-brand-700"
        : ""
    } ${className}`}
  >
    {children}
  </div>
);
