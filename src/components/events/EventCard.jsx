import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Users, Clock, ArrowRight } from 'lucide-react';
import { StatusBadge } from '../common/StatusBadge';
import { Badge } from '../common/Badge';

export const EventCard = ({
  event,
  registrationState = null, // 'OPEN', 'REGISTERED', 'WAITLIST', 'FULL', 'CLOSED'
  onRegister,
  actionButton = null,
  linkPrefix = '/events',
}) => {
  if (!event) return null;

  const seatsLeft = Math.max(0, event.capacity - event.registeredCount);
  const fillPercentage = Math.min(100, Math.round((event.registeredCount / event.capacity) * 100));

  // Determine display status badge
  const displayStatus = registrationState || (
    event.status === 'PUBLISHED'
      ? seatsLeft === 0
        ? 'FULL'
        : new Date() > new Date(event.registrationDeadline)
        ? 'CLOSED'
        : 'OPEN'
      : event.status
  );

  return (
    <div className="group glass-panel-glossy rounded-2xl border border-white/10 hover:border-amber-400/40 shadow-xl overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl">
      {/* Banner Image */}
      <div className="relative h-48 w-full overflow-hidden bg-navy-950">
        <img
          src={event.banner || 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80'}
          alt={event.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/40 to-transparent" />
        
        {/* Category Chip */}
        <div className="absolute top-3 left-3">
          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30 uppercase tracking-wider backdrop-blur-md">
            {event.category}
          </span>
        </div>

        {/* State Badge */}
        <div className="absolute top-3 right-3">
          <StatusBadge status={displayStatus} />
        </div>

        {/* Seats indicator badge */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-slate-300">
          <div className="flex items-center gap-1.5 bg-navy-950/80 backdrop-blur-md px-2.5 py-1 rounded-md border border-slate-800">
            <Users className="w-3.5 h-3.5 text-blue-400" />
            <span className="font-semibold text-white">{seatsLeft}</span> seats left
          </div>
          <span className="text-[11px] text-slate-400 font-mono">
            {event.registeredCount}/{event.capacity} registered
          </span>
        </div>
      </div>

      {/* Capacity progress bar */}
      <div className="w-full bg-slate-800 h-1">
        <div
          className={`h-full transition-all duration-500 ${
            fillPercentage >= 100
              ? 'bg-rose-500'
              : fillPercentage > 75
              ? 'bg-amber-500'
              : 'bg-blue-500'
          }`}
          style={{ width: `${fillPercentage}%` }}
        />
      </div>

      {/* Card Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <h3 className="text-base font-bold text-white group-hover:text-blue-400 transition-colors line-clamp-2 leading-snug">
            {event.title}
          </h3>
          <p className="text-xs text-slate-400 line-clamp-2 mt-2 leading-relaxed">
            {event.description}
          </p>
        </div>

        {/* Metadata */}
        <div className="space-y-2 pt-2 border-t border-slate-800/80 text-xs text-slate-300">
          <div className="flex items-center gap-2">
            <Calendar className="w-3.5 h-3.5 text-blue-400 shrink-0" />
            <span>{event.date}</span>
            <span className="text-slate-600">•</span>
            <Clock className="w-3.5 h-3.5 text-blue-400 shrink-0" />
            <span className="truncate">{event.time}</span>
          </div>

          <div className="flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-blue-400 shrink-0" />
            <span className="truncate">{event.venue}</span>
          </div>
        </div>

        {/* Card Footer Actions */}
        <div className="pt-3 border-t border-slate-800/60 flex items-center justify-between gap-2">
          <Link
            to={`${linkPrefix}/${event.id}`}
            className="text-xs font-semibold text-blue-400 hover:text-blue-300 inline-flex items-center gap-1 group/btn"
          >
            Details <ArrowRight className="w-3 h-3 group-hover/btn:translate-x-0.5 transition-transform" />
          </Link>

          {actionButton ? (
            actionButton
          ) : (
            <Link
              to={`${linkPrefix}/${event.id}`}
              className="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-md shadow-blue-600/30 transition-all active:scale-95"
            >
              {displayStatus === 'REGISTERED'
                ? 'View Pass'
                : displayStatus === 'WAITLIST'
                ? 'Join Waitlist'
                : 'Register'}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};
