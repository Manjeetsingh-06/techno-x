import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { registrationService } from '../../services/registrationService';
import { eventService } from '../../services/eventService';
import { StatCard } from '../../components/common/StatCard';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Button } from '../../components/common/Button';
import { LoadingState } from '../../components/common/LoadingState';
import campusHeroImg from '../../assets/campus_hero.png';
import {
  Ticket,
  Calendar,
  Award,
  Clock,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  GraduationCap,
  MapPin,
  ExternalLink,
  QrCode
} from 'lucide-react';

export const StudentDashboard = () => {
  const { user } = useAuth();
  const [registrations, setRegistrations] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboard = async () => {
      setLoading(true);
      const evRes = await eventService.getEvents();
      let allEvents = [];
      if (evRes.success) {
        allEvents = evRes.data;
        setEvents(allEvents.filter((e) => e.status === 'PUBLISHED').slice(0, 3));
      }

      const regRes = await registrationService.getStudentRegistrations();
      if (regRes.success) {
        // Enrich registrations with event banner images
        const enriched = regRes.data.map((reg) => {
          const ev = allEvents.find((e) => e.id === reg.eventId || e.title === reg.eventTitle);
          return {
            ...reg,
            banner:
              ev?.banner ||
              'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=600&q=80',
            category: ev?.category || 'Academic'
          };
        });
        setRegistrations(enriched);
      }
      setLoading(false);
    };

    loadDashboard();
  }, [user]);

  if (loading) {
    return <LoadingState message="Loading your student academic & event dashboard..." />;
  }

  const registeredCount = registrations.filter((r) => r.status === 'REGISTERED').length;
  const attendedCount = registrations.filter(
    (r) => r.status === 'ATTENDED' || r.attendanceStatus === 'PRESENT'
  ).length;
  const waitlistCount = registrations.filter((r) => r.status === 'WAITLISTED').length;
  const nextEventReg = registrations.find((r) => r.status === 'REGISTERED');

  return (
    <div className="space-y-8">
      {/* ============================================================ */}
      {/* 1. CAMPUS HERO WELCOME BANNER WITH GLOSSY OVERLAY */}
      {/* ============================================================ */}
      <div className="relative rounded-3xl overflow-hidden glass-panel-glossy border border-white/20 shadow-2xl p-6 sm:p-10 min-h-[220px] flex flex-col justify-between">
        {/* Real Campus Photo Background */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105"
          style={{
            backgroundImage: `url('${campusHeroImg}')`,
            backgroundPosition: 'center 35%'
          }}
        />

        {/* Cinematic Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/85 to-navy-950/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-transparent to-navy-950/30" />

        {/* Banner Content */}
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 border border-amber-400/30 text-amber-300 text-xs font-bold backdrop-blur-md">
                <GraduationCap className="w-3.5 h-3.5" /> Official Student Portal
              </span>
              <span className="px-2.5 py-1 rounded-full bg-white/10 text-white text-[11px] font-mono font-bold border border-white/20 backdrop-blur-md">
                {user?.studentId || 'TGI2025BCA768'}
              </span>
              <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-[11px] font-bold border border-emerald-400/30">
                Active Student
              </span>
            </div>

            <div>
              <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight drop-shadow-md">
                Welcome back, <span className="text-amber-400">{user?.name || 'Aarav Sharma'}</span>!
              </h1>
              <p className="text-xs sm:text-sm text-slate-200 mt-1 font-medium">
                Department: {user?.course || 'BCA'} • {user?.year || '1st Year'} • Techno Group of Institutions
              </p>
              <p className="text-xs text-sky-400 font-semibold mt-1">
                “Connect. Participate. Experience.”
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link to="/student/registrations">
              <button className="btn-glass px-5 py-3 text-xs sm:text-sm flex items-center gap-2 rounded-xl">
                <Ticket className="w-4 h-4 text-sky-400" />
                <span>My Event Passes</span>
              </button>
            </Link>
            <Link to="/student/events">
              <button className="btn-gold px-5 py-3 text-xs sm:text-sm flex items-center gap-2 rounded-xl">
                <Sparkles className="w-4 h-4" />
                <span>Explore Events</span>
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 2. GLOSSY METRIC CARDS */}
      {/* ============================================================ */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Confirmed Registrations"
          value={registeredCount}
          subtitle="Active Digital Passes"
          icon={Ticket}
          color="blue"
        />
        <StatCard
          title="Events Attended"
          value={attendedCount}
          subtitle="QR Gate Verified"
          icon={CheckCircle2}
          color="emerald"
        />
        <StatCard
          title="Waitlist Position"
          value={waitlistCount}
          subtitle="Pending Capacity Clear"
          icon={Clock}
          color="amber"
        />
        <StatCard
          title="Badges Earned"
          value="4"
          subtitle="Technical & Cultural"
          icon={Award}
          color="purple"
        />
      </div>

      {/* ============================================================ */}
      {/* 3. TWO COLUMN LAYOUT: MY PASSES & UPCOMING HIGHLIGHT */}
      {/* ============================================================ */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: My Registrations with Event Photos */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-base sm:text-lg font-bold text-white tracking-tight flex items-center gap-2">
              <Ticket className="w-5 h-5 text-amber-400" /> My Active Registrations
            </h3>
            <Link
              to="/student/registrations"
              className="text-xs text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1 transition-colors"
            >
              View All Passes <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-4">
            {registrations.length === 0 ? (
              <div className="glass-panel p-8 text-center rounded-2xl border border-white/10 text-xs text-slate-400">
                You haven't registered for any event yet.
              </div>
            ) : (
              registrations.slice(0, 4).map((reg) => (
                <div
                  key={reg.id}
                  className="glass-card-hover glass-panel-glossy p-4 sm:p-5 rounded-2xl border border-white/15 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group"
                >
                  <div className="flex items-start sm:items-center gap-4 min-w-0">
                    {/* Event Banner Image Thumbnail */}
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden shrink-0 border border-white/20 shadow-md relative">
                      <img
                        src={reg.banner}
                        alt={reg.eventTitle}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <span className="absolute bottom-1 left-1 text-[9px] font-bold px-1 py-0.5 rounded bg-black/60 text-white backdrop-blur-xs">
                        {reg.category}
                      </span>
                    </div>

                    <div className="space-y-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs font-mono font-bold text-sky-400">
                          {reg.registrationId}
                        </span>
                        <StatusBadge status={reg.status} />
                      </div>
                      <h4 className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors truncate">
                        {reg.eventTitle}
                      </h4>
                      <p className="text-xs text-slate-300 flex flex-wrap items-center gap-2">
                        <span className="flex items-center gap-1 text-slate-400">
                          <Calendar className="w-3.5 h-3.5 text-amber-400" /> {reg.eventDate}
                        </span>
                        <span className="text-slate-500">•</span>
                        <span className="text-slate-400 truncate max-w-[200px]">{reg.eventVenue}</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                    {reg.status === 'REGISTERED' && (
                      <Link to={`/student/pass/${reg.registrationId}`}>
                        <button className="btn-gold px-4 py-2 text-xs flex items-center gap-1.5 rounded-lg shadow-md shadow-amber-500/20">
                          <QrCode className="w-3.5 h-3.5" />
                          <span>Digital Pass</span>
                        </button>
                      </Link>
                    )}
                    {reg.status === 'WAITLISTED' && (
                      <span className="text-xs text-amber-400 font-semibold px-3 py-1.5 bg-amber-500/15 rounded-lg border border-amber-500/30">
                        Waitlist #{reg.waitlistPosition}
                      </span>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right Column: Next Upcoming Highlight & Quick Calendar */}
        <div className="space-y-6">
          <h3 className="text-base sm:text-lg font-bold text-white tracking-tight flex items-center gap-2">
            <QrCode className="w-5 h-5 text-sky-400" /> Next Gate Admittance
          </h3>

          {nextEventReg ? (
            <div className="glass-panel-glossy rounded-3xl border border-white/20 shadow-2xl overflow-hidden space-y-4">
              {/* Event Cover Image */}
              <div className="h-32 w-full relative overflow-hidden">
                <img
                  src={nextEventReg.banner}
                  alt={nextEventReg.eventTitle}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/60 to-transparent" />
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-400/20 text-amber-300 border border-amber-400/40 backdrop-blur-md uppercase tracking-wider">
                    Priority Pass
                  </span>
                </div>
              </div>

              <div className="p-5 pt-0 space-y-4">
                <div>
                  <h4 className="text-base font-bold text-white leading-snug">
                    {nextEventReg.eventTitle}
                  </h4>
                  <p className="text-xs text-slate-300 mt-1 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-sky-400" /> {nextEventReg.eventVenue}
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-navy-950/80 border border-white/10 text-xs text-slate-300 space-y-1.5 font-mono shadow-inner">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Date:</span>
                    <span className="text-white font-semibold">{nextEventReg.eventDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Pass Token:</span>
                    <span className="text-amber-400 font-bold">{nextEventReg.registrationId}</span>
                  </div>
                </div>

                <Link to={`/student/pass/${nextEventReg.registrationId}`} className="block">
                  <button className="btn-gold w-full py-3 text-xs sm:text-sm flex items-center justify-center gap-2 rounded-xl font-bold">
                    <QrCode className="w-4 h-4" />
                    <span>Show Gate QR Pass</span>
                  </button>
                </Link>
              </div>
            </div>
          ) : (
            <div className="glass-panel p-6 rounded-2xl border border-white/10 text-center text-xs text-slate-400">
              No active upcoming passes.
            </div>
          )}

          {/* Quick Links with Icons */}
          <div className="glass-panel p-5 rounded-2xl border border-white/10 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">Quick Navigation</h4>
            <div className="space-y-1.5 text-xs">
              <Link
                to="/student/calendar"
                className="flex items-center justify-between p-2.5 rounded-xl hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
              >
                <span className="flex items-center gap-2.5">
                  <Calendar className="w-4 h-4 text-sky-400" /> Academic Calendar
                </span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                to="/student/achievements"
                className="flex items-center justify-between p-2.5 rounded-xl hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
              >
                <span className="flex items-center gap-2.5">
                  <Award className="w-4 h-4 text-purple-400" /> Verified Badges
                </span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                to="/student/history"
                className="flex items-center justify-between p-2.5 rounded-xl hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
              >
                <span className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Participation History
                </span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
