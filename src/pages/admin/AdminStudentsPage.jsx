import React, { useState, useEffect, useCallback } from 'react';
import { studentService } from '../../services/studentService';
import { useAuth } from '../../context/AuthContext';
import { useNotifications } from '../../context/NotificationContext';
import { DataTable } from '../../components/common/DataTable';
import { SearchBar } from '../../components/common/SearchBar';
import { Select } from '../../components/common/Select';
import { Button } from '../../components/common/Button';
import { Modal } from '../../components/common/Modal';
import { Input } from '../../components/common/Input';
import { StatusBadge } from '../../components/common/StatusBadge';
import { LoadingState } from '../../components/common/LoadingState';
import { UserPlus, Users, GraduationCap, Phone, Mail, BookOpen } from 'lucide-react';

export const AdminStudentsPage = () => {
  const { user } = useAuth();
  const { showSuccess, showError } = useNotifications();
  const [students, setStudents] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [courseFilter, setCourseFilter] = useState('');
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    course: 'BCA',
    year: '2'
  });

  const loadStudents = async () => {
    setLoading(true);
    const res = await studentService.getStudents();
    if (res.success) setStudents(res.data);
    setLoading(false);
  };

  useEffect(() => { loadStudents(); }, []);

  const applyFilters = useCallback(() => {
    let arr = [...students];
    if (search.trim()) {
      const q = search.toLowerCase();
      arr = arr.filter(s =>
        s.name.toLowerCase().includes(q) ||
        s.studentId.toLowerCase().includes(q) ||
        s.email.toLowerCase().includes(q)
      );
    }
    if (courseFilter) arr = arr.filter(s => s.course === courseFilter);
    setFiltered(arr);
  }, [students, search, courseFilter]);

  useEffect(() => { applyFilters(); }, [applyFilters]);

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email) {
      showError('Please fill in required fields');
      return;
    }
    setSubmitting(true);
    try {
      const res = await studentService.createStudent(form, user);
      if (res.success) {
        showSuccess(`Student created successfully with ID: ${res.data.studentId}`);
        setIsAddOpen(false);
        setForm({ name: '', email: '', phone: '', course: 'BCA', year: '2' });
        loadStudents();
      } else {
        showError(res.error || 'Failed to create student');
      }
    } catch (err) {
      showError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const columns = [
    {
      key: 'name',
      header: 'Student Name',
      render: (val, row) => (
        <div>
          <span className="font-semibold text-white">{val}</span>
          <p className="text-xs text-sky-400 font-mono font-medium">{row.studentId}</p>
        </div>
      )
    },
    { key: 'email', header: 'Email', render: val => <span className="text-xs text-slate-300 font-mono">{val}</span> },
    {
      key: 'course',
      header: 'Enrolled Program',
      render: (val, row) => (
        <span className="text-xs text-slate-200">
          <strong>{val}</strong> &bull; Year {row.year}
        </span>
      )
    },
    { key: 'phone', header: 'Phone', render: val => <span className="text-xs text-slate-400">{val || '—'}</span> },
    {
      key: 'status',
      header: 'Status',
      render: (val) => <StatusBadge status={val || 'ACTIVE'} />
    }
  ];

  return (
    <div className="space-y-6">
      <div className="glass-panel p-6 rounded-3xl border border-blue-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">Student Management</h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">Admin directory of registered students and enrollment records.</p>
        </div>
        <Button variant="electric" icon={UserPlus} onClick={() => setIsAddOpen(true)}>
          Register New Student
        </Button>
      </div>

      <div className="glass-panel p-4 rounded-2xl border border-slate-800 flex flex-col sm:flex-row gap-3">
        <div className="flex-1">
          <SearchBar value={search} onChange={setSearch} placeholder="Search by name, student ID, email…" />
        </div>
        <Select
          options={[
            { value: '', label: 'All Courses' },
            { value: 'BCA', label: 'BCA' },
            { value: 'MCA', label: 'MCA' },
            { value: 'B.Tech CS', label: 'B.Tech CS' },
            { value: 'B.Tech IT', label: 'B.Tech IT' },
            { value: 'BBA', label: 'BBA' }
          ]}
          value={courseFilter}
          onChange={e => setCourseFilter(e.target.value)}
          className="sm:w-48"
        />
      </div>

      {loading ? (
        <LoadingState message="Loading students..." />
      ) : (
        <DataTable columns={columns} data={filtered} emptyMessage="No students found matching your criteria." />
      )}

      {/* Add Student Modal */}
      <Modal isOpen={isAddOpen} onClose={() => setIsAddOpen(false)} title="Register New Student" size="md">
        <form onSubmit={handleCreate} className="space-y-4">
          <Input
            label="Full Name *"
            leftIcon={Users}
            value={form.name}
            onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
            placeholder="e.g. Rohan Gupta"
            required
          />
          <Input
            label="Email Address *"
            leftIcon={Mail}
            type="email"
            value={form.email}
            onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
            placeholder="student@technox.test"
            required
          />
          <Input
            label="Phone Number"
            leftIcon={Phone}
            value={form.phone}
            onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
            placeholder="+91 98765 43210"
          />
          <div className="grid grid-cols-2 gap-4">
            <Select
              label="Course *"
              options={[
                { value: 'BCA', label: 'BCA' },
                { value: 'MCA', label: 'MCA' },
                { value: 'B.Tech CS', label: 'B.Tech CS' },
                { value: 'B.Tech IT', label: 'B.Tech IT' },
                { value: 'BBA', label: 'BBA' }
              ]}
              value={form.course}
              onChange={e => setForm(f => ({ ...f, course: e.target.value }))}
            />
            <Select
              label="Academic Year *"
              options={[
                { value: '1', label: '1st Year' },
                { value: '2', label: '2nd Year' },
                { value: '3', label: '3rd Year' },
                { value: '4', label: '4th Year' }
              ]}
              value={form.year}
              onChange={e => setForm(f => ({ ...f, year: e.target.value }))}
            />
          </div>

          <div className="pt-4 flex justify-end gap-3 border-t border-slate-800">
            <Button variant="ghost" type="button" onClick={() => setIsAddOpen(false)}>Cancel</Button>
            <Button variant="electric" type="submit" loading={submitting}>Register Student</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
