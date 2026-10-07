import React from "react";

export const DataTable = ({ columns, data, emptyMessage = "No records found", onRowClick }) => (
  <div className="overflow-x-auto rounded-2xl border border-stone-200/90 bg-white/85 shadow-sm dark:border-stone-700/80 dark:bg-stone-900/80">
    <table className="w-full min-w-[720px] border-collapse text-sm">
      <thead>
        <tr className="border-b border-stone-200/90 bg-stone-50/80 dark:border-stone-700 dark:bg-stone-800/40">
          {columns.map((col, index) => (
            <th key={index} className={`px-4 py-3.5 text-left text-[10px] font-extrabold uppercase tracking-[0.12em] text-stone-400 dark:text-stone-500 ${col.className || ""}`}>
              {col.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="divide-y divide-stone-100 dark:divide-stone-800">
        {data && data.length > 0 ? data.map((row, rIdx) => (
          <tr
            key={row.id || rIdx}
            onClick={onRowClick ? () => onRowClick(row) : undefined}
            className={`transition-colors hover:bg-brand-50/30 dark:hover:bg-brand-950/10 ${onRowClick ? "cursor-pointer" : ""}`}
          >
            {columns.map((col, cIdx) => (
              <td key={cIdx} className={`px-4 py-3.5 text-stone-700 dark:text-stone-200 ${col.className || ""}`}>
                {col.accessor ? (typeof col.accessor === "function" ? col.accessor(row) : row[col.accessor]) : null}
              </td>
            ))}
          </tr>
        )) : (
          <tr><td colSpan={columns.length} className="px-4 py-12 text-center text-xs text-stone-400">{emptyMessage}</td></tr>
        )}
      </tbody>
    </table>
  </div>
);
