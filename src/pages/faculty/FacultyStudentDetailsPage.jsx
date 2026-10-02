import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { studentService } from '../../services/studentService';
import { LoadingState } from '../../components/common/LoadingState';
import { DataTable } from '../../components/common/DataTable';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Button } from '../../components/common/Button';
import {
  User,
  GraduationCap,
  Calendar,
  Ticket,
  Award,
  Phone,
  Mail,
  ShieldCheck,
  PlusCircle,
  ArrowLeft
} from 'lucide-react';

export const FacultyStudentDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      const res = await studentService.getStudentById(id);
      if (res.success) setStudent(res.data);
      setLoading(false);
    };
    fetch();
  }, [id]);

  if (loading || !student) {
    return <LoadingState message="Loading student academic dossier..." />;
  }

  const regColumns = [
    {
      key: 'registrationId',
      header: 'Reg ID',
      render: (val) => <span className="font-mono text-xs font-bold text-sky-400">{val}</span>,
    },
    {
      key: 'eventTitle',
      header: 'Event Name',
      render: (val) => <span className="font-bold text-white text-xs">{val}</span>,
    },
    {
      key: 'eventDate',
      header: 'Date',
      render: (val) => <span className="text-xs text-slate-300">{val}</span>,
    },
    {
      key: 'status',
      header: 'Registration Status',
      render: (val) => <StatusBadge status={val} />,
    },
    {
      key: 'attendanceStatus',
      header: 'Attendance',
      render: (val) => <span className="text-xs font-mono">{val}</span>,
    },
  ];

  return (
    <div className="space-y-6">
      <Link
        to="/faculty/students"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Student Roster
      </Link>

      {/* Profile Overview Card */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <img
              src={student.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(student.name || 'Student')}&background=0284c7&color=fff&bold=true`}
              alt={student.name}
              className="w-16 h-16 rounded-2xl object-cover border-2 border-blue-500/40"
            />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-black text-white">{student.name}</h1>
                <StatusBadge status={student.status} />
              </div>
              <p className="text-xs text-sky-400 font-semibold font-mono mt-0.5">
                Official ID: {student.studentId}
              </p>
              <p className="text-xs text-slate-400">
                {student.course} • {student.year} • {student.semester || 'Current Semester'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link to={`/faculty/registrations/manual?studentId=${student.studentId}`}>
              <Button variant="electric" size="md" icon={PlusCircle}>
                Register with Overrides
              </Button>
            </Link>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-800/80 text-xs">
          <div>
            <span className="text-slate-500 font-semibold uppercase">Email</span>
            <p className="text-slate-200 font-mono mt-0.5 truncate">{student.email}</p>
          </div>
          <div>
            <span className="text-slate-500 font-semibold uppercase">Mobile</span>
            <p className="text-slate-200 font-mono mt-0.5">{student.mobile}</p>
          </div>
          <div>
            <span className="text-slate-500 font-semibold uppercase">Attendance Rate</span>
            <p className="text-emerald-400 font-bold mt-0.5 font-mono">{student.attendanceRate || 88}%</p>
          </div>
          <div>
            <span className="text-slate-500 font-semibold uppercase">Blood Group</span>
            <p className="text-slate-200 font-mono mt-0.5">{student.bloodGroup || 'O+'}</p>
          </div>
        </div>
      </div>

      {/* Registrations Table */}
      <div className="space-y-3">
        <h3 className="text-lg font-bold text-white tracking-tight">Event Registrations</h3>
        <DataTable
          columns={regColumns}
          data={student.registrations || []}
          emptyMessage="No events registered by this student yet."
        />
      </div>

      {/* Badges / Achievements */}
      {student.achievements && student.achievements.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-lg font-bold text-white tracking-tight">Earned Badges</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {student.achievements.map((ach) => (
              <div key={ach.id} className="glass-panel p-4 rounded-2xl border border-slate-800 text-xs">
                <span className="font-bold text-sky-400 block text-sm">{ach.title}</span>
                <p className="text-slate-400 mt-1">{ach.description}</p>
                <p className="text-[10px] text-slate-500 font-mono mt-2">Earned: {ach.earnedDate}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
