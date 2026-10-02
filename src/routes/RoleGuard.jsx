import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { ShieldAlert, ArrowLeft, Home } from 'lucide-react';
import { Button } from '../components/common/Button';

export const RoleGuard = ({ allowedRoles = [], children }) => {
  const { role, user } = useAuth();

  // Authority Hierarchy:
  // ADMIN has full authority across ALL modules (Admin, Faculty, Committee, Student)
  // FACULTY has full Faculty authority + ALL Committee authority
  // MANAGEMENT_COMMITTEE has Committee authority
  // STUDENT has Student self-service authority
  const hasAccess = () => {
    if (!role) return false;
    if (role === 'ADMIN') return true;
    if (allowedRoles.includes(role)) return true;
    if (role === 'FACULTY' && allowedRoles.includes('MANAGEMENT_COMMITTEE')) return true;
    return false;
  };

  if (!hasAccess()) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
        <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 mb-5 shadow-xl">
          <ShieldAlert className="w-12 h-12" />
        </div>
        <h2 className="text-2xl font-black text-white tracking-tight">Access Restricted (403)</h2>
        <p className="text-sm text-slate-400 max-w-md mt-2 leading-relaxed">
          Your current authenticated role <span className="font-mono text-rose-400 font-bold">[{role || 'GUEST'}]</span> does not hold clearance for this module.
        </p>

        <div className="bg-navy-900/80 rounded-xl p-4 border border-slate-800 text-xs text-left max-w-sm w-full my-6 space-y-1.5">
          <div className="flex justify-between">
            <span className="text-slate-400">Authenticated User:</span>
            <span className="text-slate-200 font-medium">{user?.name || 'Anonymous'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Required Role:</span>
            <span className="text-sky-400 font-bold font-mono">{allowedRoles.join(' or ')}</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="secondary"
            size="md"
            icon={ArrowLeft}
            onClick={() => window.history.back()}
          >
            Go Back
          </Button>
          <Link to="/">
            <Button variant="primary" size="md" icon={Home}>
              Public Portal
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return children;
};
