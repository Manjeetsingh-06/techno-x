import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useNotifications } from '../../context/NotificationContext';
import { authService } from '../../services/authService';
import { PublicNavbar } from '../../components/layout/PublicNavbar';
import { Footer } from '../../components/layout/Footer';
import technoGate from '../../assets/techno_gate.jpg';
import {
  Lock,
  Mail,
  Phone,
  User,
  GraduationCap,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Eye,
  EyeOff,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  KeyRound,
  IdCard,
  Send
} from 'lucide-react';

export const RegisterPage = () => {
  const navigate = useNavigate();
  const { showSuccess, showError } = useNotifications();

  // Form state
  const [studentId, setStudentId] = useState('');
  const [name, setName] = useState('');
  const [fatherName, setFatherName] = useState('');
  const [dob, setDob] = useState('');
  const [course, setCourse] = useState('BCA');
  const [year, setYear] = useState('2026');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // OTP Verification state ("email mobile no dono me se ek verify in register time")
  const [verificationTargetType, setVerificationTargetType] = useState('EMAIL'); // 'EMAIL' or 'MOBILE'
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [sendingOtp, setSendingOtp] = useState(false);
  const [verifyingOtp, setVerifyingOtp] = useState(false);
  const [debugOtpHint, setDebugOtpHint] = useState('');

  // 4-character CAPTCHA state
  const [captchaCode, setCaptchaCode] = useState('');
  const [userCaptcha, setUserCaptcha] = useState('');

  // Submit state
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Generate dynamic 4-character captcha
  const generateCaptcha = () => {
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

  // Send OTP
  const handleSendOtp = async () => {
    const target = verificationTargetType === 'EMAIL' ? email.trim() : mobile.trim();
    if (!target) {
      showError(`Please enter your ${verificationTargetType === 'EMAIL' ? 'email address' : 'mobile number'} first.`);
      return;
    }

    setSendingOtp(true);
    setErrorMsg('');
    try {
      const res = await authService.sendOtp({
        target,
        type: verificationTargetType
      });
      if (res.success) {
        setOtpSent(true);
        if (res.data) setDebugOtpHint(res.data);
        showSuccess(`Verification code sent to ${target}`);
      } else {
        showError(res.error || 'Failed to send OTP code');
      }
    } catch (err) {
      showError(err.message || 'Error requesting OTP');
    } finally {
      setSendingOtp(false);
    }
  };

  // Verify OTP
  const handleVerifyOtp = async () => {
    const target = verificationTargetType === 'EMAIL' ? email.trim() : mobile.trim();
    if (!otpCode.trim()) {
      showError('Please enter the 6-digit verification code');
      return;
    }

    setVerifyingOtp(true);
    try {
      const res = await authService.verifyOtp({
        target,
        otp: otpCode.trim()
      });
      if (res.success && res.data) {
        setIsVerified(true);
        showSuccess(`${verificationTargetType === 'EMAIL' ? 'Email' : 'Mobile number'} verified successfully!`);
      } else {
        showError(res.error || 'Invalid or expired verification code');
      }
    } catch (err) {
      showError(err.message || 'Verification failed');
    } finally {
      setVerifyingOtp(false);
    }
  };

  // Handle Registration Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    // Validation
    if (!studentId.trim().toUpperCase().startsWith('TGI')) {
      setErrorMsg('Student ID must follow format: TGIxxxxCourse id (e.g. TGI2026BCA101)');
      return;
    }

    if (password.length < 6) {
      setErrorMsg('Password must be at least 6 characters long.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMsg('Passwords do not match. Please re-enter.');
      return;
    }

    if (!isVerified) {
      setErrorMsg('Please verify either your Email or Mobile Number using OTP before submitting.');
      return;
    }

    // 4-character CAPTCHA validation
    if (userCaptcha.trim().toUpperCase() !== captchaCode.toUpperCase()) {
      setErrorMsg('Incorrect 4-character security code. Please check and re-enter.');
      generateCaptcha();
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        studentId: studentId.trim().toUpperCase(),
        name: name.trim(),
        fatherName: fatherName.trim(),
        dob,
        course,
        year: String(year),
        email: email.trim().toLowerCase(),
        mobile: mobile.trim(),
        password,
        verificationType: verificationTargetType,
        verificationCode: otpCode.trim()
      };

      const res = await authService.registerStudent(payload);
      if (res.success) {
        showSuccess(`🎉 Welcome to TECHNO-X, ${name}! Your account has been registered. Please sign in.`);
        navigate('/login?registered=true', { replace: true });
      } else {
        setErrorMsg(res.error || 'Registration failed. Please check your details and try again.');
        showError(res.error || 'Registration failed');
      }
    } catch (err) {
      setErrorMsg(err.message || 'Registration request error. Please try again.');
      showError(err.message || 'Registration failed');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-navy-950 text-slate-100 selection:bg-amber-500 selection:text-slate-950">
      {/* ── Home Page Institutional Header ─────────────────────── */}
      <PublicNavbar />

      {/* ── Main Registration Container (Responsive & Balanced at 100% zoom) ── */}
      <main className="flex-1 flex items-center justify-center py-5 sm:py-7 px-3 sm:px-6">
        <div className="w-full max-w-5xl glass-panel-glossy rounded-2xl border border-white/15 shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12">

          {/* ── LEFT PANEL: BRANDING (Compact & Proportional) ──────── */}
          <div className="lg:col-span-4 relative flex flex-col justify-between p-6 sm:p-7 overflow-hidden min-h-[220px] lg:min-h-auto">
            <div
              className="absolute inset-0 bg-cover bg-center transition-all duration-700 scale-105"
              style={{
                backgroundImage: `url('${technoGate}')`,
                backgroundPosition: 'center 40%'
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/85 to-navy-950/65" />
            <div className="absolute inset-0 bg-blue-950/25 backdrop-blur-[1px]" />

            {/* Top Logo */}
            <div className="relative z-10">
              <Link to="/" className="inline-flex items-center gap-2 group">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-amber-400 to-yellow-500 flex items-center justify-center shadow-md shadow-amber-500/30 group-hover:scale-105 transition-transform">
                  <span className="font-black text-slate-950 text-sm">TX</span>
                </div>
                <div className="text-left">
                  <span className="font-black text-base text-white tracking-wider block leading-tight">
                    TECHNO<span className="text-amber-400">-X</span>
                  </span>
                  <span className="text-[9px] text-slate-300 font-semibold tracking-wide uppercase block">
                    TGI Campus Portal
                  </span>
                </div>
              </Link>
            </div>

            {/* Center Info */}
            <div className="relative z-10 space-y-3 my-auto py-6">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-400/20 border border-emerald-400/30 text-emerald-300 text-[11px] font-bold backdrop-blur-md">
                <Sparkles className="w-3 h-3" />
                <span>Student Self-Registration</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-snug drop-shadow-md">
                Your Digital Identity & Campus Pass
              </h3>

              <p className="text-xs text-slate-200/90 leading-relaxed drop-shadow">
                Register to claim digital QR event passes, participate in ANTARANG, unlock verified badges, and track attendance.
              </p>

              <div className="p-3 rounded-xl bg-navy-950/80 border border-white/10 text-[11px] text-slate-300 space-y-1.5 backdrop-blur-md">
                <div className="flex items-center gap-1.5 text-amber-300 font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Official Verification</span>
                </div>
                <p className="text-[10.5px] text-slate-400 leading-normal">
                  OTP verification of Email or Mobile is mandatory to ensure verified student status.
                </p>
              </div>
            </div>

            {/* Bottom strip */}
            <div className="relative z-10 pt-4 border-t border-white/10 flex items-center justify-between text-[10px] text-slate-400">
              <span>© 2026 Techno Group</span>
              <span>NAAC Accredited</span>
            </div>
          </div>

          {/* ── RIGHT PANEL: COMPACT FORM ──────────────────────────── */}
          <div className="lg:col-span-8 p-5 sm:p-7 flex flex-col justify-center bg-navy-950/95 backdrop-blur-xl">
            <div className="w-full space-y-4">

              {/* Form Title & Sign In Switch */}
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                    Student Registration
                  </h2>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Enter your official admission details to activate your student account.
                  </p>
                </div>
                <Link
                  to="/login"
                  className="px-3 py-1 rounded-xl bg-amber-400/15 hover:bg-amber-400/25 border border-amber-400/30 text-amber-300 text-xs font-bold transition-all shrink-0"
                >
                  Sign In →
                </Link>
              </div>

              {errorMsg && (
                <div className="p-2.5 rounded-xl bg-rose-500/15 border border-rose-500/30 text-xs text-rose-300 font-medium flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-3.5">
                {/* SECTION 1: Academic Identity */}
                <div className="space-y-2.5 p-3 sm:p-3.5 rounded-xl bg-navy-900/50 border border-white/10">
                  <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-amber-400">
                    <IdCard className="w-3.5 h-3.5" />
                    <span>1. Academic Enrollment Identity</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-[11px] font-bold text-slate-300">
                          Student ID <span className="text-rose-400">*</span>
                        </label>
                        <span className="text-[10px] text-amber-400 font-mono">
                          Format: TGIxxxxCourse id
                        </span>
                      </div>
                      <input
                        type="text"
                        required
                        placeholder="TGIxxxxCourse id (e.g. TGI2026BCA101)"
                        value={studentId}
                        onChange={(e) => setStudentId(e.target.value.toUpperCase())}
                        className="w-full bg-navy-950 border border-white/15 focus:border-amber-400 rounded-lg px-3 py-2 text-xs text-white focus:outline-none transition-all uppercase placeholder:text-slate-500"
                      />
                      <p className="text-[10px] text-slate-400 mt-1 font-mono">
                        Format: <span className="text-amber-300 font-semibold">TGIxxxxCourse id</span> (e.g. TGI2026BCA101)
                      </p>
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-300 mb-1">
                        Full Student Name <span className="text-rose-400">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Rahul Verma"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-navy-950 border border-white/15 focus:border-amber-400 rounded-lg px-3 py-2 text-xs text-white focus:outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-300 mb-1">
                        Father's Name <span className="text-rose-400">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Shri Rajesh Verma"
                        value={fatherName}
                        onChange={(e) => setFatherName(e.target.value)}
                        className="w-full bg-navy-950 border border-white/15 focus:border-amber-400 rounded-lg px-3 py-2 text-xs text-white focus:outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-300 mb-1">
                        Date of Birth (DOB) <span className="text-rose-400">*</span>
                      </label>
                      <input
                        type="date"
                        required
                        value={dob}
                        onChange={(e) => setDob(e.target.value)}
                        className="w-full bg-navy-950 border border-white/15 focus:border-amber-400 rounded-lg px-3 py-2 text-xs text-white focus:outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-300 mb-1">
                        Course / Degree <span className="text-rose-400">*</span>
                      </label>
                      <select
                        value={course}
                        onChange={(e) => setCourse(e.target.value)}
                        className="w-full bg-navy-950 border border-white/15 focus:border-amber-400 rounded-lg px-3 py-2 text-xs text-white focus:outline-none transition-all"
                      >
                        <option value="BCA">Bachelor of Computer Applications (BCA)</option>
                        <option value="BBA">Bachelor of Business Administration (BBA)</option>
                        <option value="B.Com">Bachelor of Commerce (B.Com)</option>
                        <option value="B.Tech (CSE)">B.Tech - Computer Science & Engineering</option>
                        <option value="B.Tech (IT)">B.Tech - Information Technology</option>
                        <option value="MCA">Master of Computer Applications (MCA)</option>
                        <option value="MBA">Master of Business Administration (MBA)</option>
                        <option value="Polytechnic">Polytechnic Diploma</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-300 mb-1">
                        Admission Year <span className="text-rose-400">*</span>
                      </label>
                      <select
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                        className="w-full bg-navy-950 border border-white/15 focus:border-amber-400 rounded-lg px-3 py-2 text-xs text-white focus:outline-none transition-all"
                      >
                        <option value="2026">2026 (1st Year - Fresh Batch)</option>
                        <option value="2025">2025 (2nd Year)</option>
                        <option value="2024">2024 (3rd Year)</option>
                        <option value="2023">2023 (Final Year)</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* SECTION 2: Contact & Identity OTP Verification */}
                <div className="space-y-2.5 p-3 sm:p-3.5 rounded-xl bg-navy-900/50 border border-amber-400/25">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-amber-300">
                      <KeyRound className="w-3.5 h-3.5" />
                      <span>2. Contact & OTP Verification</span>
                    </div>

                    {/* Toggle between Email and Mobile verification */}
                    <div className="flex items-center bg-navy-950 p-0.5 rounded-lg border border-white/10 text-[10px]">
                      <button
                        type="button"
                        onClick={() => { setVerificationTargetType('EMAIL'); setOtpSent(false); setIsVerified(false); }}
                        className={`px-2 py-0.5 rounded-md font-bold transition-all cursor-pointer ${
                          verificationTargetType === 'EMAIL' ? 'bg-amber-400 text-navy-950 shadow-sm' : 'text-slate-400'
                        }`}
                      >
                        Email OTP
                      </button>
                      <button
                        type="button"
                        onClick={() => { setVerificationTargetType('MOBILE'); setOtpSent(false); setIsVerified(false); }}
                        className={`px-2 py-0.5 rounded-md font-bold transition-all cursor-pointer ${
                          verificationTargetType === 'MOBILE' ? 'bg-amber-400 text-navy-950 shadow-sm' : 'text-slate-400'
                        }`}
                      >
                        Mobile OTP
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-300 mb-1">
                        Email ID <span className="text-rose-400">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="e.g. yourname@gmail.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-navy-950 border border-white/15 focus:border-amber-400 rounded-lg px-3 py-2 text-xs text-white focus:outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-300 mb-1">
                        Mobile Number <span className="text-rose-400">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. +91 98765 43210"
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                        className="w-full bg-navy-950 border border-white/15 focus:border-amber-400 rounded-lg px-3 py-2 text-xs text-white focus:outline-none transition-all"
                      />
                    </div>
                  </div>

                  {/* OTP Trigger & Input Row */}
                  <div className="pt-1.5 border-t border-white/10 space-y-1.5">
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                      <button
                        type="button"
                        disabled={sendingOtp || isVerified}
                        onClick={handleSendOtp}
                        className="px-3.5 py-1.5 rounded-lg bg-amber-400/20 hover:bg-amber-400/30 border border-amber-400/40 text-amber-300 font-bold text-xs flex items-center justify-center gap-1.5 transition-all disabled:opacity-50 shrink-0 cursor-pointer"
                      >
                        <Send className="w-3 h-3" />
                        <span>{sendingOtp ? 'Sending...' : otpSent ? 'Resend Code' : `Send ${verificationTargetType} Code`}</span>
                      </button>

                      {otpSent && !isVerified && (
                        <div className="flex-1 flex items-center gap-1.5">
                          <input
                            type="text"
                            maxLength={6}
                            value={otpCode}
                            onChange={(e) => setOtpCode(e.target.value)}
                            placeholder="6-digit code"
                            className="flex-1 px-3 py-1.5 rounded-lg bg-navy-950 border border-amber-400/50 text-white font-mono text-center tracking-widest text-xs focus:outline-none"
                          />
                          <button
                            type="button"
                            disabled={verifyingOtp}
                            onClick={handleVerifyOtp}
                            className="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-all cursor-pointer shrink-0"
                          >
                            {verifyingOtp ? 'Checking...' : 'Verify'}
                          </button>
                        </div>
                      )}

                      {isVerified && (
                        <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-bold px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/30">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>{verificationTargetType === 'EMAIL' ? 'Email' : 'Mobile'} Verified</span>
                        </div>
                      )}
                    </div>

                    {otpSent && !isVerified && (
                      <p className="text-[10px] text-emerald-400">
                        ✓ Code sent — check your inbox &amp; spam folder.
                      </p>
                    )}
                  </div>
                </div>

                {/* SECTION 3: Account Security & 4-Character Security CAPTCHA */}
                <div className="space-y-2.5 p-3 sm:p-3.5 rounded-xl bg-navy-900/50 border border-white/10">
                  <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-sky-400">
                    <Lock className="w-3.5 h-3.5" />
                    <span>3. Security Credentials & CAPTCHA</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div className="relative">
                      <label className="block text-[11px] font-bold text-slate-300 mb-1">
                        Password <span className="text-rose-400">*</span>
                      </label>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        placeholder="Min. 6 characters"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full bg-navy-950 border border-white/15 focus:border-amber-400 rounded-lg px-3 py-2 text-xs text-white focus:outline-none transition-all pr-8"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-2.5 top-7 text-slate-400 hover:text-white transition-colors"
                      >
                        {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      </button>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-300 mb-1">
                        Confirm Password <span className="text-rose-400">*</span>
                      </label>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        placeholder="Re-enter password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full bg-navy-950 border border-white/15 focus:border-amber-400 rounded-lg px-3 py-2 text-xs text-white focus:outline-none transition-all"
                      />
                    </div>
                  </div>

                  {/* 4-Character Visual Captcha Box */}
                  <div className="pt-1.5 border-t border-white/10 space-y-1">
                    <label className="block text-[11px] font-bold text-slate-300">
                      Security Code <span className="text-amber-400 font-mono">(4 chars)</span> <span className="text-rose-400">*</span>
                    </label>

                    <div className="flex items-center gap-2.5">
                      <div className="relative flex items-center justify-center px-3.5 py-1.5 rounded-lg bg-navy-950 border border-amber-400/40 select-none shadow-inner overflow-hidden min-w-[110px]">
                        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#fbbf24_1px,transparent_1px)] [background-size:8px_8px]" />
                        <span className="font-mono text-lg font-black tracking-[5px] text-amber-300 drop-shadow-[0_2px_8px_rgba(251,191,36,0.4)]">
                          {captchaCode}
                        </span>
                        <div className="absolute inset-x-0 top-1/2 h-[1px] bg-amber-400/40 -rotate-6 pointer-events-none" />
                      </div>

                      <button
                        type="button"
                        onClick={generateCaptcha}
                        className="p-2 rounded-lg bg-navy-950 hover:bg-navy-900 border border-white/10 text-slate-300 hover:text-white transition-all cursor-pointer"
                        title="Generate new 4-character code"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                      </button>

                      <input
                        type="text"
                        maxLength={4}
                        value={userCaptcha}
                        onChange={(e) => setUserCaptcha(e.target.value.toUpperCase())}
                        placeholder="Type 4 chars"
                        required
                        className="flex-1 px-3 py-1.5 rounded-lg bg-navy-950 border border-white/15 focus:border-amber-400 text-white font-mono text-center font-bold tracking-widest text-xs uppercase transition-all outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full btn-gold py-2.5 sm:py-3 text-xs sm:text-sm flex items-center justify-center gap-2 rounded-xl font-bold cursor-pointer shadow-lg shadow-amber-500/20"
                >
                  {submitting ? (
                    <span className="flex items-center gap-2">
                      <span className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                      Creating Student Account...
                    </span>
                  ) : (
                    <>
                      <span>Complete Student Registration</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>

              <p className="text-center text-[10px] text-slate-500">
                Techno Group of Institutions • Student Code of Conduct & Identity Registry
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
