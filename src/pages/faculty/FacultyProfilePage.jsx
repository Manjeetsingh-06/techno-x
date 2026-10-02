import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNotifications } from '../../context/NotificationContext';
import { authService } from '../../services/authService';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { User, Mail, GraduationCap, Phone, Building, Shield } from 'lucide-react';

export const FacultyProfilePage = () => {
  const { user, setUser } = useAuth();
  const { showSuccess, showError } = useNotifications();
  const [form, setForm] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    department: user?.department || '',
  });
  const [saving, setSaving] = useState(false);

  const handleChange = (field) => (e) => setForm(p => ({ ...p, [field]: e.target.value }));

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await authService.updateProfile(user.id, form);
      if (res.success) {
        setUser && setUser(prev => ({ ...prev, ...form }));
        showSuccess('Profile updated successfully!');
      } else {
        showError(res.error || 'Update failed');
      }
    } catch (e) {
      showError(e.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="glass-panel p-6 rounded-3xl border border-blue-500/20">
        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">My Profile</h1>
        <p className="text-xs text-slate-400 mt-1">Manage your personal information and academic details.</p>
      </div>

      {/* Profile Header */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800">
        <div className="flex items-center gap-5">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-3xl font-black text-white shadow-lg">
            {(user?.name || 'F').charAt(0)}
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">{user?.name}</h2>
            <p className="text-sm text-sky-400">{user?.email}</p>
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-500/30 px-3 py-1 rounded-full mt-2">
              <Shield className="w-3.5 h-3.5" /> Faculty — TGI
            </span>
          </div>
        </div>
      </div>

      {/* Immutable Info */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800">
        <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
          <GraduationCap className="w-4 h-4 text-blue-400" /> Account Information (Read-Only)
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Email Address</label>
            <p className="text-sm text-slate-300 font-mono mt-1">{user?.email}</p>
          </div>
          <div>
            <label className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Role</label>
            <p className="text-sm text-slate-300 mt-1">Faculty</p>
          </div>
          <div>
            <label className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Account Created</label>
            <p className="text-sm text-slate-300 mt-1">{user?.createdAt ? new Date(user.createdAt).toLocaleDateString('en-IN') : '—'}</p>
          </div>
        </div>
      </div>

      {/* Editable Info */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800">
        <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
          <User className="w-4 h-4 text-blue-400" /> Edit Personal Details
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Full Name"
            leftIcon={User}
            value={form.name}
            onChange={handleChange('name')}
            placeholder="Your full name"
          />
          <Input
            label="Mobile Number"
            leftIcon={Phone}
            value={form.phone}
            onChange={handleChange('phone')}
            placeholder="+91 XXXXX XXXXX"
          />
          <Input
            label="Department"
            leftIcon={Building}
            value={form.department}
            onChange={handleChange('department')}
            placeholder="e.g. Computer Science"
            className="sm:col-span-2"
          />
        </div>
        <div className="mt-5 flex justify-end">
          <Button variant="electric" onClick={handleSave} loading={saving} disabled={saving}>
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
};
