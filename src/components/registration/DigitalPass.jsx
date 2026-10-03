import React, { useRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Calendar, MapPin, User, Clock, ShieldCheck, Printer, Download, Sparkles } from 'lucide-react';
import { Button } from '../common/Button';
import { StatusBadge } from '../common/StatusBadge';

export const DigitalPass = ({
  registration,
  student,
  event,
  showActions = true,
  onPrint,
}) => {
  const passRef = useRef(null);

  if (!registration) return null;

  // Compute clean numeric or mapped event ID
  const cleanEventId = typeof registration.eventId === 'number'
    ? registration.eventId
    : (parseInt(String(registration.eventId || event?.id || '1').replace(/\D/g, ''), 10) || 1);

  // Compute QR payload
  const qrData = JSON.stringify({
    regId: registration.registrationId || registration.id,
    studentId: registration.studentCode || registration.studentId || student?.studentId,
    studentCode: registration.studentCode || registration.studentId || student?.studentId,
    eventId: cleanEventId,
    qrToken: registration.qrToken || `TX-QR-${registration.id || 1}`,
    passId: registration.digitalPassId || registration.registrationId,
    studentName: registration.studentName || student?.name,
    eventTitle: registration.eventTitle || event?.title,
    issuedAt: registration.registeredAt || new Date().toISOString(),
  });

  const handlePrint = () => {
    if (onPrint) {
      onPrint();
    } else {
      window.print();
    }
  };

  return (
    <div className="flex flex-col items-center">
      {/* Pass Card */}
      <div
        ref={passRef}
        className="relative w-full max-w-md bg-gradient-to-b from-navy-900 via-navy-850 to-navy-900 rounded-3xl border border-blue-500/30 shadow-2xl shadow-blue-950/60 overflow-hidden text-left"
      >
        {/* Top Glow & Watermark Header */}
        <div className="relative p-6 pb-5 bg-gradient-to-r from-blue-900/60 via-navy-800 to-blue-950/60 border-b border-blue-500/20">
          <div className="absolute top-0 right-0 -mr-6 -mt-6 w-24 h-24 bg-sky-500/10 rounded-full blur-2xl pointer-events-none" />
          
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-1.5 text-sky-400 font-extrabold text-xs uppercase tracking-widest">
                <Sparkles className="w-3.5 h-3.5 text-sky-400" />
                TECHNO-X PASS
              </div>
              <h2 className="text-xl font-black text-white tracking-tight mt-0.5">Techno Group of Institutions</h2>
              <p className="text-[11px] text-slate-400">Connect. Participate. Experience.</p>
            </div>
            <div className="text-right">
              <StatusBadge status={registration.passValidity || 'VALID'} />
            </div>
          </div>
        </div>

        {/* Event Details Section */}
        <div className="p-6 space-y-4">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-sky-400/80">Event Admission</span>
            <h3 className="text-lg font-bold text-white leading-snug mt-0.5">
              {registration.eventTitle || event?.title}
            </h3>
          </div>

          <div className="grid grid-cols-2 gap-3 py-3 border-y border-slate-800/80 text-xs">
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-slate-400">
                <Calendar className="w-3.5 h-3.5 text-blue-400" />
                <span className="font-semibold text-[11px]">DATE</span>
              </div>
              <p className="font-medium text-slate-200">{registration.eventDate || event?.date}</p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-slate-400">
                <Clock className="w-3.5 h-3.5 text-blue-400" />
                <span className="font-semibold text-[11px]">TIME</span>
              </div>
              <p className="font-medium text-slate-200">{event?.time || '09:30 AM IST'}</p>
            </div>

            <div className="col-span-2 space-y-1">
              <div className="flex items-center gap-1.5 text-slate-400">
                <MapPin className="w-3.5 h-3.5 text-blue-400" />
                <span className="font-semibold text-[11px]">VENUE</span>
              </div>
              <p className="font-medium text-slate-200">{registration.eventVenue || event?.venue}</p>
            </div>
          </div>

          {/* Student Profile Info */}
          <div className="bg-navy-950/60 rounded-xl p-3.5 border border-slate-800 flex items-center justify-between">
            <div className="space-y-0.5">
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Attendee Name</p>
              <h4 className="text-sm font-bold text-white">{registration.studentName || student?.name}</h4>
              <p className="text-xs text-sky-400 font-mono font-medium">
                ID: {registration.studentId || student?.studentId}
              </p>
            </div>
            <div className="text-right text-[11px] text-slate-400">
              <p className="font-medium text-slate-200">{registration.course || student?.course}</p>
              <p>{registration.year || student?.year}</p>
            </div>
          </div>
        </div>

        {/* Perforated Divider */}
        <div className="relative flex items-center justify-center my-1">
          <div className="w-5 h-5 rounded-full bg-navy-950 -ml-2.5 border-r border-slate-800" />
          <div className="flex-1 border-b-2 border-dashed border-slate-800 mx-2" />
          <div className="w-5 h-5 rounded-full bg-navy-950 -mr-2.5 border-l border-slate-800" />
        </div>

        {/* QR Code & Scan Instructions */}
        <div className="p-6 pt-4 bg-navy-950/40 text-center flex flex-col items-center">
          <div className="p-3.5 bg-white rounded-2xl shadow-xl shadow-black/40 border-4 border-slate-900 inline-block mb-3">
            <QRCodeSVG
              value={qrData}
              size={140}
              level="H"
              includeMargin={false}
              fgColor="#060b19"
            />
          </div>

          <p className="text-xs font-mono font-bold text-slate-300 tracking-wider">
            {registration.registrationId}
          </p>
          <div className="flex items-center gap-1.5 text-[11px] text-emerald-400 font-medium mt-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            Official TGI Digital Pass Verified
          </div>
          <p className="text-[10px] text-slate-500 mt-2 max-w-xs">
            Present this QR code on your mobile device at the event entrance for automated digital check-in.
          </p>
        </div>
      </div>

      {/* Actions */}
      {showActions && (
        <div className="flex items-center gap-3 mt-6 print:hidden">
          <Button variant="secondary" size="md" icon={Printer} onClick={handlePrint}>
            Print Pass
          </Button>
          <Button
            variant="electric"
            size="md"
            icon={Download}
            onClick={() => {
              alert('Pass ready for offline caching.');
              window.print();
            }}
          >
            Save Pass
          </Button>
        </div>
      )}
    </div>
  );
};
