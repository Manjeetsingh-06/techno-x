import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { DEMO_CREDENTIALS } from '../../config/demoCredentials';
import { useNotifications } from '../../context/NotificationContext';
import { Input } from '../../components/common/Input';
import { PublicNavbar } from '../../components/layout/PublicNavbar';
import { Footer } from '../../components/layout/Footer';
import campusHeroImg from '../../assets/campus_hero.png';
import technoGate from '../../assets/techno_gate.jpg';
import technoStage from '../../assets/techno_stage.png';
import technoFestEvening from '../../assets/techno_fest_evening.jpg';
import {
  Lock,
  Mail,
  ArrowRight,
  GraduationCap,
  Eye,
  EyeOff,
  Info,
  UserCircle2,
  RefreshCw,
  ShieldCheck
} from 'lucide-react';

export const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, loading } = useAuth();
  const { showSuccess, showError } = useNotifications();

  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [activeRoleTab, setActiveRoleTab] = useState('STUDENT');
  const [showCredHint, setShowCredHint] = useState(false);

  // 4-character CAPTCHA state
  const [captchaCode, setCaptchaCode] = useState('');
  const [userCaptcha, setUserCaptcha] = useState('');

  const generateCaptcha = () => {
    // Generate 4-character unambiguous alphanumeric code
    const chars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
    let code = '';
    for (let i = 0; i < 4; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaCode(code);
    setUserCaptcha('');
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  const roleVisuals = {
    STUDENT: {
      title: 'Student Portal',
      badge: 'Undergraduate & Postgraduate',
      image: campusHeroImg,
      tagline: 'Connect. Participate. Excel.',
      description: 'Access your digital event passes, track attendance, join societies, and earn merit badges.',
      stats: '4,800+ Students',
      color: 'emerald'
    },
    FACULTY: {
      title: 'Faculty Desk',
      badge: 'Departmental Supervision',
      image: technoStage,
      tagline: 'Mentorship & Validation',
      description: 'Review event proposals, approve registrations, manage rosters, and sign off attendance.',
      stats: '240+ Faculty',
      color: 'sky'
    },
    MANAGEMENT_COMMITTEE: {
      title: 'Committee Portal',
      badge: 'Event Operations',
      image: technoGate,
      tagline: 'Flawless Execution',
      description: 'Plan events, broadcast announcements, operate QR scanner gates, track capacity live.',
      stats: '14 Active Committees',
      color: 'amber'
    },
    ADMIN: {
      title: 'Admin Console',
      badge: 'TGI Executive Council',
      image: technoFestEvening,
      tagline: 'Institutional Governance',
      description: 'System analytics, audit trails, role management, faculty appointment, event sanctioning.',
      stats: 'Full Oversight',
      color: 'purple'
    }
  };

  const colorMap = {
    emerald: { tab: 'bg-emerald-600 text-white', badge: 'bg-emerald-400/20 text-emerald-300 border-emerald-400/40' },
    sky: { tab: 'bg-sky-600 text-white', badge: 'bg-sky-400/20 text-sky-300 border-sky-400/40' },
    amber: { tab: 'bg-amber-500 text-navy-950', badge: 'bg-amber-400/20 text-amber-300 border-amber-400/40' },
    purple: { tab: 'bg-purple-600 text-white', badge: 'bg-purple-400/20 text-purple-300 border-purple-400/40' },
  };

  const currentVisual = roleVisuals[activeRoleTab];
  const currentColors = colorMap[currentVisual.color];

  // Check if coming back from registration
  const registered = new URLSearchParams(location.search).get('registered');

  const redirectAfterLogin = (role) => {
    const from = location.state?.from?.pathname;
    if (from && from !== '/login') { navigate(from, { replace: true }); return; }
    const routes = {
      ADMIN: '/admin/dashboard',
      FACULTY: '/faculty/dashboard',
      MANAGEMENT_COMMITTEE: '/committee/dashboard',
      STUDENT: '/student/dashboard',
    };
    navigate(routes[role] || '/student/dashboard', { replace: true });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    if (!identifier.trim()) { setErrorMsg('Please enter your email or Student ID.'); return; }
    if (!password.trim()) { setErrorMsg('Please enter your password.'); return; }

    // Validate 4-character CAPTCHA
    if (userCaptcha.trim().toUpperCase() !== captchaCode.toUpperCase()) {
      setErrorMsg('Incorrect 4-character security code. Please check and re-enter.');
      generateCaptcha();
      return;
    }

    const res = await login({ identifier: identifier.trim(), password });
    if (res.success) {
      showSuccess(`Welcome back, ${res.user?.name || 'User'}!`);
      redirectAfterLogin(res.user?.role);
    } else {
      setErrorMsg(res.error || 'Invalid credentials. Please check your email/ID and password.');
      showError(res.error || 'Authentication failed');
      generateCaptcha();
    }
  };

  const tabs = [
    { key: 'STUDENT', label: 'Student' },
    { key: 'FACULTY', label: 'Faculty' },
    { key: 'MANAGEMENT_COMMITTEE', label: 'Committee' },
    { key: 'ADMIN', label: 'Admin' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-navy-950 text-slate-100 selection:bg-amber-500 selection:text-slate-950">
      {/* ── Home Page Institutional Header ─────────────────────── */}
      <PublicNavbar />

      {/* ── Main Login Container ───────────────────────────────── */}
      <main className="flex-1 flex items-center justify-center py-5 sm:py-7 px-3 sm:px-6">
        <div className="w-full max-w-5xl glass-panel-glossy rounded-2xl border border-white/15 shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12">

          {/* ── LEFT: Campus Visual ─────────────────────────────────── */}
          <div className="lg:col-span-6 relative flex flex-col justify-between p-6 sm:p-8 overflow-hidden min-h-[260px] lg:min-h-auto">
            <div
              className="absolute inset-0 bg-cover bg-center transition-all duration-700 scale-105"
              style={{ backgroundImage: `url('${currentVisual.image}')`, backgroundPosition: 'center 30%' }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/75 to-navy-950/40" />
            <div className="absolute inset-0 bg-blue-950/20 backdrop-blur-[2px]" />

            {/* Brand */}
            <div className="relative z-10 flex items-center justify-between">
              <Link to="/" className="inline-flex items-center gap-2.5 group">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-400 to-yellow-500 flex items-center justify-center shadow-lg shadow-amber-500/30 group-hover:scale-105 transition-transform">
                  <span className="font-black text-slate-950 text-lg">TX</span>
                </div>
                <div>
                  <span className="font-black text-xl text-white tracking-wider block">TECHNO<span className="text-amber-400">-X</span></span>
                  <span className="text-[10px] text-slate-300 font-semibold tracking-wide uppercase block -mt-1">Techno Group of Institutions</span>
                </div>
              </Link>
              <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-white/10 text-white border border-white/20 backdrop-blur-md">SSO Portal</span>
            </div>

            {/* Visual content */}
            <div className="relative z-10 space-y-4 my-auto pt-10">
              <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-bold backdrop-blur-md ${currentColors.badge}`}>
                <GraduationCap className="w-3.5 h-3.5" />
                <span>{currentVisual.badge}</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-snug drop-shadow-md">{currentVisual.title}</h3>
              <p className="text-xs sm:text-sm text-slate-200/90 leading-relaxed max-w-md drop-shadow">{currentVisual.description}</p>
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-xl bg-navy-950/70 backdrop-blur-md border border-white/15 text-xs text-slate-200">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span className="font-semibold text-white">{currentVisual.stats}</span>
                <span className="text-slate-400">•</span>
                <span className="text-amber-300">{currentVisual.tagline}</span>
              </div>
            </div>

            <div className="relative z-10 pt-6 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-300/80">
              <span>© 2026 Techno Group of Institutions</span>
              <span>NAAC 'A' Grade Campus</span>
            </div>
          </div>

          {/* ── RIGHT: Login Form ────────────────────────────────────── */}
          <div className="lg:col-span-6 p-5 sm:p-8 flex flex-col justify-center bg-navy-950/90 backdrop-blur-xl">
            <div className="max-w-md mx-auto w-full space-y-5">

              {/* Header */}
              <div className="flex items-start justify-between border-b border-white/10 pb-4">
                <div>
                  <h2 className="text-2xl font-black text-white tracking-tight">Sign In</h2>
                  <p className="text-xs text-slate-400 mt-0.5">Use your Email ID or Student ID to sign in</p>
                </div>
                <Link
                  to="/register"
                  className="px-3 py-1.5 rounded-xl bg-amber-400/15 hover:bg-amber-400/25 border border-amber-400/30 text-amber-300 text-xs font-bold transition-all shrink-0 mt-1"
                >
                  New Student? Register →
                </Link>
              </div>

              {/* Success banner after registration */}
              {registered && (
                <div className="p-3.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-xs text-emerald-300 font-medium flex items-center gap-2">
                  <span className="text-lg">✅</span>
                  <span>Registration successful! Please sign in with your credentials.</span>
                </div>
              )}

              {/* Role Tabs */}
              <div className="flex rounded-xl overflow-hidden bg-slate-900/80 border border-slate-800 p-1 gap-1">
                {tabs.map(t => (
                  <button
                    key={t.key}
                    type="button"
                    onClick={() => setActiveRoleTab(t.key)}
                    className={`flex-1 py-1.5 text-[11px] font-bold rounded-lg transition-all ${
                      activeRoleTab === t.key
                        ? colorMap[roleVisuals[t.key].color].tab + ' shadow-md'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>

              {/* Error */}
              {errorMsg && (
                <div className="p-3.5 rounded-xl bg-rose-500/15 border border-rose-500/30 text-xs text-rose-300 font-medium">{errorMsg}</div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  label={activeRoleTab === 'STUDENT' ? 'Email ID or Student ID (TGI...)' : 'Email ID'}
                  icon={activeRoleTab === 'STUDENT' ? UserCircle2 : Mail}
                  required
                  value={identifier}
                  onChange={e => setIdentifier(e.target.value)}
                  placeholder={activeRoleTab === 'STUDENT' ? 'e.g. TGI2025BCA768 or yourname@gmail.com' : 'e.g. faculty@institution.ac.in'}
                />

                <div className="relative">
                  <Input
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    icon={Lock}
                    required
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-9 text-slate-400 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>

                {/* 4-Character Visual Captcha Box */}
                <div className="space-y-1.5 pt-1">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                    Security Verification Code <span className="text-amber-400 font-mono">(4 characters)</span> <span className="text-rose-400">*</span>
                  </label>
                  <div className="flex items-center gap-3">
                    <div className="relative flex items-center justify-center px-4 py-2 rounded-xl bg-navy-900 border border-amber-400/40 select-none shadow-inner overflow-hidden min-w-[130px]">
                      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#fbbf24_1px,transparent_1px)] [background-size:8px_8px]" />
                      <span className="font-mono text-xl font-black tracking-[6px] text-amber-300 drop-shadow-[0_2px_8px_rgba(251,191,36,0.4)]">
                        {captchaCode}
                      </span>
                      <div className="absolute inset-x-0 top-1/2 h-[1px] bg-amber-400/40 -rotate-6 pointer-events-none" />
                    </div>

                    <button
                      type="button"
                      onClick={generateCaptcha}
                      className="p-2.5 rounded-xl bg-navy-900/80 hover:bg-navy-800 border border-white/10 text-slate-300 hover:text-white transition-all cursor-pointer"
                      title="Generate new 4-character code"
                    >
                      <RefreshCw className="w-4 h-4" />
                    </button>

                    <input
                      type="text"
                      maxLength={4}
                      value={userCaptcha}
                      onChange={(e) => setUserCaptcha(e.target.value.toUpperCase())}
                      placeholder="Type 4 chars"
                      required
                      className="flex-1 px-4 py-2.5 rounded-xl bg-navy-900/90 border border-white/15 focus:border-amber-400 text-white font-mono text-center font-bold tracking-widest text-sm uppercase transition-all outline-none"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-end text-xs">
                  <Link to="/forgot-password" className="text-amber-400 hover:text-amber-300 font-medium transition-colors">
                    Forgot password?
                  </Link>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full btn-gold py-3.5 text-xs sm:text-sm flex items-center justify-center gap-2 rounded-xl mt-2 font-bold cursor-pointer"
                >
                  {loading ? (
                    <span className="flex items-center gap-2"><span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" /> Authenticating...</span>
                  ) : (
                    <><span>Sign In to Portal</span><ArrowRight className="w-4 h-4" /></>
                  )}
                </button>
              </form>

              {/* Credential hint (collapsible) */}
              <div className="pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setShowCredHint(!showCredHint)}
                  className="flex items-center gap-2 text-[11px] text-slate-400 hover:text-slate-200 transition-colors w-full cursor-pointer"
                >
                  <Info className="w-3.5 h-3.5 shrink-0" />
                  <span>{showCredHint ? 'Hide' : 'Show'} institutional accounts hint</span>
                </button>

                {showCredHint && (
                  <div className="mt-3 rounded-xl bg-slate-900/70 border border-slate-700/60 p-4 space-y-2.5 text-[11px]">
                    <p className="text-slate-400 font-semibold uppercase tracking-wider text-[10px] mb-2">Institutional Seed Accounts</p>
                    {Object.values(DEMO_CREDENTIALS).map(cred => (
                      <div
                        key={cred.role}
                        className="flex items-center justify-between gap-3 cursor-pointer hover:bg-slate-800/50 rounded-lg p-2 transition-colors"
                        onClick={() => { setIdentifier(cred.email); setPassword(cred.password); setActiveRoleTab(cred.role); setShowCredHint(false); }}
                      >
                        <div className="min-w-0">
                          <p className="text-white font-semibold truncate">{cred.label}</p>
                          <p className="text-slate-400 font-mono truncate">{cred.email}</p>
                        </div>
                        <span className="text-amber-400 shrink-0 font-medium">Fill ↗</span>
                      </div>
                    ))}
                    <p className="text-slate-500 text-[10px] pt-1 border-t border-slate-800 mt-2">Click any row to auto-fill credentials</p>
                  </div>
                )}
              </div>

              <p className="text-center text-[11px] text-slate-500">
                Techno Group of Institutions • Identity & Access Management
              </p>
            </div>
          </div>

        </div>
      </main>

      {/* ── Footer ─────────────────────────────────────────────── */}
      <Footer />
    </div>
  );
};
