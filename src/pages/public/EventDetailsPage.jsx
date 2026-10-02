import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { eventService } from '../../services/eventService';
import { registrationService } from '../../services/registrationService';
import { useAuth } from '../../context/AuthContext';
import { useNotifications } from '../../context/NotificationContext';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { LoadingState } from '../../components/common/LoadingState';
import { Modal } from '../../components/common/Modal';
import { DigitalPass } from '../../components/registration/DigitalPass';
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  ShieldCheck,
  UserCheck,
  Building,
  Award,
  AlertTriangle,
  CheckCircle2,
  Share2,
  ArrowLeft
} from 'lucide-react';

export const EventDetailsPage = () => {
  const { id, eventId } = useParams();
  const effectiveId = eventId || id;
  const navigate = useNavigate();
  const { user, role, isAuthenticated } = useAuth();
  const { showSuccess, showError, showInfo } = useNotifications();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [existingReg, setExistingReg] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [showPassModal, setShowPassModal] = useState(false);
  const [activeTab, setActiveTab] = useState('overview'); // overview, rules, schedule, prizes

  const fetchEventData = async () => {
    setLoading(true);
    const evRes = await eventService.getEventById(effectiveId);
    if (evRes.success && evRes.data) {
      setEvent(evRes.data);
      if (user?.role === 'STUDENT') {
        const regRes = await registrationService.getStudentRegistrations();
        if (regRes.success) {
          const match = regRes.data.find(
            r => String(r.eventId) === String(effectiveId) || String(r.event?.id) === String(effectiveId)
          );
          setExistingReg(match || null);
        }
      }
    } else {
      showError('Event not found or invalid ID');
      navigate('/events');
    }
    setLoading(false);
  };

  useEffect(() => {
    if (effectiveId) {
      fetchEventData();
    }
  }, [effectiveId, user]);

  if (loading || !event) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <LoadingState message="Loading comprehensive event dossiers..." />
      </div>
    );
  }

  const seatsLeft = Math.max(0, event.capacity - event.registeredCount);
  const isPastDeadline = new Date() > new Date(event.registrationDeadline);
  const isFull = event.registeredCount >= event.capacity;

  let currentStudentState = 'OPEN';
  if (existingReg) {
    currentStudentState = existingReg.status === 'WAITLISTED' ? 'WAITLISTED' : 'REGISTERED';
  } else if (isPastDeadline) {
    currentStudentState = 'CLOSED';
  } else if (isFull) {
    currentStudentState = 'FULL';
  }

  const handleRegister = async () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: { pathname: `/events/${effectiveId}` } } });
      return;
    }

    if (role !== 'STUDENT') {
      showInfo('Administrative/Faculty users can register students via the "Special Override Registration" module.');
      return;
    }

    setSubmitting(true);
    try {
      const res = await registrationService.registerStudentForEvent({
        eventId: event.id || effectiveId,
        user
      });
      if (res.success) {
        setExistingReg(res.data);
        if (res.data.status === 'WAITLISTED') {
          showInfo(`You have been placed at position #${res.data.waitlistPosition} on the waitlist.`);
        } else {
          showSuccess('Registration confirmed! Digital Pass generated.');
          setShowPassModal(true);
        }
        await fetchEventData();
      } else {
        showError(res.error || 'Registration failed');
      }
    } catch (err) {
      showError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Back button */}
      <button
        onClick={() => navigate('/events')}
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Events Schedule
      </button>

      {/* Hero Banner Card */}
      <div className="relative rounded-3xl overflow-hidden border border-slate-800 glass-panel shadow-2xl">
        <div className="relative h-72 sm:h-96 w-full">
          <img
            src={event.banner}
            alt={event.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/70 to-transparent" />

          {/* Top Chips */}
          <div className="absolute top-6 left-6 right-6 flex items-center justify-between">
            <Badge variant="electric" size="lg">
              {event.category}
            </Badge>
            <StatusBadge status={currentStudentState} />
          </div>

          {/* Banner bottom details */}
          <div className="absolute bottom-6 left-6 right-6 space-y-2">
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
              {event.title}
            </h1>
            <p className="text-xs sm:text-sm text-sky-400 font-semibold flex items-center gap-2">
              <Building className="w-4 h-4" /> {event.organizer}
              <span className="text-slate-500">•</span>
              <UserCheck className="w-4 h-4" /> Faculty Coord: {event.facultyCoordinator}
            </p>
          </div>
        </div>
      </div>

      {/* Main Grid: Details Left, Registration CTA Right */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column (2/3) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="glass-panel p-3.5 rounded-xl border border-slate-800">
              <div className="flex items-center gap-2 text-slate-400 text-xs">
                <Calendar className="w-4 h-4 text-blue-400" /> Date
              </div>
              <p className="text-sm font-bold text-white mt-1">{event.date}</p>
            </div>

            <div className="glass-panel p-3.5 rounded-xl border border-slate-800">
              <div className="flex items-center gap-2 text-slate-400 text-xs">
                <Clock className="w-4 h-4 text-blue-400" /> Time
              </div>
              <p className="text-sm font-bold text-white mt-1 truncate">{event.time}</p>
            </div>

            <div className="glass-panel p-3.5 rounded-xl border border-slate-800">
              <div className="flex items-center gap-2 text-slate-400 text-xs">
                <Users className="w-4 h-4 text-blue-400" /> Available Seats
              </div>
              <p className={`text-sm font-bold mt-1 ${seatsLeft === 0 ? 'text-rose-400' : 'text-emerald-400'}`}>
                {seatsLeft} / {event.capacity}
              </p>
            </div>

            <div className="glass-panel p-3.5 rounded-xl border border-slate-800">
              <div className="flex items-center gap-2 text-slate-400 text-xs">
                <ShieldCheck className="w-4 h-4 text-blue-400" /> Deadline
              </div>
              <p className="text-xs font-bold text-white mt-1 truncate">
                {new Date(event.registrationDeadline).toLocaleDateString()}
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
            {[
              { key: 'overview', label: 'Overview & Eligibility' },
              { key: 'rules', label: 'Rules & Guidelines' },
              { key: 'schedule', label: 'Schedule Itinerary' },
              { key: 'prizes', label: 'Prizes & Recognition' },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors ${
                  activeTab === tab.key
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-6">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-base font-bold text-white mb-2">Description</h3>
                  <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-line">
                    {event.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-800/80">
                  <h3 className="text-base font-bold text-white mb-2">Eligibility Criteria</h3>
                  <div className="p-4 rounded-xl bg-navy-950/60 border border-slate-800 text-sm text-slate-300">
                    {event.eligibility}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800/80">
                  <h3 className="text-base font-bold text-white mb-2">Venue & Location</h3>
                  <div className="flex items-start gap-3 p-4 rounded-xl bg-navy-950/60 border border-slate-800 text-sm text-slate-300">
                    <MapPin className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-white">{event.venue}</p>
                      <p className="text-xs text-slate-400 mt-1">Techno Group of Institutions Main Campus</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'rules' && (
              <div className="space-y-4">
                <h3 className="text-base font-bold text-white">Official Event Regulations</h3>
                <ul className="space-y-3">
                  {event.rules?.map((rule, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-slate-300">
                      <span className="w-5 h-5 rounded-full bg-blue-500/15 border border-blue-500/30 text-sky-400 text-xs flex items-center justify-center font-bold shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span>{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {activeTab === 'schedule' && (
              <div className="space-y-4">
                <h3 className="text-base font-bold text-white">Timeline & Milestones</h3>
                <div className="space-y-3">
                  {event.schedule?.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-4 p-3.5 rounded-xl bg-navy-950/60 border border-slate-800 text-sm"
                    >
                      <span className="font-mono text-xs font-bold text-sky-400 bg-sky-500/10 px-2.5 py-1 rounded-md border border-sky-400/20 shrink-0">
                        {item.time}
                      </span>
                      <span className="text-slate-200 font-medium">{item.item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'prizes' && (
              <div className="space-y-4">
                <h3 className="text-base font-bold text-white">Award Pool & Fellowships</h3>
                {event.prizes && event.prizes.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {event.prizes.map((p, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-xl bg-gradient-to-tr from-amber-500/10 to-navy-900 border border-amber-500/20"
                      >
                        <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase mb-1">
                          <Award className="w-4 h-4" /> {p.position}
                        </div>
                        <p className="text-base font-bold text-white">{p.reward}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-slate-400">Institutional merit certificates and mementos will be awarded to all recognized participants.</p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Registration CTA Card (1/3) */}
        <div className="space-y-6">
          <div className="glass-panel p-6 rounded-3xl border border-blue-500/30 shadow-2xl space-y-6 sticky top-28 bg-gradient-to-b from-navy-900 via-navy-850 to-navy-900">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Participation Status
              </span>
              <div className="mt-2 flex items-center justify-between">
                <StatusBadge status={currentStudentState} />
                <span className="text-xs font-mono text-slate-400">
                  {event.registeredCount}/{event.capacity} Filled
                </span>
              </div>
            </div>

            {/* If Student is already registered */}
            {existingReg && existingReg.status === 'REGISTERED' && (
              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-3">
                <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                <div>
                  <h4 className="text-sm font-bold text-white">Registration Confirmed</h4>
                  <p className="text-xs text-emerald-300 font-mono mt-0.5">
                    Reg ID: {existingReg.registrationId}
                  </p>
                </div>
                <Button
                  variant="electric"
                  size="md"
                  className="w-full"
                  onClick={() => setShowPassModal(true)}
                >
                  View Digital Pass & QR
                </Button>
              </div>
            )}

            {/* If Student is waitlisted */}
            {existingReg && existingReg.status === 'WAITLISTED' && (
              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-center space-y-2">
                <Clock className="w-8 h-8 text-amber-400 mx-auto" />
                <h4 className="text-sm font-bold text-white">Waitlist Queue Active</h4>
                <p className="text-xs text-slate-300">
                  You are at <span className="font-bold text-amber-400">Position #{existingReg.waitlistPosition}</span>. You will be notified automatically if an approved override or cancellation promotes your registration.
                </p>
              </div>
            )}

            {/* If not registered yet */}
            {!existingReg && (
              <div className="space-y-4">
                {isPastDeadline ? (
                  <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-xs text-rose-300">
                    The registration deadline for this event has expired.
                  </div>
                ) : isFull ? (
                  <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-300">
                    Normal capacity is fully booked. Joining will place you on the official student waitlist.
                  </div>
                ) : (
                  <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/30 text-xs text-blue-300">
                    Seats are filling rapidly. Confirm your registration to receive your digital QR entry pass.
                  </div>
                )}

                <Button
                  variant={isFull ? 'secondary' : 'electric'}
                  size="lg"
                  className="w-full shadow-lg"
                  disabled={isPastDeadline || submitting}
                  isLoading={submitting}
                  onClick={handleRegister}
                >
                  {!isAuthenticated
                    ? 'Sign In to Register'
                    : isPastDeadline
                    ? 'Registration Closed'
                    : isFull
                    ? 'Join Student Waitlist'
                    : 'Register for Event'}
                </Button>
              </div>
            )}

            {/* Institutional Information note */}
            <div className="pt-4 border-t border-slate-800 text-[11px] text-slate-400 space-y-1">
              <p className="flex items-center gap-1.5 text-slate-300 font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Official TGI Student ID Required
              </p>
              <p>Admittance is strictly governed by digital QR scanning at the gate.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Digital Pass Modal */}
      {existingReg && (
        <Modal
          isOpen={showPassModal}
          onClose={() => setShowPassModal(false)}
          title="Digital Event Pass"
          subtitle="Techno Group of Institutions Verification"
          maxWidth="max-w-md"
        >
          <DigitalPass
            registration={existingReg}
            student={user}
            event={event}
            showActions={true}
          />
        </Modal>
      )}
    </div>
  );
};
