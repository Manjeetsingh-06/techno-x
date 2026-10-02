import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Shield, Sparkles, ChevronUp, ChevronDown, Check, UserCheck } from 'lucide-react';

export const DemoRoleSwitcher = () => {
  const { user, role, switchDemoRole, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const roles = [
    { key: 'ADMIN', label: 'Admin', name: 'Dr. Rajeshwar Sen', path: '/admin/dashboard', color: 'border-purple-500/50 text-purple-400 bg-purple-500/10' },
    { key: 'FACULTY', label: 'Faculty', name: 'Prof. Ananya Banerjee', path: '/faculty/dashboard', color: 'border-blue-500/50 text-blue-400 bg-blue-500/10' },
    { key: 'MANAGEMENT_COMMITTEE', label: 'Committee', name: 'Vikramaditya Roy', path: '/committee/dashboard', color: 'border-amber-500/50 text-amber-400 bg-amber-500/10' },
    { key: 'STUDENT', label: 'Student', name: 'Aarav Sharma (BCA)', path: '/student/dashboard', color: 'border-emerald-500/50 text-emerald-400 bg-emerald-500/10' },
  ];

  const handleSwitch = async (r) => {
    await switchDemoRole(r.key);
    navigate(r.path);
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-4 left-4 z-40 print:hidden font-sans">
      <div className="relative">
        {/* Toggle Pill */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-3 py-2 rounded-full glass-panel border border-sky-400/40 shadow-xl shadow-sky-950/40 text-xs font-semibold text-slate-100 hover:border-sky-300 transition-all hover:scale-105 active:scale-95"
        >
          <Sparkles className="w-3.5 h-3.5 text-sky-400 animate-pulse" />
          <span className="text-[11px] text-slate-300">Demo Role:</span>
          <span className="text-sky-300 font-bold tracking-wide">
            {role ? role.replace('_', ' ') : 'GUEST'}
          </span>
          {isOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
        </button>

        {/* Dropup Menu */}
        {isOpen && (
          <div className="absolute bottom-12 left-0 w-72 rounded-2xl glass-panel border border-slate-700/80 shadow-2xl p-3 space-y-1.5 animate-in slide-in-from-bottom-2 duration-150">
            <div className="flex items-center justify-between px-2 py-1 text-[11px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-800">
              <span>Quick Role Switcher</span>
              <span className="text-[10px] text-sky-400">TGI Demo</span>
            </div>

            {roles.map((r) => {
              const active = role === r.key;
              return (
                <button
                  key={r.key}
                  onClick={() => handleSwitch(r)}
                  className={`w-full text-left p-2.5 rounded-xl border transition-all flex items-center justify-between text-xs ${
                    active
                      ? `${r.color} font-bold shadow-md`
                      : 'border-transparent hover:bg-slate-800/60 text-slate-300'
                  }`}
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="font-semibold text-slate-100">{r.label}</span>
                      {active && <span className="text-[10px] text-emerald-400 font-mono">(Active)</span>}
                    </div>
                    <p className="text-[11px] text-slate-400 truncate">{r.name}</p>
                  </div>
                  {active && <Check className="w-4 h-4 text-emerald-400 shrink-0 ml-2" />}
                </button>
              );
            })}

            <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between px-1">
              <button
                onClick={() => {
                  logout();
                  navigate('/login');
                  setIsOpen(false);
                }}
                className="text-[11px] text-rose-400 hover:text-rose-300 font-medium py-1"
              >
                Log Out to Guest
              </button>
              <button
                onClick={() => {
                  navigate('/');
                  setIsOpen(false);
                }}
                className="text-[11px] text-slate-400 hover:text-white font-medium py-1"
              >
                Go to Public Home
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
