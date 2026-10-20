import React from "react";

export const Card = ({ children, className = "", hover = false, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`bg-white/90 dark:bg-stone-900/90 border border-stone-200 dark:border-stone-700 rounded-2xl p-5 shadow-[0_8px_25px_rgba(45,42,36,0.055)] transition-all duration-200 ${
        hover
          ? "hover:-translate-y-0.5 hover:border-brand-200 dark:hover:border-brand-800 hover:shadow-[0_16px_35px_rgba(45,42,36,0.10)] cursor-pointer"
          : ""
      } ${className}`}
    >
      {children}
    </div>
  );
};
