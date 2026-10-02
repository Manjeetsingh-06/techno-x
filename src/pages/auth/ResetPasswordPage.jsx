import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import campusHeroImg from '../../assets/campus_hero.png';
import { Lock, ArrowLeft, KeyRound, ShieldCheck, ArrowRight, Eye, EyeOff } from 'lucide-react';
import { useNotifications } from '../../context/NotificationContext';

export const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const { showSuccess } = useNotifications();
  const [token, setToken] = useState('TX-SEC-8924');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      showSuccess('Security password updated successfully. Please log in.');
      navigate('/login');
    }, 600);
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center p-3 sm:p-6 lg:p-10">
      <div className="w-full max-w-5xl glass-panel-glossy rounded-3xl border border-white/20 shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[580px]">
        {/* Left Panel: Campus Visual */}
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
              Security Update
            </span>
          </div>

          {/* Center Info */}
          <div className="relative z-10 space-y-4 my-auto pt-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 border border-amber-400/40 text-amber-300 text-xs font-bold backdrop-blur-md">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Password Hardening</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-snug drop-shadow-md">
              Set New Institutional Password
            </h3>

            <p className="text-xs sm:text-sm text-slate-200/90 leading-relaxed max-w-md drop-shadow">
              Ensure your new password contains at least 8 characters, a numeric digit, and an uppercase letter to satisfy TGI IT policy.
            </p>
          </div>

          {/* Bottom Footer */}
          <div className="relative z-10 pt-4 border-t border-white/10 text-[11px] text-slate-300/80">
            Encrypted with SHA-256 & Institutional Salt
          </div>
        </div>

        {/* Right Panel: Glossy Password Reset Form */}
        <div className="lg:col-span-6 p-6 sm:p-10 lg:p-12 flex flex-col justify-center bg-navy-950/90 backdrop-blur-xl">
          <div className="max-w-md mx-auto w-full space-y-5">
            <div>
              <h2 className="text-2xl font-black text-white tracking-tight">Configure Password</h2>
              <p className="text-xs text-slate-400 mt-1">
                Enter your reset token code and choose your new access credentials.
              </p>
            </div>

            {error && (
              <div className="p-3.5 rounded-xl bg-rose-500/15 border border-rose-500/30 text-xs text-rose-300 font-medium">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Reset Security Token"
                required
                value={token}
                onChange={(e) => setToken(e.target.value)}
                placeholder="e.g. TX-SEC-8924"
              />

              <div className="relative">
                <Input
                  label="New Password"
                  type={showPassword ? 'text' : 'password'}
                  icon={Lock}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter new password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-9 text-slate-400 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              <Input
                label="Confirm New Password"
                type={showPassword ? 'text' : 'password'}
                icon={Lock}
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Repeat new password"
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full btn-gold py-3.5 text-xs sm:text-sm flex items-center justify-center gap-2 rounded-xl mt-2 font-bold"
              >
                {loading ? (
                  <span>Saving Changes...</span>
                ) : (
                  <>
                    <span>Update Credentials</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

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
