import React from 'react';
import { ShieldCheck, Award, Users, BookOpen, Sparkles, Building2, MapPin, GraduationCap, CheckCircle } from 'lucide-react';
import technoMainBuilding from '../../assets/campus_hero.png';
import technoGate from '../../assets/techno_gate.jpg';
import technoStage from '../../assets/techno_stage.png';
import technoFestEvening from '../../assets/techno_fest_evening.jpg';
import technoConcert from '../../assets/techno_concert.jpg';

export const AboutPage = () => {
  return (
    <div className="pb-16 space-y-16">
      {/* Hero Banner */}
      <div className="relative rounded-none sm:rounded-3xl overflow-hidden min-h-[280px] flex items-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${technoMainBuilding}')`, backgroundPosition: 'center 40%', opacity: 0.3 }}
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #020b1a 0%, rgba(2,11,26,0.9) 60%, rgba(2,11,26,0.75) 100%)' }} />
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'linear-gradient(rgba(56,189,248,1) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,1) 1px, transparent 1px)', backgroundSize: '36px 36px' }} />
        <div className="absolute top-0 left-0 w-96 h-96 pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(251,191,36,0.07) 0%, transparent 65%)' }} />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 w-full">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/15 border border-amber-400/30 text-amber-300 text-xs font-bold backdrop-blur-md mb-4">
            <GraduationCap className="w-4 h-4" />
            <span>Techno Group of Institutions (TGI) • Estd. 2001</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight mb-4">
            Inspiring Excellence, <br />
            Building <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(135deg,#fbbf24,#f59e0b)' }}>Futures</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-200 leading-relaxed max-w-2xl">
            TECHNO-X is the institutional unified operating system powering hackathons, cultural festivals, academic symposia, sports championships, and research conclaves across all TGI campuses.
          </p>

          <div className="pt-4 flex flex-wrap items-center gap-4 text-xs font-semibold text-sky-300">
            <span className="flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-emerald-400" /> NAAC 'A' Grade Infrastructure
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-amber-400" /> 100% Verified Digital Gate Passes
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-sky-400" /> 4,800+ Active Student Enrolment
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      {/* Campus Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card-hover glass-panel p-7 rounded-2xl border border-white/10 space-y-3">
          <div className="p-3 w-fit rounded-xl bg-blue-600/20 text-sky-400 border border-blue-500/30 shadow-md shadow-blue-500/10">
            <Users className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-white">Centralized Campus Life</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Eliminating scattered noticeboards and unverified forms. Every hackathon, sports league, and symposium is published and tracked through a single institutional hub.
          </p>
        </div>

        <div className="glass-card-hover glass-panel p-7 rounded-2xl border border-white/10 space-y-3">
          <div className="p-3 w-fit rounded-xl bg-amber-600/20 text-amber-400 border border-amber-500/30 shadow-md shadow-amber-500/10">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-white">Faculty Supervision & Rigor</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Academic authorities maintain real-time oversight over registrations, student participation records, attendance verification, and policy overrides.
          </p>
        </div>

        <div className="glass-card-hover glass-panel p-7 rounded-2xl border border-white/10 space-y-3">
          <div className="p-3 w-fit rounded-xl bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 shadow-md shadow-emerald-500/10">
            <Award className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-white">Digital QR Passes & Verification</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Instant digital ticket generation with secure cryptographic tokens, enabling sub-second contactless check-ins at campus auditorium gates and laboratories.
          </p>
        </div>
      </div>

      {/* Real Campus Photo Gallery Preview Grid */}
      <div className="space-y-6">
        <div>
          <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Authentic Campus Highlights</span>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-1">
            Our Learning Ecosystem & Venues
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Photo #5 */}
          <div className="rounded-2xl overflow-hidden glass-panel border border-white/10 group shadow-lg">
            <div className="h-44 overflow-hidden">
              <img
                src={technoMainBuilding}
                alt="Main Academic Wing"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-4">
              <h4 className="text-sm font-bold text-white">Central Academic Wing</h4>
              <p className="text-[11px] text-slate-400 mt-1">Official Techno main block with campus bus transport.</p>
            </div>
          </div>

          {/* Card 2: Photo #1 */}
          <div className="rounded-2xl overflow-hidden glass-panel border border-white/10 group shadow-lg">
            <div className="h-44 overflow-hidden">
              <img
                src={technoGate}
                alt="ANTARANG Fest Gate"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-4">
              <h4 className="text-sm font-bold text-white">ANTARANG Fest Gate</h4>
              <p className="text-[11px] text-slate-400 mt-1">Fest portal with security check-ins and concert passes.</p>
            </div>
          </div>

          {/* Card 3: Photo #3 */}
          <div className="rounded-2xl overflow-hidden glass-panel border border-white/10 group shadow-lg">
            <div className="h-44 overflow-hidden">
              <img
                src={technoFestEvening}
                alt="Evening Fest Amphitheatre"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-4">
              <h4 className="text-sm font-bold text-white">Evening Fest Grounds</h4>
              <p className="text-[11px] text-slate-400 mt-1">Lawn stage and residential towers in evening celebration.</p>
            </div>
          </div>

          {/* Card 4: Photo #2 */}
          <div className="rounded-2xl overflow-hidden glass-panel border border-white/10 group shadow-lg">
            <div className="h-44 overflow-hidden">
              <img
                src={technoStage}
                alt="Tagore Stage Lawn"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-4">
              <h4 className="text-sm font-bold text-white">Tagore Lawn Stage</h4>
              <p className="text-[11px] text-slate-400 mt-1">Open-air pavilion for convocation and keynote symposiums.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Institutional Mission */}
      <div className="glass-panel-glossy p-8 sm:p-10 rounded-3xl border border-white/20 space-y-4">
        <h2 className="text-2xl font-black text-white">Techno Institute of Higher Studies (TIHS Lucknow)</h2>
        <p className="text-sm text-slate-300 leading-relaxed">
          Techno Institute of Higher Studies (TIHS), Lucknow is affiliated with the prestigious University of Lucknow and approved by AICTE. Offering programs across BCA, BBA, B.Com, BAJMC, B.Ed, B.Sc and more with a 100% placement track record. Student life at Techno is driven by 6 founding institutional pillars: <strong>KIRAN</strong> (Academic), <strong>ABHIVYAKTI</strong> (Cultural & Antarang Fest), <strong>OORJA</strong> (Sports), <strong>DARPAN</strong> (Media & Photojournalism), <strong>SANJEEVANI</strong> (Placement & Industry Liaison), and <strong>SRIJAN</strong> (CSR in association with Rotary Club, Barabanki).
        </p>
        <div className="pt-2 flex flex-wrap items-center justify-between gap-4">
          <p className="text-amber-400 font-bold text-sm">
            “Connect. Participate. Experience.” — हर इवेंट, एक प्लेटफॉर्म।
          </p>
          <a
            href="/committees"
            className="px-5 py-2.5 rounded-xl bg-amber-400 text-[#020b1a] font-bold text-xs hover:bg-amber-300 transition-colors shadow-md"
          >
            Explore 6 Institutional Committees →
          </a>
        </div>
      </div>
      </div>
    </div>
  );
};
