import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, Globe, Clock } from 'lucide-react';
import { InstagramIcon, YoutubeIcon, FacebookIcon } from '../../components/common/SocialIcons';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { useNotifications } from '../../context/NotificationContext';
import { TIHS_OFFICIAL_INFO } from '../../data/mockData';

export const ContactPage = () => {
  const { showSuccess } = useNotifications();
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    showSuccess('Your inquiry has been routed to the TIHS Lucknow Central Event Secretariat.');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 uppercase tracking-wider">
          <Globe className="w-3.5 h-3.5" /> Campus Help Desk & Secretariat
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Contact TIHS Secretariat
        </h1>
        <p className="text-sm text-slate-300 leading-relaxed">
          Have queries regarding event eligibility, committee selections, or pass verification? Reach out to our campus desk at Faizabad Road, Lucknow.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Contact Info Card */}
        <div className="glass-panel p-8 rounded-3xl border border-white/10 space-y-6">
          <h3 className="text-xl font-bold text-white">Central Operations Office</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            The TECHNO-X coordination council operates under the Directorate of Student Life and the 6 Institutional Committees (Kiran, Abhivyakti, Oorja, Darpan, Sanjeevani, Srijan) at Techno Institute of Higher Studies.
          </p>

          <div className="space-y-4 pt-2 text-sm text-slate-300">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-white">TIHS Lucknow Campus</p>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Techno Campus, Faizabad Road, Lucknow, Uttar Pradesh 226028
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-amber-400 shrink-0" />
              <div>
                <p className="font-semibold text-white">Campus Helpline</p>
                <span className="text-xs text-amber-400">
                  +91 (0522) 278-9000 • Toll-Free: 1800-120-8447
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-amber-400 shrink-0" />
              <div>
                <p className="font-semibold text-white">Official Event Email</p>
                <a href="mailto:events@technox.tgi.ac.in" className="text-xs text-slate-300 hover:text-white">
                  events@technox.tgi.ac.in • helpdesk@technox.tgi.ac.in
                </a>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-amber-400 shrink-0" />
              <div>
                <p className="font-semibold text-white">Office Hours</p>
                <p className="text-xs text-slate-400">Monday – Saturday: 09:00 AM – 05:30 PM IST</p>
              </div>
            </div>
          </div>

          {/* Socials */}
          <div className="pt-4 border-t border-white/10 space-y-2">
            <p className="text-xs font-bold text-slate-200 uppercase tracking-wider">Follow TIHS Online</p>
            <div className="flex items-center gap-2">
              <a
                href={TIHS_OFFICIAL_INFO?.socials?.instagram || "https://www.instagram.com/technogroupofinstitutionslko/"}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-lg bg-pink-500/10 border border-pink-400/20 text-pink-400 text-xs font-semibold hover:bg-pink-500 hover:text-white transition-all flex items-center gap-1.5"
              >
                <InstagramIcon className="w-3.5 h-3.5" /> Instagram
              </a>
              <a
                href={TIHS_OFFICIAL_INFO?.socials?.youtube || "https://www.youtube.com/channel/UCm3Xw4YjiuQqkKhfT04qCRw"}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-lg bg-red-500/10 border border-red-400/20 text-red-400 text-xs font-semibold hover:bg-red-500 hover:text-white transition-all flex items-center gap-1.5"
              >
                <YoutubeIcon className="w-3.5 h-3.5" /> YouTube
              </a>
              <a
                href={TIHS_OFFICIAL_INFO?.socials?.facebook || "https://www.facebook.com/technogroupofinstitutions/"}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-lg bg-blue-600/10 border border-blue-400/20 text-blue-400 text-xs font-semibold hover:bg-blue-600 hover:text-white transition-all flex items-center gap-1.5"
              >
                <FacebookIcon className="w-3.5 h-3.5" /> Facebook
              </a>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="glass-panel p-8 rounded-3xl border border-white/10">
          {submitted ? (
            <div className="py-12 text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
              <h3 className="text-xl font-bold text-white">Inquiry Received</h3>
              <p className="text-xs text-slate-300 max-w-sm mx-auto leading-relaxed">
                Thank you! Your query has been logged with the TIHS event coordinator desk. We will respond to your email within 24 business hours.
              </p>
              <Button variant="outline" size="sm" onClick={() => setSubmitted(false)}>
                Submit Another Inquiry
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Full Name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Aarav Sharma"
              />
              <Input
                label="Official Email / Student Email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="e.g. student@technox.test"
              />
              <Input
                label="Subject"
                required
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                placeholder="e.g. ANTARANG 2026 Pass Verification"
              />
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-300 mb-1">
                  Message / Inquiry Details
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Provide detailed query regarding committee events, pass verification, or attendance..."
                  className="w-full rounded-xl bg-navy-900 border border-slate-700/80 px-4 py-3 text-xs text-white placeholder-slate-500 focus:border-amber-400 focus:outline-none transition-colors"
                />
              </div>
              <button
                type="submit"
                className="btn-gold w-full py-3 text-xs flex items-center justify-center gap-2 rounded-xl"
              >
                <span>Transmit Message to Secretariat</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
