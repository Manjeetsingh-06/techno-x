import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { eventService } from '../../services/eventService';
import { studentService } from '../../services/studentService';
import { registrationService } from '../../services/registrationService';
import { StatCard } from '../../components/common/StatCard';
import { LoadingState } from '../../components/common/LoadingState';
import campusHeroImg from '../../assets/campus_hero.png';
import {
  Users,
  Sparkles,
  CheckSquare,
  QrCode,
  Clock,
  ShieldCheck,
  PlusCircle,
  ArrowRight,
  GraduationCap,
  Bell,
  Calendar,
  Layers,
  FileCheck
} from 'lucide-react';

export const FacultyDashboard = () => {
  const { user } = useAuth();
  const [students, setStudents] = useState([]);
  const [events, setEvents] = useState([]);
  const [registrations, setRegistrations] = useState([]);
  const [waitlist, setWaitlist] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const [stRes, evRes, regRes, wtRes] = await Promise.all([
          studentService.getStudents(),
          eventService.getEvents(),
          registrationService.getAllRegistrations(),
          registrationService.getWaitlist()
        ]);

        if (stRes.success) setStudents(stRes.data);
        if (evRes.success) setEvents(evRes.data);
        if (regRes.success) setRegistrations(regRes.data);
        if (wtRes.success) setWaitlist(wtRes.data);
      } catch (err) {
        console.error('Error loading faculty console:', err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) {
    return <LoadingState message="Loading faculty supervisory console..." />;
  }

  const pendingApprovals = events.filter((e) => e.status === 'PENDING_APPROVAL');
  const publishedEvents = events.filter((e) => e.status === 'PUBLISHED');

  return (
    <div className="space-y-8">
      {/* ============================================================ */}
      {/* 1. CAMPUS HERO WELCOME BANNER WITH GLOSSY OVERLAY */}
      {/* ============================================================ */}
      <div className="relative rounded-3xl overflow-hidden glass-panel-glossy border border-white/20 shadow-2xl p-6 sm:p-10 min-h-[220px] flex flex-col justify-between">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105"
          style={{
            backgroundImage: `url('${campusHeroImg}')`,
            backgroundPosition: 'center 35%'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/85 to-navy-950/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-transparent to-navy-950/30" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2.5 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-sky-300 text-xs font-bold backdrop-blur-md">
                <GraduationCap className="w-3.5 h-3.5" /> Academic & Event Faculty Console
              </span>
              <span className="px-2.5 py-1 rounded-full bg-white/10 text-white text-[11px] font-mono font-bold border border-white/20 backdrop-blur-md">
                {user?.facultyCode || 'FAC-CS-042'}
              </span>
              <span className="px-2.5 py-1 rounded-full bg-amber-400/20 text-amber-300 text-[11px] font-bold border border-amber-400/30">
                Full Committee & Faculty Clearance
              </span>
            </div>

            <div>
              <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight drop-shadow-md">
                Welcome, <span className="text-amber-400">{user?.name || 'Dr. Vikram Malhotra'}</span>!
              </h1>
              <p className="text-xs sm:text-sm text-slate-200 mt-1 font-medium">
                {user?.designation || 'Associate Professor & HOD'} • {user?.department || 'Computer Science & Engineering'}
              </p>
              <p className="text-xs text-sky-400 font-semibold mt-0.5">
                Techno Group of Institutions • Lucknow Campus
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <Link to="/faculty/approvals">
              <button className="btn-gold px-4 py-2.5 text-xs sm:text-sm flex items-center gap-2 rounded-xl shadow-lg">
                <CheckSquare className="w-4 h-4" />
                <span>Review Approvals ({pendingApprovals.length})</span>
              </button>
            </Link>
            <Link to="/faculty/attendance">
              <button className="btn-glass px-4 py-2.5 text-xs sm:text-sm flex items-center gap-2 rounded-xl text-emerald-400 border-emerald-500/30">
                <QrCode className="w-4 h-4" />
                <span>Gate Scanner</span>
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 2. COMMAND ACTION HUB: CLEAR, 1-CLICK ACTIONS */}
      {/* ============================================================ */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base sm:text-lg font-bold text-white tracking-tight flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Faculty & Committee Operations Hub</span>
          </h2>
          <span className="text-xs text-slate-400">All tools unified in one place</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {/* Action 1: Event Approvals */}
          <Link
            to="/faculty/approvals"
            className="glass-panel glass-card-hover p-4 rounded-2xl border border-amber-400/20 flex flex-col justify-between group transition-all"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform border border-amber-400/30">
              <CheckSquare className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-white text-xs sm:text-sm">Approve Events</p>
              <p className="text-[11px] text-slate-400 mt-0.5">
                {pendingApprovals.length} pending review
              </p>
            </div>
          </Link>

          {/* Action 2: Gate QR Scanner */}
          <Link
            to="/faculty/attendance"
            className="glass-panel glass-card-hover p-4 rounded-2xl border border-emerald-400/20 flex flex-col justify-between group transition-all"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform border border-emerald-400/30">
              <QrCode className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-white text-xs sm:text-sm">Gate Attendance</p>
              <p className="text-[11px] text-slate-400 mt-0.5">Live QR verification</p>
            </div>
          </Link>

          {/* Action 3: Plan New Event (Committee Authority) */}
          <Link
            to="/committee/events/plan"
            className="glass-panel glass-card-hover p-4 rounded-2xl border border-blue-400/20 flex flex-col justify-between group transition-all"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform border border-blue-400/30">
              <PlusCircle className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-white text-xs sm:text-sm">Plan Event</p>
              <p className="text-[11px] text-slate-400 mt-0.5">Propose new event</p>
            </div>
          </Link>

          {/* Action 4: Student Directory */}
          <Link
            to="/faculty/students"
            className="glass-panel glass-card-hover p-4 rounded-2xl border border-purple-400/20 flex flex-col justify-between group transition-all"
          >
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform border border-purple-400/30">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-white text-xs sm:text-sm">Student Roster</p>
              <p className="text-[11px] text-slate-400 mt-0.5">{students.length} students</p>
            </div>
          </Link>

          {/* Action 5: Manual Seat Override */}
          <Link
            to="/faculty/manual-register"
            className="glass-panel glass-card-hover p-4 rounded-2xl border border-sky-400/20 flex flex-col justify-between group transition-all"
          >
            <div className="w-10 h-10 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform border border-sky-400/30">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-white text-xs sm:text-sm">Seat Override</p>
              <p className="text-[11px] text-slate-400 mt-0.5">Manual registration</p>
            </div>
          </Link>

          {/* Action 6: Broadcast Notice */}
          <Link
            to="/faculty/notifications"
            className="glass-panel glass-card-hover p-4 rounded-2xl border border-rose-400/20 flex flex-col justify-between group transition-all"
          >
            <div className="w-10 h-10 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform border border-rose-400/30">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-white text-xs sm:text-sm">Send Notice</p>
              <p className="text-[11px] text-slate-400 mt-0.5">Broadcast message</p>
            </div>
          </Link>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 3. KEY METRICS STATS */}
      {/* ============================================================ */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Active Events"
          value={publishedEvents.length}
          subtitle="Live across campus"
          icon={Calendar}
          color="blue"
        />
        <StatCard
          title="Pending Approvals"
          value={pendingApprovals.length}
          subtitle="Awaiting your decision"
          icon={CheckSquare}
          color="amber"
        />
        <StatCard
          title="Total Registrations"
          value={registrations.length}
          subtitle="Student event passes"
          icon={FileCheck}
          color="green"
        />
        <StatCard
          title="Waitlist Requests"
          value={waitlist.length}
          subtitle="Eligible for seat expansion"
          icon={Clock}
          color="purple"
        />
      </div>

      {/* ============================================================ */}
      {/* 4. STREAMLINED ACTION PANELS: NO CLUTTER */}
      {/* ============================================================ */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Pending Proposals Awaiting Faculty Sign-off */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
              <CheckSquare className="w-4 h-4 text-amber-400" />
              <span>Event Proposals Needing Decision</span>
            </h3>
            <Link to="/faculty/approvals" className="text-xs text-amber-400 hover:text-amber-300 font-semibold">
              View All ({pendingApprovals.length}) →
            </Link>
          </div>

          {pendingApprovals.length > 0 ? (
            <div className="space-y-3">
              {pendingApprovals.map((ev) => (
                <div
                  key={ev.id}
                  className="glass-panel p-4 rounded-2xl border border-amber-400/30 flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={ev.banner || 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=200&q=80'}
                      alt={ev.title}
                      className="w-12 h-12 rounded-xl object-cover border border-white/10 shrink-0"
                    />
                    <div className="min-w-0">
                      <p className="font-bold text-white text-sm truncate">{ev.title}</p>
                      <p className="text-xs text-slate-400 mt-0.5">
                        {ev.category} • Capacity: {ev.capacity} • {ev.venue}
                      </p>
                    </div>
                  </div>
                  <Link to="/faculty/approvals" className="shrink-0">
                    <button className="btn-gold px-3.5 py-1.5 text-xs rounded-xl font-bold">
                      Review & Approve
                    </button>
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div className="glass-panel p-8 rounded-2xl border border-white/10 text-center text-slate-400 text-xs">
              <CheckSquare className="w-8 h-8 text-emerald-400 mx-auto mb-2 opacity-70" />
              <p className="font-bold text-white text-sm">All caught up!</p>
              <p className="mt-1">No pending event proposals awaiting approval at this moment.</p>
            </div>
          )}

          {/* Active Live Events */}
          <div className="pt-3 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
                <Calendar className="w-4 h-4 text-sky-400" />
                <span>Published Campus Events</span>
              </h3>
              <Link to="/faculty/events" className="text-xs text-sky-400 hover:text-sky-300 font-semibold">
                Manage Events →
              </Link>
            </div>

            <div className="space-y-2.5">
              {publishedEvents.slice(0, 3).map((ev) => (
                <div
                  key={ev.id}
                  className="glass-panel p-3.5 rounded-xl border border-white/10 flex items-center justify-between text-xs"
                >
                  <div className="min-w-0 pr-3">
                    <span className="font-bold text-white block truncate">{ev.title}</span>
                    <span className="text-slate-400 text-[11px]">
                      {ev.date} • {ev.venue} • {ev.registeredCount || 0}/{ev.capacity} Seats Filled
                    </span>
                  </div>
                  <Link to="/faculty/attendance">
                    <button className="btn-glass px-2.5 py-1 text-xs rounded-lg text-emerald-300 border-emerald-500/30 flex items-center gap-1">
                      <QrCode className="w-3.5 h-3.5" />
                      <span>Gate Check-In</span>
                    </button>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Quick Gate Check-in & Override Tools */}
        <div className="lg:col-span-5 space-y-4">
          <h3 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Fast Gate & Override Tools</span>
          </h3>

          <div className="glass-panel p-5 rounded-2xl border border-white/15 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-400/30">
                <QrCode className="w-5 h-5" />
              </div>
              <div>
                <p className="font-bold text-white text-sm">Gate Attendance Scanner</p>
                <p className="text-xs text-slate-300">Scan student digital QR passes directly from your phone camera or barcode reader.</p>
              </div>
            </div>
            <Link to="/faculty/attendance" className="block">
              <button className="w-full btn-glass py-2.5 text-xs text-emerald-300 font-bold rounded-xl border-emerald-500/40 hover:bg-emerald-500/10 flex items-center justify-center gap-2">
                <span>Launch QR Scanner Console</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
          </div>

          <div className="glass-panel p-5 rounded-2xl border border-white/15 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 border border-amber-400/30">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <p className="font-bold text-white text-sm">Special Seat Allocation</p>
                <p className="text-xs text-slate-300">Faculty authority to register eligible students when capacity or deadline has closed.</p>
              </div>
            </div>
            <Link to="/faculty/manual-register" className="block">
              <button className="w-full btn-gold py-2.5 text-xs font-bold rounded-xl flex items-center justify-center gap-2">
                <span>Open Seat Override Form</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
          </div>

          <div className="glass-panel p-4 rounded-2xl border border-white/10 flex items-center justify-between text-xs">
            <div>
              <p className="font-bold text-white">Student Academic Directory</p>
              <p className="text-slate-400 text-[11px]">View full academic profiles & course histories</p>
            </div>
            <Link to="/faculty/students">
              <button className="btn-glass px-3 py-1.5 text-xs rounded-xl">
                Open Directory →
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
