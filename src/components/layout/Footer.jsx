import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Mail, Phone, MapPin, ExternalLink, ShieldCheck } from 'lucide-react';
import { InstagramIcon, YoutubeIcon, FacebookIcon, LinkedinIcon, TwitterIcon } from '../common/SocialIcons';
import { TIHS_OFFICIAL_INFO } from '../../data/mockData';

export const Footer = () => {
  return (
    <footer className="border-t border-slate-800/80 bg-navy-950 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-400 via-amber-500 to-yellow-500 flex items-center justify-center shadow-lg shadow-amber-500/25">
                <span className="font-black text-navy-950 text-base">TX</span>
              </div>
              <div>
                <span className="font-black text-xl text-white tracking-wider">
                  TECHNO<span className="text-amber-400">-X</span>
                </span>
                <p className="text-[10px] text-slate-400 font-medium">Techno Institute of Higher Studies (TIHS)</p>
              </div>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              The official collegiate event orchestration and committee management platform for Techno Group of Institutions (TGI), Lucknow.
              Affiliated to University of Lucknow & AICTE Approved.
            </p>
            <div className="space-y-1">
              <p className="text-amber-400 font-semibold text-xs tracking-wide">
                “Connect. Participate. Experience.”
              </p>
              <p className="text-slate-300 font-medium text-xs">
                “हर इवेंट, एक प्लेटफॉर्म।”
              </p>
            </div>

            {/* Official Social Media Channels */}
            <div className="pt-2">
              <p className="text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-2.5">Official Social Channels</p>
              <div className="flex items-center gap-2.5">
                <a
                  href={TIHS_OFFICIAL_INFO?.socials?.instagram || "https://www.instagram.com/technogroupofinstitutionslko/"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-pink-500/15 border border-pink-400/30 text-pink-400 hover:bg-pink-500 hover:text-white transition-all flex items-center justify-center"
                  aria-label="TIHS Lucknow Instagram"
                  title="Follow TIHS on Instagram"
                >
                  <InstagramIcon className="w-4 h-4" />
                </a>
                <a
                  href={TIHS_OFFICIAL_INFO?.socials?.youtube || "https://www.youtube.com/channel/UCm3Xw4YjiuQqkKhfT04qCRw"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-red-500/15 border border-red-400/30 text-red-400 hover:bg-red-500 hover:text-white transition-all flex items-center justify-center"
                  aria-label="TIHS Lucknow YouTube"
                  title="TIHS Official YouTube"
                >
                  <YoutubeIcon className="w-4 h-4" />
                </a>
                <a
                  href={TIHS_OFFICIAL_INFO?.socials?.facebook || "https://www.facebook.com/technogroupofinstitutions/"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-blue-600/15 border border-blue-400/30 text-blue-400 hover:bg-blue-600 hover:text-white transition-all flex items-center justify-center"
                  aria-label="TIHS Facebook"
                  title="TIHS on Facebook"
                >
                  <FacebookIcon className="w-4 h-4" />
                </a>
                <a
                  href={TIHS_OFFICIAL_INFO?.socials?.linkedin || "https://www.linkedin.com/company/technogroupofinstitutions/"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-sky-600/15 border border-sky-400/30 text-sky-400 hover:bg-sky-600 hover:text-white transition-all flex items-center justify-center"
                  aria-label="TIHS LinkedIn"
                  title="TIHS on LinkedIn"
                >
                  <LinkedinIcon className="w-4 h-4" />
                </a>
                <a
                  href={TIHS_OFFICIAL_INFO?.socials?.twitter || "https://x.com/technogroup2?lang=en"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-slate-700/30 border border-slate-500/30 text-slate-300 hover:bg-white hover:text-navy-950 transition-all flex items-center justify-center"
                  aria-label="TIHS Twitter / X"
                  title="TIHS on Twitter"
                >
                  <TwitterIcon className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">Navigation</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:text-amber-400 transition-colors">Home</Link></li>
              <li><Link to="/events" className="hover:text-amber-400 transition-colors">All Events</Link></li>
              <li><Link to="/committees" className="hover:text-amber-400 transition-colors">Pillars & Committees</Link></li>
              <li><Link to="/clubs" className="hover:text-amber-400 transition-colors">Clubs & Guilds</Link></li>
              <li><Link to="/about" className="hover:text-amber-400 transition-colors">About Campus</Link></li>
              <li><Link to="/contact" className="hover:text-amber-400 transition-colors">Contact Support</Link></li>
            </ul>
          </div>

          {/* Role Portals */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">Portals</h4>
            <ul className="space-y-2">
              <li><Link to="/login" className="hover:text-amber-400 transition-colors">Student Login</Link></li>
              <li><Link to="/login" className="hover:text-amber-400 transition-colors">Faculty Portal</Link></li>
              <li><Link to="/login" className="hover:text-amber-400 transition-colors">Management Committee</Link></li>
              <li><Link to="/login" className="hover:text-amber-400 transition-colors">Central Admin</Link></li>
              <li><Link to="/login" className="text-amber-400 hover:text-amber-300 flex items-center gap-1 font-medium">Student Digital Pass <Sparkles className="w-3 h-3" /></Link></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">Campus Secretariat</h4>
            <div className="space-y-2.5 text-slate-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>Techno Campus, Faizabad Road, Lucknow, Uttar Pradesh 226028</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <span>+91 (0522) 278-9000</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <a href="mailto:helpdesk@technox.tgi.ac.in" className="hover:text-white transition-colors">helpdesk@technox.tgi.ac.in</a>
              </div>
              <div className="flex items-center gap-1.5 text-emerald-400 font-semibold pt-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>NAAC Accredited Institution</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500">
          <p>© {new Date().getFullYear()} Techno Institute of Higher Studies (TIHS Lucknow). All rights reserved.</p>
          <p className="text-[11px]">Affiliated to University of Lucknow • AICTE Approved</p>
        </div>
      </div>
    </footer>
  );
};
