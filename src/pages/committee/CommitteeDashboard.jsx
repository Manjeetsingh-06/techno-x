import React, { useState, useEffect } from 'react';
import { eventService } from '../../services/eventService';
import { registrationService } from '../../services/registrationService';
import { useAuth } from '../../context/AuthContext';
import { StatCard } from '../../components/common/StatCard';
import { LoadingState } from '../../components/common/LoadingState';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Badge } from '../../components/common/Badge';
import { Link } from 'react-router-dom';
import { Button } from '../../components/common/Button';
import campusHeroImg from '../../assets/campus_hero.png';
import {
  CalendarPlus, Calendar, Users, Clock, BarChart3,
  CheckCircle, ArrowRight, AlertTriangle, QrCode, Sparkles, GraduationCap,
  Megaphone, FileSpreadsheet
} from 'lucide-react';

export const CommitteeDashboard = () => {
  const { user } = useAuth();
  const [events, setEvents] = useState([]);
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const [evRes, regRes] = await Promise.all([
        eventService.getEvents(),
        registrationService.getAllRegistrations(),
      ]);
      if (evRes.success) setEvents(evRes.data);
      if (regRes.success) setRegistrations(regRes.data);
      setLoading(false);
    };
    load();
  }, []);

  if (loading) return <LoadingState message="Loading committee dashboard..." />;

  const myEvents = events;
  const pending = myEvents.filter((e) => e.status === 'PENDING_APPROVAL');
  const approved = myEvents.filter((e) => e.status === 'OPEN' || e.status === 'PUBLISHED');
  const completed = myEvents.filter((e) => e.status === 'COMPLETED');
  const recentRegs = registrations.slice(0, 5);

  return (
    <div className="space-y-6">
      {/* ============================================================ */}
      {/* 1. OPERATIONS HERO BANNER WITH GLOSSY OVERLAY */}
      {/* ============================================================ */}
      <div className="relative rounded-3xl overflow-hidden glass-panel-glossy border border-white/20 shadow-2xl p-6 sm:p-10 min-h-[220px] flex flex-col justify-between">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80')`,
            backgroundPosition: 'center 40%'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/85 to-navy-950/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-transparent to-navy-950/30" />

        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-2.5 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 border border-amber-400/30 text-amber-300 text-xs font-bold backdrop-blur-md">
                <GraduationCap className="w-3.5 h-3.5" /> Event Operations & Execution
              </span>
              <span className="px-2.5 py-1 rounded-full bg-white/10 text-white text-[11px] font-mono font-bold border border-white/20 backdrop-blur-md">
                TGI-MC-201
              </span>
            </div>

            <div>
              <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight drop-shadow-md">
                Welcome back, <span className="text-amber-400">{user?.name?.split(' ')[0] || 'Operations'}</span>!
              </h1>
              <p className="text-xs sm:text-sm text-slate-200 mt-1 font-medium">
                Plan, organize, and execute amazing campus hackathons, symposiums, and festivals across TGI.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <Link to="/committee/events/plan">
              <button className="btn-gold px-3.5 py-2 text-xs flex items-center gap-1.5 rounded-xl font-bold">
                <CalendarPlus className="w-3.5 h-3.5" />
                <span>Plan Event</span>
              </button>
            </Link>
            <Link to="/committee/events">
              <button className="btn-glass px-3.5 py-2 text-xs flex items-center gap-1.5 rounded-xl font-bold">
                <Calendar className="w-3.5 h-3.5 text-amber-400" />
                <span>Manage Events</span>
              </button>
            </Link>
            <Link to="/committee/announcements">
              <button className="btn-glass px-3.5 py-2 text-xs flex items-center gap-1.5 rounded-xl font-bold">
                <Megaphone className="w-3.5 h-3.5 text-purple-400" />
                <span>Announcements</span>
              </button>
            </Link>
            <Link to="/committee/reports">
              <button className="btn-glass px-3.5 py-2 text-xs flex items-center gap-1.5 rounded-xl font-bold">
                <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" />
                <span>Event Reports</span>
              </button>
            </Link>
            <Link to="/committee/attendance">
              <button className="btn-glass px-3.5 py-2 text-xs flex items-center gap-1.5 rounded-xl font-bold">
                <QrCode className="w-3.5 h-3.5 text-sky-400" />
                <span>Gate Scanner</span>
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Events" value={myEvents.length} icon={Calendar} color="blue" />
        <StatCard title="Awaiting Approval" value={pending.length} icon={Clock} color="amber" />
        <StatCard title="Live & Open" value={approved.length} icon={CheckCircle} color="emerald" />
        <StatCard title="Completed" value={completed.length} icon={BarChart3} color="purple" />
      </div>

      {/* Pending Approval Alert */}
      {pending.length > 0 && (
        <div className="glass-panel-glossy p-4 rounded-2xl border border-amber-400/40 shadow-xl">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400">
              <AlertTriangle className="w-5 h-5 shrink-0" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-amber-300">
                {pending.length} event{pending.length !== 1 ? 's are' : ' is'} awaiting faculty review
              </p>
              <p className="text-xs text-slate-300 mt-0.5">
                Proposals submitted for administrative sign-off are listed in the review queue.
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Events with Thumbnails */}
        <div className="glass-panel p-5 rounded-2xl border border-white/10 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <Calendar className="w-4 h-4 text-sky-400" /> All Events
            </h2>
            <Link
              to="/committee/events"
              className="text-xs text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1"
            >
              View All <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="space-y-3">
            {myEvents.slice(0, 5).map((ev) => (
              <div
                key={ev.id}
                className="flex items-center gap-3 p-3 rounded-xl bg-navy-950/60 border border-white/5 hover:border-white/15 transition-all"
              >
                <img
                  src={
                    ev.banner ||
                    'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=150&q=80'
                  }
                  alt={ev.title}
                  className="w-12 h-12 rounded-lg object-cover border border-white/10 shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-white truncate">{ev.title}</p>
                  <p className="text-xs text-slate-400">
                    {ev.date} · {ev.registeredCount || 0}/{ev.capacity} Seats
                  </p>
                </div>
                <StatusBadge status={ev.status} />
              </div>
            ))}
          </div>
        </div>

        {/* Recent Registrations with Avatars */}
        <div className="glass-panel p-5 rounded-2xl border border-white/10 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <Users className="w-4 h-4 text-emerald-400" /> Recent Registrations
            </h2>
            <Link
              to="/committee/participants"
              className="text-xs text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1"
            >
              View All <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="space-y-3">
            {recentRegs.map((reg) => (
              <div
                key={reg.id}
                className="flex items-center justify-between p-3 rounded-xl bg-navy-950/60 border border-white/5 text-xs"
              >
                <div>
                  <p className="font-bold text-white">{reg.studentName}</p>
                  <p className="text-slate-400 truncate max-w-[200px]">{reg.eventTitle}</p>
                </div>
                <div className="text-right">
                  <span className="font-mono text-sky-400 text-[11px] block">{reg.studentId}</span>
                  <StatusBadge status={reg.status} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
