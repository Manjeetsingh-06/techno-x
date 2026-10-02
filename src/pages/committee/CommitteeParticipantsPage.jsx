import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Users, Search } from 'lucide-react';
import { registrationService } from '../../services/registrationService';
import { DataTable } from '../../components/common/DataTable';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Badge } from '../../components/common/Badge';
import { LoadingState } from '../../components/common/LoadingState';
import { EmptyState } from '../../components/common/EmptyState';

const STATUS_OPTIONS = ['All', 'pending', 'confirmed', 'attended', 'cancelled'];

const TYPE_BADGE_STYLES = {
  Manual: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
  Self:   'bg-sky-500/10 text-sky-400 border-sky-500/30',
};

const columns = [
  {
    key: 'studentName',
    header: 'Student',
    render: (_, row) => (
      <div>
        <p className="text-white font-medium">{row.studentName || row.student?.name || '—'}</p>
        <p className="text-xs text-slate-500">{row.studentEmail || row.student?.email || ''}</p>
      </div>
    ),
  },
  {
    key: 'studentId',
    header: 'Student ID',
    render: (_, row) => (
      <span className="text-slate-300 font-mono text-sm">
        {row.studentId || row.student?.rollNo || row.student?.id || '—'}
      </span>
    ),
  },
  {
    key: 'eventName',
    header: 'Event',
    render: (_, row) => (
      <span className="text-slate-300">{row.eventName || row.event?.name || row.event?.title || '—'}</span>
    ),
  },
  {
    key: 'registeredAt',
    header: 'Registered On',
    render: (_, row) => {
      const raw = row.registeredAt || row.createdAt || row.registrationDate;
      if (!raw) return <span className="text-slate-500">—</span>;
      return (
        <span className="text-slate-400 text-sm">
          {new Date(raw).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
        </span>
      );
    },
  },
  {
    key: 'status',
    header: 'Status',
    render: (_, row) => <StatusBadge status={row.status} />,
  },
  {
    key: 'type',
    header: 'Type',
    render: (_, row) => {
      const type = row.registrationType === 'manual' || row.type === 'manual' ? 'Manual' : 'Self';
      return (
        <span className={`px-2.5 py-1 rounded-lg text-xs font-medium border ${TYPE_BADGE_STYLES[type]}`}>
          {type}
        </span>
      );
    },
  },
];

export const CommitteeParticipantsPage = () => {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const fetchRegistrations = useCallback(async () => {
    setLoading(true);
    try {
      const res = await registrationService.getAllRegistrations();
      if (res.success) {
        setRegistrations(res.data || []);
      }
    } catch (err) {
      console.error('Failed to fetch registrations:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchRegistrations(); }, [fetchRegistrations]);

  const filtered = useMemo(() => {
    let data = registrations;
    if (statusFilter !== 'All') {
      data = data.filter(r => (r.status || '').toLowerCase() === statusFilter.toLowerCase());
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      data = data.filter(r =>
        (r.studentName || r.student?.name || '').toLowerCase().includes(q) ||
        (r.studentEmail || r.student?.email || '').toLowerCase().includes(q) ||
        (r.studentId || r.student?.rollNo || '').toLowerCase().includes(q) ||
        (r.eventName || r.event?.name || r.event?.title || '').toLowerCase().includes(q)
      );
    }
    return data;
  }, [registrations, search, statusFilter]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Participants</h1>
        <p className="text-slate-400 text-sm mt-1">All student registrations across events</p>
      </div>

      {/* Filters */}
      <div className="glass-panel rounded-2xl border border-slate-800 p-4">
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search */}
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search by student, ID, or event…"
              className="w-full bg-slate-800/60 border border-slate-700 rounded-xl pl-9 pr-4 py-2.5 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-purple-500 transition-colors"
            />
          </div>

          {/* Status filter */}
          <div className="flex gap-2 flex-wrap">
            {STATUS_OPTIONS.map(s => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                  statusFilter === s
                    ? 'bg-purple-600 border-purple-500 text-white'
                    : 'border-slate-700 text-slate-400 hover:border-slate-500 hover:text-slate-300'
                }`}
              >
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </button>
            ))}
          </div>

          <span className="text-xs text-slate-500 self-center whitespace-nowrap">
            {filtered.length} record{filtered.length !== 1 ? 's' : ''}
          </span>
        </div>
      </div>

      {/* Table */}
      {loading ? (
        <LoadingState message="Loading registrations…" />
      ) : filtered.length === 0 ? (
        <EmptyState
          icon={Users}
          title="No registrations found"
          description="Try adjusting your search or filter criteria."
        />
      ) : (
        <div className="glass-panel rounded-2xl border border-slate-800 overflow-hidden">
          <DataTable columns={columns} data={filtered} />
        </div>
      )}
    </div>
  );
};
