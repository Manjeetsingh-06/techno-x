import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

export const StatCard = ({
  title,
  value,
  subtitle,
  icon: Icon,
  trend, // { value: "+12%", positive: true }
  color = 'blue', // blue, cyan, emerald, purple, amber, rose
  className = '',
}) => {
  const colorMap = {
    blue: {
      bg: 'bg-blue-500/15 text-sky-400 border-blue-400/30',
      glow: 'shadow-blue-500/15 hover:border-blue-400/50',
      accent: 'text-sky-400',
    },
    cyan: {
      bg: 'bg-sky-500/15 text-sky-300 border-sky-400/30',
      glow: 'shadow-sky-500/15 hover:border-sky-400/50',
      accent: 'text-sky-300',
    },
    emerald: {
      bg: 'bg-emerald-500/15 text-emerald-400 border-emerald-400/30',
      glow: 'shadow-emerald-500/15 hover:border-emerald-400/50',
      accent: 'text-emerald-400',
    },
    purple: {
      bg: 'bg-purple-500/15 text-purple-300 border-purple-400/30',
      glow: 'shadow-purple-500/15 hover:border-purple-400/50',
      accent: 'text-purple-300',
    },
    amber: {
      bg: 'bg-amber-500/15 text-amber-400 border-amber-400/30',
      glow: 'shadow-amber-500/15 hover:border-amber-400/50',
      accent: 'text-amber-400',
    },
    rose: {
      bg: 'bg-rose-500/15 text-rose-400 border-rose-400/30',
      glow: 'shadow-rose-500/15 hover:border-rose-400/50',
      accent: 'text-rose-400',
    },
  };

  const scheme = colorMap[color] || colorMap.blue;

  return (
    <div
      className={`glass-card-hover glass-panel-glossy p-5 rounded-2xl border border-white/10 shadow-xl transition-all duration-300 ${scheme.glow} ${className}`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-wider text-slate-300">{title}</p>
          <h3 className="text-2xl sm:text-3xl font-black text-white mt-1.5 tracking-tight drop-shadow-sm">{value}</h3>
        </div>
        {Icon && (
          <div className={`p-3 rounded-xl border backdrop-blur-md shadow-md ${scheme.bg}`}>
            {React.isValidElement(Icon) ? Icon : <Icon className="w-5 h-5" />}
          </div>
        )}
      </div>

      {(subtitle || trend) && (
        <div className="flex items-center gap-2 mt-3 pt-3 border-t border-white/10 text-xs">
          {trend && (
            <span
              className={`inline-flex items-center gap-0.5 font-bold ${
                trend.positive ? 'text-emerald-400' : 'text-rose-400'
              }`}
            >
              {trend.positive ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
              {trend.value}
            </span>
          )}
          {subtitle && <span className="text-slate-300 font-medium">{subtitle}</span>}
        </div>
      )}
    </div>
  );
};
