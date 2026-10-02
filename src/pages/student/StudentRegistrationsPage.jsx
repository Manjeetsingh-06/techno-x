import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { registrationService } from '../../services/registrationService';
import { useNotifications } from '../../context/NotificationContext';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Button } from '../../components/common/Button';
import { EmptyState } from '../../components/common/EmptyState';
import { LoadingState } from '../../components/common/LoadingState';
import { ConfirmationModal } from '../../components/common/ConfirmationModal';
import { Ticket, Calendar, MapPin, XCircle, Sparkles } from 'lucide-react';

export const StudentRegistrationsPage = () => {
  const { user } = useAuth();
  const { showSuccess, showError } = useNotifications();

  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const [selectedReg, setSelectedReg] = useState(null);

  const fetchRegistrations = async () => {
    setLoading(true);
    const res = await registrationService.getStudentRegistrations();
    if (res.success) setRegistrations(res.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchRegistrations();
  }, [user]);

  const handleCancelClick = (reg) => {
    setSelectedReg(reg);
    setCancelModalOpen(true);
  };

  const handleConfirmCancel = async () => {
    try {
      const res = await registrationService.cancelRegistration(selectedReg.registrationId, user);
      if (res.success) {
        showSuccess('Registration cancelled successfully.');
        setCancelModalOpen(false);
        fetchRegistrations();
      } else {
        showError(res.error || 'Failed to cancel registration');
      }
    } catch (e) {
      showError(e.message);
    }
  };

  const filtered = registrations.filter((r) => {
    if (filterStatus === 'ALL') return true;
    return r.status === filterStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            My Event Passes & Registrations
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            View active digital entry passes, check QR validity, or monitor your waitlist position.
          </p>
        </div>

        <Link to="/student/events">
          <Button variant="electric" size="sm" icon={Sparkles}>
            Explore Events
          </Button>
        </Link>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-800">
        {['ALL', 'REGISTERED', 'WAITLISTED', 'ATTENDED', 'CANCELLED'].map((st) => (
          <button
            key={st}
            onClick={() => setFilterStatus(st)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
              filterStatus === st
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            {st} ({st === 'ALL' ? registrations.length : registrations.filter((r) => r.status === st).length})
          </button>
        ))}
      </div>

      {/* Registrations List */}
      {loading ? (
        <LoadingState message="Fetching registered passes..." />
      ) : filtered.length === 0 ? (
        <EmptyState
          icon={Ticket}
          title="No registrations found"
          description="You haven't registered for any events matching this filter category."
          actionLabel="Browse Events"
          onAction={() => window.location.href = '/student/events'}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filtered.map((reg) => (
            <div
              key={reg.id}
              className="glass-panel p-5 rounded-2xl border border-slate-800/80 hover:border-slate-700 transition-all flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono font-bold text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded-md border border-sky-400/20">
                    {reg.registrationId}
                  </span>
                  <StatusBadge status={reg.status} />
                </div>

                <h3 className="text-base font-bold text-white leading-snug">{reg.eventTitle}</h3>

                <div className="space-y-1.5 text-xs text-slate-300 mt-3 pt-3 border-t border-slate-800">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                    <span>{reg.eventDate}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                    <span className="truncate">{reg.eventVenue}</span>
                  </div>
                </div>

                {reg.status === 'WAITLISTED' && (
                  <div className="mt-3 p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300">
                    Currently at <span className="font-bold">Waitlist #{reg.waitlistPosition}</span>. You'll be notified if promoted.
                  </div>
                )}

                {reg.overrideType && (
                  <div className="mt-2 text-[11px] text-purple-300 bg-purple-500/10 p-2 rounded-lg border border-purple-500/20 font-mono">
                    Special Authorized: {reg.overrideType}
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between gap-3 pt-3 border-t border-slate-800">
                {reg.status === 'REGISTERED' ? (
                  <Link to={`/student/pass/${reg.registrationId}`}>
                    <Button variant="electric" size="sm" icon={Ticket}>
                      Open Digital Pass
                    </Button>
                  </Link>
                ) : (
                  <span className="text-xs text-slate-500 font-mono">
                    Pass: {reg.passValidity || 'INACTIVE'}
                  </span>
                )}

                {reg.status === 'REGISTERED' && (
                  <button
                    onClick={() => handleCancelClick(reg)}
                    className="text-xs text-rose-400 hover:text-rose-300 font-medium transition-colors"
                  >
                    Cancel Registration
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Confirmation Modal for Registration Cancellation */}
      <ConfirmationModal
        isOpen={cancelModalOpen}
        onClose={() => setCancelModalOpen(false)}
        onConfirm={handleConfirmCancel}
        title="Cancel Registration"
        description="Are you sure you want to cancel your confirmed registration? Your reserved seat will be relinquished and your digital pass will be revoked."
        confirmText="Yes, Cancel Registration"
        confirmVariant="danger"
        type="danger"
        details={selectedReg ? {
          'Registration ID': selectedReg.registrationId,
          'Event': selectedReg.eventTitle,
          'Student Name': selectedReg.studentName,
          'Student ID': selectedReg.studentId
        } : null}
      />
    </div>
  );
};
