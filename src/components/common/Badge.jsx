import React from 'react';

export const Badge = ({
  children,
  variant = 'default',
  size = 'md',
  className = '',
  dot = false,
}) => {
  const sizes = {
    sm: 'text-[10px] px-2 py-0.5 font-medium',
    md: 'text-xs px-2.5 py-1 font-semibold',
    lg: 'text-sm px-3 py-1.5 font-semibold',
  };

  const variants = {
    default: 'bg-slate-800 text-slate-300 border border-slate-700/60',
    primary: 'bg-blue-500/15 text-blue-400 border border-blue-500/30',
    electric: 'bg-sky-500/15 text-sky-300 border border-sky-400/30 shadow-sm shadow-sky-500/20',
    success: 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30',
    warning: 'bg-amber-500/15 text-amber-400 border border-amber-500/30',
    danger: 'bg-rose-500/15 text-rose-400 border border-rose-500/30',
    purple: 'bg-purple-500/15 text-purple-300 border border-purple-500/30',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full select-none ${sizes[size]} ${variants[variant]} ${className}`}
    >
      {dot && (
        <span
          className={`w-1.5 h-1.5 rounded-full ${
            variant === 'success'
              ? 'bg-emerald-400'
              : variant === 'danger'
              ? 'bg-rose-400'
              : variant === 'warning'
              ? 'bg-amber-400'
              : variant === 'primary' || variant === 'electric'
              ? 'bg-sky-400'
              : 'bg-slate-400'
          }`}
        />
      )}
      {children}
    </span>
  );
};
