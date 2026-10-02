import React, { useState, useCallback } from 'react';
import { User, Mail, Phone, Lock, Save, Shield, Camera } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNotifications } from '../../context/NotificationContext';
import { authService } from '../../services/authService';
import { LoadingState } from '../../components/common/LoadingState';

const Field = ({ label, icon: Icon, children }) => (
  <div>
    <label className="flex items-center gap-1.5 text-sm text-slate-400 mb-1.5">
      {Icon && <Icon size={13} className="text-slate-500" />}
      {label}
    </label>
    {children}
  </div>
);

const TextInput = ({ value, onChange, placeholder, disabled, type = 'text' }) => (
  <input
    type={type}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    disabled={disabled}
    className="w-full bg-slate-800/60 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
  />
);

const Section = ({ title, children }) => (
  <div className="glass-panel rounded-2xl border border-slate-800 p-6 space-y-5">
    <h2 className="text-white font-semibold text-base border-b border-slate-800 pb-3">{title}</h2>
    {children}
  </div>
);

export const CommitteeProfilePage = () => {
  const { user, refreshUser } = useAuth();
  const { showSuccess, showError } = useNotifications();

  const [profileForm, setProfileForm] = useState({
    name:  user?.name  || '',
    email: user?.email || '',
    phone: user?.phone || '',
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword:     '',
    confirmPassword: '',
  });

  const [savingProfile,  setSavingProfile]  = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);

  // Profile update
  const handleProfileSave = useCallback(async (e) => {
    e.preventDefault();
    if (!profileForm.name.trim() || !profileForm.email.trim()) {
      showError('Name and email are required.');
      return;
    }
    setSavingProfile(true);
    try {
      const res = await authService.updateProfile(user?.id, profileForm);
      if (res.success) {
        showSuccess('Profile updated successfully!');
        if (typeof refreshUser === 'function') refreshUser();
      } else {
        showError(res.message || 'Failed to update profile.');
      }
    } catch (err) {
      console.error('Profile update error:', err);
      showError('An unexpected error occurred.');
    } finally {
      setSavingProfile(false);
    }
  }, [profileForm, user?.id, showSuccess, showError, refreshUser]);

  // Password update
  const handlePasswordSave = useCallback(async (e) => {
    e.preventDefault();
    if (!passwordForm.currentPassword || !passwordForm.newPassword) {
      showError('Please fill in all password fields.');
      return;
    }
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      showError('New passwords do not match.');
      return;
    }
    if (passwordForm.newPassword.length < 8) {
      showError('Password must be at least 8 characters.');
      return;
    }
    setSavingPassword(true);
    try {
      const res = await authService.updateProfile(user?.id, {
        currentPassword: passwordForm.currentPassword,
        newPassword:     passwordForm.newPassword,
      });
      if (res.success) {
        showSuccess('Password updated successfully!');
        setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
      } else {
        showError(res.message || 'Failed to update password.');
      }
    } catch (err) {
      console.error('Password update error:', err);
      showError('An unexpected error occurred.');
    } finally {
      setSavingPassword(false);
    }
  }, [passwordForm, user?.id, showSuccess, showError]);

  const avatarLetter = (user?.name || user?.email || 'C').charAt(0).toUpperCase();

  return (
    <div className="space-y-6 max-w-2xl">
      {/* Header Card */}
      <div className="glass-panel rounded-2xl border border-slate-800 p-6">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
          {/* Avatar */}
          <div className="relative shrink-0">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-600 to-purple-800 flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-purple-900/40 select-none">
              {avatarLetter}
            </div>
            <button
              className="absolute -bottom-1 -right-1 w-7 h-7 bg-slate-700 hover:bg-slate-600 border border-slate-600 rounded-full flex items-center justify-center transition-colors"
              title="Change avatar (coming soon)"
            >
              <Camera size={13} className="text-slate-300" />
            </button>
          </div>

          {/* Identity */}
          <div className="flex-1 text-center sm:text-left">
            <h1 className="text-xl font-bold text-white">{user?.name || 'Committee Member'}</h1>
            <p className="text-slate-400 text-sm">{user?.email}</p>

            {/* Role badge */}
            <span className="inline-flex items-center gap-1.5 mt-3 px-3 py-1 rounded-lg bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xs font-semibold">
              <Shield size={12} />
              Management Committee — TGI
            </span>
          </div>
        </div>
      </div>

      {/* Personal Info */}
      <Section title="Personal Information">
        <form onSubmit={handleProfileSave} className="space-y-4">
          <Field label="Full Name" icon={User}>
            <TextInput
              value={profileForm.name}
              onChange={e => setProfileForm(p => ({ ...p, name: e.target.value }))}
              placeholder="Your full name"
            />
          </Field>

          <Field label="Email Address" icon={Mail}>
            <TextInput
              type="email"
              value={profileForm.email}
              onChange={e => setProfileForm(p => ({ ...p, email: e.target.value }))}
              placeholder="your@email.com"
            />
          </Field>

          <Field label="Phone Number" icon={Phone}>
            <TextInput
              value={profileForm.phone}
              onChange={e => setProfileForm(p => ({ ...p, phone: e.target.value }))}
              placeholder="+91 00000 00000"
            />
          </Field>

          <div className="flex justify-end pt-1">
            <button
              type="submit"
              disabled={savingProfile}
              className="flex items-center gap-2 bg-purple-600 hover:bg-purple-500 disabled:opacity-60 disabled:cursor-not-allowed text-white px-5 py-2.5 rounded-xl font-semibold text-sm shadow-md shadow-purple-900/30 transition-all"
            >
              <Save size={15} />
              {savingProfile ? 'Saving…' : 'Save Changes'}
            </button>
          </div>
        </form>
      </Section>

      {/* Change Password */}
      <Section title="Change Password">
        <form onSubmit={handlePasswordSave} className="space-y-4">
          <Field label="Current Password" icon={Lock}>
            <TextInput
              type="password"
              value={passwordForm.currentPassword}
              onChange={e => setPasswordForm(p => ({ ...p, currentPassword: e.target.value }))}
              placeholder="Enter current password"
            />
          </Field>

          <Field label="New Password" icon={Lock}>
            <TextInput
              type="password"
              value={passwordForm.newPassword}
              onChange={e => setPasswordForm(p => ({ ...p, newPassword: e.target.value }))}
              placeholder="Min. 8 characters"
            />
          </Field>

          <Field label="Confirm New Password" icon={Lock}>
            <TextInput
              type="password"
              value={passwordForm.confirmPassword}
              onChange={e => setPasswordForm(p => ({ ...p, confirmPassword: e.target.value }))}
              placeholder="Re-enter new password"
            />
          </Field>

          <div className="flex justify-end pt-1">
            <button
              type="submit"
              disabled={savingPassword}
              className="flex items-center gap-2 bg-purple-600 hover:bg-purple-500 disabled:opacity-60 disabled:cursor-not-allowed text-white px-5 py-2.5 rounded-xl font-semibold text-sm shadow-md shadow-purple-900/30 transition-all"
            >
              <Save size={15} />
              {savingPassword ? 'Updating…' : 'Update Password'}
            </button>
          </div>
        </form>
      </Section>

      {/* Account Info (read-only) */}
      <Section title="Account Details">
        <div className="grid grid-cols-2 gap-4 text-sm">
          {[
            { label: 'Role',       value: 'Management Committee' },
            { label: 'Institute',  value: 'TGI' },
            { label: 'Account ID', value: user?.id || '—' },
            { label: 'Status',     value: 'Active' },
          ].map(({ label, value }) => (
            <div key={label}>
              <p className="text-slate-500 text-xs mb-0.5">{label}</p>
              <p className="text-slate-200 font-medium">{value}</p>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
};
