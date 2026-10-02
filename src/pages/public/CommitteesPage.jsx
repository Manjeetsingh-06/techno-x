import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, Music, Trophy, Camera, Briefcase, Heart, 
  ChevronDown, ChevronUp, Target, Eye, ListChecks, 
  Calendar, Sparkles, Users, ArrowRight 
} from 'lucide-react';
import { COMMITTEES, INITIAL_EVENTS as EVENTS } from '../../data/mockData';
import technoGate from '../../assets/techno_gate.jpg';
import technoMainBuilding from '../../assets/campus_hero.png';

const iconMap = {
  BookOpen: BookOpen,
  Music: Music,
  Trophy: Trophy,
  Camera: Camera,
  Briefcase: Briefcase,
  Heart: Heart,
};

const colorMap = {
  blue: { bg: 'bg-blue-500/15', border: 'border-blue-400/30', text: 'text-blue-400', chip: 'bg-blue-500/10 text-blue-300 border-blue-400/20' },
  purple: { bg: 'bg-purple-500/15', border: 'border-purple-400/30', text: 'text-purple-400', chip: 'bg-purple-500/10 text-purple-300 border-purple-400/20' },
  emerald: { bg: 'bg-emerald-500/15', border: 'border-emerald-400/30', text: 'text-emerald-400', chip: 'bg-emerald-500/10 text-emerald-300 border-emerald-400/20' },
  rose: { bg: 'bg-rose-500/15', border: 'border-rose-400/30', text: 'text-rose-400', chip: 'bg-rose-500/10 text-rose-300 border-rose-400/20' },
  teal: { bg: 'bg-teal-500/15', border: 'border-teal-400/30', text: 'text-teal-400', chip: 'bg-teal-500/10 text-teal-300 border-teal-400/20' },
  amber: { bg: 'bg-amber-500/15', border: 'border-amber-400/30', text: 'text-amber-400', chip: 'bg-amber-500/10 text-amber-300 border-amber-400/20' },
};

