import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { studentService } from '../../services/studentService';
import { useNotifications } from '../../context/NotificationContext';
import { DataTable } from '../../components/common/DataTable';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Button } from '../../components/common/Button';
import { SearchBar } from '../../components/common/SearchBar';
import { Select } from '../../components/common/Select';
import { Modal } from '../../components/common/Modal';
import { Input } from '../../components/common/Input';
import { Users, Plus, Eye, Edit3, ShieldAlert, GraduationCap, ArrowRight } from 'lucide-react';

export const FacultyStudentsPage = () => {
  const { user } = useAuth();
  const { showSuccess, showError } = useNotifications();

  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [search, setSearch] = useState('');
  const [courseFilter, setCourseFilter] = useState('ALL');
  const [yearFilter, setYearFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');

  // Add Student Modal State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newStudent, setNewStudent] = useState({
    studentId: 'TGI2025BCA',
    name: '',
    email: '',
    course: 'BCA',
    year: '1st Year',
    semester: '1st Semester',
    mobile: '+91 ',
  });
  const [formSubmitting, setFormSubmitting] = useState(false);

  const fetchStudents = async () => {
    setLoading(true);
    const res = await studentService.getStudents({
      search,
      course: courseFilter,
      year: yearFilter,
      status: statusFilter,
    });
    if (res.success) setStudents(res.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchStudents();
  }, [search, courseFilter, yearFilter, statusFilter]);

  const handleCreateStudent = async (e) => {
    e.preventDefault();
    setFormSubmitting(true);
    try {
      const res = await studentService.createStudent(newStudent, user);
      if (res.success) {
        showSuccess(`Student record for ${newStudent.name} (${newStudent.studentId}) successfully provisioned.`);
        setIsAddModalOpen(false);
        setNewStudent({
          studentId: 'TGI2025BCA',
          name: '',
          email: '',
          course: 'BCA',
          year: '1st Year',
          semester: '1st Semester',
          mobile: '+91 ',
        });
        fetchStudents();
      } else {
        showError(res.error || 'Failed to create student');
      }
    } catch (err) {
      showError(err.message);
    } finally {
      setFormSubmitting(false);
    }
  };

  const columns = [
    {
      key: 'studentId',
      header: 'Student ID',
      render: (val) => (
        <span className="font-mono text-xs font-bold text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded border border-sky-400/20">
          {val}
        </span>
      ),
    },
    {
      key: 'name',
      header: 'Student Name',
      render: (val, row) => (
        <div className="flex items-center gap-2.5">
          <img
            src={row.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(val || 'Student')}&background=0284c7&color=fff&bold=true`}
            alt={val}
            className="w-7 h-7 rounded-full object-cover border border-slate-700"
          />
          <div>
            <p className="font-bold text-white text-sm leading-tight">{val}</p>
            <p className="text-[11px] text-slate-400">{row.email}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'course',
      header: 'Program / Cohort',
      render: (val, row) => (
        <div>
          <span className="text-xs font-semibold text-slate-200">{val}</span>
          <span className="block text-[11px] text-slate-400">{row.year}</span>
        </div>
      ),
    },
    {
      key: 'mobile',
      header: 'Contact',
      render: (val) => <span className="text-xs text-slate-300 font-mono">{val}</span>,
    },
    {
      key: 'attendanceRate',
      header: 'Attendance',
      render: (val) => (
        <span className="text-xs font-bold text-emerald-400 font-mono">
          {val || 85}%
        </span>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      render: (val) => <StatusBadge status={val} />,
    },
    {
      key: 'actions',
      header: 'Actions',
      align: 'right',
      render: (_, row) => (
        <div className="flex items-center justify-end gap-2">
          <Link to={`/faculty/students/${row.studentId}`}>
            <Button variant="ghost" size="sm" icon={Eye}>
              Details
            </Button>
          </Link>
          <Link to={`/faculty/registrations/manual?studentId=${row.studentId}`}>
            <Button variant="outline" size="sm">
              Override Reg
            </Button>
          </Link>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-400 uppercase tracking-wider mb-1">
            <GraduationCap className="w-4 h-4" /> Academic Supervision Module
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Manage Student Roster
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Search, inspect attendance metrics, and manage enrolled candidates across academic departments.
          </p>
        </div>

        <Button
          variant="electric"
          size="md"
          icon={Plus}
          onClick={() => setIsAddModalOpen(true)}
        >
          Add Student Record
        </Button>
      </div>

      {/* Filter Controls */}
      <div className="glass-panel p-4 rounded-2xl border border-slate-800 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Search by ID or name..."
        />

        <Select
          options={[
            { value: 'ALL', label: 'All Courses' },
            { value: 'BCA', label: 'BCA' },
            { value: 'BBA', label: 'BBA' },
            { value: 'B.Tech CSE', label: 'B.Tech CSE' },
            { value: 'B.Tech ECE', label: 'B.Tech ECE' },
            { value: 'MCA', label: 'MCA' },
          ]}
          value={courseFilter}
          onChange={(e) => setCourseFilter(e.target.value)}
        />

        <Select
          options={[
            { value: 'ALL', label: 'All Years' },
            { value: '1st Year', label: '1st Year' },
            { value: '2nd Year', label: '2nd Year' },
            { value: '3rd Year', label: '3rd Year' },
            { value: '4th Year', label: '4th Year' },
          ]}
          value={yearFilter}
          onChange={(e) => setYearFilter(e.target.value)}
        />

        <Select
          options={[
            { value: 'ALL', label: 'All Statuses' },
            { value: 'ACTIVE', label: 'Active Students' },
            { value: 'SUSPENDED', label: 'Suspended' },
          ]}
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        />
      </div>

      {/* Students Data Table */}
      <DataTable
        columns={columns}
        data={students}
        isLoading={loading}
        emptyMessage="No students found matching current filters"
      />

      {/* Add Student Record Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add New Student to Registry"
        subtitle="Techno Group of Institutions Matriculation"
        maxWidth="max-w-lg"
      >
        <form onSubmit={handleCreateStudent} className="space-y-4 text-left">
          <Input
            label="Official Student ID"
            required
            value={newStudent.studentId}
            onChange={(e) => setNewStudent({ ...newStudent, studentId: e.target.value.toUpperCase() })}
            placeholder="e.g. TGI2025BCA768"
            helperText="Format: TGI + Year(4) + Course(3-5) + Roll(3)"
          />

          <Input
            label="Full Legal Name"
            required
            value={newStudent.name}
            onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
            placeholder="e.g. Ishaan Sengupta"
          />

          <Input
            label="Institutional Email"
            type="email"
            required
            value={newStudent.email}
            onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
            placeholder="e.g. ishaan.s@student.tgi.ac.in"
          />

          <div className="grid grid-cols-2 gap-3">
            <Select
              label="Course / Program"
              options={[
                { value: 'BCA', label: 'BCA' },
                { value: 'BBA', label: 'BBA' },
                { value: 'B.Tech CSE', label: 'B.Tech CSE' },
                { value: 'B.Tech ECE', label: 'B.Tech ECE' },
                { value: 'MCA', label: 'MCA' },
              ]}
              value={newStudent.course}
              onChange={(e) => setNewStudent({ ...newStudent, course: e.target.value })}
            />

            <Select
              label="Year of Study"
              options={[
                { value: '1st Year', label: '1st Year' },
                { value: '2nd Year', label: '2nd Year' },
                { value: '3rd Year', label: '3rd Year' },
                { value: '4th Year', label: '4th Year' },
              ]}
              value={newStudent.year}
              onChange={(e) => setNewStudent({ ...newStudent, year: e.target.value })}
            />
          </div>

          <Input
            label="Contact Mobile"
            value={newStudent.mobile}
            onChange={(e) => setNewStudent({ ...newStudent, mobile: e.target.value })}
            placeholder="+91 98765 12345"
          />

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
            <Button
              type="button"
              variant="ghost"
              size="md"
              onClick={() => setIsAddModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="electric"
              size="md"
              isLoading={formSubmitting}
            >
              Provision Student Record
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
