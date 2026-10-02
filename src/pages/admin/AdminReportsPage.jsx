import React, { useState, useEffect } from 'react';
import { reportService } from '../../services/reportService';
import { ChartCard } from '../../components/common/ChartCard';
import { StatCard } from '../../components/common/StatCard';
import { LoadingState } from '../../components/common/LoadingState';
import { Button } from '../../components/common/Button';
import { FileBarChart, Users, Calendar, TrendingUp, Download, Printer } from 'lucide-react';
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

const COLORS = ['#3b82f6', '#8b5cf6', '#22d3ee', '#f59e0b', '#10b981', '#ef4444'];

export const AdminReportsPage = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const res = await reportService.getSystemAnalytics();
      if (res.success) setAnalytics(res.data);
      setLoading(false);
    };
    load();
  }, []);

  if (loading) return <LoadingState message="Generating administrative report packet..." />;
  if (!analytics) return null;

  return (
    <div className="space-y-6">
      <div className="glass-panel p-6 rounded-3xl border border-blue-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">Executive System Reports</h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">Official event summaries and institutional governance performance records.</p>
        </div>
        <Button variant="outline" icon={Printer} onClick={() => window.print()}>
          Print / Export PDF
        </Button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Events Recorded" value={analytics.totalEvents} icon={Calendar} color="blue" />
        <StatCard title="Enrolled Students" value={analytics.totalStudents} icon={Users} color="purple" />
        <StatCard title="Total Registrations" value={analytics.totalRegistrations} icon={FileBarChart} color="cyan" />
        <StatCard title="Active Running Events" value={analytics.activeEvents} icon={TrendingUp} color="green" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Registration Growth Trend">
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={analytics.registrationTrends || []}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="date" tick={{ fill: '#94a3b8', fontSize: 10 }} />
              <YAxis tick={{ fill: '#94a3b8', fontSize: 10 }} />
              <Tooltip contentStyle={{ background: '#0a1628', border: '1px solid #1e3a5f', borderRadius: 8, color: '#e2e8f0' }} />
              <Area type="monotone" dataKey="registrations" stroke="#3b82f6" fill="#3b82f620" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Domain Distribution">
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={analytics.categoryDistribution || []}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="category" tick={{ fill: '#94a3b8', fontSize: 10 }} />
              <YAxis tick={{ fill: '#94a3b8', fontSize: 10 }} />
              <Tooltip contentStyle={{ background: '#0a1628', border: '1px solid #1e3a5f', borderRadius: 8, color: '#e2e8f0' }} />
              <Bar dataKey="count" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <div className="glass-panel p-6 rounded-2xl border border-slate-800">
        <h2 className="text-sm font-bold text-white uppercase tracking-wider mb-4 text-slate-300">
          Techno Group of Institutions &bull; Institutional Event Metrics
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-900/60 text-slate-400 font-semibold border-b border-slate-800">
              <tr>
                <th className="p-3">Event Title</th>
                <th className="p-3">Category</th>
                <th className="p-3">Capacity</th>
                <th className="p-3">Registrations</th>
                <th className="p-3">Fill Rate</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-sans">
              {(analytics.topEvents || []).map(ev => (
                <tr key={ev.id} className="hover:bg-slate-900/40">
                  <td className="p-3 font-semibold text-white">{ev.title}</td>
                  <td className="p-3 text-sky-400">{ev.category}</td>
                  <td className="p-3">{ev.capacity}</td>
                  <td className="p-3 font-mono font-bold">{ev.registered || 0}</td>
                  <td className="p-3 font-mono text-emerald-400">
                    {Math.round(((ev.registered || 0) / ev.capacity) * 100)}%
                  </td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20">
                      {ev.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
