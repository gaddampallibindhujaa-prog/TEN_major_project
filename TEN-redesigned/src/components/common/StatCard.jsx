import React from "react";
import { Card } from "./Card";

export const StatCard = ({ title, value, subtitle, icon: Icon, color = "brand" }) => {
  const colorMap = {
    brand: "text-brand-700 dark:text-brand-300 bg-brand-50 dark:bg-brand-950/40",
    emerald: "text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40",
    amber: "text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/40",
    rose: "text-rose-700 dark:text-rose-300 bg-rose-50 dark:bg-rose-950/40",
    sage: "text-sage-700 dark:text-sage-300 bg-sage-50 dark:bg-sage-950/30",
  };

  return (
    <Card>
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-[11px] font-bold text-stone-500 dark:text-stone-400 uppercase tracking-[0.13em]">
            {title}
          </p>
          <h3 className="text-2xl font-bold text-stone-900 dark:text-stone-50 mt-1 tracking-tight">{value}</h3>
          {subtitle && <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">{subtitle}</p>}
        </div>
        {Icon && (
          <div className={`p-3 rounded-2xl ${colorMap[color] || colorMap.brand}`}>
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>
    </Card>
  );
};
