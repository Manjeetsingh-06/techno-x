import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNotifications } from '../../context/NotificationContext';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import {
  User,
  ShieldCheck,
  Mail,
  Phone,
  GraduationCap,
  Calendar,
  Lock,
  Save,
  CheckCircle2,
  Award
} from 'lucide-react';

export const StudentProfilePage = () => {
  const { user, updateUserProfile } = useAuth();
  const { showSuccess, showError } = useNotifications();

  const [formData, setFormData] = useState({
    name: user?.name || '',
    mobile: user?.mobile || '+91 98765 43210',
    bloodGroup: user?.bloodGroup || 'O+',
    address: user?.address || 'Faizabad Road, Lucknow, UP 226028',
  });

  const [saving, setSaving] = useState(false);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await updateUserProfile(formData);
      showSuccess('Profile information saved.');
    } catch (err) {
      showError('Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          Student Academic Profile
        </h1>
        <p className="text-xs sm:text-sm text-slate-400">
          Techno Group of Institutions • Official Matriculation Dossier
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left ID Card Display */}
        <div className="md:col-span-1 space-y-4">
          <div className="glass-panel p-6 rounded-3xl border border-blue-500/30 text-center space-y-4 bg-gradient-to-b from-navy-900 to-navy-950">
            <div className="relative inline-block mx-auto">
              <img
                src={user?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || 'Student')}&background=065f46&color=34d399&bold=true`}
                alt={user?.name}
                className="w-24 h-24 rounded-full object-cover border-2 border-emerald-400 p-0.5 shadow-xl"
              />
              <span className="absolute bottom-1 right-1 p-1 rounded-full bg-emerald-500 ring-2 ring-navy-950">
                <CheckCircle2 className="w-3.5 h-3.5 text-white" />
              </span>
            </div>

            <div>
              <h3 className="text-lg font-bold text-white">{user?.name}</h3>
              <p className="text-xs text-sky-400 font-semibold">{user?.course || 'BCA'} • {user?.year || '1st Year'}</p>
            </div>

            {/* IMMUTABLE STUDENT ID BADGE */}
            <div className="p-3 rounded-2xl bg-navy-950 border border-blue-500/30 text-center space-y-1">
              <p className="text-[9px] uppercase font-bold tracking-widest text-slate-400">
                Official Student ID
              </p>
              <p className="font-mono text-base font-black text-sky-300 tracking-wider">
                {user?.studentId || 'TGI2025BCA768'}
              </p>
              <div className="flex items-center justify-center gap-1 text-[10px] text-emerald-400 font-medium">
                <Lock className="w-3 h-3" /> Immutable Institutional ID
              </div>
            </div>

            <div className="pt-2 text-xs text-slate-400 space-y-1.5 text-left">
              <div className="flex justify-between">
                <span>Admission Batch:</span>
                <span className="text-slate-200 font-medium">2025-2028</span>
              </div>
              <div className="flex justify-between">
                <span>Attendance Rate:</span>
                <span className="text-emerald-400 font-bold">92%</span>
              </div>
              <div className="flex justify-between">
                <span>Account Status:</span>
                <span className="text-emerald-400 font-bold">ACTIVE</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Editable Form */}
        <div className="md:col-span-2">
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
            <div className="border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white">Institutional Records</h3>
              <p className="text-xs text-slate-400">Personal and contact details on file with the registrar.</p>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Full Name (Official)"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  disabled
                  helperText="Name changes require physical registrar submission"
                />

                <Input
                  label="Institutional Email"
                  value={user?.email || 'student@technox.test'}
                  disabled
                  helperText="Official college communications domain"
                />

                <Input
                  label="Academic Course / Degree"
                  value={user?.course || 'BCA (Bachelor of Computer Applications)'}
                  disabled
                />

                <Input
                  label="Year of Study"
                  value={user?.year || '1st Year (Semester 2)'}
                  disabled
                />

                <Input
                  label="Emergency Mobile Contact"
                  value={formData.mobile}
                  onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                  placeholder="+91 98765 43210"
                />

                <Input
                  label="Blood Group"
                  value={formData.bloodGroup}
                  onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value })}
                  placeholder="e.g. O+"
                />
              </div>

              <div className="space-y-1.5 text-left">
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
                  Residential / Local Address
                </label>
                <textarea
                  rows={2}
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full rounded-lg bg-navy-900/90 text-slate-100 border border-slate-700/80 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                />
              </div>

              <div className="pt-4 flex justify-end">
                <Button
                  type="submit"
                  variant="electric"
                  size="md"
                  icon={Save}
                  isLoading={saving}
                >
                  Save Profile Updates
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
