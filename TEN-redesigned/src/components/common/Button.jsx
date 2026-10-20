import React from "react";

export const Button = ({
  children,
  variant = "primary",
  size = "md",
  disabled = false,
  isLoading = false,
  onClick,
  type = "button",
  className = "",
  icon: Icon,
}) => {
  const baseStyles =
    "inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none active:scale-[0.98]";

  const sizeStyles = {
    sm: "px-3 py-1.5 text-xs gap-1.5",
    md: "px-4 py-2.5 text-sm gap-2",
    lg: "px-5 py-3 text-base gap-2.5",
  };

  const variantStyles = {
    primary:
      "bg-brand-600 hover:bg-brand-700 text-white shadow-[0_8px_20px_rgba(196,84,56,0.22)] focus:ring-brand-500",
    secondary:
      "bg-white dark:bg-stone-800 hover:bg-stone-50 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-100 border border-stone-200 dark:border-stone-600 focus:ring-brand-500",
    danger:
      "bg-rose-600 hover:bg-rose-700 text-white shadow-sm focus:ring-rose-500",
    outline:
      "bg-transparent hover:bg-brand-50 dark:hover:bg-brand-950/30 text-brand-700 dark:text-brand-300 border border-brand-300 dark:border-brand-700 focus:ring-brand-500",
    ghost:
      "bg-transparent hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-600 dark:text-stone-300 focus:ring-stone-400",
  };

  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      onClick={onClick}
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
    >
      {isLoading ? (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      ) : Icon ? (
        <Icon className="w-4 h-4" />
      ) : null}
      {children}
    </button>
  );
};
