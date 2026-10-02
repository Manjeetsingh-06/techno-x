import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import campusHeroImg from '../../assets/campus_hero.png';
import { Mail, ArrowLeft, CheckCircle2, ShieldCheck, KeyRound, GraduationCap, ArrowRight } from 'lucide-react';
import { useNotifications } from '../../context/NotificationContext';

export const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const { showSuccess } = useNotifications();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
      showSuccess('Password reset link dispatched to your institutional inbox.');
    }, 600);
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center p-3 sm:p-6 lg:p-10">
      <div className="w-full max-w-5xl glass-panel-glossy rounded-3xl border border-white/20 shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[580px]">
        {/* Left Panel: Campus Image */}
        <div className="lg:col-span-6 relative flex flex-col justify-between p-8 sm:p-12 overflow-hidden min-h-[280px] lg:min-h-full">
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 scale-105"
            style={{
              backgroundImage: `url('${campusHeroImg}')`,
              backgroundPosition: 'center 30%'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/75 to-navy-950/50" />
          <div className="absolute inset-0 bg-blue-950/20 backdrop-blur-[2px]" />

          {/* Top Brand */}
          <div className="relative z-10 flex items-center justify-between">
            <Link to="/" className="inline-flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-400 to-yellow-500 flex items-center justify-center shadow-lg shadow-amber-500/30">
                <span className="font-black text-slate-950 text-lg">TX</span>
              </div>
              <span className="font-black text-xl text-white tracking-wider">
                TECHNO<span className="text-amber-400">-X</span>
              </span>
            </Link>
            <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-white/10 text-white border border-white/20 backdrop-blur-md">
              Account Recovery
            </span>
          </div>

          {/* Center Info */}
          <div className="relative z-10 space-y-4 my-auto pt-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 border border-amber-400/40 text-amber-300 text-xs font-bold backdrop-blur-md">
              <KeyRound className="w-3.5 h-3.5" />
              <span>Identity Verification</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-snug drop-shadow-md">
              Recover Institutional Credentials
            </h3>

            <p className="text-xs sm:text-sm text-slate-200/90 leading-relaxed max-w-md drop-shadow">
              Password recovery tokens are strictly dispatched to registered institutional domains (@technox.test or @student.tgi.ac.in).
            </p>
          </div>

          {/* Bottom Footer */}
          <div className="relative z-10 pt-4 border-t border-white/10 text-[11px] text-slate-300/80">
            Techno Group of Institutions • Salt Lake & New Town Campuses
          </div>
        </div>

        {/* Right Panel: Glossy Recovery Form */}
        <div className="lg:col-span-6 p-6 sm:p-10 lg:p-12 flex flex-col justify-center bg-navy-950/90 backdrop-blur-xl">
          <div className="max-w-md mx-auto w-full space-y-6">
            {sent ? (
              <div className="space-y-4 text-center py-6">
                <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 border border-emerald-400/30 text-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-white">Reset Link Dispatched</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  We have transmitted recovery instructions to <br />
                  <span className="text-amber-400 font-mono font-semibold">{email}</span>
                </p>
                <Link to="/reset-password" className="block pt-2">
                  <button className="btn-gold w-full py-3.5 text-xs sm:text-sm flex items-center justify-center gap-2 rounded-xl font-bold">
                    <span>Enter Security Reset Key</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </Link>
              </div>
            ) : (
              <>
                <div>
                  <h2 className="text-2xl font-black text-white tracking-tight">Forgot Password</h2>
                  <p className="text-xs text-slate-400 mt-1">
                    Enter your registered email address or student ID to initiate recovery.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input
                    label="Registered Email or Student ID"
                    icon={Mail}
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="student@technox.test or TGI2025BCA768"
                    helperText="Official format: TGI2025BCA768 or student@technox.test"
                  />

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full btn-gold py-3.5 text-xs sm:text-sm flex items-center justify-center gap-2 rounded-xl mt-2 font-bold"
                  >
                    {loading ? (
                      <span>Sending Instructions...</span>
                    ) : (
                      <>
                        <span>Send Recovery Link</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              </>
            )}

            <div className="pt-4 border-t border-white/10 text-center">
              <Link
                to="/login"
                className="inline-flex items-center gap-1.5 text-xs text-amber-400 hover:text-amber-300 font-semibold transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back to Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
