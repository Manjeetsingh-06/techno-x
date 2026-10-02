import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { registrationService } from '../../services/registrationService';
import { DataTable } from '../../components/common/DataTable';
import { StatusBadge } from '../../components/common/StatusBadge';
import { History, Calendar, CheckCircle2, XCircle } from 'lucide-react';

export const StudentHistoryPage = () => {
  const { user } = useAuth();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const res = await registrationService.getStudentRegistrations();
      if (res.success) setHistory(res.data);
      setLoading(false);
    };
    load();
  }, []);

  const columns = [
    {
      key: 'registrationId',
      header: 'Reg ID',
      render: (val) => <span className="font-mono text-xs font-bold text-sky-400">{val}</span>,
    },
    {
      key: 'eventTitle',
      header: 'Event Name',
      render: (val, row) => (
        <div>
          <p className="font-bold text-white text-sm">{val}</p>
          <p className="text-xs text-slate-400">{row.eventVenue}</p>
        </div>
      ),
    },
    {
      key: 'eventDate',
      header: 'Event Date',
      render: (val) => <span className="text-xs text-slate-300">{val}</span>,
    },
    {
      key: 'status',
      header: 'Status',
      render: (val) => <StatusBadge status={val} />,
    },
    {
      key: 'attendanceStatus',
      header: 'Gate Attendance',
      render: (val) => {
        if (val === 'PRESENT') {
          return (
            <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-400">
              <CheckCircle2 className="w-3.5 h-3.5" /> Present (Scanned)
            </span>
          );
        }
        if (val === 'ABSENT') {
          return (
            <span className="inline-flex items-center gap-1 text-xs font-bold text-rose-400">
              <XCircle className="w-3.5 h-3.5" /> Absent
            </span>
          );
        }
        return <span className="text-xs text-slate-500 font-mono">Pending Gate Check</span>;
      },
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          Participation History
        </h1>
        <p className="text-xs sm:text-sm text-slate-400">
          Permanent chronological log of all event admissions and gate attendance check-ins.
        </p>
      </div>

      <DataTable
        columns={columns}
        data={history}
        isLoading={loading}
        emptyMessage="No historical event participation records found."
      />
    </div>
  );
};
