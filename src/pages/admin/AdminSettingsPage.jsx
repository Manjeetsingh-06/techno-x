import React, { useState } from 'react';
import { useNotifications } from '../../context/NotificationContext';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { Settings, Save, Shield, CheckCircle, Bell, Database } from 'lucide-react';

export const AdminSettingsPage = () => {
  const { showSuccess } = useNotifications();
  const [settings, setSettings] = useState({
    platformName: 'TECHNO-X',
    institutionName: 'Techno Group of Institutions',
    academicYear: '2024-2025',
    allowSelfRegistration: true,
    allowWaitlist: true,
    requireFacultyApproval: true,
    emailAlerts: false,
    auditRetentionDays: 365,
  });

  const handleToggle = (key) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    showSuccess('Platform configuration saved successfully.');
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="glass-panel p-6 rounded-3xl border border-blue-500/20">
        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">System Settings</h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">Configure institutional policies, registration rules, and operational safeguards.</p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Institutional Branding */}
        <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
          <h2 className="text-sm font-bold text-white flex items-center gap-2">
            <Settings className="w-4 h-4 text-blue-400" /> Platform & Branding Identity
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Platform Name"
              value={settings.platformName}
              onChange={e => setSettings(s => ({ ...s, platformName: e.target.value }))}
            />
            <Input
              label="Institution Name"
              value={settings.institutionName}
              onChange={e => setSettings(s => ({ ...s, institutionName: e.target.value }))}
            />
          </div>
          <Input
            label="Current Academic Session"
            value={settings.academicYear}
            onChange={e => setSettings(s => ({ ...s, academicYear: e.target.value }))}
          />
        </div>

        {/* Workflow & Safeguards */}
        <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
          <h2 className="text-sm font-bold text-white flex items-center gap-2">
            <Shield className="w-4 h-4 text-emerald-400" /> Governance & Registration Policies
          </h2>
          <div className="space-y-3">
            {[
              {
                key: 'allowSelfRegistration',
                title: 'Student Self-Registration',
                desc: 'Allow verified students to register for events directly before deadline.'
              },
              {
                key: 'allowWaitlist',
                title: 'Automated Waitlisting',
                desc: 'Place students on automated queue when event capacity reaches 100%.'
              },
              {
                key: 'requireFacultyApproval',
                title: 'Mandatory Faculty Review',
                desc: 'Require faculty approval before committee event proposals go live.'
              }
            ].map(item => (
              <div key={item.key} className="flex items-center justify-between p-3.5 rounded-xl bg-slate-900/40 border border-slate-800/80">
                <div>
                  <p className="text-xs font-bold text-white">{item.title}</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">{item.desc}</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings[item.key]}
                    onChange={() => handleToggle(item.key)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Audit Retention */}
        <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
          <h2 className="text-sm font-bold text-white flex items-center gap-2">
            <Database className="w-4 h-4 text-purple-400" /> Compliance & Audit Trail Retention
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Audit Log Retention (Days)"
              type="number"
              value={settings.auditRetentionDays}
              onChange={e => setSettings(s => ({ ...s, auditRetentionDays: Number(e.target.value) }))}
            />
            <div className="flex items-center gap-2 pt-6 text-xs text-slate-400">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              <span>Full cryptographic integrity enabled</span>
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <Button variant="electric" type="submit" icon={Save}>
            Save Configuration
          </Button>
        </div>
      </form>
    </div>
  );
};
