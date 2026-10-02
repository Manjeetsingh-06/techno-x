import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { registrationService } from '../../services/registrationService';
import { eventService } from '../../services/eventService';
import { Calendar as CalendarIcon, Clock, MapPin, Ticket, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../../components/common/Button';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Link } from 'react-router-dom';

export const StudentCalendarPage = () => {
  const { user } = useAuth();
  const [registrations, setRegistrations] = useState([]);
  const [viewMode, setViewMode] = useState('list'); // list, month, week

  useEffect(() => {
    const load = async () => {
      const res = await registrationService.getStudentRegistrations();
      if (res.success) setRegistrations(res.data);
    };
    load();
  }, []);

  const upcomingList = [...registrations]
    .filter(r => r.status === 'REGISTERED')
    .sort((a, b) => new Date(a.eventDate) - new Date(b.eventDate));

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Event Calendar & Schedule
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Track your confirmed event dates and venue check-in schedules.
          </p>
        </div>

        <div className="flex items-center gap-1.5 p-1 bg-navy-900 border border-slate-800 rounded-xl">
          {['list', 'month', 'week'].map((v) => (
            <button
              key={v}
              onClick={() => setViewMode(v)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors ${
                viewMode === v ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              {v} View
            </button>
          ))}
        </div>
      </div>

      {viewMode === 'list' && (
        <div className="space-y-4">
          {upcomingList.length === 0 ? (
            <div className="glass-panel p-12 text-center rounded-2xl border border-slate-800 text-slate-400 text-sm">
              No confirmed upcoming events on your schedule.
            </div>
          ) : (
            upcomingList.map((item) => (
              <div
                key={item.id}
                className="glass-panel p-5 rounded-2xl border border-slate-800/80 hover:border-slate-700 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-2xl bg-blue-600/15 border border-blue-500/30 text-center min-w-[70px]">
                    <span className="block text-[11px] font-bold text-sky-400 uppercase">
                      {new Date(item.eventDate).toLocaleDateString([], { month: 'short' })}
                    </span>
                    <span className="block text-xl font-black text-white">
                      {new Date(item.eventDate).getDate()}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-white leading-tight">{item.eventTitle}</h3>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 mt-2">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-blue-400" /> 09:30 AM IST
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-blue-400" /> {item.eventVenue}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <StatusBadge status="VALID" />
                  <Link to={`/student/pass/${item.registrationId}`}>
                    <Button variant="electric" size="sm" icon={Ticket}>
                      Digital Pass
                    </Button>
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {viewMode === 'month' && (
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="text-base font-bold text-white">October 2026</h3>
            <span className="text-xs text-slate-400">Techno Group Academic Semester</span>
          </div>

          <div className="grid grid-cols-7 gap-2 text-center text-xs text-slate-400 font-semibold uppercase">
            <span>Sun</span><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span>
          </div>

          <div className="grid grid-cols-7 gap-2 text-xs">
            {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => {
              const hasEvent = upcomingList.some(r => new Date(r.eventDate).getDate() === day);
              return (
                <div
                  key={day}
                  className={`min-h-[70px] p-2 rounded-xl border text-left flex flex-col justify-between transition-colors ${
                    hasEvent
                      ? 'bg-blue-600/20 border-blue-500/40 text-white'
                      : 'bg-navy-900/40 border-slate-800/80 text-slate-400'
                  }`}
                >
                  <span className="font-bold">{day}</span>
                  {hasEvent && (
                    <div className="w-full truncate text-[10px] bg-blue-500 text-white px-1.5 py-0.5 rounded font-semibold">
                      Registered
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {viewMode === 'week' && (
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="text-base font-bold text-white">This Week's Itinerary</h3>
            <span className="text-xs text-sky-400 font-semibold">Active Cycle</span>
          </div>
          <div className="space-y-3">
            {upcomingList.slice(0, 2).map((item) => (
              <div key={item.id} className="p-4 rounded-xl bg-navy-950/80 border border-slate-800 flex items-center justify-between text-xs">
                <div>
                  <p className="font-bold text-white text-sm">{item.eventTitle}</p>
                  <p className="text-slate-400 mt-0.5">{item.eventDate} • {item.eventVenue}</p>
                </div>
                <Link to={`/student/pass/${item.registrationId}`}>
                  <Button variant="outline" size="sm">Pass</Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
