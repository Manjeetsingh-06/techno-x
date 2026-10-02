import React from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  LayoutDashboard,
  Calendar,
  Ticket,
  Users,
  Award,
  Bell,
  User,
  History,
  CheckSquare,
  FileText,
  ShieldCheck,
  PlusCircle,
  Clock,
  Layers,
  Sparkles,
  Settings,
  X,
  FileSpreadsheet,
  Megaphone,
  Radio,
  BookOpen,
  Briefcase,
  LogOut
} from 'lucide-react';

export const Sidebar = ({ isOpen, onClose }) => {
  const { role, user, logout } = useAuth();
  const navigate = useNavigate();

  const studentLinks = [
    { to: '/student/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/student/events', icon: Sparkles, label: 'Explore Events' },
    { to: '/student/registrations', icon: Ticket, label: 'My Registrations' },
    { to: '/student/calendar', icon: Calendar, label: 'Calendar' },
    { to: '/student/history', icon: History, label: 'Participation History' },
    { to: '/student/achievements', icon: Award, label: 'Achievements' },
    { to: '/student/notifications', icon: Bell, label: 'Notifications' },
    { to: '/student/profile', icon: User, label: 'My Profile' },
  ];

  const facultyLinks = [
    { to: '/faculty/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/faculty/students', icon: Users, label: 'Manage Students', badge: 'Key' },
    { to: '/faculty/manual-register', icon: PlusCircle, label: 'Manual Override Reg', badge: 'Override' },
    { to: '/faculty/waitlist', icon: Clock, label: 'Waitlist Approval' },
    { to: '/faculty/events', icon: Sparkles, label: 'Assigned Events' },
    { to: '/faculty/approvals', icon: CheckSquare, label: 'Event Approvals' },
    { to: '/faculty/registrations', icon: Ticket, label: 'All Registrations' },
    { to: '/faculty/attendance', icon: ShieldCheck, label: 'Attendance' },
    { to: '/faculty/reports', icon: FileSpreadsheet, label: 'Reports' },
    { to: '/faculty/notifications', icon: Bell, label: 'Notifications' },
    { to: '/faculty/profile', icon: User, label: 'Faculty Profile' },
  ];

  const committeeLinks = [
    { to: '/committee/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/committee/events/plan', icon: PlusCircle, label: 'Plan New Event' },
    { to: '/committee/events', icon: Sparkles, label: 'Manage Events' },
    { to: '/committee/participants', icon: Users, label: 'Participants' },
    { to: '/committee/attendance', icon: ShieldCheck, label: 'Mark Attendance' },
    { to: '/committee/announcements', icon: Megaphone, label: 'Announcements' },
    { to: '/committee/notifications', icon: Bell, label: 'Notifications' },
    { to: '/committee/reports', icon: FileSpreadsheet, label: 'Event Reports' },
    { to: '/committee/profile', icon: User, label: 'Profile' },
  ];

  const adminLinks = [
    { to: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/admin/users', icon: Users, label: 'User Directory' },
    { to: '/admin/students', icon: BookOpen, label: 'Students' },
    { to: '/admin/faculty', icon: Briefcase, label: 'Appoint Faculty' },
    { to: '/admin/committee', icon: Radio, label: 'Appoint Committee' },
    { to: '/admin/events', icon: Sparkles, label: 'Event Management' },
    { to: '/admin/approvals', icon: CheckSquare, label: 'Event Approvals' },
    { to: '/admin/registrations', icon: Ticket, label: 'Registrations' },
    { to: '/admin/manual-register', icon: PlusCircle, label: 'Manual Override Reg', badge: 'Override' },
    { to: '/admin/waitlist', icon: Clock, label: 'Waitlist Approval' },
    { to: '/admin/attendance', icon: ShieldCheck, label: 'Attendance' },
    { to: '/admin/notifications', icon: Bell, label: 'Notifications' },
    { to: '/admin/categories', icon: Layers, label: 'Event Categories' },
    { to: '/admin/clubs', icon: Award, label: 'Clubs & Societies' },
    { to: '/admin/analytics', icon: LayoutDashboard, label: 'Deep Analytics' },
    { to: '/admin/reports', icon: FileSpreadsheet, label: 'Reports Export' },
    { to: '/admin/audit-logs', icon: FileText, label: 'Audit Logs', badge: 'Security' },
    { to: '/admin/settings', icon: Settings, label: 'System Settings' },
    { to: '/admin/profile', icon: User, label: 'Admin Profile' },
  ];

  let links = studentLinks;
  if (role === 'FACULTY') links = facultyLinks;
  else if (role === 'MANAGEMENT_COMMITTEE') links = committeeLinks;
  else if (role === 'ADMIN') links = adminLinks;

  const handleExitLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-navy-950/80 backdrop-blur-sm lg:hidden transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Sidebar container with ultra-glossy glass styling */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-40 w-64 glass-panel-glossy border-r border-white/10 flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header — logo stays inside dashboard, not public home */}
        <div className="h-16 px-5 border-b border-white/10 flex items-center justify-between">
          <Link to={`/${role?.toLowerCase() || 'student'}/dashboard`} className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-400 via-amber-500 to-yellow-500 flex items-center justify-center shadow-md shadow-amber-500/25 group-hover:scale-105 transition-transform">
              <span className="font-black text-slate-950 text-base tracking-tighter">TX</span>
            </div>
            <div>
              <span className="font-black text-lg text-white tracking-wider flex items-center gap-1">
                TECHNO<span className="text-amber-400">-X</span>
              </span>
              <p className="text-[9px] uppercase font-bold tracking-widest text-slate-400">
                TGI Campus Portal
              </p>
            </div>
          </Link>
          <button
            onClick={onClose}
            className="lg:hidden text-slate-400 hover:text-white p-1 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Current user chip with real avatar image */}
        <div className="px-3.5 py-3 mx-3 my-3 rounded-2xl bg-navy-950/80 border border-white/10 flex items-center gap-3 shadow-lg">
          <div className="relative shrink-0">
            {user?.avatar ? (
              <img
                src={user.avatar}
                alt={user?.name}
                className="w-10 h-10 rounded-xl object-cover border border-amber-400/40 shadow-sm"
              />
            ) : (
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-sky-400 flex items-center justify-center text-white font-bold text-sm border border-white/20">
                {user?.name ? user.name.charAt(0) : 'U'}
              </div>
            )}
            <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full ring-2 ring-navy-950" />
          </div>

          <div className="min-w-0 flex-1">
            <p className="text-xs font-bold text-white truncate">{user?.name || 'TGI Student'}</p>
            <span className="text-[10px] text-amber-300 font-mono font-semibold block truncate">
              {role?.replace('_', ' ')}
            </span>
            {user?.studentId && (
              <span className="text-[9px] text-slate-400 font-mono block truncate">
                {user.studentId}
              </span>
            )}
          </div>
        </div>

        {/* Navigation list */}
        <div className="flex-1 overflow-y-auto px-3 py-1 space-y-1">
          {links.map((link) => {
            const Icon = link.icon;
            return (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => onClose && onClose()}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all duration-150 ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-600 to-sky-500 text-white font-bold shadow-lg shadow-blue-500/25 border border-sky-400/30'
                      : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
                  }`
                }
              >
                <div className="flex items-center gap-3 min-w-0">
                  <Icon className="w-4 h-4 shrink-0" />
                  <span className="truncate">{link.label}</span>
                </div>
                {link.badge && (
                  <span className="text-[9px] uppercase px-1.5 py-0.5 rounded-full font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30">
                    {link.badge}
                  </span>
                )}
              </NavLink>
            );
          })}
        </div>

        {/* Footer — Exit & Logout */}
        <div className="p-3 border-t border-white/10 space-y-2">
          <button
            onClick={handleExitLogout}
            className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-xs font-bold text-red-400 hover:text-white hover:bg-red-500/20 border border-red-500/20 hover:border-red-400/40 transition-all duration-150"
          >
            <LogOut className="w-4 h-4" />
            Exit &amp; Logout
          </button>
          <div className="text-[10px] text-slate-400 text-center">
            <p className="font-semibold text-slate-300">Techno Group of Institutions</p>
            <p className="text-amber-400 font-medium">"Connect. Participate. Experience."</p>
          </div>
        </div>
      </aside>
    </>
  );
};
