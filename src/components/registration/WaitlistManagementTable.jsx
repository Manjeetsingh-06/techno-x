import React, { useState, useEffect } from 'react';
import { registrationService } from '../../services/registrationService';
import { useAuth } from '../../context/AuthContext';
import { useNotifications } from '../../context/NotificationContext';
import { DataTable } from '../common/DataTable';
import { StatusBadge } from '../common/StatusBadge';
import { Button } from '../common/Button';
import { ConfirmationModal } from '../common/ConfirmationModal';
import { Modal } from '../common/Modal';
import { DigitalPass } from './DigitalPass';
import { CheckCircle2, Clock, UserCheck, Sparkles } from 'lucide-react';

export const WaitlistManagementTable = ({ role = 'FACULTY' }) => {
  const { user } = useAuth();
  const { showSuccess, showError } = useNotifications();

  const [waitlist, setWaitlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [approvedPass, setApprovedPass] = useState(null);
  const [isPassModalOpen, setIsPassModalOpen] = useState(false);

  const fetchWaitlist = async () => {
    setLoading(true);
    const res = await registrationService.getWaitlist();
    if (res.success) setWaitlist(res.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchWaitlist();
  }, []);

  const handleApproveClick = (row) => {
    setSelectedItem(row);
    setIsConfirmOpen(true);
  };

  const handleConfirmApproval = async (reason) => {
    setSubmitting(true);
    try {
      const res = await registrationService.approveWaitlistedStudent({
        registrationId: selectedItem.registrationId,
        operator: user,
        reason: reason || 'Approved by Faculty/Admin capacity review',
      });

      if (res.success) {
        showSuccess(`Student ${selectedItem.studentName} promoted to REGISTERED. Digital Pass generated.`);
        setIsConfirmOpen(false);
        setApprovedPass(res.data);
        setIsPassModalOpen(true);
        fetchWaitlist();
      } else {
        showError(res.error || 'Failed to approve waitlist entry');
      }
    } catch (err) {
      showError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const columns = [
    {
      key: 'waitlistPosition',
      header: 'Queue Pos',
      render: (val) => (
        <span className="font-mono text-xs font-bold text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-md border border-amber-500/30">
          #{val || 1}
        </span>
      ),
    },
    {
      key: 'studentName',
      header: 'Student Name',
      render: (val, row) => (
        <div>
          <p className="font-bold text-white text-sm">{val}</p>
          <p className="text-sky-400 text-xs font-mono">{row.studentId}</p>
        </div>
      ),
    },
    {
      key: 'course',
      header: 'Program / Cohort',
      render: (val, row) => <span className="text-xs text-slate-300">{val} ({row.year})</span>,
    },
    {
      key: 'eventTitle',
      header: 'Target Event',
      render: (val, row) => (
        <div>
          <p className="font-semibold text-white text-xs">{val}</p>
          <p className="text-slate-400 text-[11px]">{row.eventDate}</p>
        </div>
      ),
    },
    {
      key: 'registeredAt',
      header: 'Requested Date',
      render: (val) => (
        <span className="text-xs text-slate-400 font-mono">
          {new Date(val).toLocaleDateString()} {new Date(val).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      ),
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
          icon={CheckCircle2}
          onClick={() => handleApproveClick(row)}
        >
          Approve Student
        </Button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="glass-panel p-6 rounded-3xl border border-amber-500/30 bg-gradient-to-r from-amber-500/10 to-navy-950">
        <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider mb-1">
          <Clock className="w-4 h-4" /> Capacity & Waitlist Queue
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          Waitlist Approvals
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 mt-1">
          Promote waitlisted candidates to confirmed attendance with automatic Digital QR Pass creation. All approvals are verified under your identity and recorded to the audit trail.
        </p>
      </div>

      <DataTable
        columns={columns}
        data={waitlist}
        isLoading={loading}
        emptyMessage="No students currently queued on the event waitlists."
      />

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={handleConfirmApproval}
        title="Approve Waitlisted Student"
        description="Are you sure you want to promote this student from WAITLISTED to REGISTERED? This will allocate an active seat and instantly issue their digital gate QR pass."
        confirmText="Confirm & Issue Pass"
        confirmVariant="electric"
        type="warning"
        requireReason={true}
        reasonPlaceholder="e.g. Approved by Dean of Academics due to seat expansion."
        isLoading={submitting}
        details={selectedItem ? {
          'Student Name': selectedItem.studentName,
          'Student ID': selectedItem.studentId,
          'Event': selectedItem.eventTitle,
          'Waitlist Position': `#${selectedItem.waitlistPosition}`,
        } : null}
      />

      {/* Pass Modal */}
      {approvedPass && (
        <Modal
          isOpen={isPassModalOpen}
          onClose={() => setIsPassModalOpen(false)}
          title="Digital Pass Activated"
          subtitle="Waitlist Clearance Confirmed"
          maxWidth="max-w-md"
        >
          <DigitalPass
            registration={approvedPass}
            showActions={true}
          />
        </Modal>
      )}
    </div>
  );
};
