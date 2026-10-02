import React, { useState, useEffect } from 'react';
import { USERS } from '../../data/mockData';
import { apiClient } from '../../services/api';
import { DataTable } from '../../components/common/DataTable';
import { SearchBar } from '../../components/common/SearchBar';
import { StatCard } from '../../components/common/StatCard';
import { GraduationCap, Mail, Phone, Building } from 'lucide-react';

import { useNotifications } from '../../context/NotificationContext';
import { Modal } from '../../components/common/Modal';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { PlusCircle } from 'lucide-react';

export const AdminFacultyPage = () => {
  const [search, setSearch] = useState('');
  const [facultyUsers, setFacultyUsers] = useState(() => USERS.filter(u => u.role === 'FACULTY'));
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const { showSuccess, showError } = useNotifications();

  // New faculty form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    facultyCode: '',
    designation: 'Assistant Professor',
    department: 'Computer Science & Engineering',
    specialization: '',
    officeRoom: '',
    password: 'FacultyPassword123!'
  });

  const fetchFaculty = async () => {
    try {
      const res = await apiClient.get('/faculty');
      if (res.success && res.data && res.data.length > 0) {
        setFacultyUsers(res.data);
      }
    } catch (err) {
      console.warn('Using fallback faculty list:', err);
    }
  };

  useEffect(() => {
    fetchFaculty();
  }, []);

  const handleCreateFaculty = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await apiClient.post('/faculty', formData);
      if (res.success) {
        showSuccess(`Faculty mentor ${formData.name} appointed successfully!`);
        setIsModalOpen(false);
        setFormData({
          name: '',
          email: '',
          mobile: '',
          facultyCode: '',
          designation: 'Assistant Professor',
          department: 'Computer Science & Engineering',
          specialization: '',
          officeRoom: '',
          password: 'FacultyPassword123!'
        });
        fetchFaculty();
      } else {
        showError(res.error || 'Failed to appoint faculty');
      }
    } catch (err) {
      showError(err.message || 'Error appointing faculty');
    } finally {
      setSubmitting(false);
    }
  };

  const filtered = facultyUsers.filter(f =>
    (f.name || '').toLowerCase().includes(search.toLowerCase()) ||
    (f.email || '').toLowerCase().includes(search.toLowerCase()) ||
    (f.department || '').toLowerCase().includes(search.toLowerCase())
  );

  const columns = [
    {
      key: 'name',
      header: 'Faculty Member',
      render: (val, row) => (
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-blue-500/20 text-blue-400 font-bold flex items-center justify-center text-sm border border-blue-500/30">
            {val.charAt(0)}
          </div>
          <div>
            <span className="font-semibold text-white">{val}</span>
            <p className="text-xs text-slate-400">{row.department || 'Academic Affairs'}</p>
          </div>
        </div>
      )
    },
    { key: 'email', header: 'Official Email', render: val => <span className="text-xs text-slate-300 font-mono">{val}</span> },
    { key: 'phone', header: 'Contact Number', render: val => <span className="text-xs text-slate-400">{val || '+91 98300 00000'}</span> },
    {
      key: 'department',
      header: 'Department',
      render: val => <span className="text-xs text-sky-400 font-medium">{val || 'Computer Science'}</span>
    },
    {
      key: 'status',
      header: 'Role Status',
      render: () => (
        <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
          Active Faculty
        </span>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <div className="glass-panel p-6 rounded-3xl border border-blue-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">Faculty Mentors</h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">Directory of appointed faculty mentors with student management and event override privileges.</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="btn-gold px-4 py-2.5 text-xs font-bold rounded-xl flex items-center gap-2 shrink-0 self-start sm:self-center"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Appoint Faculty</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard title="Total Appointed Faculty" value={facultyUsers.length} icon={GraduationCap} color="blue" />
        <StatCard title="Active Departments" value="3" icon={Building} color="purple" />
        <StatCard title="Authorized Mentors" value={facultyUsers.length} icon={GraduationCap} color="green" />
      </div>

      <div className="glass-panel p-4 rounded-2xl border border-slate-800">
        <SearchBar value={search} onChange={setSearch} placeholder="Search faculty by name, department, email…" />
      </div>

      <DataTable columns={columns} data={filtered} emptyMessage="No faculty records found." />

      {/* Appoint Faculty Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Appoint New Faculty Mentor"
        subtitle="Create an authorized institutional faculty account with event approval and quota privileges."
      >
        <form onSubmit={handleCreateFaculty} className="space-y-4">
          <Input
            label="Full Name"
            required
            placeholder="e.g. Dr. Vikram Malhotra"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <Input
              label="Official Email"
              type="email"
              required
              placeholder="e.g. malhotra@technox.test"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
            <Input
              label="Contact Mobile"
              type="tel"
              placeholder="+91 94150 11223"
              value={formData.mobile}
              onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <Input
              label="Department"
              required
              placeholder="e.g. Computer Science & Engineering"
              value={formData.department}
              onChange={(e) => setFormData({ ...formData, department: e.target.value })}
            />
            <Input
              label="Designation"
              placeholder="e.g. Associate Professor & HOD"
              value={formData.designation}
              onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <Input
              label="Specialization"
              placeholder="e.g. Artificial Intelligence"
              value={formData.specialization}
              onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
            />
            <Input
              label="Office / Room"
              placeholder="e.g. Academic Block A, Room 304"
              value={formData.officeRoom}
              onChange={(e) => setFormData({ ...formData, officeRoom: e.target.value })}
            />
          </div>
          <Input
            label="Initial Password"
            type="password"
            required
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            helperText="Faculty will use this password to access the supervisory portal."
          />
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
