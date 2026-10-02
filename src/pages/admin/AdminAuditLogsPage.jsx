import React, { useState, useEffect, useCallback } from 'react';
import { auditLogService } from '../../services/auditLogService';
import { DataTable } from '../../components/common/DataTable';
import { SearchBar } from '../../components/common/SearchBar';
import { Select } from '../../components/common/Select';
import { LoadingState } from '../../components/common/LoadingState';
import { ShieldCheck, ShieldAlert, History, Filter } from 'lucide-react';

export const AdminAuditLogsPage = () => {
  const [logs, setLogs] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [actionFilter, setActionFilter] = useState('');

  const loadLogs = async () => {
    setLoading(true);
    const res = await auditLogService.getAuditLogs({});
    if (res.success) setLogs(res.data);
    setLoading(false);
  };

  useEffect(() => { loadLogs(); }, []);

  const applyFilters = useCallback(() => {
    let arr = [...logs];
    if (search.trim()) {
      const q = search.toLowerCase();
      arr = arr.filter(l =>
        (l.performedBy || l.actor || '').toLowerCase().includes(q) ||
        (l.details || l.description || '').toLowerCase().includes(q) ||
        (l.action || '').toLowerCase().includes(q) ||
        (l.targetId || '').toLowerCase().includes(q)
      );
    }
    if (actionFilter) {
      arr = arr.filter(l => l.action === actionFilter);
    }
    setFiltered(arr);
  }, [logs, search, actionFilter]);

  useEffect(() => { applyFilters(); }, [applyFilters]);

  const getActionBadge = (action) => {
    if (action.includes('OVERRIDE')) {
      return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
    }
    if (action.includes('CANCEL')) {
      return 'bg-red-500/10 text-red-400 border-red-500/30';
    }
    if (action.includes('APPROVE')) {
      return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
    }
    if (action.includes('ATTENDANCE')) {
      return 'bg-purple-500/10 text-purple-400 border-purple-500/30';
    }
    return 'bg-blue-500/10 text-blue-400 border-blue-500/30';
  };

  const columns = [
    {
      key: 'timestamp',
      header: 'Timestamp',
      render: (val) => (
        <span className="text-xs text-slate-400 font-mono">
          {val ? new Date(val).toLocaleString('en-IN') : 'Just now'}
        </span>
      )
    },
    {
      key: 'action',
      header: 'Security Action',
      render: (val) => (
        <span className={`px-2 py-0.5 rounded font-mono text-[11px] font-bold border ${getActionBadge(val)}`}>
          {val}
        </span>
      )
    },
    {
      key: 'performedBy',
      header: 'Actor / Identity',
      render: (val, row) => (
        <span className="text-xs font-semibold text-slate-200">
          {val || row.actor || 'System'}
        </span>
      )
    },
    {
      key: 'details',
      header: 'Action Justification & Details',
      render: (val, row) => (
        <span className="text-xs text-slate-300">
          {val || row.description || 'Action committed to audit trail.'}
        </span>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <div className="glass-panel p-6 rounded-3xl border border-red-500/20 bg-red-950/10">
        <div className="flex items-center gap-2 text-red-400 font-bold text-xs uppercase tracking-wider mb-1">
          <ShieldAlert className="w-4 h-4" /> Non-Repudiation Security Log
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">Institutional Audit Logs</h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Immutable audit record of all administrative overrides, manual enrollments, attendance corrections, and approvals.
        </p>
      </div>

      <div className="glass-panel p-4 rounded-2xl border border-slate-800 flex flex-col sm:flex-row gap-3">
        <div className="flex-1">
          <SearchBar value={search} onChange={setSearch} placeholder="Search audit logs by actor, action, details…" />
        </div>
        <Select
          options={[
            { value: '', label: 'All Action Types' },
            { value: 'MANUAL_OVERRIDE_REGISTRATION', label: 'Manual Overrides' },
            { value: 'ATTENDANCE_MARKED', label: 'Attendance Mark' },
            { value: 'ATTENDANCE_CORRECTION', label: 'Attendance Correction' },
            { value: 'EVENT_APPROVED', label: 'Event Approved' },
            { value: 'EVENT_CANCELLED', label: 'Event Cancelled' },
            { value: 'WAITLIST_APPROVED', label: 'Waitlist Approved' }
          ]}
          value={actionFilter}
          onChange={e => setActionFilter(e.target.value)}
          className="sm:w-60"
        />
      </div>

      {loading ? (
        <LoadingState message="Loading immutable audit trail..." />
      ) : (
        <DataTable columns={columns} data={filtered} emptyMessage="No audit records found matching criteria." />
      )}
    </div>
  );
};
