import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNotifications } from '../../context/NotificationContext';
import { authService } from '../../services/authService';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { User, Mail, ShieldAlert, Phone, ShieldCheck } from 'lucide-react';

export const AdminProfilePage = () => {
  const { user, setUser } = useAuth();
  const { showSuccess, showError } = useNotifications();
  const [form, setForm] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
  });
  const [saving, setSaving] = useState(false);

  const handleChange = (field) => (e) => setForm(p => ({ ...p, [field]: e.target.value }));

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await authService.updateProfile(user.id, form);
      if (res.success) {
        setUser && setUser(prev => ({ ...prev, ...form }));
        showSuccess('Administrator profile details updated successfully!');
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
      <div className="glass-panel p-6 rounded-3xl border border-red-500/20 bg-red-950/10">
        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">Root Administrator Profile</h1>
        <p className="text-xs text-slate-400 mt-1">Superuser security clearance for Techno Group of Institutions.</p>
      </div>

      {/* Profile Header */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800">
        <div className="flex items-center gap-5">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-red-600 to-amber-600 flex items-center justify-center text-3xl font-black text-white shadow-lg">
            {(user?.name || 'A').charAt(0)}
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">{user?.name}</h2>
            <p className="text-sm text-red-400 font-mono">{user?.email}</p>
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold bg-red-500/20 text-red-300 border border-red-500/30 px-3 py-1 rounded-full mt-2">
              <ShieldCheck className="w-3.5 h-3.5" /> Root Administrator &bull; TGI
            </span>
          </div>
        </div>
      </div>

      {/* Account Info (Read-Only) */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800">
        <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-red-400" /> Security Clearance & Governance
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Access Scope</label>
            <p className="text-sm text-slate-300 mt-1">Full System Governance (All Modules)</p>
          </div>
          <div>
            <label className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Audit Trail Logging</label>
            <p className="text-sm text-emerald-400 mt-1">Enabled (Non-Repudiable)</p>
          </div>
          <div>
            <label className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Clearance Level</label>
            <p className="text-sm text-amber-400 mt-1">Level 1 - Root Superuser</p>
          </div>
          <div>
            <label className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Institution</label>
            <p className="text-sm text-slate-300 mt-1">Techno Group of Institutions</p>
          </div>
        </div>
      </div>

      {/* Editable Details */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800">
        <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
          <User className="w-4 h-4 text-blue-400" /> Personal Contact Details
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Full Name"
            leftIcon={User}
            value={form.name}
            onChange={handleChange('name')}
            placeholder="Administrator name"
          />
          <Input
            label="Emergency Contact Phone"
            leftIcon={Phone}
            value={form.phone}
            onChange={handleChange('phone')}
            placeholder="+91 98300 12345"
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
