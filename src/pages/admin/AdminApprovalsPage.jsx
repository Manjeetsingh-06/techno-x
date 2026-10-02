import React, { useState, useEffect } from 'react';
import { eventService } from '../../services/eventService';
import { useAuth } from '../../context/AuthContext';
import { useNotifications } from '../../context/NotificationContext';
import { DataTable } from '../../components/common/DataTable';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Button } from '../../components/common/Button';
import { ConfirmationModal } from '../../components/common/ConfirmationModal';
import { LoadingState } from '../../components/common/LoadingState';
import { ShieldCheck, Calendar, Users, MapPin, Check } from 'lucide-react';

export const AdminApprovalsPage = () => {
  const { user } = useAuth();
  const { showSuccess, showError } = useNotifications();
  const [pendingEvents, setPendingEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const fetchPending = async () => {
    setLoading(true);
    const res = await eventService.getEvents();
    if (res.success) {
      setPendingEvents(res.data.filter(e => e.status === 'PENDING_APPROVAL'));
    }
    setLoading(false);
  };

  useEffect(() => { fetchPending(); }, []);

  const handleApprove = async () => {
    setSubmitting(true);
    try {
      const res = await eventService.approveEvent(selectedEvent.id, user);
      if (res.success) {
        showSuccess(`Event "${selectedEvent.title}" approved and published by Admin.`);
        setConfirmOpen(false);
        fetchPending();
      } else {
        showError(res.error || 'Approval failed');
      }
    } catch (err) {
      showError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const columns = [
    {
      key: 'title',
      header: 'Event Title',
      render: (val, row) => (
        <div>
          <p className="font-bold text-white text-sm">{val}</p>
          <p className="text-xs text-sky-400">{row.category}</p>
        </div>
      ),
    },
    {
      key: 'date',
      header: 'Scheduled Date',
      render: (val) => (
        <span className="inline-flex items-center gap-1.5 text-xs text-slate-300">
          <Calendar className="w-3.5 h-3.5 text-blue-400" /> {val}
        </span>
      ),
    },
    {
      key: 'venue',
      header: 'Venue',
      render: (val) => (
        <span className="inline-flex items-center gap-1.5 text-xs text-slate-300">
          <MapPin className="w-3.5 h-3.5 text-blue-400" /> {val}
        </span>
      ),
    },
    {
      key: 'capacity',
      header: 'Capacity',
      render: (val) => (
        <span className="inline-flex items-center gap-1.5 text-xs text-slate-300">
          <Users className="w-3.5 h-3.5 text-blue-400" /> {val} seats
        </span>
      ),
    },
    {
      key: 'organizer',
      header: 'Organizing Body',
      render: (val) => <span className="text-xs text-slate-400">{val}</span>,
    },
    {
      key: 'status',
      header: 'Status',
      render: (val) => <StatusBadge status={val} />,
    },
    {
      key: 'actions',
      header: 'Action',
      align: 'right',
      render: (_, row) => (
        <Button
          variant="electric"
          size="sm"
          icon={Check}
          onClick={() => { setSelectedEvent(row); setConfirmOpen(true); }}
        >
          Admin Approve
        </Button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="glass-panel p-6 rounded-3xl border border-red-500/20 bg-red-950/10">
        <div className="flex items-center gap-2 text-red-400 font-bold text-xs uppercase tracking-wider mb-1">
          <ShieldCheck className="w-4 h-4" /> Administrative Authorization
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">Event Approvals & Override</h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Administrators have override clearance to approve and publish event proposals without requiring separate faculty review.
        </p>
      </div>

      {loading ? (
        <LoadingState message="Loading pending proposals..." />
      ) : pendingEvents.length === 0 ? (
        <div className="glass-panel p-12 rounded-2xl border border-slate-800 text-center text-slate-400 text-sm">
          No events currently awaiting approval.
        </div>
      ) : (
        <DataTable
          columns={columns}
          data={pendingEvents}
          emptyMessage="No pending event proposals to review."
        />
      )}

      <ConfirmationModal
        isOpen={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleApprove}
        title="Admin Override: Approve Event"
        description="Publish this event to the live student calendar immediately."
        confirmText="Confirm & Publish"
        confirmVariant="electric"
        type="info"
        isLoading={submitting}
        details={selectedEvent ? {
          'Event Title': selectedEvent.title,
          'Proposed Date': selectedEvent.date,
          'Venue': selectedEvent.venue,
          'Organizer': selectedEvent.organizer,
          'Capacity': `${selectedEvent.capacity} seats`,
        } : null}
      />
    </div>
  );
};
