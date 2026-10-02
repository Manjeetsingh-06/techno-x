import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { eventService } from '../../services/eventService';
import { useAuth } from '../../context/AuthContext';
import { useNotifications } from '../../context/NotificationContext';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { Select } from '../../components/common/Select';
import { LoadingState } from '../../components/common/LoadingState';
import { ConfirmationModal } from '../../components/common/ConfirmationModal';
import {
  CalendarPlus, ChevronRight, ChevronLeft, CheckCircle,
  Info, Calendar, MapPin, Users, Tag, FileText, Clock
} from 'lucide-react';

const STEPS = ['Event Info', 'Logistics', 'Schedule & Rules', 'Review & Submit'];

const StepIndicator = ({ currentStep }) => (
  <div className="flex items-center gap-2 mb-8">
    {STEPS.map((step, i) => (
      <React.Fragment key={step}>
        <div className={`flex items-center gap-2 ${i <= currentStep ? 'text-blue-400' : 'text-slate-600'}`}>
          <div className={`w-7 h-7 rounded-full border-2 flex items-center justify-center text-xs font-bold transition-colors ${
            i < currentStep ? 'bg-blue-500 border-blue-500 text-white' :
            i === currentStep ? 'border-blue-400 text-blue-400' :
            'border-slate-700 text-slate-600'
          }`}>
            {i < currentStep ? <CheckCircle className="w-4 h-4" /> : i + 1}
          </div>
          <span className={`text-xs font-semibold hidden sm:block ${i === currentStep ? 'text-white' : 'text-slate-500'}`}>{step}</span>
        </div>
        {i < STEPS.length - 1 && <div className={`flex-1 h-px ${i < currentStep ? 'bg-blue-500' : 'bg-slate-800'}`} />}
      </React.Fragment>
    ))}
  </div>
);

