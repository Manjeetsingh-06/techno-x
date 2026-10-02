import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { eventService } from '../../services/eventService';
import { LoadingState } from '../../components/common/LoadingState';
import { SearchBar } from '../../components/common/SearchBar';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Badge } from '../../components/common/Badge';
import { EmptyState } from '../../components/common/EmptyState';
import { Select } from '../../components/common/Select';
import { Button } from '../../components/common/Button';
import { Calendar, MapPin, Users, CalendarDays, CalendarPlus } from 'lucide-react';

const EventListCard = ({ event }) => (
  <div className="glass-panel rounded-2xl p-4 sm:p-5 border border-slate-800 hover:border-blue-500/40 transition-all duration-200 flex flex-col sm:flex-row gap-4">
    <div className="w-full sm:w-32 h-24 sm:h-20 rounded-xl overflow-hidden bg-gradient-to-br from-blue-900 via-navy-800 to-slate-900 flex items-center justify-center shrink-0">
      <span className="text-3xl">{event.emoji || '🎓'}</span>
    </div>
    <div className="flex-1 min-w-0 space-y-1.5">
      <div className="flex flex-wrap items-center gap-2">
        <h3 className="font-bold text-white text-sm truncate">{event.title}</h3>
        <StatusBadge status={event.status} />
        {event.featured && <Badge variant="warning" size="sm">Featured</Badge>}
      </div>
      <p className="text-xs text-slate-400 line-clamp-2">{event.description}</p>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-400 pt-1">
        <span className="inline-flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-blue-400" /> {event.date}</span>
        <span className="inline-flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-blue-400" /> {event.venue}</span>
        <span className="inline-flex items-center gap-1"><Users className="w-3.5 h-3.5 text-blue-400" /> {event.registered}/{event.capacity} registered</span>
        <span className="inline-flex items-center gap-1"><CalendarDays className="w-3.5 h-3.5 text-blue-400" /> Deadline: {event.registrationDeadline}</span>
      </div>
      <div className="text-xs text-slate-500">Organized by: <span className="text-slate-300">{event.organizer}</span> &bull; Category: <span className="text-sky-400">{event.category}</span></div>
    </div>
  </div>
);

export const FacultyEventsPage = () => {
  const [events, setEvents] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  useEffect(() => {
    const load = async () => {
      const [evRes, catRes] = await Promise.all([eventService.getEvents(), eventService.getCategories()]);
      if (evRes.success) setEvents(evRes.data);
      if (catRes.success) setCategories(catRes.data.map(c => ({ value: c.id, label: c.name })));
      setLoading(false);
    };
    load();
  }, []);

  const applyFilters = useCallback(() => {
    let arr = [...events];
    if (search.trim()) {
      const q = search.toLowerCase();
      arr = arr.filter(e => e.title.toLowerCase().includes(q) || e.venue.toLowerCase().includes(q) || e.organizer.toLowerCase().includes(q));
    }
    if (statusFilter) arr = arr.filter(e => e.status === statusFilter);
    if (categoryFilter) arr = arr.filter(e => e.categoryId === categoryFilter);
    setFiltered(arr);
  }, [events, search, statusFilter, categoryFilter]);

  useEffect(() => { applyFilters(); }, [applyFilters]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">Institutional Event Directory</h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">Full overview of all events across departments and clubs.</p>
        </div>
        <Link to="/faculty/events/plan">
          <Button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-xl font-semibold shadow-lg shadow-blue-900/30 transition-all">
            <CalendarPlus size={18} />
            Plan New Event
          </Button>
        </Link>
      </div>

      <div className="glass-panel p-4 rounded-2xl border border-slate-800 flex flex-col sm:flex-row gap-3">
        <div className="flex-1">
          <SearchBar value={search} onChange={setSearch} placeholder="Search by title, venue, organizer…" />
        </div>
        <Select
          options={[{ value: '', label: 'All Statuses' }, 'OPEN', 'CLOSED', 'COMPLETED', 'CANCELLED', 'PENDING_APPROVAL'].filter(o => o).map(o => typeof o === 'string' ? { value: o, label: o } : o)}
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
          className="sm:w-48"
        />
        <Select
          options={[{ value: '', label: 'All Categories' }, ...categories]}
          value={categoryFilter}
          onChange={e => setCategoryFilter(e.target.value)}
          className="sm:w-48"
        />
      </div>

      {loading ? (
        <LoadingState message="Loading events..." />
      ) : filtered.length === 0 ? (
        <EmptyState title="No events found" description="Try adjusting search or filters." />
      ) : (
        <div className="space-y-3">
          <p className="text-xs text-slate-500 px-1">{filtered.length} event{filtered.length !== 1 ? 's' : ''} found</p>
          {filtered.map(e => <EventListCard key={e.id} event={e} />)}
        </div>
      )}
    </div>
  );
};
