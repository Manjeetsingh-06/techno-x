import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { eventService } from '../../services/eventService';
import { registrationService } from '../../services/registrationService';
import { useAuth } from '../../context/AuthContext';
import { EventCard } from '../../components/events/EventCard';
import { SearchBar } from '../../components/common/SearchBar';
import { Select } from '../../components/common/Select';
import { EmptyState } from '../../components/common/EmptyState';
import { LoadingState } from '../../components/common/LoadingState';
import { Calendar, Filter, Sparkles, Search } from 'lucide-react';
import technoFestEvening from '../../assets/techno_fest_evening.jpg';

export const EventsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { user, role } = useAuth();

  const [events, setEvents] = useState([]);
  const [categories, setCategories] = useState([]);
  const [studentRegistrations, setStudentRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'ALL');
  const [selectedStatus, setSelectedStatus] = useState('ALL');
  const [sortBy, setSortBy] = useState('DATE_ASC');

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const evRes = await eventService.getEvents();
      const catRes = await eventService.getCategories();

      if (evRes.success) setEvents(evRes.data);
      if (catRes.success) setCategories(catRes.data);

      if (user?.role === 'STUDENT') {
        const regRes = await registrationService.getStudentRegistrations();
        if (regRes.success) setStudentRegistrations(regRes.data);
      }

      setLoading(false);
    };

    loadData();
  }, [user]);

  // Filter & Sort
  const filteredEvents = events.filter((ev) => {
    if (ev.status === 'DRAFT' || ev.status === 'PENDING_APPROVAL') return false;

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const match =
        ev.title.toLowerCase().includes(q) ||
        ev.description.toLowerCase().includes(q) ||
        ev.venue.toLowerCase().includes(q) ||
        ev.organizer.toLowerCase().includes(q);
      if (!match) return false;
    }

    if (selectedCategory !== 'ALL' && ev.category !== selectedCategory) return false;

    if (selectedStatus !== 'ALL') {
      const seatsLeft = ev.capacity - ev.registeredCount;
      const isPastDeadline = new Date() > new Date(ev.registrationDeadline);
      if (selectedStatus === 'OPEN' && (seatsLeft <= 0 || isPastDeadline)) return false;
      if (selectedStatus === 'FULL' && seatsLeft > 0) return false;
      if (selectedStatus === 'CLOSED' && !isPastDeadline) return false;
    }

    return true;
  }).sort((a, b) => {
    if (sortBy === 'DATE_ASC') return new Date(a.date) - new Date(b.date);
    if (sortBy === 'DATE_DESC') return new Date(b.date) - new Date(a.date);
    if (sortBy === 'POPULAR') return b.registeredCount - a.registeredCount;
    return 0;
  });

  return (
    <div className="space-y-8 pb-16">
      {/* ── HERO BANNER ── */}
      <div className="relative overflow-hidden min-h-[220px] flex items-center">
        <img src={technoFestEvening} alt="" className="absolute inset-0 w-full h-full object-cover object-top opacity-25" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #020b1a 0%, rgba(2,11,26,0.88) 60%, rgba(2,11,26,0.75) 100%)' }} />
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'linear-gradient(rgba(56,189,248,1) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,1) 1px, transparent 1px)', backgroundSize: '36px 36px' }} />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-400 uppercase tracking-widest mb-3">
            <Calendar className="w-3.5 h-3.5" /> Institutional Event Calendar
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Explore Campus <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(135deg,#fbbf24,#f59e0b)' }}>Events</span>
          </h1>
          <p className="text-sm text-slate-300 mt-2 max-w-xl">
            Discover, register, and receive digital entry passes for flagship events at Techno Institute of Higher Studies, Lucknow.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel p-4 sm:p-5 rounded-2xl border border-white/10 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
            <div className="md:col-span-5">
              <SearchBar
                value={searchQuery}
                onChange={setSearchQuery}
                placeholder="Search by event title, venue, or keyword..."
              />
            </div>

            <div className="md:col-span-3">
              <Select
                options={[
                  { value: 'ALL', label: 'All Categories' },
                  ...categories.map((c) => ({ value: c.name, label: c.name })),
                ]}
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              />
            </div>

            <div className="md:col-span-2">
              <Select
                options={[
                  { value: 'ALL', label: 'All Availability' },
                  { value: 'OPEN', label: 'Open for Reg' },
                  { value: 'FULL', label: 'Waitlist / Full' },
                  { value: 'CLOSED', label: 'Deadline Passed' },
                ]}
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              />
            </div>

            <div className="md:col-span-2">
              <Select
                options={[
                  { value: 'DATE_ASC', label: 'Upcoming First' },
                  { value: 'DATE_DESC', label: 'Later Date' },
                  { value: 'POPULAR', label: 'Most Popular' },
                ]}
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              />
            </div>
          </div>

          {/* Quick Category Chips */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 text-xs">
            <span className="text-slate-400 font-semibold text-[11px] shrink-0 mr-1">Quick Filter:</span>
            <button
              onClick={() => setSelectedCategory('ALL')}
              className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedCategory === 'ALL'
                  ? 'bg-amber-400 text-[#020b1a]'
                  : 'bg-white/5 text-slate-400 hover:text-white border border-white/10'
              }`}
            >
              All ({events.length})
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.name)}
                className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                  selectedCategory === cat.name
                    ? 'bg-amber-400 text-[#020b1a]'
                    : 'bg-white/5 text-slate-400 hover:text-white border border-white/10'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Events Listing */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {loading ? (
          <LoadingState message="Fetching institutional events directory..." />
        ) : filteredEvents.length === 0 ? (
          <EmptyState
            title="No events match your criteria"
            description="Try clearing your search query or selecting 'All Categories'."
            actionLabel="Reset Filters"
            onAction={() => {
              setSearchQuery('');
              setSelectedCategory('ALL');
              setSelectedStatus('ALL');
            }}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event) => {
              const studentState = eventService.calculateStudentEventState(
                event,
                user?.studentId,
                studentRegistrations
              );
              return (
                <EventCard
                  key={event.id}
                  event={event}
                  registrationState={user?.role === 'STUDENT' ? studentState : null}
                  linkPrefix="/events"
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
