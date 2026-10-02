import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { CalendarPlus, Calendar, Users, MapPin, Clock } from 'lucide-react';
import { eventService } from '../../services/eventService';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Button } from '../../components/common/Button';
import { LoadingState } from '../../components/common/LoadingState';
import { EmptyState } from '../../components/common/EmptyState';
import { Select } from '../../components/common/Select';

const STATUS_OPTIONS = [
  { value: '', label: 'All Statuses' },
  { value: 'upcoming', label: 'Upcoming' },
  { value: 'ongoing', label: 'Ongoing' },
  { value: 'completed', label: 'Completed' },
  { value: 'cancelled', label: 'Cancelled' },
];

const EventCard = ({ event }) => (
  <div className="glass-panel rounded-2xl border border-slate-800 p-6 flex flex-col gap-4 hover:border-slate-600 transition-all duration-200">
    <div className="flex items-start justify-between gap-3">
      <div className="flex-1 min-w-0">
        <h3 className="text-white font-semibold text-lg leading-tight truncate">{event.name || event.title}</h3>
        <p className="text-slate-400 text-sm mt-1 line-clamp-2">{event.description}</p>
      </div>
      <StatusBadge status={event.status} />
    </div>

    <div className="grid grid-cols-2 gap-3 text-sm text-slate-400">
      <div className="flex items-center gap-2">
        <Calendar size={14} className="text-slate-500 shrink-0" />
        <span>{event.date ? new Date(event.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : '—'}</span>
      </div>
      <div className="flex items-center gap-2">
        <Clock size={14} className="text-slate-500 shrink-0" />
        <span>{event.time || '—'}</span>
      </div>
      <div className="flex items-center gap-2">
        <MapPin size={14} className="text-slate-500 shrink-0" />
        <span className="truncate">{event.venue || event.location || '—'}</span>
      </div>
      <div className="flex items-center gap-2">
        <Users size={14} className="text-slate-500 shrink-0" />
        <span>{event.registrationCount ?? event.participantCount ?? 0} registered</span>
      </div>
    </div>

    <div className="flex items-center justify-between pt-2 border-t border-slate-800">
      <span className="text-xs text-slate-500 capitalize">{event.category || 'General'}</span>
      <Link
        to={`/committee/events/${event.id}`}
        className="text-sm text-purple-400 hover:text-purple-300 font-medium transition-colors"
      >
        View Details →
      </Link>
    </div>
  </div>
);

export const CommitteeEventsPage = () => {
  const [events, setEvents] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('');

  const fetchEvents = useCallback(async () => {
    setLoading(true);
    try {
      const res = await eventService.getEvents();
      if (res.success) {
        setEvents(res.data || []);
      }
    } catch (err) {
      console.error('Failed to fetch events:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchEvents(); }, [fetchEvents]);

  useEffect(() => {
    if (!statusFilter) {
      setFiltered(events);
    } else {
      setFiltered(events.filter(e => (e.status || '').toLowerCase() === statusFilter.toLowerCase()));
    }
  }, [events, statusFilter]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Events</h1>
          <p className="text-slate-400 text-sm mt-1">Browse and manage all TGI events</p>
        </div>
        <Link to="/committee/events/plan">
          <Button className="flex items-center gap-2 bg-purple-600 hover:bg-purple-500 text-white px-5 py-2.5 rounded-xl font-semibold shadow-lg shadow-purple-900/30 transition-all">
            <CalendarPlus size={18} />
            Plan New Event
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <div className="glass-panel rounded-2xl border border-slate-800 p-4">
        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
          <span className="text-slate-400 text-sm font-medium whitespace-nowrap">Filter by status:</span>
          <div className="flex flex-wrap gap-2">
            {STATUS_OPTIONS.map(opt => (
              <button
                key={opt.value}
                onClick={() => setStatusFilter(opt.value)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                  statusFilter === opt.value
                    ? 'bg-purple-600 border-purple-500 text-white'
                    : 'border-slate-700 text-slate-400 hover:border-slate-500 hover:text-slate-300'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
          <span className="ml-auto text-xs text-slate-500">{filtered.length} event{filtered.length !== 1 ? 's' : ''}</span>
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <LoadingState message="Loading events…" />
      ) : filtered.length === 0 ? (
        <EmptyState
          icon={Calendar}
          title="No events found"
          description={statusFilter ? `No events with status "${statusFilter}".` : 'No events have been created yet.'}
          action={
            <Link to="/committee/events/plan">
              <Button className="bg-purple-600 hover:bg-purple-500 text-white px-4 py-2 rounded-xl text-sm font-semibold">
                Plan New Event
              </Button>
            </Link>
          }
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {filtered.map(event => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}
    </div>
  );
};
