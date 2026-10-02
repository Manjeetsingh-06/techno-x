import React, { useState, useEffect } from 'react';
import { notificationService } from '../../services/notificationService';
import { eventService } from '../../services/eventService';
import { useAuth } from '../../context/AuthContext';
import { useNotifications } from '../../context/NotificationContext';
import { Input } from '../../components/common/Input';
import { Select } from '../../components/common/Select';
import { LoadingState } from '../../components/common/LoadingState';
import {
  Bell,
  Send,
  Calendar,
  Clock,
  Mail,
  CheckCircle2,
  AlertTriangle,
  Info,
  Sparkles,
  Smartphone,
  CheckCheck
} from 'lucide-react';

export const FacultyNotificationsPage = () => {
  const { user } = useAuth();
  const { showSuccess, showError, markAllNotificationsRead } = useNotifications();
  const [events, setEvents] = useState([]);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [reminderLoading, setReminderLoading] = useState(false);
  const [scheduleLoading, setScheduleLoading] = useState(false);

  // Quick Action State
  const [selectedReminderEventId, setSelectedReminderEventId] = useState('');
  const [selectedScheduleEventId, setSelectedScheduleEventId] = useState('');

  const [form, setForm] = useState({
    title: '',
    message: '',
    type: 'INFO',
    eventId: ''
  });

  const loadData = async () => {
    setLoading(true);
    try {
      const [evRes, notifRes] = await Promise.all([
        eventService.getEvents(),
        notificationService.getUserNotifications()
      ]);
      if (evRes.success && Array.isArray(evRes.data)) {
        setEvents(evRes.data);
        if (evRes.data.length > 0) {
          setSelectedReminderEventId(String(evRes.data[0].id));
          setSelectedScheduleEventId(String(evRes.data[0].id));
        }
      }
      if (notifRes.success) setHistory(notifRes.data);
    } catch (err) {
      console.error('Error loading data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadData(); }, []);

  // 1-Day Before Reminder via Email + WhatsApp
  const handleSendReminder = async () => {
    if (!selectedReminderEventId) {
      showError('Please select an event to send the 1-day reminder.');
      return;
    }
    setReminderLoading(true);
    try {
      const res = await notificationService.sendEventOneDayReminder(selectedReminderEventId);
      if (res.success) {
        showSuccess(`✅ 1-Day Reminder sent to ${res.data?.notifiedCount || 'registered'} students via Email & WhatsApp!`);
        loadData();
      } else {
        showError(res.error || 'Failed to dispatch 1-day reminder');
      }
    } catch (err) {
      showError(err.message || 'Error triggering reminder');
    } finally {
      setReminderLoading(false);
    }
  };

  // Broadcast Live Schedule via Email + WhatsApp
  const handleBroadcastSchedule = async () => {
    if (!selectedScheduleEventId) {
      showError('Please select an event to broadcast schedule.');
      return;
    }
    setScheduleLoading(true);
    try {
      const res = await notificationService.broadcastLiveSchedule(selectedScheduleEventId);
      if (res.success) {
        showSuccess(`✅ Live schedule broadcast sent to ${res.data?.notifiedCount || 'all'} students via Email & WhatsApp!`);
        loadData();
      } else {
        showError(res.error || 'Failed to broadcast schedule');
      }
    } catch (err) {
      showError(err.message || 'Error broadcasting schedule');
    } finally {
      setScheduleLoading(false);
    }
  };

  // Custom Multi-Channel Announcement
  const handleSend = async (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.message.trim()) {
      showError('Please provide both headline and message body');
      return;
    }
    setSubmitting(true);
    try {
      const res = await notificationService.sendAnnouncement({
        title: form.title,
        message: form.message,
        type: form.type,
        eventId: form.eventId || null
      });
      if (res.success) {
        showSuccess(`✅ Announcement broadcasted via Email, WhatsApp & In-App!`);
        setForm({ title: '', message: '', type: 'INFO', eventId: '' });
        loadData();
      } else {
        showError(res.error || 'Failed to dispatch announcement');
      }
    } catch (err) {
      showError(err.message || 'Failed to dispatch broadcast');
    } finally {
      setSubmitting(false);
    }
  };

  const eventOptions = events.map(ev => ({
    value: String(ev.id),
    label: `${ev.title} (${ev.date || 'TBD'})`
  }));

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Page Header */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-blue-500/20 bg-blue-950/10">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div>
            <div className="flex items-center gap-2 text-blue-400 font-bold text-xs uppercase tracking-wider mb-1">
              <Bell className="w-4 h-4" /> Faculty Dispatch Desk
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Event Notifications & Student Alerts
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              Send 24-hour event reminders and live schedules directly to registered students via <strong>Brevo Email</strong> and <strong>WhatsApp</strong>.
            </p>
          </div>
          <button
            onClick={() => markAllNotificationsRead(user)}
            className="btn-glass px-3.5 py-2 text-xs flex items-center gap-1.5 rounded-xl font-medium text-slate-300"
          >
            <CheckCheck className="w-3.5 h-3.5 text-blue-400" />
            <span>Mark All Read</span>
          </button>
        </div>

        {/* Live Channel Badges */}
        <div className="flex flex-wrap items-center gap-3 mt-4 pt-4 border-t border-white/10">
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/15 border border-emerald-400/30 text-emerald-300">
            <Smartphone className="w-3.5 h-3.5" /> WhatsApp Dispatch Active
          </span>
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-sky-500/15 border border-sky-400/30 text-sky-300">
            <Mail className="w-3.5 h-3.5" /> Brevo Email Relay Active
          </span>
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/15 border border-amber-400/30 text-amber-300">
            <Bell className="w-3.5 h-3.5" /> Real-Time In-App Bell
          </span>
        </div>
      </div>

      {/* QUICK ACTIONS ROW: 1-Day Reminder & Live Schedule */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* 1-Day Before Reminder Card */}
        <div className="glass-panel p-6 rounded-2xl border border-amber-500/30 bg-amber-950/10 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-400/20 text-amber-300 uppercase tracking-wider flex items-center gap-1">
                <Clock className="w-3 h-3" /> 24H Student Reminder
              </span>
              <span className="text-[11px] text-slate-400">Email + WhatsApp</span>
            </div>
            <h3 className="text-lg font-bold text-white mt-2 flex items-center gap-2">
              ⏰ Send 1-Day Before Event Reminder
            </h3>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed">
              Dispatches an automated 1-day reminder to all enrolled students registered for this event with timing, venue, and digital pass pass instructions.
            </p>
          </div>

          <div className="space-y-3 pt-2">
            <Select
              label="Select Assigned Event"
              options={eventOptions.length > 0 ? eventOptions : [{ value: '', label: 'No events available' }]}
              value={selectedReminderEventId}
              onChange={e => setSelectedReminderEventId(e.target.value)}
            />
            <button
              onClick={handleSendReminder}
              disabled={reminderLoading || !selectedReminderEventId}
              className="w-full py-3 px-4 rounded-xl font-bold text-xs bg-amber-500 hover:bg-amber-400 text-slate-950 transition-all flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 active:scale-95 disabled:opacity-50"
            >
              {reminderLoading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  Dispatching to Registered Students...
                </span>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Send 1-Day Reminder (Email & WhatsApp)</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Live Event Schedule Broadcast Card */}
        <div className="glass-panel p-6 rounded-2xl border border-sky-500/30 bg-sky-950/10 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-sky-400/20 text-sky-300 uppercase tracking-wider flex items-center gap-1">
                <Calendar className="w-3 h-3" /> Live Schedule Alert
              </span>
              <span className="text-[11px] text-slate-400">Email + WhatsApp</span>
            </div>
            <h3 className="text-lg font-bold text-white mt-2 flex items-center gap-2">
              📅 Broadcast Live Event Schedule
            </h3>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed">
              Broadcasts the official round timings, reporting requirements, and stage allocations to all participants.
            </p>
          </div>

          <div className="space-y-3 pt-2">
            <Select
              label="Select Assigned Event"
              options={eventOptions.length > 0 ? eventOptions : [{ value: '', label: 'No events available' }]}
              value={selectedScheduleEventId}
              onChange={e => setSelectedScheduleEventId(e.target.value)}
            />
            <button
              onClick={handleBroadcastSchedule}
              disabled={scheduleLoading || !selectedScheduleEventId}
              className="w-full py-3 px-4 rounded-xl font-bold text-xs bg-sky-500 hover:bg-sky-400 text-slate-950 transition-all flex items-center justify-center gap-2 shadow-lg shadow-sky-500/20 active:scale-95 disabled:opacity-50"
            >
              {scheduleLoading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  Broadcasting Live Schedule...
                </span>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Broadcast Live Schedule (Email & WhatsApp)</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* CUSTOM COMPOSE BROADCAST FORM */}
      <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-slate-800">
        <h2 className="text-base font-bold text-white mb-4 flex items-center gap-2">
          <Send className="w-4 h-4 text-blue-400" /> Compose Faculty Broadcast Announcement
        </h2>
        <form onSubmit={handleSend} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Broadcast Headline *"
              value={form.title}
              onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
              placeholder="e.g. Technical Round Reporting Time Changed"
              required
            />
            <Select
              label="Target Event / Scope"
              options={[
                { value: '', label: 'All Registered Students (Department-wide)' },
                ...eventOptions
              ]}
              value={form.eventId}
              onChange={e => setForm(f => ({ ...f, eventId: e.target.value }))}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1.5">Alert Level *</label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { type: 'INFO', label: 'Information', icon: Info, color: 'border-blue-500 bg-blue-500/10 text-blue-400' },
                { type: 'SUCCESS', label: 'Positive Update', icon: CheckCircle2, color: 'border-emerald-500 bg-emerald-500/10 text-emerald-400' },
                { type: 'WARNING', label: 'Urgent Alert', icon: AlertTriangle, color: 'border-amber-500 bg-amber-500/10 text-amber-400' },
              ].map(opt => {
                const Icon = opt.icon;
                const isSelected = form.type === opt.type;
                return (
                  <button
                    key={opt.type}
                    type="button"
                    onClick={() => setForm(f => ({ ...f, type: opt.type }))}
                    className={`p-3 rounded-xl border flex items-center justify-center gap-2 text-xs font-bold transition-all ${
                      isSelected ? `${opt.color} ring-1 ring-white/20` : 'border-slate-800 text-slate-500 hover:border-slate-700'
                    }`}
                  >
                    <Icon className="w-4 h-4" /> {opt.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1.5">Announcement Content *</label>
            <textarea
              rows={4}
              value={form.message}
              onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
              placeholder="Write the announcement body. This will be formatted and delivered to registered students via in-app alerts, Brevo HTML email, and WhatsApp message."
              required
              className="w-full bg-slate-900/80 border border-slate-700 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              disabled={submitting}
              className="btn-gold px-6 py-3 text-xs font-bold rounded-xl flex items-center gap-2 shadow-lg"
            >
              {submitting ? (
                <span>Dispatching Announcement...</span>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Send Broadcast (In-App + Email + WhatsApp)</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Notification Dispatch History */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800">
        <h2 className="text-base font-bold text-white mb-4 flex items-center gap-2">
          <Clock className="w-4 h-4 text-blue-400" /> Recent Campus Dispatches & Alerts
        </h2>

        {loading ? (
          <LoadingState message="Loading alert history…" />
        ) : history.length === 0 ? (
          <p className="text-xs text-slate-500 text-center py-6">No announcements dispatched yet.</p>
        ) : (
          <div className="divide-y divide-slate-800/80">
            {history.slice(0, 10).map((h, i) => (
              <div key={h.id || i} className="py-3 flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-white">{h.title}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 border border-slate-700 text-slate-400 font-mono">
                      {h.type || 'INFO'}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2">{h.message}</p>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-[10px] text-slate-500 block font-mono">
                    {h.createdAt ? new Date(h.createdAt).toLocaleDateString('en-IN') : 'Recent'}
                  </span>
                  <span className="text-[9px] text-emerald-400 font-medium">Delivered</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
