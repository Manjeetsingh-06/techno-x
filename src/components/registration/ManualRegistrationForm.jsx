import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { studentService } from '../../services/studentService';
import { eventService } from '../../services/eventService';
import { registrationService } from '../../services/registrationService';
import { useAuth } from '../../context/AuthContext';
import { useNotifications } from '../../context/NotificationContext';
import { Button } from '../common/Button';
import { Select } from '../common/Select';
import { ConfirmationModal } from '../common/ConfirmationModal';
import { Modal } from '../common/Modal';
import { DigitalPass } from './DigitalPass';
import {
  ShieldAlert,
  AlertTriangle,
  UserCheck,
  Calendar,
  Users,
  CheckCircle2,
  Clock,
  Lock,
  Sparkles
} from 'lucide-react';

export const ManualRegistrationForm = ({ role = 'FACULTY' }) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { showSuccess, showError } = useNotifications();

  const [students, setStudents] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Form state
  const [selectedStudentId, setSelectedStudentId] = useState(searchParams.get('studentId') || '');
  const [selectedEventId, setSelectedEventId] = useState(searchParams.get('eventId') || '');
  const [deadlineOverride, setDeadlineOverride] = useState(false);
  const [capacityOverride, setCapacityOverride] = useState(false);
  const [overrideReason, setOverrideReason] = useState(
    'Faculty registration approved due to official academic participation.'
  );

  // Modals
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [createdPass, setCreatedPass] = useState(null);
  const [isPassModalOpen, setIsPassModalOpen] = useState(false);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const sRes = await studentService.getStudents();
      const eRes = await eventService.getEvents();
      if (sRes.success) setStudents(sRes.data);
      if (eRes.success) setEvents(eRes.data.filter(e => e.status !== 'CANCELLED'));
      setLoading(false);
    };
    load();
  }, []);

  const currentStudent = students.find(s => s.studentId === selectedStudentId);
  const currentEvent = events.find(e => e.id === selectedEventId);

  // Evaluate event states
  const now = new Date();
  const deadline = currentEvent ? new Date(currentEvent.registrationDeadline) : null;
  const isPastDeadline = deadline ? now > deadline : false;
  const isFull = currentEvent ? currentEvent.registeredCount >= currentEvent.capacity : false;

  const handlePreSubmit = (e) => {
    e.preventDefault();
    if (!selectedStudentId || !selectedEventId) {
      showError('Please select both a student and an event');
      return;
    }

    if (isPastDeadline && !deadlineOverride) {
      showError('Event registration deadline has passed. Please enable the Deadline Override checkbox.');
      return;
    }

    if (isFull && !capacityOverride) {
      showError('Event is currently at full capacity. Please enable the Capacity Override checkbox.');
      return;
    }

    if (!overrideReason || overrideReason.trim().length < 5) {
      showError('A mandatory institutional reason is required to perform an override.');
      return;
    }

    setIsConfirmOpen(true);
  };

  const handleExecuteOverride = async () => {
    setSubmitting(true);
    try {
      const studentDbId = currentStudent?.id || Number(selectedStudentId);
      const eventDbId = Number(currentEvent?.id || selectedEventId);

      const res = await registrationService.manualRegister({
        studentId: studentDbId,
        eventId: eventDbId,
        reason: overrideReason,
        deadlineOverride,
        capacityOverride,
        operator: user,
      });

      if (res.success) {
        showSuccess(`Student ${currentStudent?.name || 'Candidate'} successfully registered under authorized override!`);
        setIsConfirmOpen(false);
        setCreatedPass(res.data);
        setIsPassModalOpen(true);
      } else {
        showError(res.error || res.message || 'Override execution failed');
      }
    } catch (err) {
      showError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header Info */}
      <div className="glass-panel p-6 rounded-3xl border border-blue-500/30 bg-gradient-to-r from-blue-900/40 to-navy-950">
        <div className="flex items-center gap-2 text-sky-400 font-bold text-xs uppercase tracking-wider mb-1">
          <ShieldAlert className="w-4 h-4" /> Special Authority Registration Module
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          Special Registration Override
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 mt-1">
          Authorized for <span className="text-white font-bold">{user?.role}</span>. Override event venue capacities and registration deadlines for official academic/competition representation. All actions are logged to the institutional audit repository.
        </p>
      </div>

      <form onSubmit={handlePreSubmit} className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6 text-left">
        {/* Step 1: Select Student */}
        <div className="space-y-2">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
            Step 1: Select Candidate Student <span className="text-rose-400">*</span>
          </label>
          <Select
            options={[
              { value: '', label: '-- Choose Student from Institutional Registry --' },
              ...students.map(s => ({
                value: s.studentId,
                label: `${s.name} (${s.studentId}) — ${s.course}, ${s.year}`,
              })),
            ]}
            value={selectedStudentId}
            onChange={(e) => setSelectedStudentId(e.target.value)}
            required
          />

          {currentStudent && (
            <div className="p-3.5 rounded-xl bg-navy-950/80 border border-slate-800 flex items-center justify-between text-xs text-slate-300">
              <div>
                <span className="font-bold text-white text-sm">{currentStudent.name}</span>
                <span className="text-sky-400 font-mono ml-2">ID: {currentStudent.studentId}</span>
                <p className="text-slate-400 mt-0.5">{currentStudent.email} • {currentStudent.course} ({currentStudent.year})</p>
              </div>
              <span className="px-2 py-1 rounded bg-emerald-500/10 text-emerald-400 font-bold font-mono text-[11px] border border-emerald-500/20">
                Attendance: {currentStudent.attendanceRate || 90}%
              </span>
            </div>
          )}
        </div>

        {/* Step 2: Select Event */}
        <div className="space-y-2 pt-2 border-t border-slate-800">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
            Step 2: Select Target Event <span className="text-rose-400">*</span>
          </label>
          <Select
            options={[
              { value: '', label: '-- Choose Event Schedule --' },
              ...events.map(ev => ({
                value: ev.id,
                label: `${ev.title} (${ev.category}) — ${ev.date}`,
              })),
            ]}
            value={selectedEventId}
            onChange={(e) => setSelectedEventId(e.target.value)}
            required
          />

          {currentEvent && (
            <div className="p-4 rounded-xl bg-navy-950/80 border border-slate-800 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white text-sm">{currentEvent.title}</span>
                <span className="text-sky-400 font-medium">{currentEvent.category}</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-slate-400 pt-1 border-t border-slate-800/80">
                <div>
                  <span>Date:</span>
                  <p className="text-slate-200 font-semibold">{currentEvent.date}</p>
                </div>
                <div>
                  <span>Capacity:</span>
                  <p className={`font-semibold ${isFull ? 'text-rose-400' : 'text-emerald-400'}`}>
                    {currentEvent.registeredCount} / {currentEvent.capacity} (Seats)
                  </p>
                </div>
                <div>
                  <span>Deadline:</span>
                  <p className={`font-semibold ${isPastDeadline ? 'text-rose-400' : 'text-slate-200'}`}>
                    {new Date(currentEvent.registrationDeadline).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <span>Status:</span>
                  <p className="text-sky-300 font-semibold">{currentEvent.status}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Step 3: Event Status & Normal Rules Evaluation */}
        {currentEvent && (
          <div className="space-y-3 pt-2 border-t border-slate-800">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Step 3: Registration Constraint Evaluation
            </h4>

            <div className="space-y-2 text-xs">
              {isPastDeadline ? (
                <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center gap-2.5 text-rose-300">
                  <AlertTriangle className="w-4 h-4 shrink-0 text-rose-400" />
                  <span>The official registration deadline has expired. Standard student registration is blocked.</span>
                </div>
              ) : (
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-2.5 text-emerald-300">
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                  <span>The registration deadline is currently active.</span>
                </div>
              )}

              {isFull ? (
                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center gap-2.5 text-amber-300">
                  <Clock className="w-4 h-4 shrink-0 text-amber-400" />
                  <span>Venue capacity is 100% full ({currentEvent.capacity} seats). Standard students are queued to waitlist.</span>
                </div>
              ) : (
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-2.5 text-emerald-300">
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                  <span>Seats are available ({currentEvent.capacity - currentEvent.registeredCount} seats remaining).</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Step 4: Override Switches */}
        <div className="space-y-3 pt-2 border-t border-slate-800">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
            Step 4: Grant Special Override Authorization
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <label
              className={`p-4 rounded-xl border flex items-start gap-3 cursor-pointer transition-all ${
                deadlineOverride
                  ? 'bg-purple-500/15 border-purple-500/50 text-white'
                  : 'bg-navy-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
              }`}
            >
              <input
                type="checkbox"
                checked={deadlineOverride}
                onChange={(e) => setDeadlineOverride(e.target.checked)}
                className="mt-1 rounded bg-navy-900 border-slate-700 text-purple-600 focus:ring-purple-500"
              />
              <div>
                <span className="font-bold text-xs text-white block">
                  Registration Deadline Override
                </span>
                <span className="text-[11px] text-slate-400 leading-snug block mt-0.5">
                  Authorize admittance even if registration date has lapsed.
                </span>
              </div>
            </label>

            <label
              className={`p-4 rounded-xl border flex items-start gap-3 cursor-pointer transition-all ${
                capacityOverride
                  ? 'bg-purple-500/15 border-purple-500/50 text-white'
                  : 'bg-navy-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
              }`}
            >
              <input
                type="checkbox"
                checked={capacityOverride}
                onChange={(e) => setCapacityOverride(e.target.checked)}
                className="mt-1 rounded bg-navy-900 border-slate-700 text-purple-600 focus:ring-purple-500"
              />
              <div>
                <span className="font-bold text-xs text-white block">
                  Capacity Limit Override
                </span>
                <span className="text-[11px] text-slate-400 leading-snug block mt-0.5">
                  Bypass hall capacity ceiling and allocate extra authorized seat.
                </span>
              </div>
            </label>
          </div>
        </div>

        {/* Step 5: Mandatory Reason */}
        <div className="space-y-2 pt-2 border-t border-slate-800">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
            Step 5: Institutional Override Reason <span className="text-rose-400">*</span>
          </label>
          <textarea
            rows={3}
            required
            value={overrideReason}
            onChange={(e) => setOverrideReason(e.target.value)}
            placeholder="Provide official justification for granting this student an administrative override..."
            className="w-full rounded-xl bg-navy-900/90 text-slate-100 placeholder-slate-500 border border-slate-700/80 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          />
        </div>

        {/* Submit */}
        <div className="pt-4 border-t border-slate-800 flex justify-end">
          <Button
            type="submit"
            variant="electric"
            size="lg"
            icon={ShieldAlert}
          >
            Review & Register Student
          </Button>
        </div>
      </form>

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={handleExecuteOverride}
        title="Confirm Special Manual Registration"
        description="Are you sure you want to manually register this student? A valid digital pass and QR code will be generated immediately."
        confirmText="Confirm Manual Override"
        confirmVariant="electric"
        type="warning"
        isLoading={submitting}
        details={{
          'Student Name': currentStudent?.name,
          'Student ID': currentStudent?.studentId,
          'Target Event': currentEvent?.title,
          'Deadline Override': deadlineOverride ? 'YES (Bypassed)' : 'NO',
          'Capacity Override': capacityOverride ? 'YES (Extra Seat)' : 'NO',
          'Override Reason': overrideReason,
        }}
      />

      {/* Generated Digital Pass Modal */}
      {createdPass && (
        <Modal
          isOpen={isPassModalOpen}
          onClose={() => {
            setIsPassModalOpen(false);
            navigate(`/${role.toLowerCase()}/registrations`);
          }}
          title="Digital Event Pass Generated!"
          subtitle="Special Authorized Registration Confirmed"
          maxWidth="max-w-md"
        >
          <DigitalPass
            registration={createdPass}
            student={currentStudent}
            event={currentEvent}
            showActions={true}
          />
        </Modal>
      )}
    </div>
  );
};
