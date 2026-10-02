import React from 'react';
import { Inbox } from 'lucide-react';
import { Button } from './Button';

export const EmptyState = ({
  icon: Icon = Inbox,
  title = 'No records found',
  description = 'There are no items to display at this moment.',
  actionLabel,
  onAction,
  className = '',
}) => {
  return (
    <div className={`flex flex-col items-center justify-center p-8 sm:p-12 text-center rounded-2xl border border-dashed border-slate-800 bg-navy-900/30 ${className}`}>
      <div className="p-4 rounded-2xl bg-navy-950/80 border border-slate-800 text-blue-400 mb-4 shadow-inner flex items-center justify-center">
        {React.isValidElement(Icon) ? Icon : <Icon className="w-8 h-8 text-blue-400/80" />}
      </div>
      <h4 className="text-base font-semibold text-slate-100 mb-1.5">{title}</h4>
      <p className="text-xs sm:text-sm text-slate-400 max-w-sm mb-5 leading-relaxed">{description}</p>
      {actionLabel && onAction && (
        <Button size="sm" onClick={onAction} variant="outline">
          {actionLabel}
        </Button>
      )}
    </div>
  );
};
