import React, { useState, useEffect } from 'react';
import { reportService } from '../../services/reportService';
import { auditLogService } from '../../services/auditLogService';
import { useAuth } from '../../context/AuthContext';
import { StatCard } from '../../components/common/StatCard';
import { ChartCard } from '../../components/common/ChartCard';
import { LoadingState } from '../../components/common/LoadingState';
import { Link } from 'react-router-dom';
import campusHeroImg from '../../assets/campus_hero.png';
import {
  Calendar, Users, FileCheck, GraduationCap, ShieldCheck,
  Clock, CheckCircle, BarChart3, ArrowRight, ShieldAlert,
  CalendarPlus, UserPlus, Sparkles, QrCode, Briefcase, PlusCircle
} from 'lucide-react';
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

const COLORS = ['#3b82f6', '#8b5cf6', '#22d3ee', '#f59e0b', '#10b981', '#ef4444'];

export const AdminDashboard = () => {
  const { user } = useAuth();
  const [analytics, setAnalytics] = useState(null);
  const [recentLogs, setRecentLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [anRes, logRes] = await Promise.all([
          reportService.getSystemAnalytics(),
          auditLogService.getAuditLogs({ limit: 5 })
        ]);
        if (anRes.success) setAnalytics(anRes.data);
        if (logRes.success) setRecentLogs(logRes.data);
      } catch (err) {
        console.error('Failed to load admin analytics:', err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) return <LoadingState message="Loading central platform analytics..." />;

  const topEventsData = analytics?.topEvents?.map(e => ({
    name: e.title.length > 18 ? e.title.substring(0, 18) + '...' : e.title,
    registrations: e.registered || 0
  })) || [];

  return (
    <div className="space-y-8">
      {/* ============================================================ */}
      {/* 1. CAMPUS CENTRAL ADMIN BANNER WITH GLOSSY OVERLAY */}
      {/* ============================================================ */}
      <div className="relative rounded-3xl overflow-hidden glass-panel-glossy border border-white/20 shadow-2xl p-6 sm:p-10 min-h-[220px] flex flex-col justify-between">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105"
          style={{
            backgroundImage: `url('${campusHeroImg}')`,
            backgroundPosition: 'center 30%'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/85 to-navy-950/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-transparent to-navy-950/30" />

        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-2.5 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/20 border border-purple-400/30 text-purple-300 text-xs font-bold backdrop-blur-md">
                <ShieldCheck className="w-3.5 h-3.5" /> Central Administration HQ
              </span>
              <span className="px-2.5 py-1 rounded-full bg-white/10 text-white text-[11px] font-mono font-bold border border-white/20 backdrop-blur-md">
                TGI-ADM-001
              </span>
              <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-[11px] font-bold border border-emerald-400/30">
                Full Institutional Authority
              </span>
            </div>

            <div>
              <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight drop-shadow-md">
                Welcome, <span className="text-amber-400">{user?.name || 'Dr. Rajeshwar Sen'}</span>!
              </h1>
              <p className="text-xs sm:text-sm text-slate-200 mt-1 font-medium">
                Centralized institutional governance, audit monitoring, and executive controls for all TGI campuses.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link to="/admin/approvals">
              <button className="btn-gold px-4 py-2.5 text-xs sm:text-sm flex items-center gap-2 rounded-xl shadow-lg">
                <CheckCircle className="w-4 h-4" />
                <span>Executive Approvals</span>
              </button>
            </Link>
            <Link to="/admin/manual-register">
              <button className="btn-glass px-4 py-2.5 text-xs sm:text-sm flex items-center gap-2 rounded-xl">
                <UserPlus className="w-4 h-4" />
                <span>Manual Seat Override</span>
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 2. ADMINISTRATIVE COMMAND & GOVERNANCE HUB */}
      {/* ============================================================ */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base sm:text-lg font-bold text-white tracking-tight flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Administrative Command & Governance</span>
          </h2>
          <span className="text-xs text-slate-400">Direct executive controls</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {/* Action 1: Event Approvals */}
          <Link
            to="/admin/approvals"
            className="glass-panel glass-card-hover p-4 rounded-2xl border border-amber-400/20 flex flex-col justify-between group transition-all"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform border border-amber-400/30">
              <CheckCircle className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-white text-xs sm:text-sm">Approvals</p>
              <p className="text-[11px] text-slate-400 mt-0.5">Sanction proposals</p>
            </div>
          </Link>

          {/* Action 2: Appoint Faculty */}
          <Link
            to="/admin/faculty"
            className="glass-panel glass-card-hover p-4 rounded-2xl border border-blue-400/20 flex flex-col justify-between group transition-all"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform border border-blue-400/30">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-white text-xs sm:text-sm">Appoint Faculty</p>
              <p className="text-[11px] text-slate-400 mt-0.5">Mentors & HODs</p>
            </div>
          </Link>

          {/* Action 3: Appoint Committee */}
          <Link
            to="/admin/committee"
            className="glass-panel glass-card-hover p-4 rounded-2xl border border-purple-400/20 flex flex-col justify-between group transition-all"
          >
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform border border-purple-400/30">
              <Briefcase className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-white text-xs sm:text-sm">Appoint Committee</p>
              <p className="text-[11px] text-slate-400 mt-0.5">6 Student Councils</p>
            </div>
          </Link>

          {/* Action 4: Manage Students */}
          <Link
            to="/admin/students"
            className="glass-panel glass-card-hover p-4 rounded-2xl border border-sky-400/20 flex flex-col justify-between group transition-all"
          >
            <div className="w-10 h-10 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform border border-sky-400/30">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-white text-xs sm:text-sm">Students</p>
              <p className="text-[11px] text-slate-400 mt-0.5">Rosters & Passes</p>
            </div>
          </Link>

          {/* Action 5: Gate Attendance */}
          <Link
            to="/admin/attendance"
            className="glass-panel glass-card-hover p-4 rounded-2xl border border-emerald-400/20 flex flex-col justify-between group transition-all"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform border border-emerald-400/30">
              <QrCode className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-white text-xs sm:text-sm">Gate Attendance</p>
              <p className="text-[11px] text-slate-400 mt-0.5">Live QR scanners</p>
            </div>
          </Link>

          {/* Action 6: Audit Logs */}
          <Link
            to="/admin/audit-logs"
            className="glass-panel glass-card-hover p-4 rounded-2xl border border-rose-400/20 flex flex-col justify-between group transition-all"
          >
            <div className="w-10 h-10 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform border border-rose-400/30">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-white text-xs sm:text-sm">Audit Trail</p>
              <p className="text-[11px] text-slate-400 mt-0.5">Security records</p>
            </div>
          </Link>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 3. KEY METRICS: 4 HIGH-IMPACT STATS */}
      {/* ============================================================ */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Active Events" value={analytics?.activeEvents || analytics?.totalEvents || 0} icon={Calendar} color="blue" subtitle="Live across campus" />
        <StatCard title="Enrolled Students" value={analytics?.totalStudents || 0} icon={Users} color="purple" subtitle="Official registered profiles" />
        <StatCard title="Total Registrations" value={analytics?.totalRegistrations || 0} icon={FileCheck} color="cyan" subtitle="Digital passes issued" />
        <StatCard title="Appointed Mentors" value={analytics?.totalFaculty || 2} icon={GraduationCap} color="amber" subtitle="Authorized faculty" />
      </div>

      {/* ============================================================ */}
      {/* 4. VISUAL METRICS CHARTS */}
      {/* ============================================================ */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Registrations Trend (Last 30 Days)">
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={analytics?.registrationTrends || []}>
              <defs>
                <linearGradient id="adminColorReg" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="date" tick={{ fill: '#94a3b8', fontSize: 11 }} />
              <YAxis tick={{ fill: '#94a3b8', fontSize: 11 }} />
              <Tooltip contentStyle={{ background: '#0a1628', border: '1px solid #1e3a5f', borderRadius: 8, color: '#e2e8f0' }} />
              <Area type="monotone" dataKey="registrations" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#adminColorReg)" />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Category Distribution">
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={analytics?.categoryDistribution || []}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="name" tick={{ fill: '#94a3b8', fontSize: 11 }} />
              <YAxis tick={{ fill: '#94a3b8', fontSize: 11 }} />
              <Tooltip contentStyle={{ background: '#0a1628', border: '1px solid #1e3a5f', borderRadius: 8, color: '#e2e8f0' }} />
              <Bar dataKey="count" fill="#8b5cf6" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* ============================================================ */}
      {/* 5. LIVE SYSTEM AUDIT STRIP */}
      {/* ============================================================ */}
      <div className="glass-panel p-6 rounded-2xl border border-white/10 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-amber-400" />
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">Live System Audit Activity</h2>
          </div>
          <Link to="/admin/audit-logs" className="text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1 font-semibold">
            All Audit Records <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="space-y-2">
          {recentLogs.length === 0 ? (
            <p className="text-xs text-slate-500 py-4 text-center">No recent audit logs.</p>
          ) : (
            recentLogs.map(log => (
              <div key={log.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 rounded-xl bg-navy-950/60 border border-white/5 text-xs gap-2 hover:border-white/10 transition-colors">
                <div className="flex items-center gap-3">
                  <span className="px-2 py-0.5 rounded font-mono text-[11px] font-bold bg-amber-400/10 text-amber-400 border border-amber-400/30">
                    {log.action}
                  </span>
                  <span className="text-slate-200 font-medium">{log.details || log.description}</span>
                </div>
                <div className="flex items-center gap-4 text-slate-400">
                  <span>By: <strong className="text-slate-300">{log.performedBy || log.actor}</strong></span>
                  <span className="text-slate-500 font-mono">{log.timestamp ? new Date(log.timestamp).toLocaleTimeString('en-IN') : 'Just now'}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
