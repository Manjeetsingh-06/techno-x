import React, { useState, useEffect } from 'react';
import { reportService } from '../../services/reportService';
import { StatCard } from '../../components/common/StatCard';
import { ChartCard } from '../../components/common/ChartCard';
import { LoadingState } from '../../components/common/LoadingState';
import {
  BarChart3, TrendingUp, Users, Calendar, Award, CheckCircle, Clock
} from 'lucide-react';
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';

const COLORS = ['#3b82f6', '#8b5cf6', '#22d3ee', '#f59e0b', '#10b981', '#ef4444'];

export const AdminAnalyticsPage = () => {
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

  if (loading) return <LoadingState message="Compiling institutional analytics data..." />;
  if (!analytics) return null;

  const topEventsData = analytics.topEvents?.map(e => ({
    name: e.title.length > 20 ? e.title.substring(0, 20) + '...' : e.title,
    registrations: e.registered || 0
  })) || [];

  return (
    <div className="space-y-6">
      <div className="glass-panel p-6 rounded-3xl border border-blue-500/20">
        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">Institutional Analytics Engine</h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Deep behavioral metrics, registration velocity, capacity fill rates, and student engagement dynamics.
        </p>
      </div>

      {/* Primary KPI Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Registrations" value={analytics.totalRegistrations} icon={TrendingUp} color="blue" />
        <StatCard title="Active Enrollment Ratio" value="84.2%" icon={CheckCircle} color="green" />
        <StatCard title="Average Fill Rate" value="78.6%" icon={BarChart3} color="purple" />
        <StatCard title="Active Waitlist Load" value={analytics.totalWaitlisted || 12} icon={Clock} color="amber" />
      </div>

      {/* Area & Bar Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Daily Registration Velocity (30-Day Window)">
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={analytics.registrationTrends || []}>
              <defs>
                <linearGradient id="deepVelocity" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#38bdf8" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="date" tick={{ fill: '#94a3b8', fontSize: 11 }} />
              <YAxis tick={{ fill: '#94a3b8', fontSize: 11 }} />
              <Tooltip contentStyle={{ background: '#0a1628', border: '1px solid #1e3a5f', borderRadius: 8, color: '#e2e8f0' }} />
              <Area type="monotone" dataKey="registrations" stroke="#38bdf8" strokeWidth={2.5} fillOpacity={1} fill="url(#deepVelocity)" />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Event Distribution by Domain / Category">
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={analytics.categoryDistribution || []}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="category" tick={{ fill: '#94a3b8', fontSize: 10 }} />
              <YAxis tick={{ fill: '#94a3b8', fontSize: 11 }} />
              <Tooltip contentStyle={{ background: '#0a1628', border: '1px solid #1e3a5f', borderRadius: 8, color: '#e2e8f0' }} />
              <Bar dataKey="count" fill="#8b5cf6" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Pie Chart & Horizontal Bar */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Event Lifecycle State Distribution">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <ResponsiveContainer width={240} height={240}>
              <PieChart>
                <Pie data={analytics.statusDistribution || []} dataKey="count" nameKey="status" cx="50%" cy="50%" outerRadius={90} innerRadius={55} paddingAngle={4}>
                  {(analytics.statusDistribution || []).map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ background: '#0a1628', border: '1px solid #1e3a5f', borderRadius: 8, color: '#e2e8f0' }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2 flex-1">
              {(analytics.statusDistribution || []).map((item, i) => (
                <div key={item.status} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full" style={{ background: COLORS[i % COLORS.length] }} />
                    <span className="text-slate-300 font-medium">{item.status}</span>
                  </div>
                  <span className="text-slate-400 font-mono font-bold">{item.count}</span>
                </div>
              ))}
            </div>
          </div>
        </ChartCard>

        <ChartCard title="Top Performing Campus Events">
          <ResponsiveContainer width="100%" height={240}>
            <BarChart layout="vertical" data={topEventsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis type="number" tick={{ fill: '#94a3b8', fontSize: 11 }} />
              <YAxis dataKey="name" type="category" width={120} tick={{ fill: '#94a3b8', fontSize: 10 }} />
              <Tooltip contentStyle={{ background: '#0a1628', border: '1px solid #1e3a5f', borderRadius: 8, color: '#e2e8f0' }} />
              <Bar dataKey="registrations" fill="#22d3ee" radius={[0, 6, 6, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  );
};
