import React, { useState, useEffect, useCallback } from 'react';
import { Megaphone, Send, Bell, Info, CheckCircle, AlertTriangle } from 'lucide-react';
import { eventService } from '../../services/eventService';
import { notificationService } from '../../services/notificationService';
import { useAuth } from '../../context/AuthContext';
import { useNotifications } from '../../context/NotificationContext';
import { Button } from '../../components/common/Button';
import { LoadingState } from '../../components/common/LoadingState';
import { EmptyState } from '../../components/common/EmptyState';

const ANNOUNCEMENT_TYPES = [
  { value: 'info',    label: 'ℹ️  Info',    icon: Info,          color: 'text-sky-400' },
  { value: 'success', label: '✅  Success', icon: CheckCircle,   color: 'text-emerald-400' },
  { value: 'warning', label: '⚠️  Warning', icon: AlertTriangle, color: 'text-amber-400' },
];

const TYPE_STYLES = {
  info:    'bg-sky-500/10 border-sky-500/30 text-sky-400',
  success: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400',
  warning: 'bg-amber-500/10 border-amber-500/30 text-amber-400',
};

const NotificationCard = ({ notif }) => {
  const style = TYPE_STYLES[notif.type] || TYPE_STYLES.info;
  return (
    <div className={`rounded-xl border px-4 py-3 ${style} bg-opacity-10`}>
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-sm">{notif.title}</p>
          <p className="text-xs mt-0.5 opacity-80">{notif.message}</p>
          {notif.eventName && (
            <p className="text-xs mt-1 opacity-60">Event: {notif.eventName}</p>
          )}
        </div>
        <span className="text-xs opacity-60 whitespace-nowrap shrink-0">
          {notif.createdAt ? new Date(notif.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' }) : ''}
        </span>
      </div>
    </div>
  );
};

const INITIAL_FORM = { eventId: '', title: '', message: '', type: 'info' };

export const CommitteeAnnouncementsPage = () => {
  const { user } = useAuth();
  const { showSuccess, showError } = useNotifications();

  const [events, setEvents]               = useState([]);
  const [pastNotifs, setPastNotifs]       = useState([]);
  const [loadingEvents, setLoadingEvents] = useState(true);
  const [loadingNotifs, setLoadingNotifs] = useState(true);
  const [submitting, setSubmitting]       = useState(false);
  const [form, setForm]                   = useState(INITIAL_FORM);

  // Fetch events
  const fetchEvents = useCallback(async () => {
    setLoadingEvents(true);
    try {
      const res = await eventService.getEvents();
      if (res.success) setEvents(res.data || []);
    } catch (err) {
      console.error('Failed to fetch events:', err);
    } finally {
      setLoadingEvents(false);
    }
  }, []);

  // Fetch past notifications (JWT auth — no arg needed)
  const fetchNotifs = useCallback(async () => {
    setLoadingNotifs(true);
    try {
      const res = await notificationService.getUserNotifications();
      if (res.success) setPastNotifs(res.data || []);
    } catch (err) {
      console.error('Failed to fetch notifications:', err);
    } finally {
      setLoadingNotifs(false);
    }
  }, []);

  useEffect(() => { fetchEvents(); }, [fetchEvents]);
  useEffect(() => { fetchNotifs(); }, [fetchNotifs]);

  const handleChange = (field, value) => setForm(prev => ({ ...prev, [field]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.message.trim()) {
      showError('Please fill in all required fields.');
      return;
    }
    setSubmitting(true);
    try {
      const payload = {
        eventId:  form.eventId || null,
        title:    form.title.trim(),
        message:  form.message.trim(),
        type:     form.type,
      };
      const res = await notificationService.sendAnnouncement(payload);
      if (res.success) {
        showSuccess('Announcement sent successfully!');
        setForm(INITIAL_FORM);
        fetchNotifs();
      } else {
        showError(res.message || 'Failed to send announcement.');
      }
    } catch (err) {
      console.error('Error sending announcement:', err);
      showError('An unexpected error occurred.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <Megaphone size={22} className="text-purple-400" />
          Announcements
        </h1>
        <p className="text-slate-400 text-sm mt-1">
          Broadcast notifications to all users or event participants.
        </p>
      </div>

      {/* Compose Form */}
      <div className="glass-panel rounded-2xl border border-slate-800 p-6">
        <h2 className="text-white font-semibold text-base mb-4 flex items-center gap-2">
          <Send size={16} className="text-purple-400" />
          Send Announcement
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Event selector */}
          <div>
            <label className="block text-sm text-slate-400 mb-1.5">Event (optional)</label>
            <select
              value={form.eventId}
              onChange={e => handleChange('eventId', e.target.value)}
              className="w-full bg-slate-800/60 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-purple-500 transition-colors"
            >
              <option value="">— All Users (no specific event) —</option>
              {events.map(ev => (
                <option key={ev.id} value={ev.id}>{ev.name || ev.title}</option>
              ))}
            </select>
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm text-slate-400 mb-1.5">
              Title <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={form.title}
              onChange={e => handleChange('title', e.target.value)}
              placeholder="e.g. Schedule Change for Hackathon"
              className="w-full bg-slate-800/60 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-purple-500 transition-colors"
              required
            />
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm text-slate-400 mb-1.5">
              Message <span className="text-red-400">*</span>
            </label>
            <textarea
              value={form.message}
              onChange={e => handleChange('message', e.target.value)}
              placeholder="Write your announcement here…"
              rows={5}
              className="w-full bg-slate-800/60 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-purple-500 transition-colors resize-none"
              required
            />
          </div>

          {/* Type */}
          <div>
            <label className="block text-sm text-slate-400 mb-1.5">Type</label>
            <div className="flex gap-3 flex-wrap">
              {ANNOUNCEMENT_TYPES.map(t => (
                <button
                  key={t.value}
                  type="button"
                  onClick={() => handleChange('type', t.value)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-medium transition-all ${
                    form.type === t.value
                      ? `${TYPE_STYLES[t.value]} ring-2 ring-offset-2 ring-offset-slate-900 ring-current`
                      : 'border-slate-700 text-slate-400 hover:border-slate-500'
                  }`}
                >
                  <t.icon size={14} />
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* Submit */}
          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={submitting}
              className="flex items-center gap-2 bg-purple-600 hover:bg-purple-500 disabled:opacity-60 disabled:cursor-not-allowed text-white px-6 py-2.5 rounded-xl font-semibold text-sm shadow-lg shadow-purple-900/30 transition-all"
            >
              <Send size={15} />
              {submitting ? 'Sending…' : 'Send Announcement'}
            </button>
          </div>
        </form>
      </div>

      {/* Past Announcements */}
      <div className="glass-panel rounded-2xl border border-slate-800 p-6">
        <h2 className="text-white font-semibold text-base mb-4 flex items-center gap-2">
          <Bell size={16} className="text-purple-400" />
          Sent Announcements
        </h2>

        {loadingNotifs ? (
          <LoadingState message="Loading past announcements…" />
        ) : pastNotifs.length === 0 ? (
          <EmptyState
            icon={Bell}
            title="No announcements yet"
            description="Announcements you send will appear here."
          />
        ) : (
          <div className="space-y-3">
            {pastNotifs.map((n, idx) => (
              <NotificationCard key={n.id ?? idx} notif={n} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
