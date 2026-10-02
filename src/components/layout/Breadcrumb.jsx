import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export const Breadcrumb = ({ items = [] }) => {
  const location = useLocation();

  let breadcrumbs = items;

  if (breadcrumbs.length === 0) {
    const pathParts = location.pathname.split('/').filter(Boolean);
    breadcrumbs = pathParts.map((part, index) => {
      const url = `/${pathParts.slice(0, index + 1).join('/')}`;
      const label = part
        .replace(/-/g, ' ')
        .replace(/\b\w/g, (c) => c.toUpperCase());
      return { label, url };
    });
  }

  if (breadcrumbs.length === 0) return null;

  return (
    <nav className="flex items-center gap-1.5 text-xs text-slate-400 mb-5 overflow-x-auto py-1">
      <Link to="/" className="text-slate-400 hover:text-slate-200 transition-colors flex items-center">
        <Home className="w-3.5 h-3.5" />
      </Link>

      {breadcrumbs.map((crumb, idx) => {
        const isLast = idx === breadcrumbs.length - 1;
        return (
          <React.Fragment key={crumb.url || idx}>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600 shrink-0" />
            {isLast ? (
              <span className="font-semibold text-sky-400 truncate max-w-[200px]">{crumb.label}</span>
            ) : (
              <Link to={crumb.url} className="hover:text-slate-200 transition-colors truncate max-w-[150px]">
                {crumb.label}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};
