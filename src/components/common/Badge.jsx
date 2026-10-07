import React from "react";

export const Badge = ({ children, variant = "default", className = "" }) => {
  const styles = {
    default: "bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-700",
    success: "bg-sage-50 dark:bg-sage-700/15 text-sage-700 dark:text-sage-300 border border-sage-100 dark:border-sage-700/40",
    danger: "bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-400 border border-rose-200 dark:border-rose-800/60",
    warning: "bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800/60",
    brand: "bg-brand-50 dark:bg-brand-950/40 text-brand-700 dark:text-brand-300 border border-brand-200 dark:border-brand-800/60",
    purple: "bg-brand-50 dark:bg-brand-950/40 text-brand-700 dark:text-brand-300 border border-brand-200 dark:border-brand-800/60",
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-extrabold tracking-wide ${styles[variant] || styles.default} ${className}`}>
      {children}
    </span>
  );
};
