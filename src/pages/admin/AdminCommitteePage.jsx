import React, { useState, useEffect } from 'react';
import { USERS } from '../../data/mockData';
import { apiClient } from '../../services/api';
import { DataTable } from '../../components/common/DataTable';
import { SearchBar } from '../../components/common/SearchBar';
import { StatCard } from '../../components/common/StatCard';
import { Briefcase, Calendar, ShieldCheck, Mail } from 'lucide-react';

import { useNotifications } from '../../context/NotificationContext';
import { Modal } from '../../components/common/Modal';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { PlusCircle } from 'lucide-react';

export const AdminCommitteePage = () => {
  const [search, setSearch] = useState('');
  const [committeeUsers, setCommitteeUsers] = useState(() => USERS.filter(u => u.role === 'MANAGEMENT_COMMITTEE'));
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const { showSuccess, showError } = useNotifications();

  // New committee form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    committeeCode: 'ABHIVYAKTI',
    committeeName: 'Abhivyakti Cultural Council',
    roleTitle: 'Event Coordinator',
    department: 'Information Technology',
    password: 'CommitteePassword123!'
  });

  const fetchCommittees = async () => {
    try {
      const res = await apiClient.get('/committees');
      if (res.success && res.data && res.data.length > 0) {
        setCommitteeUsers(res.data);
      }
    } catch (err) {
      console.warn('Using fallback committee list:', err);
    }
  };

  useEffect(() => {
    fetchCommittees();
  }, []);

  const handleCreateMember = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await apiClient.post('/committees', formData);
      if (res.success) {
        showSuccess(`Committee member ${formData.name} appointed successfully!`);
        setIsModalOpen(false);
        setFormData({
          name: '',
          email: '',
          mobile: '',
          committeeCode: 'ABHIVYAKTI',
          committeeName: 'Abhivyakti Cultural Council',
          roleTitle: 'Event Coordinator',
          department: 'Information Technology',
          password: 'CommitteePassword123!'
        });
        fetchCommittees();
      } else {
        showError(res.error || 'Failed to appoint member');
      }
    } catch (err) {
      showError(err.message || 'Error appointing committee member');
    } finally {
      setSubmitting(false);
    }
  };

  const filtered = committeeUsers.filter(c =>
    (c.name || '').toLowerCase().includes(search.toLowerCase()) ||
    (c.email || '').toLowerCase().includes(search.toLowerCase())
  );

  const columns = [
    {
      key: 'name',
      header: 'Committee Member',
      render: (val, row) => (
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-purple-500/20 text-purple-400 font-bold flex items-center justify-center text-sm border border-purple-500/30">
            {val.charAt(0)}
          </div>
          <div>
            <span className="font-semibold text-white">{val}</span>
            <p className="text-xs text-slate-400">{row.designation || 'Event Coordinator'}</p>
          </div>
        </div>
      )
    },
    { key: 'email', header: 'Email', render: val => <span className="text-xs text-slate-300 font-mono">{val}</span> },
    {
      key: 'privileges',
      header: 'Clearance Privileges',
      render: () => (
        <span className="text-xs text-slate-300">
          Event Planning, Attendance Marking, Announcements
        </span>
      )
    },
    {
      key: 'role',
      header: 'Role Clearance',
      render: () => (
        <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-500/10 text-purple-400 border border-purple-500/30">
          Management Committee
        </span>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <div className="glass-panel p-6 rounded-3xl border border-purple-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">Management Committee</h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Appointed committee members responsible for planning, logistics, announcements, and on-ground event management.
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="btn-gold px-4 py-2.5 text-xs font-bold rounded-xl flex items-center gap-2 shrink-0 self-start sm:self-center"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Appoint Member</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard title="Committee Members" value={committeeUsers.length} icon={Briefcase} color="purple" />
        <StatCard title="Assigned Events" value="9" icon={Calendar} color="blue" />
        <StatCard title="Status" value="Active" icon={ShieldCheck} color="green" />
      </div>

      <div className="glass-panel p-4 rounded-2xl border border-slate-800">
        <SearchBar value={search} onChange={setSearch} placeholder="Search committee members…" />
      </div>

      <DataTable columns={columns} data={filtered} emptyMessage="No committee members found." />

      {/* Appoint Committee Member Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Appoint Management Committee Member"
        subtitle="Appoint student or staff coordinator to one of the 6 official institutional councils."
      >
        <form onSubmit={handleCreateMember} className="space-y-4">
          <Input
            label="Full Name"
            required
            placeholder="e.g. Priya Verma"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <Input
              label="Official Email"
              type="email"
              required
              placeholder="e.g. priya@technox.test"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
            <Input
              label="Contact Mobile"
              type="tel"
              placeholder="+91 91234 56789"
              value={formData.mobile}
              onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Assigned Committee Council <span className="text-rose-400">*</span>
              </label>
              <select
                value={formData.committeeCode}
                onChange={(e) => {
                  const code = e.target.value;
                  let councilName = '';
                  switch (code) {
                    case 'ABHIVYAKTI': councilName = 'Abhivyakti Cultural Council'; break;
                    case 'KIRAN': councilName = 'Kiran Academic Council'; break;
                    case 'OORJA': councilName = 'Oorja Sports Council'; break;
                    case 'DARPAN': councilName = 'Darpan Media Council'; break;
                    case 'SANJEEVANI': councilName = 'Sanjeevani Placement Cell'; break;
                    case 'SRIJAN': councilName = 'Srijan CSR Council'; break;
                    default: councilName = `${code} Committee`; break;
                  }
                  setFormData({ ...formData, committeeCode: code, committeeName: councilName });
                }}
                className="w-full bg-navy-900 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400/60"
              >
                <option value="ABHIVYAKTI">ABHIVYAKTI — Cultural Committee</option>
                <option value="KIRAN">KIRAN — Academic Committee</option>
                <option value="OORJA">OORJA — Sports Committee</option>
                <option value="DARPAN">DARPAN — Media Committee</option>
                <option value="SANJEEVANI">SANJEEVANI — Placement Committee</option>
                <option value="SRIJAN">SRIJAN — CSR Committee</option>
              </select>
            </div>
            <Input
              label="Role Title"
              placeholder="e.g. Cultural Convener / Lead"
              value={formData.roleTitle}
              onChange={(e) => setFormData({ ...formData, roleTitle: e.target.value })}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <Input
              label="Department"
              placeholder="e.g. Information Technology"
              value={formData.department}
              onChange={(e) => setFormData({ ...formData, department: e.target.value })}
            />
            <Input
              label="Initial Password"
              type="password"
              required
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              helperText="Member will use this password to sign in."
            />
          </div>
          <div className="flex justify-end gap-3 pt-3 border-t border-slate-800">
            <Button
              type="button"
              variant="secondary"
              size="md"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="md"
              loading={submitting}
            >
              Appoint & Issue Clearance
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
