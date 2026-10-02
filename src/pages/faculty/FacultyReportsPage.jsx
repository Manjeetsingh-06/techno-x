import React, { useState, useEffect } from 'react';
import { reportService } from '../../services/reportService';
import { ChartCard } from '../../components/common/ChartCard';
import { StatCard } from '../../components/common/StatCard';
import { LoadingState } from '../../components/common/LoadingState';
import { FileBarChart, Users, Calendar, TrendingUp, Download } from 'lucide-react';
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';

const COLORS = ['#3b82f6', '#8b5cf6', '#22d3ee', '#f59e0b', '#34d399', '#f87171'];

export const FacultyReportsPage = () => {
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

  if (loading) return <LoadingState message="Generating reports..." />;
  if (!analytics) return null;

  return (
    <div className="space-y-6">
      <div className="glass-panel p-6 rounded-3xl border border-blue-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">Academic Reports & Analytics</h1>
          <p className="text-xs text-slate-400 mt-1">Faculty read-only view of institutional event participation and engagement data.</p>
        </div>
        <button
          onClick={() => window.print()}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600/20 border border-blue-500/40 text-blue-300 text-xs font-semibold hover:bg-blue-600/30 transition-colors"
        >
          <Download className="w-3.5 h-3.5" /> Export / Print
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Events" value={analytics.totalEvents} icon={Calendar} color="blue" />
        <StatCard title="Total Students" value={analytics.totalStudents} icon={Users} color="purple" />
        <StatCard title="Total Registrations" value={analytics.totalRegistrations} icon={FileBarChart} color="cyan" />
        <StatCard title="Active Events" value={analytics.activeEvents} icon={TrendingUp} color="green" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ChartCard title="Registration Trends (Last 30 Days)">
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={analytics.registrationTrends || []}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e3a5f" />
              <XAxis dataKey="date" tick={{ fill: '#94a3b8', fontSize: 10 }} />
              <YAxis tick={{ fill: '#94a3b8', fontSize: 10 }} />
              <Tooltip contentStyle={{ background: '#0a1628', border: '1px solid #1e3a5f', borderRadius: 8, color: '#e2e8f0', fontSize: 12 }} />
              <Area type="monotone" dataKey="registrations" stroke="#3b82f6" fill="#3b82f620" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Events by Category">
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={analytics.categoryDistribution || []}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e3a5f" />
              <XAxis dataKey="category" tick={{ fill: '#94a3b8', fontSize: 10 }} />
              <YAxis tick={{ fill: '#94a3b8', fontSize: 10 }} />
              <Tooltip contentStyle={{ background: '#0a1628', border: '1px solid #1e3a5f', borderRadius: 8, color: '#e2e8f0', fontSize: 12 }} />
              <Bar dataKey="count" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <ChartCard title="Event Status Distribution">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <ResponsiveContainer width={200} height={200}>
            <PieChart>
              <Pie data={analytics.statusDistribution || []} dataKey="count" nameKey="status" cx="50%" cy="50%" outerRadius={80}>
                {(analytics.statusDistribution || []).map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ background: '#0a1628', border: '1px solid #1e3a5f', borderRadius: 8, color: '#e2e8f0', fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap gap-3">
            {(analytics.statusDistribution || []).map((item, i) => (
              <div key={item.status} className="flex items-center gap-2 text-sm">
                <span className="w-3 h-3 rounded-full" style={{ background: COLORS[i % COLORS.length] }} />
                <span className="text-slate-300">{item.status}</span>
                <span className="text-slate-500 font-mono text-xs">({item.count})</span>
              </div>
            ))}
          </div>
        </div>
      </ChartCard>
    </div>
  );
};
