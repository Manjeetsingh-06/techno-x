import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNotifications } from '../../context/NotificationContext';
import { Bell, Check, Clock, Info, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';
import { Button } from '../../components/common/Button';
import { Link } from 'react-router-dom';

export const StudentNotificationsPage = () => {
  const { user } = useAuth();
  const { notifications, markNotificationRead, markAllNotificationsRead } = useNotifications();
  const [filterType, setFilterType] = useState('ALL');

  const filtered = notifications.filter((n) => {
    if (filterType === 'ALL') return true;
    if (filterType === 'UNREAD') return !n.read;
    return n.category === filterType;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Notification Center
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Institutional alerts, waitlist status updates, and digital pass notifications.
          </p>
        </div>

        <Button
          variant="secondary"
          size="sm"
          icon={Check}
          onClick={() => markAllNotificationsRead(user)}
        >
          Mark All as Read
        </Button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-800 text-xs">
        {['ALL', 'UNREAD', 'REGISTRATION', 'WAITLIST', 'EVENT', 'SYSTEM'].map((cat) => (
          <button
            key={cat}
            onClick={() => setFilterType(cat)}
            className={`px-3 py-1.5 rounded-lg font-semibold whitespace-nowrap transition-colors ${
              filterType === cat ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="glass-panel p-12 text-center rounded-2xl border border-slate-800 text-xs text-slate-400">
            You're all caught up. No notifications in this folder.
          </div>
        ) : (
          filtered.map((item) => (
            <div
              key={item.id}
              className={`p-4 rounded-2xl border transition-all flex items-start justify-between gap-4 ${
                !item.read
                  ? 'glass-panel border-blue-500/40 bg-blue-900/15'
                  : 'bg-navy-900/40 border-slate-800/80 text-slate-300'
              }`}
            >
              <div className="flex items-start gap-3.5">
                <div
                  className={`p-2 rounded-xl mt-0.5 shrink-0 ${
                    item.type === 'SUCCESS'
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                      : item.type === 'WARNING'
                      ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                      : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                  }`}
                >
                  <Bell className="w-4 h-4" />
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold text-white">{item.title}</h4>
                    <span className="text-[10px] font-mono px-2 py-0.2 rounded-md bg-slate-800 text-slate-400 border border-slate-700">
                      {item.category}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed max-w-2xl">{item.message}</p>
                  <p className="text-[10px] text-slate-500 font-mono pt-1">
                    {new Date(item.timestamp).toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {item.link && (
                  <Link to={item.link}>
                    <Button variant="ghost" size="sm" icon={ArrowRight}>
                      View
                    </Button>
                  </Link>
                )}
                {!item.read && (
                  <button
                    onClick={() => markNotificationRead(item.id, user)}
                    className="text-xs text-blue-400 hover:text-blue-300 font-medium px-2 py-1"
                  >
                    Dismiss
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
