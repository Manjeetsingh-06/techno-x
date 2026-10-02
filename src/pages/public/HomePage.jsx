import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { eventService } from '../../services/eventService';
import { EventCard } from '../../components/events/EventCard';
import { Button } from '../../components/common/Button';
import technoMainBuilding from '../../assets/campus_hero.png';
import technoGate from '../../assets/techno_gate.jpg';
import technoStage from '../../assets/techno_stage.png';
import technoFestEvening from '../../assets/techno_fest_evening.jpg';
import technoConcert from '../../assets/techno_concert.jpg';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  QrCode,
  Calendar,
  Users,
  Award,
  Zap,
  CheckCircle,
  Building,
  GraduationCap,
  ChevronLeft,
  ChevronRight,
  Monitor,
  UserCheck,
  FlaskConical,
  Flame,
  MapPin,
  ExternalLink,
  BookOpen,
  Music,
  Trophy,
  Camera,
  Briefcase,
  Heart
} from 'lucide-react';
import { COMMITTEES } from '../../data/mockData';

const committeeIconMap = {
  BookOpen: BookOpen,
  Music: Music,
  Trophy: Trophy,
  Camera: Camera,
  Briefcase: Briefcase,
  Heart: Heart,
};

export const HomePage = () => {
  const [featuredEvents, setFeaturedEvents] = useState([]);
  const [categories, setCategories] = useState([]);
  const [clubs, setClubs] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeSocietyTab, setActiveSocietyTab] = useState('committees');

  // Hero carousel slides featuring the REAL TECHNO photos
  const slides = [
    {
      id: 1,
      image: technoMainBuilding, // Photo #5: Official TECHNO Building & Campus Bus
      pretitle: 'Techno Group of Institutions (TGI) • Official Portal',
      titleLine1: 'Inspiring Excellence,',
      titleLine2: 'Building',
      highlightWord: 'Futures',
      subtitle:
        'Welcome to Techno Group of Institutions (TGI). Nurturing young minds with strong values, state-of-the-art facilities, and boundless opportunities to lead and innovate.',
      primaryBtn: { text: 'EXPLORE ALL EVENTS', link: '/events', icon: ArrowRight },
      secondaryBtn: { text: 'ABOUT TGI CAMPUS', link: '/about', icon: ExternalLink },
    },
    {
      id: 2,
      image: technoGate, // Photo #1: ANTARANG Annual Cultural Fest Gate
      pretitle: 'TGI Mega Flagship • ANTARANG 2026',
      titleLine1: 'ANTARANG 2026,',
      titleLine2: 'Annual Cultural',
      highlightWord: 'Fest',
      subtitle:
        'Experience the grandest college festival at Techno Group of Institutions! Featuring DJ Rihya from Mumbai, celebrity musical concerts, dance battles, and live arts.',
      primaryBtn: { text: 'GET FEST PASSES', link: '/events?category=Cultural', icon: ArrowRight },
      secondaryBtn: { text: 'STUDENT PORTAL', link: '/login', icon: Users },
    },
    {
      id: 3,
      image: technoFestEvening, // Photo #3: Grand Evening Campus Fest Aerial View
      pretitle: 'Where Passion Meets Stage • TGI Amphitheatre',
      titleLine1: 'Electrifying Nights,',
      titleLine2: 'Celebrating',
      highlightWord: 'Campus Life',
      subtitle:
        'Thousands of students gathering on campus grounds under spectacular stage lights for unforgettable music, theatre, competitions, and celebration.',
      primaryBtn: { text: 'VIEW EVENT SCHEDULE', link: '/events', icon: ArrowRight },
      secondaryBtn: { text: 'CAMPUS SOCIETIES', link: '/clubs', icon: Building },
    },
    {
      id: 4,
      image: technoConcert, // Photo #4: Concert Truss & Stage View
      pretitle: 'Technical Conclaves & Stage Productions',
      titleLine1: 'Pioneering Innovation,',
      titleLine2: 'Engineering',
      highlightWord: 'Tomorrow',
      subtitle:
        'From high-octane 36-hour hackathons and robotics arenas to mega stage productions, experience world-class events right here at Techno.',
      primaryBtn: { text: 'REGISTER FOR HACKATHONS', link: '/events?category=Hackathon', icon: ArrowRight },
      secondaryBtn: { text: 'OPERATIONS DESK', link: '/login', icon: ShieldCheck },
    }
  ];

  // Auto-advance slides every 7 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  useEffect(() => {
    const fetchData = async () => {
      const evRes = await eventService.getEvents();
      if (evRes.success) {
        setFeaturedEvents(evRes.data.filter((e) => e.status === 'PUBLISHED').slice(0, 3));
      }
      const catRes = await eventService.getCategories();
      if (catRes.success) setCategories(catRes.data.slice(0, 8));

      const clbRes = await eventService.getClubs();
      if (clbRes.success) setClubs(clbRes.data);
    };
    fetchData();
  }, []);

  return (
    <div className="space-y-24 pb-20">
      {/* ============================================================ */}
      {/* 1. CINEMATIC HERO SLIDER (Side Content + Crystal Glossy Photo) */}
      {/* ============================================================ */}
      <section className="relative overflow-hidden w-full">
        {/* Slide Container */}
        <div className="relative min-h-[580px] sm:min-h-[640px] lg:min-h-[700px] w-full flex items-start pt-8 sm:pt-12 lg:pt-14">
          {slides.map((slide, index) => {
            const isActive = index === currentSlide;
            return (
              <div
                key={slide.id}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                  isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                }`}
              >
                {/* Crystal Clear Photo with Gloss Enhancer (Not washed out, high contrast & rich colors) */}
                <div
                  className={`absolute inset-0 bg-cover bg-center transition-transform duration-10000 ease-out ${
                    isActive ? 'scale-105' : 'scale-100'
                  }`}
                  style={{
                    backgroundImage: `url('${slide.image}')`,
                    backgroundPosition: 'center 40%',
                    filter: 'contrast(108%) saturate(115%) brightness(96%)'
                  }}
                />

                {/* Left-Side Dark Backdrop Gradient for Text Readability - preserves right photo crystal clarity */}
                <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/80 to-transparent lg:w-[62%]" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-transparent to-navy-950/40" />

                {/* Gloss Specular Sheen (Gives that photo-lamination glossy magazine pop) */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.04] to-amber-400/[0.03] pointer-events-none" />
              </div>
            );
          })}

          {/* Left Arrow Button */}
          <button
            onClick={prevSlide}
            aria-label="Previous slide"
            className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-navy-950/40 hover:bg-navy-900/80 active:scale-95 backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition-all shadow-xl shadow-black/40 group cursor-pointer"
          >
            <ChevronLeft className="w-6 h-6 group-hover:-translate-x-0.5 transition-transform" />
          </button>

          {/* Right Arrow Button */}
          <button
            onClick={nextSlide}
            aria-label="Next slide"
            className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-navy-950/40 hover:bg-navy-900/80 active:scale-95 backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition-all shadow-xl shadow-black/40 group cursor-pointer"
          >
            <ChevronRight className="w-6 h-6 group-hover:translate-x-0.5 transition-transform" />
          </button>

          {/* Hero Content (Positioned higher towards top, fixed stable height to prevent jumping) */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-20">
            <div className="max-w-2xl text-left space-y-4">
              {/* Institutional Badge */}
              <div>
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/20 border border-amber-400/40 text-amber-300 text-xs font-bold backdrop-blur-md shadow-lg shadow-amber-500/10">
                  <GraduationCap className="w-4 h-4 text-amber-400" />
                  <span>{slides[currentSlide].pretitle}</span>
                </div>
              </div>

              {/* Main Headline with fixed min-height so it stays in exact same position */}
              <div className="min-h-[85px] sm:min-h-[110px] lg:min-h-[135px] flex items-center">
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.12] drop-shadow-lg">
                  {slides[currentSlide].titleLine1} <br />
                  {slides[currentSlide].titleLine2}{' '}
                  <span className="text-amber-400 drop-shadow-[0_2px_15px_rgba(251,191,36,0.5)]">
                    {slides[currentSlide].highlightWord}
                  </span>
                </h1>
              </div>

              {/* Tagline / Subtitle with fixed min-height to prevent button jumping */}
              <div className="min-h-[60px] sm:min-h-[75px]">
                <p className="text-sm sm:text-base lg:text-lg text-slate-200/90 leading-relaxed font-normal max-w-xl drop-shadow">
                  {slides[currentSlide].subtitle}
                </p>
              </div>

              {/* Action Buttons (Gold button + Frosted Glass button) */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link to={slides[currentSlide].primaryBtn.link}>
                  <button className="btn-gold px-6 py-3.5 text-xs sm:text-sm flex items-center gap-2.5 rounded-lg cursor-pointer">
                    <span>{slides[currentSlide].primaryBtn.text}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </Link>

                <Link to={slides[currentSlide].secondaryBtn.link}>
                  <button className="btn-glass px-6 py-3.5 text-xs sm:text-sm flex items-center gap-2.5 rounded-lg cursor-pointer">
                    <span>{slides[currentSlide].secondaryBtn.text}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </Link>
              </div>

              {/* Quick Institutional Meta */}
              <div className="pt-2 flex items-center gap-6 text-xs text-slate-300/80 font-medium">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Techno Group of Institutions
                </span>
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                  NAAC Accredited Campus
                </span>
              </div>
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="absolute bottom-16 sm:bottom-20 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 bg-navy-950/70 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10 shadow-lg">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  idx === currentSlide
                    ? 'w-7 h-2 bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.8)]'
                    : 'w-2 h-2 bg-white/40 hover:bg-white/80'
                }`}
              />
            ))}
          </div>
        </div>

        {/* ============================================================ */}
        {/* OVERLAPPING GLOSSY FEATURE BAR (Clean 5 Pillars) */}
        {/* ============================================================ */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative -mt-10 sm:-mt-12 z-30">
          <div className="dark-feature-gloss-bar rounded-2xl p-4 sm:p-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6 divide-y sm:divide-y-0 lg:divide-x divide-white/10 shadow-2xl border border-white/20">
            {/* 1. Smart Classrooms */}
            <div className="flex items-center gap-3.5 pt-2 sm:pt-0 lg:px-3">
              <div className="w-12 h-12 rounded-xl bg-blue-500/15 border border-blue-400/30 flex items-center justify-center text-sky-400 shrink-0 shadow-lg shadow-blue-500/10">
                <Monitor className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-white tracking-tight">Smart Classrooms</h4>
                <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-2">
                  Technology-enabled interactive learning
                </p>
              </div>
            </div>

            {/* 2. Experienced Faculty */}
            <div className="flex items-center gap-3.5 pt-2 sm:pt-0 lg:px-3">
              <div className="w-12 h-12 rounded-xl bg-amber-500/15 border border-amber-400/30 flex items-center justify-center text-amber-400 shrink-0 shadow-lg shadow-amber-500/10">
                <UserCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-white tracking-tight">Experienced Faculty</h4>
                <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-2">
                  Qualified mentors & research guides
                </p>
              </div>
            </div>

            {/* 3. Digital Passes */}
            <div className="flex items-center gap-3.5 pt-2 sm:pt-0 lg:px-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/15 border border-emerald-400/30 flex items-center justify-center text-emerald-400 shrink-0 shadow-lg shadow-emerald-500/10">
                <QrCode className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-white tracking-tight">Digital QR Passes</h4>
                <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-2">
                  Instant gate scan & contactless entry
                </p>
              </div>
            </div>

            {/* 4. Holistic Development */}
            <div className="flex items-center gap-3.5 pt-2 sm:pt-0 lg:px-3">
              <div className="w-12 h-12 rounded-xl bg-purple-500/15 border border-purple-400/30 flex items-center justify-center text-purple-400 shrink-0 shadow-lg shadow-purple-500/10">
                <Flame className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-white tracking-tight">Holistic Growth</h4>
                <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-2">
                  Mind • Sports • Culture & Arts
                </p>
              </div>
            </div>

            {/* 5. Modern Labs */}
            <div className="flex items-center gap-3.5 pt-2 sm:pt-0 lg:px-3 col-span-2 sm:col-span-1">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/15 border border-cyan-400/30 flex items-center justify-center text-cyan-400 shrink-0 shadow-lg shadow-cyan-500/10">
                <FlaskConical className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-white tracking-tight">Advanced Labs</h4>
                <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-2">
                  AI, IoT, and high-performance computing
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 2. REAL TECHNO CAMPUS PHOTO GALLERY SPOTLIGHT (Glossy Polish) */}
      {/* ============================================================ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">
              <Building className="w-3.5 h-3.5" /> Authentic Campus Visuals
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Life Across Techno Campus
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              Real scenes from our main academic building, grand festival gates, and vibrant amphitheatre events.
            </p>
          </div>
          <Link to="/about">
            <Button variant="outline" size="sm" icon={ArrowRight}>
              Explore Full Gallery
            </Button>
          </Link>
        </div>

        {/* 4 Real Techno Photos in Ultra-High-Gloss Specular Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Photo #5: Main Building & Bus */}
          <div className="group relative rounded-2xl overflow-hidden glass-panel border border-white/15 hover:border-amber-400/50 transition-all duration-300 shadow-xl hover:shadow-2xl">
            <div className="h-60 overflow-hidden relative">
              <img
                src={technoMainBuilding}
                alt="Main Techno Academic Building"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                style={{ filter: 'contrast(106%) saturate(112%)' }}
              />
              {/* Glossy sheen reflection on hover */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/40 to-transparent pointer-events-none" />
            <div className="absolute bottom-0 inset-x-0 p-4 z-10">
              <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30 uppercase tracking-wider mb-1">
                Main Building
              </span>
              <h4 className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors">
                Techno Central Complex
              </h4>
              <p className="text-[11px] text-slate-300 line-clamp-2 mt-0.5">
                Modern academic infrastructure with official TGI transport connectivity.
              </p>
            </div>
          </div>

          {/* Photo #1: ANTARANG 2026 Entrance Gate */}
          <div className="group relative rounded-2xl overflow-hidden glass-panel border border-white/15 hover:border-amber-400/50 transition-all duration-300 shadow-xl hover:shadow-2xl">
            <div className="h-60 overflow-hidden relative">
              <img
                src={technoGate}
                alt="Antarang Fest Gate"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                style={{ filter: 'contrast(106%) saturate(112%)' }}
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/40 to-transparent pointer-events-none" />
            <div className="absolute bottom-0 inset-x-0 p-4 z-10">
              <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-purple-400/20 text-purple-300 border border-purple-400/30 uppercase tracking-wider mb-1">
                Annual Fest Gate
              </span>
              <h4 className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors">
                ANTARANG 2026 Gate
              </h4>
              <p className="text-[11px] text-slate-300 line-clamp-2 mt-0.5">
                Grand celebratory arch welcoming thousands for DJ Rihya and star performers.
              </p>
            </div>
          </div>

          {/* Photo #3: Illuminated Evening Fest Aerial */}
          <div className="group relative rounded-2xl overflow-hidden glass-panel border border-white/15 hover:border-amber-400/50 transition-all duration-300 shadow-xl hover:shadow-2xl">
            <div className="h-60 overflow-hidden relative">
              <img
                src={technoFestEvening}
                alt="Evening Campus Festival"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                style={{ filter: 'contrast(108%) saturate(115%)' }}
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/40 to-transparent pointer-events-none" />
            <div className="absolute bottom-0 inset-x-0 p-4 z-10">
              <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-400/20 text-emerald-300 border border-emerald-400/30 uppercase tracking-wider mb-1">
                Amphitheatre
              </span>
              <h4 className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors">
                Evening Fest Celebrations
              </h4>
              <p className="text-[11px] text-slate-300 line-clamp-2 mt-0.5">
                Illuminated campus lawns and high-rise student towers during cultural nights.
              </p>
            </div>
          </div>

          {/* Photo #2: Lawn Stage & Red Carpet */}
          <div className="group relative rounded-2xl overflow-hidden glass-panel border border-white/15 hover:border-amber-400/50 transition-all duration-300 shadow-xl hover:shadow-2xl">
            <div className="h-60 overflow-hidden relative">
              <img
                src={technoStage}
                alt="Main Event Lawn & Stage"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                style={{ filter: 'contrast(106%) saturate(112%)' }}
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/40 to-transparent pointer-events-none" />
            <div className="absolute bottom-0 inset-x-0 p-4 z-10">
              <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-blue-400/20 text-sky-300 border border-blue-400/30 uppercase tracking-wider mb-1">
                Main Stage
              </span>
              <h4 className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors">
                Tagore Lawn Arena
              </h4>
              <p className="text-[11px] text-slate-300 line-clamp-2 mt-0.5">
                Red carpet audience pavilion for convocations, symposiums, and opening ceremonies.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 3. FEATURED FLAGSHIP PROGRAMS */}
      {/* ============================================================ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" /> High-Priority Registrations
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Featured Flagship Programs
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              Top institutional events currently accepting digital registrations across faculties.
            </p>
          </div>
          <Link to="/events">
            <Button variant="outline" size="sm" icon={ArrowRight}>
              View All Programs
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </section>

      {/* ============================================================ */}
      {/* 4. EVENT SPECTRUM & CATEGORIES */}
      {/* ============================================================ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-400 uppercase tracking-wider mb-2">
            <Zap className="w-3.5 h-3.5" /> Diverse Spectrum
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Explore by Category
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            From technical hackathons and academic symposia to sports championships, explore events designed for you.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              to={`/events?category=${encodeURIComponent(cat.name)}`}
              className="glass-card-hover glass-panel p-5 rounded-2xl border border-white/10 text-left group flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600/20 to-sky-400/20 border border-blue-400/30 text-sky-300 flex items-center justify-center font-bold text-sm mb-3 group-hover:scale-110 group-hover:border-amber-400/50 transition-all">
                  {cat.name.charAt(0)}
                </div>
                <h4 className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors">
                  {cat.name}
                </h4>
                <p className="text-xs text-slate-400 line-clamp-2 mt-1 leading-relaxed">
                  {cat.description}
                </p>
              </div>

              <div className="mt-4 flex items-center gap-1 text-[11px] font-semibold text-sky-400 group-hover:text-amber-300 group-hover:translate-x-1 transition-all">
                Browse Events <ArrowRight className="w-3 h-3" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ============================================================ */}
      {/* 5. WHY TECHNO-X PLATFORM — INSTITUTIONAL RELIABILITY */}
      {/* ============================================================ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel-glossy rounded-3xl border border-white/15 p-8 sm:p-12 relative overflow-hidden">
          <div className="max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5" /> High-Concurrence Architecture
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              Why TECHNO-X Platform?
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Designed specifically for Techno Group of Institutions to eliminate manual queues, prevent capacity overflow, provide tamper-proof QR access passes, and streamline faculty supervision.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
                <CheckCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <h5 className="text-xs font-bold text-white uppercase">Contactless QR Attendance</h5>
                  <p className="text-xs text-slate-400 mt-0.5">Sub-second gate check-ins with camera barcode parsing.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
                <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h5 className="text-xs font-bold text-white uppercase">Fair Automated Waitlist</h5>
                  <p className="text-xs text-slate-400 mt-0.5">Automated FIFO queue promotions upon venue cancellations.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
                <CheckCircle className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
                <div>
                  <h5 className="text-xs font-bold text-white uppercase">Faculty Super-Admin Tools</h5>
                  <p className="text-xs text-slate-400 mt-0.5">Official student oversight, roster exports, and audit records.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
                <CheckCircle className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
                <div>
                  <h5 className="text-xs font-bold text-white uppercase">Single Student ID Policy</h5>
                  <p className="text-xs text-slate-400 mt-0.5">Unique institutional verification: one student, one digital identity.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 6. COMMITTEES, CLUBS & STUDENT SOCIETIES */}
      {/* ============================================================ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">
              <Building className="w-3.5 h-3.5" /> Institutional Pillars & Guilds
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Committees, Clubs & Societies
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              Official institutional pillars and specialized student guilds driving academics, culture, sports, media, placements, and CSR across Techno campus.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/committees">
              <Button variant="outline" size="sm" icon={ArrowRight}>
                View 6 Pillars
              </Button>
            </Link>
            <Link to="/clubs">
              <Button variant="outline" size="sm" icon={ArrowRight}>
                All Clubs
              </Button>
            </Link>
          </div>
        </div>

        {/* Tab switch between Pillars/Committees and Technical/Cultural Clubs */}
        <div className="flex items-center gap-2 p-1.5 rounded-xl bg-white/5 border border-white/10 w-fit mb-8">
          <button
            onClick={() => setActiveSocietyTab('committees')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeSocietyTab === 'committees'
                ? 'bg-amber-400 text-navy-950 shadow-md shadow-amber-400/20'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Pillars & Committees (6)</span>
          </button>
          <button
            onClick={() => setActiveSocietyTab('clubs')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeSocietyTab === 'clubs'
                ? 'bg-sky-400 text-navy-950 shadow-md shadow-sky-400/20'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Student Clubs & Guilds (4)</span>
          </button>
        </div>

        {/* Dynamic Display: Committees or Clubs */}
        {activeSocietyTab === 'committees' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {COMMITTEES.map((comm) => {
              const IconComp = committeeIconMap[comm.icon] || Award;
              return (
                <Link
                  key={comm.id}
                  to="/committees"
                  className="glass-card-hover glass-panel p-6 rounded-2xl border border-white/10 hover:border-amber-400/40 flex flex-col justify-between group transition-all"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-xl bg-amber-400/15 border border-amber-400/30 text-amber-300 flex items-center justify-center group-hover:scale-110 group-hover:bg-amber-400 group-hover:text-navy-950 transition-all shadow-md">
                        <IconComp className="w-6 h-6" />
                      </div>
                      <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300 font-semibold uppercase tracking-wider">
                        {comm.membersCount}+ Leads
                      </span>
                    </div>

                    <h4 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors">
                      {comm.name}
                    </h4>
                    <p className="text-xs text-amber-400/90 font-medium mt-0.5">
                      {comm.tagline}
                    </p>
                    <p className="text-xs text-slate-300 line-clamp-3 mt-2.5 leading-relaxed">
                      {comm.description}
                    </p>

                    {/* Event Highlights chips */}
                    <div className="mt-4 pt-3 border-t border-white/10 flex flex-wrap gap-1.5">
                      {comm.events?.slice(0, 3).map((ev, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded text-[10px] bg-white/5 border border-white/10 text-slate-300 group-hover:border-amber-400/30 transition-colors truncate max-w-[180px]"
                        >
                          {ev}
                        </span>
                      ))}
                      {comm.events?.length > 3 && (
                        <span className="px-1.5 py-0.5 rounded text-[10px] text-amber-400 font-bold">
                          +{comm.events.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="mt-5 pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                    <span className="text-slate-400">View Objectives & Events</span>
                    <span className="text-amber-400 font-semibold group-hover:translate-x-1 transition-transform flex items-center gap-1">
                      Explore <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {clubs.map((club) => (
              <div
                key={club.id}
                className="glass-card-hover glass-panel p-5 rounded-2xl border border-white/10 flex flex-col justify-between"
              >
                <div>
                  <img
                    src={club.logo}
                    alt={club.name}
                    className="w-12 h-12 rounded-xl object-cover border border-white/20 mb-3 shadow-md"
                  />
                  <h4 className="text-sm font-bold text-white">{club.name}</h4>
                  <p className="text-[11px] text-sky-400 font-medium mt-0.5">{club.tagline}</p>
                  <p className="text-xs text-slate-400 line-clamp-3 mt-2 leading-relaxed">
                    {club.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-white/10 text-[11px] text-slate-400 flex items-center justify-between">
                  <span>
                    <strong className="text-white">{club.membersCount}+</strong> Active Members
                  </span>
                  <span className="text-emerald-400 font-semibold">Active</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ============================================================ */}
      {/* 7. GRAND CALL TO ACTION BANNER (Photo #5 Backdrop) */}
      {/* ============================================================ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel-glossy p-8 sm:p-14 rounded-3xl border border-white/20 text-center relative overflow-hidden shadow-2xl">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-30"
            style={{ 
              backgroundImage: `url('${technoMainBuilding}')`,
              filter: 'contrast(110%) saturate(115%)' 
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/80 to-navy-950" />

          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30 uppercase tracking-wider">
              Ready for the Next Milestone?
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              Begin Your Experience at TECHNO-X
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Login with your verified institutional student ID (e.g. <span className="text-amber-300 font-mono">TGI2025BCA768</span>) to claim your passes, monitor attendance rates, and download verified badges.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <Link to="/login">
                <button className="btn-gold px-8 py-3.5 text-xs sm:text-sm flex items-center gap-2 rounded-lg cursor-pointer">
                  <span>Sign In to Student Portal</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
              <Link to="/events">
                <button className="btn-glass px-8 py-3.5 text-xs sm:text-sm flex items-center gap-2 rounded-lg cursor-pointer">
                  <span>Explore All Events</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
