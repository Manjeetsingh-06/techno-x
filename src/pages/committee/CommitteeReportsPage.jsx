import React, { useState, useEffect, useCallback } from 'react';
import { BarChart2, TrendingUp, Users, Calendar, Activity } from 'lucide-react';
import {
  AreaChart, Area,
  BarChart, Bar,
  PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend,
} from 'recharts';
import { reportService } from '../../services/reportService';
import { StatCard } from '../../components/common/StatCard';
import { ChartCard } from '../../components/common/ChartCard';
import { LoadingState } from '../../components/common/LoadingState';

const COLORS = ['#a855f7', '#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#06b6d4'];

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 shadow-xl text-sm">
      {label && <p className="text-slate-400 mb-1">{label}</p>}
      {payload.map((p, i) => (
        <p key={i} style={{ color: p.color }} className="font-medium">
          {p.name}: {p.value}
        </p>
      ))}
    </div>
  );
};

const CustomPieLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
  if (percent < 0.05) return null;
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  return (
    <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={11}>
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export const CommitteeReportsPage = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading]     = useState(true);

  const fetchAnalytics = useCallback(async () => {
    setLoading(true);
    try {
      const res = await reportService.getSystemAnalytics();
      if (res.success) setAnalytics(res.data);
    } catch (err) {
      console.error('Failed to fetch analytics:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchAnalytics(); }, [fetchAnalytics]);

  if (loading) return <LoadingState message="Loading analytics…" />;

  const {
    totalEvents         = 0,
    totalStudents       = 0,
    totalRegistrations  = 0,
    activeEvents        = 0,
    registrationTrends  = [],
    categoryDistribution = [],
    statusDistribution  = [],
  } = analytics || {};

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <BarChart2 size={22} className="text-purple-400" />
          Committee Event Analytics
        </h1>
        <p className="text-slate-400 text-sm mt-1">System-wide overview of events, participants, and trends.</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Events"
          value={totalEvents}
          icon={Calendar}
          color="purple"
        />
        <StatCard
          title="Total Students"
          value={totalStudents}
          icon={Users}
          color="sky"
        />
        <StatCard
          title="Registrations"
          value={totalRegistrations}
          icon={TrendingUp}
          color="emerald"
        />
        <StatCard
          title="Active Events"
          value={activeEvents}
          icon={Activity}
          color="amber"
        />
      </div>

      {/* Registration Trends — AreaChart */}
      <ChartCard title="Registration Trends">
        {registrationTrends.length > 0 ? (
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={registrationTrends} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorRegs" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#a855f7" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#a855f7" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="month" tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="registrations"
                name="Registrations"
                stroke="#a855f7"
                strokeWidth={2}
                fill="url(#colorRegs)"
              />
            </AreaChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-slate-500 text-sm text-center py-8">No trend data available.</p>
        )}
      </ChartCard>

      {/* Bottom row: BarChart + PieChart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Distribution — BarChart */}
        <ChartCard title="Events by Category">
          {categoryDistribution.length > 0 ? (
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={categoryDistribution} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="category" tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="count" name="Events" radius={[6, 6, 0, 0]}>
                  {categoryDistribution.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-slate-500 text-sm text-center py-8">No category data available.</p>
          )}
        </ChartCard>

        {/* Status Distribution — PieChart */}
        <ChartCard title="Registration Status">
          {statusDistribution.length > 0 ? (
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie
                  data={statusDistribution}
                  dataKey="count"
                  nameKey="status"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  labelLine={false}
                  label={<CustomPieLabel />}
                >
                  {statusDistribution.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  content={({ active, payload }) =>
                    active && payload?.length ? (
                      <div className="bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 shadow-xl text-sm">
                        <p style={{ color: payload[0].payload.fill ?? '#a855f7' }} className="font-medium capitalize">
                          {payload[0].name}: {payload[0].value}
                        </p>
                      </div>
                    ) : null
                  }
                />
                <Legend
                  formatter={(value) => (
                    <span className="text-slate-400 capitalize text-xs">{value}</span>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-slate-500 text-sm text-center py-8">No status data available.</p>
          )}
        </ChartCard>
      </div>
    </div>
  );
};
