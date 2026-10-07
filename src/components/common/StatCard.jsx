import React from "react";
import { Card } from "./Card";

export const StatCard = ({ title, value, subtitle, icon: Icon, color = "brand" }) => {
  const colorMap = {
    brand: "text-brand-700 dark:text-brand-300 bg-brand-50 dark:bg-brand-950/40",
    emerald: "text-sage-700 dark:text-sage-300 bg-sage-50 dark:bg-sage-700/15",
    amber: "text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/30",
    rose: "text-rose-700 dark:text-rose-300 bg-rose-50 dark:bg-rose-950/30",
    sage: "text-sage-700 dark:text-sage-300 bg-sage-50 dark:bg-sage-700/15",
  };

  return (
    <Card className="min-h-[126px]">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="muted-label">{title}</p>
          <h3 className="mt-2 text-2xl font-black tracking-[-0.035em] text-stone-900 dark:text-stone-50">{value}</h3>
          {subtitle && <p className="mt-1 text-[11px] leading-5 text-stone-500 dark:text-stone-400">{subtitle}</p>}
        </div>
        {Icon && (
          <div className={`shrink-0 rounded-2xl p-3 ${colorMap[color] || colorMap.brand}`}>
            <Icon className="h-5 w-5" />
          </div>
        )}
      </div>
    </Card>
  );
};
