import React from 'react';
import { Loader2 } from 'lucide-react';

export const LoadingState = ({ message = 'Loading details...', className = '' }) => {
  return (
    <div className={`flex flex-col items-center justify-center p-12 text-center ${className}`}>
      <div className="relative flex items-center justify-center mb-4">
        <div className="w-12 h-12 rounded-full border-2 border-blue-500/20 border-t-blue-500 animate-spin" />
        <div className="absolute w-6 h-6 rounded-full border-2 border-sky-400/30 border-b-sky-400 animate-spin" style={{ animationDirection: 'reverse' }} />
      </div>
      <p className="text-sm font-medium text-slate-300 animate-pulse">{message}</p>
    </div>
  );
};
