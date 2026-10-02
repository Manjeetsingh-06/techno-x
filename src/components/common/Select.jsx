import React from 'react';

export const Select = ({
  label,
  options = [],
  error,
  helperText,
  id,
  className = '',
  required = false,
  ...props
}) => {
  const selectId = id || `select-${label ? label.toLowerCase().replace(/\s+/g, '-') : Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className="w-full space-y-1.5 text-left">
      {label && (
        <label htmlFor={selectId} className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
          {label} {required && <span className="text-rose-400">*</span>}
        </label>
      )}
      <div className="relative">
        <select
          id={selectId}
          required={required}
          className={`w-full rounded-lg bg-navy-900/90 text-slate-100 border transition-all duration-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 px-3.5 py-2.5 appearance-none cursor-pointer ${
            error
              ? 'border-rose-500/80 focus:border-rose-500'
              : 'border-slate-700/80 hover:border-slate-600 focus:border-blue-500'
          } ${className}`}
          {...props}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} className="bg-navy-900 text-slate-100 py-1">
              {opt.label}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-400">
          <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
            <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
          </svg>
        </div>
      </div>
      {error ? (
        <p className="text-xs text-rose-400 font-medium tracking-tight mt-1">{error}</p>
      ) : helperText ? (
        <p className="text-xs text-slate-400 mt-1">{helperText}</p>
      ) : null}
    </div>
  );
};