export const CommitteesPage = () => {
  const [selectedCommittee, setSelectedCommittee] = useState(null);
  const detailRef = useRef(null);
  
  const [expandedSection, setExpandedSection] = useState('vision');

  const handleSelect = (committee) => {
    setSelectedCommittee(committee);
    setExpandedSection('vision');
    setTimeout(() => {
      detailRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const AccordionItem = ({ id, title, icon: Icon, children }) => (
    <div className="border border-white/10 rounded-xl overflow-hidden mb-3">
      <button 
        onClick={() => toggleSection(id)}
        className="w-full flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 transition-colors"
      >
        <div className="flex items-center gap-3">
          <Icon className="w-5 h-5 text-amber-400" />
          <span className="font-semibold text-white">{title}</span>
        </div>
        {expandedSection === id ? <ChevronUp className="w-5 h-5 text-white/50" /> : <ChevronDown className="w-5 h-5 text-white/50" />}
      </button>
      {expandedSection === id && (
        <div className="p-4 bg-black/20 text-slate-300 leading-relaxed">
          {children}
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen pb-16">

      {/* ── HERO BANNER ── */}
      <div className="relative overflow-hidden min-h-[240px] flex items-center mb-12">
        <img src={technoGate} alt="" className="absolute inset-0 w-full h-full object-cover opacity-25" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #020b1a 0%, rgba(2,11,26,0.9) 60%, rgba(2,11,26,0.75) 100%)' }} />
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'linear-gradient(rgba(251,191,36,1) 1px, transparent 1px), linear-gradient(90deg, rgba(251,191,36,1) 1px, transparent 1px)', backgroundSize: '36px 36px' }} />
        <div className="absolute top-0 left-0 w-96 h-96 pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(251,191,36,0.07) 0%, transparent 65%)' }} />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 w-full">
          <span className="inline-block py-1.5 px-4 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400 font-bold text-xs uppercase tracking-widest mb-4">
            6 Institutional Pillars
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight mb-3">
            Clubs &{' '}
            <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(135deg, #fbbf24, #f59e0b)' }}>
              Committees
            </span>
          </h1>
          <p className="text-base text-slate-300 max-w-2xl leading-relaxed">
            The 6 student-led institutional committees that drive academics, culture, sports, media, placements, and CSR across TIHS Lucknow — each a pillar of campus excellence.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* 2. Committee Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-16">
          {COMMITTEES.map((committee) => {
            const Icon = iconMap[committee.icon] || Sparkles;
            const colors = colorMap[committee.color] || colorMap.blue;
            const isSelected = selectedCommittee?.id === committee.id;
            
            return (
              <div 
                key={committee.id}
                onClick={() => handleSelect(committee)}
                className={`glass-panel glass-card-hover cursor-pointer transition-all duration-300 p-6 rounded-2xl border ${isSelected ? 'border-amber-400 shadow-[0_0_15px_rgba(251,191,36,0.3)]' : 'border-white/10'}`}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${colors.bg} ${colors.border} border`}>
                  <Icon className={`w-6 h-6 ${colors.text}`} />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{committee.name}</h3>
                <p className="text-sm text-slate-400">{committee.tagline}</p>
              </div>
            );
          })}
        </div>

        {/* 3. Committee Detail Section */}
        {selectedCommittee && (
          <div ref={detailRef} className="glass-panel glass-panel-glossy rounded-3xl p-6 md:p-10 mb-16 border border-white/10 scroll-mt-24">
            {(() => {
              const Icon = iconMap[selectedCommittee.icon] || Sparkles;
              const colors = colorMap[selectedCommittee.color] || colorMap.blue;
              const relatedEvents = EVENTS.filter(e => e.committeeId === selectedCommittee.id);
              
              return (
                <div>
                  <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-8">
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${colors.bg} ${colors.border} border shrink-0`}>
                      <Icon className={`w-8 h-8 ${colors.text}`} />
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold text-white mb-2">{selectedCommittee.name}</h2>
                      <p className="text-xl text-amber-400">{selectedCommittee.tagline}</p>
                    </div>
                  </div>
                  
                  <p className="text-slate-300 text-lg mb-8 leading-relaxed">
                    {selectedCommittee.description}
                  </p>

                  <div className="mb-12">
                    <AccordionItem id="vision" title="Vision Statement" icon={Eye}>
                      {selectedCommittee.vision}
                    </AccordionItem>
                    <AccordionItem id="mission" title="Mission Statement" icon={Target}>
                      {selectedCommittee.mission}
                    </AccordionItem>
                    <AccordionItem id="objectives" title="Objectives" icon={ListChecks}>
                      <ul className="list-disc pl-5 space-y-2">
                        {selectedCommittee.objectives?.map((obj, i) => (
                          <li key={i}>{obj}</li>
                        ))}
                      </ul>
                    </AccordionItem>
                    <AccordionItem id="events" title="Events Organized" icon={Calendar}>
                      <div className="flex flex-wrap gap-2">
                        {selectedCommittee.events?.map((evt, i) => (
                          <span key={i} className={`px-3 py-1 rounded-full text-sm border ${colors.chip}`}>
                            {evt}
                          </span>
                        ))}
                      </div>
                    </AccordionItem>
                    <AccordionItem id="skills" title="Core Skills Required" icon={Users}>
                      <div className="flex flex-wrap gap-2">
                        {selectedCommittee.coreSkills?.map((skill, i) => (
                          <span key={i} className={`px-3 py-1 rounded-full text-sm border ${colors.chip}`}>
                            {skill}
                          </span>
                        ))}
                      </div>
                    </AccordionItem>
                  </div>

                  {/* Related Events */}
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                      <Calendar className="w-6 h-6 text-amber-400" />
                      Related Events
                    </h3>
                    
                    {relatedEvents.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {relatedEvents.map(event => (
                          <div key={event.id} className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col h-full">
                            <div className="flex justify-between items-start mb-3">
                              <span className={`text-xs px-2 py-1 rounded-md bg-white/10 text-white`}>
                                {event.status || 'Upcoming'}
                              </span>
                              <span className="text-xs text-amber-400 bg-amber-400/10 px-2 py-1 rounded-md">
                                {event.date}
                              </span>
                            </div>
                            <h4 className="text-white font-semibold mb-2">{event.title}</h4>
                            <div className="mt-auto pt-4 flex items-center justify-between text-sm text-slate-400">
                              <span>{event.venue}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="bg-white/5 border border-white/10 rounded-xl p-8 text-center text-slate-400">
                        No scheduled events from this committee yet.
                      </div>
                    )}
                  </div>
                </div>
              );
            })()}
          </div>
        )}

        {/* 4. CTA Banner */}
        <div className="glass-panel rounded-3xl p-8 md:p-12 text-center border border-amber-500/20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-amber-500/10" />
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 relative z-10">
            Want to join a committee?
          </h2>
          <Link 
            to="/contact" 
            className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-400 text-navy-950 font-bold rounded-xl transition-all relative z-10"
          >
            Apply Now
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

      </div>
    </div>
  );
};
