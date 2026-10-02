import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Sparkles, Menu, X, GraduationCap, LogIn, UserPlus, LayoutDashboard, LogOut, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const PublicNavbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, user, role, logout } = useAuth();

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Events', path: '/events' },
    { label: 'Clubs & Committees', path: '/committees' },
    { label: 'About Campus', path: '/about' },
    { label: 'Contact', path: '/contact' },
  ];

  const dashboardPath = role
    ? `/${role.toLowerCase().replace('management_committee', 'committee')}/dashboard`
    : '/login';

  const handleLogout = () => {
    logout();
    setMobileMenuOpen(false);
    navigate('/login');
  };

  return (
    <>
      {/* Institutional Top Bar */}
      <div className="bg-navy-900/90 border-b border-white/5 py-1.5 px-4 text-[11px] text-slate-300 font-medium hidden sm:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-amber-400 font-bold">
              <GraduationCap className="w-3.5 h-3.5" /> TECHNO GROUP OF INSTITUTIONS
            </span>
            <span className="text-slate-500">•</span>
            <span>NAAC Accredited Campus</span>
            <span className="text-slate-500">•</span>
            <span>Faizabad Road, Lucknow, Uttar Pradesh</span>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Secretariat: helpdesk@technox.tgi.ac.in</span>
            <span className="text-slate-500">•</span>
            <span className="text-emerald-400 font-semibold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Live Digital Pass Gate Online
            </span>
          </div>
        </div>
      </div>

      {/* Main Public Header */}
      <header className="sticky top-0 z-40 h-20 glass-panel-glossy border-b border-white/10 backdrop-blur-2xl">
        <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-400 via-amber-500 to-yellow-500 flex items-center justify-center shadow-lg shadow-amber-500/25 group-hover:scale-105 transition-transform">
              <span className="font-black text-slate-950 text-xl tracking-tighter">TX</span>
            </div>
            <div>
              <span className="font-black text-xl text-white tracking-wider flex items-center gap-1">
                TECHNO<span className="text-amber-400">-X</span>
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest text-slate-300 block -mt-1">
                TGI Campus Portal
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1 p-1 rounded-full glass-panel border border-white/10 shadow-inner">
            {navLinks.map((item) => {
              const active = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                    active
                      ? 'bg-amber-400/20 text-amber-300 border border-amber-400/40 shadow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Action CTAs — auth-aware */}
          <div className="hidden md:flex items-center gap-2.5">
            {isAuthenticated ? (
              <>
                {/* Logged-in user pill */}
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs">
                  <User className="w-3.5 h-3.5 text-amber-400" />
                  <span className="text-slate-200 font-semibold truncate max-w-[100px]">{user?.name?.split(' ')[0]}</span>
                  <span className="text-slate-500 text-[10px]">{role?.replace('_', ' ')}</span>
                </div>
                <Link to={dashboardPath}>
                  <button className="btn-glass px-4 py-2 text-xs flex items-center gap-1.5 rounded-xl font-bold">
                    <LayoutDashboard className="w-3.5 h-3.5 text-amber-400" />
                    <span>Dashboard</span>
                  </button>
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-xs font-bold rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 transition-all flex items-center gap-1.5"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <button className="btn-glass px-4 py-2 text-xs flex items-center gap-1.5 rounded-xl font-bold">
                    <LogIn className="w-3.5 h-3.5 text-amber-400" />
                    <span>Portal Sign In</span>
                  </button>
                </Link>
                <Link to="/register">
                  <button className="px-4 py-2 text-xs font-bold rounded-xl bg-amber-400/20 hover:bg-amber-400/30 border border-amber-400/40 text-amber-300 transition-all flex items-center gap-1.5 shadow-sm">
                    <UserPlus className="w-3.5 h-3.5" />
                    <span>Student Register</span>
                  </button>
                </Link>
                <Link to="/events">
                  <button className="btn-gold px-4 py-2 text-xs flex items-center gap-1.5 rounded-xl">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Events</span>
                  </button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 border border-white/10 transition-colors"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden glass-panel-glossy border-b border-white/15 p-4 space-y-2 animate-in slide-in-from-top-2">
            {navLinks.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-2.5 rounded-xl text-sm font-medium text-slate-200 hover:text-white hover:bg-white/10"
              >
                {item.label}
              </Link>
            ))}

            <div className="pt-3 border-t border-white/10 space-y-2">
              {isAuthenticated ? (
                <>
                  <Link to={dashboardPath} onClick={() => setMobileMenuOpen(false)}>
                    <button className="btn-glass w-full py-2.5 text-xs rounded-xl flex items-center justify-center gap-1.5 mb-2 font-bold">
                      <LayoutDashboard className="w-4 h-4 text-amber-400" /> Go to Dashboard
                    </button>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full py-2.5 text-xs rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 font-bold flex items-center justify-center gap-1.5"
                  >
                    <LogOut className="w-4 h-4" /> Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                    <button className="btn-glass w-full py-2.5 text-xs rounded-xl flex items-center justify-center gap-1.5 mb-2 font-bold">
                      <LogIn className="w-4 h-4 text-amber-400" /> Sign In to Portal
                    </button>
                  </Link>
                  <Link to="/register" onClick={() => setMobileMenuOpen(false)}>
                    <button className="w-full py-2.5 text-xs rounded-xl bg-amber-400/20 border border-amber-400/40 text-amber-300 font-bold flex items-center justify-center gap-1.5 mb-2">
                      <UserPlus className="w-4 h-4" /> Student Register
                    </button>
                  </Link>
                  <Link to="/events" onClick={() => setMobileMenuOpen(false)}>
                    <button className="btn-gold w-full py-2.5 text-xs rounded-xl flex items-center justify-center gap-1.5">
                      <Sparkles className="w-4 h-4" /> Explore Events
                    </button>
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </header>
    </>
  );
};
