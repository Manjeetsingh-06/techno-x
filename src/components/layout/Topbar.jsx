import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useNotifications } from '../../context/NotificationContext';
import { Bell, Menu, User, LogOut, ChevronDown, Clock, ShieldCheck, Globe } from 'lucide-react';
import { Badge } from '../common/Badge';

export const Topbar = ({ onToggleSidebar, title = 'TECHNO-X' }) => {
  const { user, role, logout } = useAuth();
  const { notifications, unreadCount, markNotificationRead, markAllNotificationsRead } = useNotifications();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const navigate = useNavigate();

  // User requirement: "time live chalao dashboard ke andar" - ticking real-time clock
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  // User requirement: "public portal pe jane pe logout ho jaye"
  const handleExitToPublic = () => {
    logout();
    navigate('/', { replace: true });
  };

  const roleColors = {
    ADMIN: 'bg-purple-500/20 text-purple-300 border-purple-500/40',
    FACULTY: 'bg-blue-500/20 text-blue-300 border-blue-500/40',
    MANAGEMENT_COMMITTEE: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
    STUDENT: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
  };

  const formattedTime = currentTime.toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  });

  const formattedDate = currentTime.toLocaleDateString('en-IN', {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });

  return (
    <header className="sticky top-0 z-30 h-16 w-full glass-panel border-b border-slate-800/80 px-4 sm:px-6 flex items-center justify-between">
      {/* Left Title & Mobile Menu */}
      <div className="flex items-center gap-3">
        {onToggleSidebar && (
          <button
            onClick={onToggleSidebar}
            className="lg:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            aria-label="Toggle Sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}
        <div className="flex items-center gap-2">
          <span className="text-sm sm:text-base font-bold text-white tracking-tight">{title}</span>
          <span className="hidden sm:inline-block text-xs text-slate-500">•</span>
          <span className="hidden sm:inline-block text-xs text-slate-400 font-medium">
            Techno Group of Institutions
          </span>
        </div>
      </div>

      {/* Right Controls: Live Clock, Exit Portal, Notifications, User */}
      <div className="flex items-center gap-2.5 sm:gap-3">
        {/* LIVE TICKING REAL-TIME CLOCK */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/90 border border-slate-700/60 shadow-inner">
          <Clock className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
          <div className="text-right leading-none">
            <span className="text-[12px] font-mono font-bold text-amber-300 tracking-wider block">
              {formattedTime}
            </span>
            <span className="text-[9px] font-medium text-slate-400 hidden md:block">
              {formattedDate} (IST)
            </span>
          </div>
        </div>

        {/* Public portal shortcut (Logs out and exits to public portal) */}
        <button
          onClick={handleExitToPublic}
          title="Exit dashboard and return to public campus portal (logs out)"
          className="hidden md:flex items-center gap-1.5 text-xs text-slate-300 hover:text-rose-300 px-3 py-1.5 rounded-xl hover:bg-rose-500/10 border border-slate-800 hover:border-rose-500/30 transition-all font-medium"
        >
          <Globe className="w-3.5 h-3.5 text-slate-400" />
          <span>Exit to Public Portal</span>
          <LogOut className="w-3 h-3 text-rose-400 ml-0.5" />
        </button>

        {/* Notifications Icon & Popover */}
        <div className="relative">
          <button
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowUserMenu(false);
            }}
            className="relative p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800/70 border border-slate-800 transition-colors"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-navy-950 animate-ping" />
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl glass-panel border border-slate-700/80 shadow-2xl p-4 z-50 animate-in slide-in-from-top-2 duration-150">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">Campus Alerts</h4>
                  {unreadCount > 0 && (
                    <Badge variant="primary" size="sm">
                      {unreadCount} new
                    </Badge>
                  )}
                </div>
                {unreadCount > 0 && (
                  <button
                    onClick={() => markAllNotificationsRead(user)}
                    className="text-[11px] text-amber-400 hover:text-amber-300 font-medium"
                  >
                    Mark all read
                  </button>
                )}
              </div>

              <div className="max-h-72 overflow-y-auto divide-y divide-slate-800/60 my-2">
                {notifications.length === 0 ? (
                  <div className="py-8 text-center text-xs text-slate-400">
                    You're all caught up! No active notifications.
                  </div>
                ) : (
                  notifications.slice(0, 6).map((n) => (
                    <div
                      key={n.id}
                      onClick={() => {
                        markNotificationRead(n.id, user);
                        if (n.link) navigate(n.link);
                        setShowNotifications(false);
                      }}
                      className={`p-3 text-left transition-colors cursor-pointer rounded-lg my-1 ${
                        !n.read ? 'bg-amber-500/10 hover:bg-amber-500/20 border-l-2 border-amber-400' : 'hover:bg-slate-800/40'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold text-slate-200">{n.title}</span>
                        {!n.read && <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />}
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">{n.message}</p>
                      <span className="text-[10px] text-slate-500 font-mono mt-1 block">
                        {n.createdAt ? new Date(n.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Just now'}
                      </span>
                    </div>
                  ))
                )}
              </div>

              <div className="pt-2 border-t border-slate-800 text-center">
                <Link
                  to={
                    role === 'STUDENT'
                      ? '/student/notifications'
                      : role === 'FACULTY'
                      ? '/faculty/notifications'
                      : '/admin/notifications'
                  }
                  onClick={() => setShowNotifications(false)}
                  className="text-xs text-amber-400 hover:text-amber-300 font-medium"
                >
                  View all alerts & broadcasts →
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* User Profile Menu */}
        <div className="relative">
          <button
            onClick={() => {
              setShowUserMenu(!showUserMenu);
              setShowNotifications(false);
            }}
            className="flex items-center gap-2.5 p-1.5 sm:px-3 sm:py-1.5 rounded-xl hover:bg-slate-800/70 border border-slate-800/80 transition-colors"
          >
            <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-amber-400 to-yellow-500 flex items-center justify-center text-slate-950 font-bold text-xs">
              {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
            </div>
            <div className="hidden sm:block text-left">
              <p className="text-xs font-bold text-white leading-tight truncate max-w-[130px]">
                {user?.name || 'TGI User'}
              </p>
              <span
                className={`text-[9px] font-semibold px-1.5 py-0.2 rounded-md border inline-block ${
                  roleColors[role] || 'text-slate-400 border-slate-700'
                }`}
              >
                {role ? role.replace('_', ' ') : 'GUEST'}
              </span>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-64 rounded-2xl glass-panel border border-slate-700/80 shadow-2xl p-3 z-50 animate-in slide-in-from-top-2 duration-150">
              <div className="p-2 border-b border-slate-800 mb-2">
                <p className="text-xs font-bold text-white truncate">{user?.name}</p>
                <p className="text-[11px] text-slate-400 font-mono truncate">{user?.email}</p>
                {user?.studentId && (
                  <p className="text-[11px] text-amber-400 font-mono font-semibold mt-0.5">
                    Student ID: {user.studentId}
                  </p>
                )}
              </div>

              <div className="space-y-1 text-xs">
                <Link
                  to={
                    role === 'STUDENT'
                      ? '/student/profile'
                      : role === 'FACULTY'
                      ? '/faculty/profile'
                      : role === 'MANAGEMENT_COMMITTEE'
                      ? '/committee/profile'
                      : '/admin/profile'
                  }
                  onClick={() => setShowUserMenu(false)}
                  className="flex items-center gap-2 p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
                >
                  <User className="w-4 h-4 text-amber-400" />
                  My Profile
                </Link>

                <button
                  onClick={() => {
                    setShowUserMenu(false);
                    handleLogout();
                  }}
                  className="w-full flex items-center gap-2 p-2 rounded-lg text-rose-400 hover:bg-rose-500/10 transition-colors text-left"
                >
                  <LogOut className="w-4 h-4 text-rose-400" />
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
