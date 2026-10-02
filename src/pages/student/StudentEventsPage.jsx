import React, { useState, useEffect } from 'react';
import { eventService } from '../../services/eventService';
import { registrationService } from '../../services/registrationService';
import { useAuth } from '../../context/AuthContext';
import { EventCard } from '../../components/events/EventCard';
import { SearchBar } from '../../components/common/SearchBar';
import { Select } from '../../components/common/Select';
import { LoadingState } from '../../components/common/LoadingState';
import { EmptyState } from '../../components/common/EmptyState';

export const StudentEventsPage = () => {
  const { user } = useAuth();
  const [events, setEvents] = useState([]);
  const [categories, setCategories] = useState([]);
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('ALL');

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const evRes = await eventService.getEvents();
      const catRes = await eventService.getCategories();
      if (evRes.success) setEvents(evRes.data.filter(e => e.status === 'PUBLISHED' || e.status === 'ONGOING'));
      if (catRes.success) setCategories(catRes.data);

      const regRes = await registrationService.getStudentRegistrations();
      if (regRes.success) setRegistrations(regRes.data);
      setLoading(false);
    };
    load();
  }, []);

  const filtered = events.filter((ev) => {
    if (search) {
      const q = search.toLowerCase();
      const match = ev.title.toLowerCase().includes(q) || ev.venue.toLowerCase().includes(q);
      if (!match) return false;
    }
    if (category !== 'ALL' && ev.category !== category) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          Explore Campus Events
        </h1>
        <p className="text-xs sm:text-sm text-slate-400">
          Find hackathons, guest lectures, sports tournaments, and workshops open to your cohort.
        </p>
      </div>

      <div className="glass-panel p-4 rounded-2xl border border-slate-800 grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="md:col-span-2">
          <SearchBar
            value={search}
            onChange={setSearch}
            placeholder="Search by event title, keyword, or venue..."
          />
        </div>
        <div>
          <Select
            options={[
              { value: 'ALL', label: 'All Categories' },
              ...categories.map(c => ({ value: c.name, label: c.name }))
            ]}
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>
      </div>

      {loading ? (
        <LoadingState message="Fetching events directory..." />
      ) : filtered.length === 0 ? (
        <EmptyState title="No matching events found" description="Try selecting another category or clear search terms." />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((event) => {
            const state = eventService.calculateStudentEventState(event, user?.studentId, registrations);
            return (
              <EventCard
                key={event.id}
                event={event}
                registrationState={state}
                linkPrefix="/events"
              />
            );
          })}
        </div>
      )}
    </div>
  );
};
