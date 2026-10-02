import React from 'react';

export const ChartCard = ({
  title,
  subtitle,
  children,
  action,
  className = '',
}) => {
  return (
    <div className={`glass-panel p-5 sm:p-6 rounded-2xl border border-slate-800 shadow-xl ${className}`}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">{title}</h3>
          {subtitle && <p className="text-xs text-slate-400 mt-0.5">{subtitle}</p>}
        </div>
        {action && <div className="shrink-0">{action}</div>}
      </div>
      <div className="w-full">{children}</div>
    </div>
  );
};
