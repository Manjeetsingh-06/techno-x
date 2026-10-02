import React, { useState, useEffect } from 'react';
import { studentService } from '../../services/studentService';
import { USERS } from '../../data/mockData';
import { DataTable } from '../../components/common/DataTable';
import { SearchBar } from '../../components/common/SearchBar';
import { StatusBadge } from '../../components/common/StatusBadge';
import { LoadingState } from '../../components/common/LoadingState';
import { Users, GraduationCap, Briefcase, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

import { apiClient } from '../../services/api';

export const AdminUsersPage = () => {
  const [activeTab, setActiveTab] = useState('STUDENTS');
  const [students, setStudents] = useState([]);
  const [facultyUsers, setFacultyUsers] = useState(() => USERS.filter(u => u.role === 'FACULTY'));
  const [committeeUsers, setCommitteeUsers] = useState(() => USERS.filter(u => u.role === 'MANAGEMENT_COMMITTEE'));
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        const [studRes, facRes, comRes] = await Promise.allSettled([
          studentService.getStudents(),
          apiClient.get('/faculty'),
          apiClient.get('/committees')
        ]);
        if (studRes.status === 'fulfilled' && studRes.value?.success && studRes.value?.data) {
          setStudents(studRes.value.data);
        }
        if (facRes.status === 'fulfilled' && facRes.value?.success && facRes.value?.data?.length > 0) {
          setFacultyUsers(facRes.value.data);
        }
        if (comRes.status === 'fulfilled' && comRes.value?.success && comRes.value?.data?.length > 0) {
          setCommitteeUsers(comRes.value.data);
        }
      } catch (err) {
        console.warn('Failed to load user lists:', err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const filteredStudents = students.filter(s =>
    (s?.name || '').toLowerCase().includes(search.toLowerCase()) ||
    (s?.studentId || '').toLowerCase().includes(search.toLowerCase()) ||
    (s?.email || '').toLowerCase().includes(search.toLowerCase())
  );

  const filteredFaculty = facultyUsers.filter(f =>
    (f?.name || '').toLowerCase().includes(search.toLowerCase()) ||
    (f?.email || '').toLowerCase().includes(search.toLowerCase()) ||
    (f?.department || '').toLowerCase().includes(search.toLowerCase())
  );

  const filteredCommittee = committeeUsers.filter(c =>
    (c?.name || '').toLowerCase().includes(search.toLowerCase()) ||
    (c?.email || '').toLowerCase().includes(search.toLowerCase())
  );

  const studentColumns = [
    {
      key: 'name',
      header: 'Student Name',
      render: (val, row) => (
        <div>
          <span className="font-semibold text-white">{val}</span>
          <p className="text-xs text-slate-400 font-mono">{row.studentId}</p>
        </div>
      )
    },
    { key: 'email', header: 'Email', render: val => <span className="text-slate-300 text-xs font-mono">{val}</span> },
    { key: 'course', header: 'Course', render: (val, row) => <span className="text-xs text-sky-400 font-medium">{val} - Year {row.year}</span> },
    { key: 'phone', header: 'Phone', render: val => <span className="text-xs text-slate-400">{val || '—'}</span> },
    {
      key: 'status',
      header: 'Status',
      render: (val) => <StatusBadge status={val || 'ACTIVE'} />
    },
    {
      key: 'actions',
      header: 'Action',
      align: 'right',
      render: (_, row) => (
        <Link to={`/admin/students`} className="text-xs text-blue-400 hover:text-blue-300 font-medium">
          Manage
        </Link>
      )
    }
  ];

  const facultyColumns = [
    {
      key: 'name',
      header: 'Faculty Member',
      render: (val, row) => (
        <div>
          <span className="font-semibold text-white">{val}</span>
          <p className="text-xs text-slate-400">{row.department || 'Academic Department'}</p>
        </div>
      )
    },
    { key: 'email', header: 'Official Email', render: val => <span className="text-slate-300 text-xs font-mono">{val}</span> },
    { key: 'phone', header: 'Phone', render: val => <span className="text-xs text-slate-400">{val || '—'}</span> },
    {
      key: 'role',
      header: 'Role Clearance',
      render: () => <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-blue-500/10 text-blue-400 border border-blue-500/30">FACULTY MENTOR</span>
    }
  ];

  const committeeColumns = [
    {
      key: 'name',
      header: 'Committee Member',
      render: (val, row) => (
        <div>
          <span className="font-semibold text-white">{val}</span>
          <p className="text-xs text-slate-400">{row.designation || 'Student Welfare & Events'}</p>
        </div>
      )
    },
    { key: 'email', header: 'Email', render: val => <span className="text-slate-300 text-xs font-mono">{val}</span> },
    {
      key: 'role',
      header: 'Role Clearance',
      render: () => <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-purple-500/10 text-purple-400 border border-purple-500/30">MANAGEMENT COMMITTEE</span>
    }
  ];

  return (
    <div className="space-y-6">
      <div className="glass-panel p-6 rounded-3xl border border-blue-500/20">
        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">Institutional User Directory</h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">Cross-role user accounts and role privilege directory.</p>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Tab Buttons */}
        <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-slate-900/80 border border-slate-800 w-full sm:w-auto">
          <button
            onClick={() => setActiveTab('STUDENTS')}
            className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${activeTab === 'STUDENTS' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30' : 'text-slate-400 hover:text-white'}`}
          >
            <Users className="w-4 h-4" /> Students ({students.length})
          </button>
          <button
            onClick={() => setActiveTab('FACULTY')}
            className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${activeTab === 'FACULTY' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30' : 'text-slate-400 hover:text-white'}`}
          >
            <GraduationCap className="w-4 h-4" /> Faculty ({facultyUsers.length})
          </button>
          <button
            onClick={() => setActiveTab('COMMITTEE')}
            className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${activeTab === 'COMMITTEE' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30' : 'text-slate-400 hover:text-white'}`}
          >
            <Briefcase className="w-4 h-4" /> Committee ({committeeUsers.length})
          </button>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="w-full sm:w-64">
            <SearchBar value={search} onChange={setSearch} placeholder="Search directory…" />
          </div>
          {activeTab === 'FACULTY' && (
            <Link
              to="/admin/faculty"
              className="btn-gold px-3.5 py-2 text-xs font-bold rounded-xl flex items-center gap-1.5 shrink-0 whitespace-nowrap shadow-md shadow-amber-500/20"
            >
              <span>+ Appoint Faculty</span>
            </Link>
          )}
          {activeTab === 'COMMITTEE' && (
            <Link
              to="/admin/committee"
              className="btn-purple px-3.5 py-2 text-xs font-bold rounded-xl flex items-center gap-1.5 shrink-0 whitespace-nowrap shadow-md shadow-purple-500/20 text-white bg-purple-600 hover:bg-purple-500"
            >
              <span>+ Appoint Member</span>
            </Link>
          )}
          {activeTab === 'STUDENTS' && (
            <Link
              to="/admin/students"
              className="btn-primary px-3.5 py-2 text-xs font-bold rounded-xl flex items-center gap-1.5 shrink-0 whitespace-nowrap shadow-md shadow-blue-500/20 text-white bg-blue-600 hover:bg-blue-500"
            >
              <span>+ Manage Students</span>
            </Link>
          )}
        </div>
      </div>

      {loading ? (
        <LoadingState message="Loading directory..." />
      ) : activeTab === 'STUDENTS' ? (
        <DataTable columns={studentColumns} data={filteredStudents} emptyMessage="No students found." />
      ) : activeTab === 'FACULTY' ? (
        <DataTable columns={facultyColumns} data={filteredFaculty} emptyMessage="No faculty members found." />
      ) : (
        <DataTable columns={committeeColumns} data={filteredCommittee} emptyMessage="No committee members found." />
      )}
    </div>
  );
};
