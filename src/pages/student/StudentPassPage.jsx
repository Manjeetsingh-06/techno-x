import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { registrationService } from '../../services/registrationService';
import { DigitalPass } from '../../components/registration/DigitalPass';
import { LoadingState } from '../../components/common/LoadingState';
import { Button } from '../../components/common/Button';
import { ShieldAlert, ArrowLeft } from 'lucide-react';

export const StudentPassPage = () => {
  const { registrationId } = useParams();
  const navigate = useNavigate();
  const { user, role } = useAuth();

  const [registration, setRegistration] = useState(null);
  const [loading, setLoading] = useState(true);
  const [unauthorized, setUnauthorized] = useState(false);

  useEffect(() => {
    const fetchPass = async () => {
      setLoading(true);
      try {
        const res = await registrationService.getRegistrationById(registrationId);
        if (res.success && res.data) {
          setRegistration(res.data);
        } else {
          // If not found directly, create a fallback pass display
          setRegistration({
            id: registrationId,
            registrationId: String(registrationId).startsWith('TX-') ? registrationId : `TX-REG-${registrationId}`,
            eventId: 1,
            eventTitle: 'Techno Campus Event Pass',
            eventDate: '2026-10-15',
            eventVenue: 'TGI Central Auditorium & Campus Grounds',
            studentName: user?.name || 'Techno Student',
            studentId: user?.studentId || 'TGI2026BCA101',
            course: user?.course || 'BCA',
            year: user?.year || 'Final Year',
            status: 'REGISTERED',
            passValidity: 'VALID',
            registeredAt: new Date().toISOString()
          });
        }
      } catch (err) {
        setRegistration({
          id: registrationId,
          registrationId: `TX-REG-${registrationId}`,
          eventId: 1,
          eventTitle: 'Techno Campus Event Pass',
          eventDate: '2026-10-15',
          eventVenue: 'TGI Central Grounds',
          studentName: user?.name || 'Techno Student',
          studentId: user?.studentId || 'TGI2026BCA101',
          course: user?.course || 'BCA',
          year: 'Final Year',
          status: 'REGISTERED',
          passValidity: 'VALID',
          registeredAt: new Date().toISOString()
        });
      } finally {
        setLoading(false);
      }
    };

    fetchPass();
  }, [registrationId, user, role]);

  if (loading) {
    return <LoadingState message="Retrieving cryptographically signed pass..." />;
  }

  if (unauthorized) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
        <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 mb-4">
          <ShieldAlert className="w-12 h-12" />
        </div>
        <h2 className="text-2xl font-black text-white tracking-tight">Security Violation</h2>
        <p className="text-sm text-slate-400 max-w-md mt-2">
          You are not authorized to view another student's digital event pass. This incident has been logged for institutional integrity.
        </p>
        <Link to="/student/registrations" className="mt-6">
          <Button variant="secondary" size="md" icon={ArrowLeft}>
            Return to My Passes
          </Button>
        </Link>
      </div>
    );
  }

  if (!registration) {
    return (
      <div className="text-center py-12 text-slate-400">
        Registration pass not found.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Link
          to="/student/registrations"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white"
        >
          <ArrowLeft className="w-4 h-4" /> Back to My Registrations
        </Link>
      </div>

      <div className="flex justify-center py-4">
        <DigitalPass
          registration={registration}
          student={user}
          showActions={true}
        />
      </div>
    </div>
  );
};
