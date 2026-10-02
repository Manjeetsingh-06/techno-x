import React, { useState, useEffect, useCallback } from 'react';
import { eventService } from '../../services/eventService';
import { useAuth } from '../../context/AuthContext';
import { useNotifications } from '../../context/NotificationContext';
import { DataTable } from '../../components/common/DataTable';
import { SearchBar } from '../../components/common/SearchBar';
import { Select } from '../../components/common/Select';
import { Button } from '../../components/common/Button';
import { StatusBadge } from '../../components/common/StatusBadge';
import { LoadingState } from '../../components/common/LoadingState';
import { ConfirmationModal } from '../../components/common/ConfirmationModal';
import { CalendarPlus, Calendar, MapPin, Users, CheckCircle, Ban, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';

export const AdminEventsPage = () => {
  const { user } = useAuth();
  const { showSuccess, showError } = useNotifications();
  const [events, setEvents] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const [selectedEvent, setSelectedEvent] = useState(null);
  const [actionType, setActionType] = useState(null); // 'APPROVE' | 'CANCEL'
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const loadEvents = async () => {
    setLoading(true);
    const res = await eventService.getEvents();
    if (res.success) setEvents(res.data);
    setLoading(false);
  };

  useEffect(() => { loadEvents(); }, []);

  const applyFilters = useCallback(() => {
    let arr = [...events];
    if (search.trim()) {
      const q = search.toLowerCase();
      arr = arr.filter(e =>
        e.title.toLowerCase().includes(q) ||
        e.venue.toLowerCase().includes(q) ||
        e.organizer.toLowerCase().includes(q) ||
        (e.category || '').toLowerCase().includes(q)
      );
    }
    if (statusFilter) arr = arr.filter(e => e.status === statusFilter);
    setFiltered(arr);
  }, [events, search, statusFilter]);

  useEffect(() => { applyFilters(); }, [applyFilters]);

  const handleConfirmAction = async () => {
    if (!selectedEvent || !actionType) return;
    setSubmitting(true);
    try {
      if (actionType === 'APPROVE') {
        const res = await eventService.approveEvent(selectedEvent.id, user);
        if (res.success) {
          showSuccess(`Event "${selectedEvent.title}" approved and published.`);
          loadEvents();
        } else {
          showError(res.error || 'Failed to approve event');
        }
      } else if (actionType === 'CANCEL') {
        const res = await eventService.cancelEvent(selectedEvent.id, user);
        if (res.success) {
          showSuccess(`Event "${selectedEvent.title}" cancelled.`);
          loadEvents();
        } else {
          showError(res.error || 'Failed to cancel event');
        }
      }
    } catch (err) {
      showError(err.message);
    } finally {
      setSubmitting(false);
      setIsModalOpen(false);
      setSelectedEvent(null);
      setActionType(null);
    }
  };

  const columns = [
    {
      key: 'title',
      header: 'Event Name',
      render: (val, row) => (
        <div>
          <span className="font-semibold text-white">{val}</span>
          <p className="text-xs text-sky-400">{row.category} &bull; {row.organizer}</p>
        </div>
      )
    },
    {
      key: 'date',
      header: 'Date & Time',
      render: (val, row) => (
        <span className="text-xs text-slate-300">
          {val} &bull; {row.time || '10:00 AM'}
        </span>
      )
    },
    { key: 'venue', header: 'Venue', render: val => <span className="text-xs text-slate-300">{val}</span> },
    {
      key: 'capacity',
      header: 'Enrollment',
      render: (val, row) => (
        <div className="w-28">
          <div className="flex justify-between text-[11px] text-slate-400 mb-1">
            <span>{row.registered || 0}/{val}</span>
            <span>{Math.round(((row.registered || 0) / val) * 100)}%</span>
          </div>
          <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
            <div
              className={`h-full ${
                (row.registered || 0) >= val ? 'bg-amber-500' : 'bg-blue-500'
              }`}
              style={{ width: `${Math.min(100, Math.round(((row.registered || 0) / val) * 100))}%` }}
            />
          </div>
        </div>
      )
    },
    {
      key: 'status',
      header: 'Status',
      render: (val) => <StatusBadge status={val} />
    },
    {
      key: 'actions',
      header: 'Admin Actions',
      align: 'right',
      render: (_, row) => (
        <div className="flex items-center justify-end gap-2">
          {row.status === 'PENDING_APPROVAL' && (
            <Button
              variant="electric"
              size="xs"
              icon={CheckCircle}
              onClick={() => { setSelectedEvent(row); setActionType('APPROVE'); setIsModalOpen(true); }}
            >
              Approve
            </Button>
          )}
          {row.status !== 'CANCELLED' && row.status !== 'COMPLETED' && (
            <Button
              variant="outline"
              size="xs"
              icon={Ban}
              onClick={() => { setSelectedEvent(row); setActionType('CANCEL'); setIsModalOpen(true); }}
            >
              Cancel
            </Button>
          )}
          <Link to={`/events/${row.id}`} target="_blank">
            <Button variant="ghost" size="xs" icon={Eye}>View</Button>
          </Link>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <div className="glass-panel p-6 rounded-3xl border border-blue-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">Manage Institutional Events</h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">Supervise, approve, and oversee all campus events.</p>
        </div>
        <Link to="/admin/events/plan">
          <Button variant="electric" icon={CalendarPlus}>Plan / Post Event</Button>
        </Link>
      </div>

      <div className="glass-panel p-4 rounded-2xl border border-slate-800 flex flex-col sm:flex-row gap-3">
        <div className="flex-1">
          <SearchBar value={search} onChange={setSearch} placeholder="Search events by title, venue, category…" />
        </div>
        <Select
          options={[
            { value: '', label: 'All Statuses' },
            { value: 'OPEN', label: 'OPEN' },
            { value: 'PENDING_APPROVAL', label: 'PENDING_APPROVAL' },
            { value: 'FULL', label: 'FULL' },
            { value: 'CLOSED', label: 'CLOSED' },
            { value: 'COMPLETED', label: 'COMPLETED' },
            { value: 'CANCELLED', label: 'CANCELLED' }
          ]}
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
          className="sm:w-48"
        />
      </div>

      {loading ? (
        <LoadingState message="Loading events..." />
      ) : (
        <DataTable columns={columns} data={filtered} emptyMessage="No events found." />
      )}

      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmAction}
        title={actionType === 'APPROVE' ? 'Approve Event Proposal?' : 'Cancel Event?'}
        description={
          actionType === 'APPROVE'
            ? `Are you sure you want to approve "${selectedEvent?.title}"? It will be published to all students immediately.`
            : `Are you sure you want to cancel "${selectedEvent?.title}"? Registered students will be notified.`
        }
        confirmText={actionType === 'APPROVE' ? 'Approve & Publish' : 'Confirm Cancellation'}
        confirmVariant={actionType === 'APPROVE' ? 'electric' : 'danger'}
        isLoading={submitting}
      />
    </div>
  );
};