export const CommitteeEventPlanningPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { showSuccess, showError } = useNotifications();
  const [step, setStep] = useState(0);
  const [categories, setCategories] = useState([]);
  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [errors, setErrors] = useState({});

  const [form, setForm] = useState({
    title: '',
    description: '',
    categoryId: '',
    clubId: '',
    venue: '',
    date: '',
    time: '',
    registrationDeadline: '',
    capacity: '',
    maxWaitlist: '',
    prizePool: '',
    emoji: '🎓',
    tags: '',
    schedule: '',
    rules: '',
    organizer: 'Management Committee',
    featured: false,
  });

  useEffect(() => {
    const load = async () => {
      const [catRes, clubRes] = await Promise.all([eventService.getCategories(), eventService.getClubs()]);
      if (catRes.success) setCategories(catRes.data.map(c => ({ value: c.id, label: c.name })));
      if (clubRes.success) setClubs(clubRes.data.map(c => ({ value: c.id, label: c.name })));
      setLoading(false);
    };
    load();
  }, []);

  const set = (field) => (e) => {
    const val = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setForm(p => ({ ...p, [field]: val }));
    setErrors(p => ({ ...p, [field]: '' }));
  };

  const validateStep = () => {
    const newErrors = {};
    if (step === 0) {
      if (!form.title.trim()) newErrors.title = 'Event title is required';
      if (!form.description.trim()) newErrors.description = 'Description is required';
      if (!form.categoryId) newErrors.categoryId = 'Please select a category';
    }
    if (step === 1) {
      if (!form.venue.trim()) newErrors.venue = 'Venue is required';
      if (!form.date) newErrors.date = 'Date is required';
      if (!form.time) newErrors.time = 'Time is required';
      if (!form.registrationDeadline) newErrors.registrationDeadline = 'Deadline is required';
      if (!form.capacity || Number(form.capacity) < 1) newErrors.capacity = 'Capacity must be at least 1';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const next = () => { if (validateStep()) setStep(s => Math.min(s + 1, STEPS.length - 1)); };
  const prev = () => setStep(s => Math.max(s - 1, 0));

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const eventData = {
        ...form,
        capacity: Number(form.capacity),
        maxWaitlist: Number(form.maxWaitlist) || 20,
        tags: form.tags.split(',').map(t => t.trim()).filter(Boolean),
        status: 'PENDING_APPROVAL',
        createdBy: user.id,
      };
      const res = await eventService.createEvent(eventData, user);
      if (res.success) {
        showSuccess('Event proposal submitted! 🎉');
        const targetPath = user?.role === 'ADMIN' ? '/admin/events' :
                           user?.role === 'FACULTY' ? '/faculty/events' :
                           '/committee/events';
        navigate(targetPath);
      } else {
        showError(res.error || 'Submission failed');
      }
    } catch (e) {
      showError(e.message);
    } finally {
      setSubmitting(false);
      setConfirmOpen(false);
    }
  };

  if (loading) return <LoadingState message="Loading planning form..." />;

  const fieldError = (field) => errors[field] && (
    <p className="text-xs text-red-400 mt-1">{errors[field]}</p>
  );

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="glass-panel p-6 rounded-3xl border border-blue-500/20">
        <div className="flex items-center gap-2 text-sky-400 font-bold text-xs uppercase tracking-wider mb-1">
          <CalendarPlus className="w-4 h-4" /> Event Planning Workflow
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">Plan a New Event</h1>
        <p className="text-xs text-slate-400 mt-1">
          Complete all steps to submit your event proposal. It will go to <strong>PENDING_APPROVAL</strong> status until a Faculty approves.
        </p>
      </div>

      <div className="glass-panel p-6 rounded-2xl border border-slate-800">
        <StepIndicator currentStep={step} />

        {/* Step 0: Event Info */}
        {step === 0 && (
          <div className="space-y-4">
            <h2 className="text-sm font-bold text-white mb-4 flex items-center gap-2"><Info className="w-4 h-4 text-blue-400" /> Basic Event Information</h2>
            <div>
              <Input label="Event Title *" value={form.title} onChange={set('title')} placeholder="e.g. National Hackathon 2025" />
              {fieldError('title')}
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5">Description *</label>
              <textarea
                className="w-full bg-slate-900/60 border border-slate-700 rounded-xl p-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 resize-none"
                rows={4}
                value={form.description}
                onChange={set('description')}
                placeholder="Describe the event, its purpose, and what participants can expect…"
              />
              {fieldError('description')}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Select
                  label="Category *"
                  options={[{ value: '', label: 'Select Category' }, ...categories]}
                  value={form.categoryId}
                  onChange={set('categoryId')}
                />
                {fieldError('categoryId')}
              </div>
              <div>
                <Select
                  label="Club (optional)"
                  options={[{ value: '', label: 'No Club' }, ...clubs]}
                  value={form.clubId}
                  onChange={set('clubId')}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input label="Event Emoji" value={form.emoji} onChange={set('emoji')} placeholder="🎓" />
              <Input label="Tags (comma-separated)" value={form.tags} onChange={set('tags')} placeholder="coding, hackathon, prizes" />
            </div>
            <label className="flex items-center gap-2 cursor-pointer mt-2">
              <input type="checkbox" checked={form.featured} onChange={set('featured')} className="w-4 h-4 accent-blue-500" />
              <span className="text-sm text-slate-300">Mark as Featured Event (shown on home page)</span>
            </label>
          </div>
        )}

        {/* Step 1: Logistics */}
        {step === 1 && (
          <div className="space-y-4">
            <h2 className="text-sm font-bold text-white mb-4 flex items-center gap-2"><MapPin className="w-4 h-4 text-blue-400" /> Logistics & Capacity</h2>
            <Input label="Venue *" leftIcon={MapPin} value={form.venue} onChange={set('venue')} placeholder="e.g. Main Auditorium, TGI Campus" />
            {fieldError('venue')}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Input label="Event Date *" type="date" value={form.date} onChange={set('date')} leftIcon={Calendar} />
                {fieldError('date')}
              </div>
              <div>
                <Input label="Event Time *" type="time" value={form.time} onChange={set('time')} leftIcon={Clock} />
                {fieldError('time')}
              </div>
            </div>
            <div>
              <Input label="Registration Deadline *" type="date" value={form.registrationDeadline} onChange={set('registrationDeadline')} leftIcon={Calendar} />
              {fieldError('registrationDeadline')}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Input label="Capacity (Max Participants) *" type="number" leftIcon={Users} value={form.capacity} onChange={set('capacity')} placeholder="100" min="1" />
                {fieldError('capacity')}
              </div>
              <Input label="Max Waitlist Slots" type="number" leftIcon={Users} value={form.maxWaitlist} onChange={set('maxWaitlist')} placeholder="20" min="0" />
            </div>
            <Input label="Prize Pool (optional)" value={form.prizePool} onChange={set('prizePool')} placeholder="e.g. ₹50,000 total prizes" />
            <Input label="Organizing Body" value={form.organizer} onChange={set('organizer')} placeholder="e.g. CS Club, Management Committee" />
          </div>
        )}

        {/* Step 2: Schedule & Rules */}
        {step === 2 && (
          <div className="space-y-4">
            <h2 className="text-sm font-bold text-white mb-4 flex items-center gap-2"><FileText className="w-4 h-4 text-blue-400" /> Schedule & Rules</h2>
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5">Event Schedule (optional)</label>
              <textarea
                className="w-full bg-slate-900/60 border border-slate-700 rounded-xl p-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 resize-none"
                rows={5}
                value={form.schedule}
                onChange={set('schedule')}
                placeholder={`9:00 AM - Registration\n10:00 AM - Opening Ceremony\n11:00 AM - Main Event\n5:00 PM - Results & Closing`}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5">Participation Rules & Guidelines (optional)</label>
              <textarea
                className="w-full bg-slate-900/60 border border-slate-700 rounded-xl p-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 resize-none"
                rows={5}
                value={form.rules}
                onChange={set('rules')}
                placeholder={`1. Team size: 2-4 members\n2. College ID mandatory\n3. Plagiarism disqualifies\n4. Decision of judges is final`}
              />
            </div>
          </div>
        )}

        {/* Step 3: Review */}
        {step === 3 && (
          <div className="space-y-4">
            <h2 className="text-sm font-bold text-white mb-4 flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-400" /> Review & Submit Proposal</h2>
            <div className="bg-amber-500/5 border border-amber-500/30 rounded-xl p-4 text-xs text-amber-300 mb-4">
              ⚠️ After submission, this event will be set to <strong>PENDING_APPROVAL</strong>. It will only go live after a Faculty member reviews and approves it.
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                ['Title', form.title],
                ['Category', categories.find(c => c.value === form.categoryId)?.label || '—'],
                ['Venue', form.venue],
                ['Date', form.date],
                ['Time', form.time],
                ['Deadline', form.registrationDeadline],
                ['Capacity', `${form.capacity} seats`],
                ['Max Waitlist', `${form.maxWaitlist || 20} slots`],
                ['Prize Pool', form.prizePool || '—'],
                ['Organizer', form.organizer],
                ['Featured', form.featured ? 'Yes' : 'No'],
              ].map(([label, val]) => (
                <div key={label} className="p-3 bg-slate-900/40 rounded-xl border border-slate-800">
                  <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">{label}</p>
                  <p className="text-sm text-white font-semibold mt-0.5 truncate">{val}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between mt-8 pt-5 border-t border-slate-800">
          <Button variant="outline" icon={ChevronLeft} onClick={prev} disabled={step === 0}>
            Back
          </Button>
          {step < STEPS.length - 1 ? (
            <Button variant="electric" onClick={next}>
              Continue <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          ) : (
            <Button variant="electric" icon={CalendarPlus} onClick={() => setConfirmOpen(true)} loading={submitting} disabled={submitting}>
              Submit Proposal
            </Button>
          )}
        </div>
      </div>

      <ConfirmationModal
        isOpen={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleSubmit}
        title="Submit Event Proposal?"
        description="The event will be submitted for faculty approval. Once approved, it will be published to the live calendar."
        confirmText="Submit for Approval"
        confirmVariant="electric"
        isLoading={submitting}
      />
    </div>
  );
};
