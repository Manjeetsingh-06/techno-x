import React, { useState, useEffect, useCallback } from 'react';
import { registrationService } from '../../services/registrationService';
import { DataTable } from '../../components/common/DataTable';
import { StatusBadge } from '../../components/common/StatusBadge';
import { LoadingState } from '../../components/common/LoadingState';
import { SearchBar } from '../../components/common/SearchBar';
import { Select } from '../../components/common/Select';
import { StatCard } from '../../components/common/StatCard';
import { ClipboardList, Users, CheckCircle, Clock, XCircle } from 'lucide-react';

export const FacultyRegistrationsPage = () => {
  const [registrations, setRegistrations] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  useEffect(() => {
    const load = async () => {
      // getAllRegistrations is used since Faculty can see all
      const res = await registrationService.getAllRegistrations();
      if (res.success) setRegistrations(res.data);
      setLoading(false);
    };
    load();
  }, []);

  const applyFilters = useCallback(() => {
    let arr = [...registrations];
    if (search.trim()) {
      const q = search.toLowerCase();
      arr = arr.filter(r =>
        (r.studentName || '').toLowerCase().includes(q) ||
        (r.studentId || '').toLowerCase().includes(q) ||
        (r.eventTitle || '').toLowerCase().includes(q)
      );
    }
    if (statusFilter) arr = arr.filter(r => r.status === statusFilter);
    setFiltered(arr);
  }, [registrations, search, statusFilter]);

  useEffect(() => { applyFilters(); }, [applyFilters]);

  const stats = {
    total: registrations.length,
    confirmed: registrations.filter(r => r.status === 'CONFIRMED').length,
    waitlisted: registrations.filter(r => r.status === 'WAITLISTED').length,
    cancelled: registrations.filter(r => r.status === 'CANCELLED').length,
  };

  const columns = [
    {
      key: 'studentName',
      header: 'Student',
      render: (val, row) => (
        <div>
          <p className="text-sm font-semibold text-white">{val}</p>
          <p className="text-xs text-slate-400 font-mono">{row.studentId}</p>
        </div>
      ),
    },
    {
      key: 'eventTitle',
      header: 'Event',
      render: (val) => <span className="text-sm text-slate-200">{val}</span>,
    },
    {
      key: 'registeredAt',
      header: 'Registered On',
      render: (val) => <span className="text-xs text-slate-400">{val ? new Date(val).toLocaleDateString('en-IN') : '—'}</span>,
    },
    {
      key: 'status',
      header: 'Status',
      render: (val) => <StatusBadge status={val} />,
    },
    {
      key: 'isManual',
      header: 'Type',
      render: (val) => (
        <span className={`text-xs font-mono px-2 py-0.5 rounded-full border ${val ? 'border-amber-500/40 text-amber-400 bg-amber-500/10' : 'border-slate-700 text-slate-400'}`}>
          {val ? 'Manual Override' : 'Self'}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="glass-panel p-6 rounded-3xl border border-blue-500/20">
        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">All Event Registrations</h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">Institutional-wide registration overview with live status tracking.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Registrations" value={stats.total} icon={ClipboardList} color="blue" />
        <StatCard title="Confirmed" value={stats.confirmed} icon={CheckCircle} color="green" />
        <StatCard title="Waitlisted" value={stats.waitlisted} icon={Clock} color="amber" />
        <StatCard title="Cancelled" value={stats.cancelled} icon={XCircle} color="red" />
      </div>

      <div className="glass-panel p-4 rounded-2xl border border-slate-800 flex flex-col sm:flex-row gap-3">
        <div className="flex-1">
          <SearchBar value={search} onChange={setSearch} placeholder="Search by student name, ID, or event…" />
        </div>
        <Select
          options={[
            { value: '', label: 'All Statuses' },
            { value: 'CONFIRMED', label: 'Confirmed' },
            { value: 'WAITLISTED', label: 'Waitlisted' },
            { value: 'CANCELLED', label: 'Cancelled' },
          ]}
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
          className="sm:w-48"
        />
      </div>

      {loading ? (
        <LoadingState message="Loading registrations…" />
      ) : (
        <DataTable
          columns={columns}
          data={filtered}
          emptyMessage="No registrations found for the selected filters."
        />
      )}
    </div>
  );
};
