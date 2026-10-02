import React, { useEffect, useState } from 'react';
import { eventService } from '../../services/eventService';
import { LoadingState } from '../../components/common/LoadingState';
import { Link } from 'react-router-dom';
import { 
  Users, UserCheck, Sparkles, ArrowRight, ShieldCheck, 
  BookOpen, Music, Trophy, Camera, Briefcase, Heart, Award, ChevronRight 
} from 'lucide-react';
import { Button } from '../../components/common/Button';
import { COMMITTEES } from '../../data/mockData';

const committeeIconMap = {
  BookOpen: BookOpen,
  Music: Music,
  Trophy: Trophy,
  Camera: Camera,
  Briefcase: Briefcase,
  Heart: Heart,
};

export const ClubsPage = () => {
  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('clubs');

  useEffect(() => {
    const loadClubs = async () => {
      setLoading(true);
      const res = await eventService.getClubs();
      if (res.success) setClubs(res.data);
      setLoading(false);
    };
    loadClubs();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" /> Campus Societies & Institutional Pillars
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Clubs, Guilds & Committees
        </h1>
        <p className="text-sm text-slate-300 leading-relaxed">
          Empowering student innovators, coders, artists, athletes, journalists, and leaders across Techno Group of Institutions (TGI).
        </p>

        {/* Tab switch between Clubs and Committees */}
        <div className="flex items-center justify-center gap-2 p-1.5 rounded-xl bg-white/5 border border-white/10 w-fit mx-auto mt-6">
          <button
            onClick={() => setActiveTab('clubs')}
            className={`px-5 py-2.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'clubs'
                ? 'bg-sky-400 text-navy-950 shadow-md shadow-sky-400/20'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Student Clubs & Guilds (4)</span>
          </button>
          <button
            onClick={() => setActiveTab('committees')}
            className={`px-5 py-2.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'committees'
                ? 'bg-amber-400 text-navy-950 shadow-md shadow-amber-400/20'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Pillars & Committees (6)</span>
          </button>
        </div>
      </div>

      {loading ? (
        <LoadingState message="Fetching campus clubs..." />
      ) : activeTab === 'clubs' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {clubs.map((club) => (
            <div
              key={club.id}
              className="glass-panel p-6 rounded-3xl border border-slate-800/80 hover:border-blue-500/40 transition-all flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <img
                    src={club.logo}
                    alt={club.name}
                    className="w-16 h-16 rounded-2xl object-cover border border-slate-700 shrink-0"
                  />
                  <div>
                    <h3 className="text-lg font-bold text-white">{club.name}</h3>
                    <p className="text-xs text-sky-400 font-semibold">{club.tagline}</p>
                    <div className="flex items-center gap-2 text-xs text-slate-400 mt-1">
                      <Users className="w-3.5 h-3.5 text-blue-400" />
                      <span>{club.membersCount}+ Registered Members</span>
                    </div>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {club.description}
                </p>

                <div className="p-3 rounded-xl bg-navy-950/60 border border-slate-800/80 text-xs space-y-1">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Faculty Coordinator:</span>
                    <span className="text-slate-200 font-medium">{club.facultyCoordinator}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Student Lead:</span>
                    <span className="text-slate-200 font-medium">{club.studentLead}</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
                <span className="text-[11px] font-mono text-emerald-400 font-semibold">
                  STATUS: {club.status}
                </span>
                <Link to={`/events?search=${encodeURIComponent(club.name)}`}>
                  <Button variant="ghost" size="sm" icon={ArrowRight}>
                    View Club Events
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <p className="text-xs sm:text-sm text-slate-300">
              The 6 founding pillars shaping student life, academic assessment, cultural excellence, athletics, campus media, corporate placements, and social welfare at Techno.
            </p>
            <Link to="/committees">
              <Button variant="outline" size="sm" icon={ArrowRight}>
                Open Interactive Pillars Hub
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {COMMITTEES.map((comm) => {
              const IconComp = committeeIconMap[comm.icon] || Award;
              return (
                <div
                  key={comm.id}
                  className="glass-panel p-6 rounded-3xl border border-white/10 hover:border-amber-400/40 transition-all flex flex-col justify-between group"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-2xl bg-amber-400/15 border border-amber-400/30 text-amber-300 flex items-center justify-center group-hover:scale-110 group-hover:bg-amber-400 group-hover:text-navy-950 transition-all shadow-md">
                        <IconComp className="w-6 h-6" />
                      </div>
                      <span className="text-[10px] font-mono px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300 font-semibold">
                        {comm.membersCount}+ Student Leads
                      </span>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-white group-hover:text-amber-300 transition-colors">
                        {comm.name}
                      </h3>
                      <p className="text-xs text-amber-400 font-semibold mt-0.5">
                        {comm.tagline}
                      </p>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed line-clamp-3">
                      {comm.description}
                    </p>

                    <div>
                      <h5 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                        Flagship Events Organized:
                      </h5>
                      <div className="flex flex-wrap gap-1.5">
                        {comm.events?.slice(0, 4).map((ev, i) => (
                          <span
                            key={i}
                            className="px-2 py-0.5 rounded text-[10px] bg-white/5 border border-white/10 text-slate-300 truncate max-w-[200px]"
                          >
                            {ev}
                          </span>
                        ))}
                        {comm.events?.length > 4 && (
                          <span className="px-1.5 py-0.5 rounded text-[10px] text-amber-400 font-bold">
                            +{comm.events.length - 4} more
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                    <Link to="/committees">
                      <span className="text-xs text-amber-400 font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                        Explore Vision & Events <ChevronRight className="w-3.5 h-3.5" />
                      </span>
                    </Link>
                    <Link to={`/events?search=${encodeURIComponent(comm.name)}`}>
                      <Button variant="ghost" size="sm" icon={ArrowRight}>
                        Events
                      </Button>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
