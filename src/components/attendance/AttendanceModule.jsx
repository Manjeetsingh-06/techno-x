import React, { useState, useEffect, useRef } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import { eventService } from '../../services/eventService';
import { attendanceService } from '../../services/attendanceService';
import { useAuth } from '../../context/AuthContext';
import { useNotifications } from '../../context/NotificationContext';
import { DataTable } from '../common/DataTable';
import { Select } from '../common/Select';
import { SearchBar } from '../common/SearchBar';
import { Button } from '../common/Button';
import { ConfirmationModal } from '../common/ConfirmationModal';
import {
  QrCode,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  RotateCcw,
  Camera,
  CameraOff,
  Upload,
  Calendar,
  Clock,
  Sparkles,
  Zap,
  Check,
  ShieldCheck,
  UserCheck
} from 'lucide-react';

// Web Audio API chime
const playAudioBeep = (type = 'success') => {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    if (type === 'success') {
      osc.frequency.setValueAtTime(587.33, ctx.currentTime);
      osc.frequency.setValueAtTime(880, ctx.currentTime + 0.1);
      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.35);
      osc.start();
      osc.stop(ctx.currentTime + 0.35);
    } else if (type === 'already') {
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.25);
      osc.start();
      osc.stop(ctx.currentTime + 0.25);
    } else {
      osc.frequency.setValueAtTime(220, ctx.currentTime);
      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
      osc.start();
      osc.stop(ctx.currentTime + 0.3);
    }
  } catch (e) {
    // ignore audio context failures
  }
};

export const AttendanceModule = ({ role = 'FACULTY' }) => {
  const { user } = useAuth();
  const { showSuccess, showError, showInfo } = useNotifications();

  const [events, setEvents] = useState([]);
  const [selectedEventId, setSelectedEventId] = useState('');
  const [attendanceData, setAttendanceData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Real Camera & File Scanner State
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [lastScannedStudent, setLastScannedStudent] = useState(null);
  const [recentScans, setRecentScans] = useState([]);
  const [scannerStatusMessage, setScannerStatusMessage] = useState('Camera idle. Click "Start Live Camera Scanner" or upload pass image.');
  const [scannerError, setScannerError] = useState(null);
  const [usbInput, setUsbInput] = useState('');

  const html5QrCodeRef = useRef(null);
  const fileInputRef = useRef(null);
  const usbInputRef = useRef(null);

  // Correction modal
  const [correctModalOpen, setCorrectModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [targetStatus, setTargetStatus] = useState('PRESENT');

  // Load events
  useEffect(() => {
    const loadEvents = async () => {
      const res = await eventService.getEvents();
      if (res.success && res.data.length > 0) {
        setEvents(res.data);
        setSelectedEventId(res.data[0].id);
      }
    };
    loadEvents();
  }, []);

  const fetchAttendance = async () => {
    if (!selectedEventId) return;
    setLoading(true);
    const res = await attendanceService.getEventAttendance(selectedEventId);
    if (res.success) {
      setAttendanceData(res.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchAttendance();
  }, [selectedEventId]);

  // Actual QR Code Handler: processes ONLY when a real QR is scanned or decoded!
  const handleDecodedQR = async (decodedText) => {
    if (!decodedText || !decodedText.trim()) return;

    setScannerError(null);
    setScannerStatusMessage(`Decoding Pass QR: ${decodedText.substring(0, 30)}...`);

    try {
      const res = await attendanceService.processQRScan({
        qrPayload: decodedText,
        operator: user,
      });

      if (res.success) {
        setLastScannedStudent(res.data);
        setScannerStatusMessage(`Verified: ${res.data.studentName} marked PRESENT!`);

        if (res.data.alreadyMarked) {
          playAudioBeep('already');
          showInfo(res.data.message);
        } else {
          playAudioBeep('success');
          showSuccess(`Check-In Verified: ${res.data.studentName} marked PRESENT.`);
        }

        // Add to live gate stream
        setRecentScans(prev => [
          {
            ...res.data,
            scanId: Date.now(),
            time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
          },
          ...prev.slice(0, 5)
        ]);

        // Auto-switch table to the event if needed
        if (res.data.eventId && res.data.eventId !== selectedEventId) {
          setSelectedEventId(res.data.eventId);
        } else {
          fetchAttendance();
        }
      } else {
        playAudioBeep('error');
        setScannerError(res.error || 'Pass verification rejected');
        showError(res.error || 'Invalid student pass');
      }
    } catch (err) {
      playAudioBeep('error');
      setScannerError(err.message || 'QR Verification failed');
      showError(err.message || 'Verification error');
    }
  };

  // Start live webcam scanner
  const startCamera = async () => {
    try {
      setScannerError(null);
      setScannerStatusMessage('Initializing camera hardware...');

      const qrScanner = new Html5Qrcode('qr-reader-container');
      html5QrCodeRef.current = qrScanner;

      await qrScanner.start(
        { facingMode: 'environment' },
        {
          fps: 10,
          qrbox: { width: 250, height: 250 },
          aspectRatio: 1.0,
        },
        (decodedText) => {
          // Actual QR code captured by camera!
          handleDecodedQR(decodedText);
        },
        (errorMessage) => {
          // Scanning loop frame without QR; ignore
        }
      );

      setIsCameraActive(true);
      setScannerStatusMessage('Camera Active: Point at student QR pass to scan.');
    } catch (err) {
      console.error(err);
      setIsCameraActive(false);
      setScannerError('Could not start camera. Make sure camera permissions are allowed, or upload pass image below.');
      setScannerStatusMessage('Camera access unavailable.');
    }
  };

  // Stop camera
  const stopCamera = async () => {
    if (html5QrCodeRef.current) {
      try {
        await html5QrCodeRef.current.stop();
        html5QrCodeRef.current.clear();
      } catch (e) {
        // ignore
      }
      html5QrCodeRef.current = null;
    }
    setIsCameraActive(false);
    setScannerStatusMessage('Camera stopped.');
  };

  // Cleanup camera on unmount
  useEffect(() => {
    return () => {
      if (html5QrCodeRef.current) {
        try {
          html5QrCodeRef.current.stop();
          html5QrCodeRef.current.clear();
        } catch (e) {}
      }
    };
  }, []);

  // Upload and scan image file (for testing with pass screenshots or saved QR tickets)
  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setScannerError(null);
    setScannerStatusMessage(`Reading QR code from file: ${file.name}...`);

    try {
      const qrScanner = new Html5Qrcode('file-scanner-hidden');
      const decodedText = await qrScanner.scanFile(file, true);
      qrScanner.clear();

      // Send to verification
      handleDecodedQR(decodedText);
    } catch (err) {
      setScannerError('No readable QR code found in this image. Please upload a clear student pass image.');
      showError('Could not detect QR code in uploaded image.');
      setScannerStatusMessage('File scan failed.');
    } finally {
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  // USB/Bluetooth Barcode Scanner Gun input
  const handleUsbScanSubmit = (e) => {
    e.preventDefault();
    if (!usbInput.trim()) return;
    handleDecodedQR(usbInput.trim());
    setUsbInput('');
    if (usbInputRef.current) {
      usbInputRef.current.focus();
    }
  };

  // Direct manual mark in roster table
  const handleMarkDirect = async (registrationId, status) => {
    try {
      const res = await attendanceService.markAttendance({
        registrationId,
        status,
        operator: user,
      });
      if (res.success) {
        playAudioBeep(status === 'PRESENT' ? 'success' : 'already');
        showSuccess(`Marked ${res.data.studentName} as ${status}.`);
        fetchAttendance();
      }
    } catch (err) {
      playAudioBeep('error');
      showError(err.message);
    }
  };

  // Correction modal
  const handleOpenCorrection = (row, newSt) => {
    setSelectedRecord(row);
    setTargetStatus(newSt);
    setCorrectModalOpen(true);
  };

  const handleConfirmCorrection = async (reason) => {
    try {
      const res = await attendanceService.correctAttendance({
        registrationId: selectedRecord.registrationId || selectedRecord.id,
        newStatus: targetStatus,
        reason,
        operator: user,
      });
      if (res.success) {
        showSuccess(`Attendance corrected to ${targetStatus} and recorded to audit log.`);
        setCorrectModalOpen(false);
        fetchAttendance();
      }
    } catch (err) {
      showError(err.message);
    }
  };

  const filteredRecords = attendanceData?.records?.filter((r) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      r.studentName?.toLowerCase().includes(q) ||
      r.studentId?.toLowerCase().includes(q) ||
      r.registrationId?.toLowerCase().includes(q)
    );
  }) || [];

  const columns = [
    {
      key: 'registrationId',
      header: 'Pass Token',
      render: (val) => <span className="font-mono text-xs font-bold text-sky-400">{val}</span>,
    },
    {
      key: 'studentName',
      header: 'Student Attendee',
      render: (val, row) => (
        <div>
          <p className="font-bold text-white text-xs">{val}</p>
          <p className="font-mono text-[11px] text-slate-400">{row.studentId}</p>
        </div>
      ),
    },
    {
      key: 'course',
      header: 'Program / Cohort',
      render: (val, row) => <span className="text-xs text-slate-300">{val} ({row.year || '1st Year'})</span>,
    },
    {
      key: 'attendanceStatus',
      header: 'Gate Verification',
      render: (val, row) => {
        if (val === 'PRESENT') {
          return (
            <div>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                <CheckCircle2 className="w-3.5 h-3.5" /> PRESENT
              </span>
              {row.markedAt && (
                <p className="text-[10px] text-slate-400 font-mono mt-0.5">
                  Checked in: {new Date(row.markedAt).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                </p>
              )}
            </div>
          );
        }
        if (val === 'ABSENT') {
          return (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-rose-500/15 text-rose-400 border border-rose-500/30">
              <XCircle className="w-3.5 h-3.5" /> ABSENT
            </span>
          );
        }
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-slate-800 text-slate-400 border border-slate-700">
            PENDING SCAN
          </span>
        );
      },
    },
    {
      key: 'actions',
      header: 'Manual Actions',
      align: 'right',
      render: (_, row) => (
        <div className="flex items-center justify-end gap-2">
          {row.attendanceStatus !== 'PRESENT' ? (
            <Button
              variant="outline"
              size="xs"
              icon={Check}
              onClick={() => handleMarkDirect(row.registrationId, 'PRESENT')}
            >
              Manual Mark
            </Button>
          ) : (
            <Button
              variant="outline"
              size="xs"
              icon={RotateCcw}
              onClick={() => handleOpenCorrection(row, 'ABSENT')}
            >
              Correct Record
            </Button>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Hidden container for file scanner processing */}
      <div id="file-scanner-hidden" className="hidden" />

      {/* ─────────────────────────────────────────────────────────────
          1. REAL OPTICAL QR SCANNER STATION
      ───────────────────────────────────────────────────────────── */}
      <div className="glass-panel p-6 rounded-3xl border-2 border-sky-500/40 bg-gradient-to-r from-sky-950/40 via-navy-900 to-indigo-950/30 shadow-2xl shadow-sky-950/50">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-800/80">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/20 text-sky-300 border border-sky-400/40 text-xs font-bold tracking-wider uppercase mb-1">
              <QrCode className="w-3.5 h-3.5 text-sky-400" />
              Real Optical Pass Scanner Gate
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Live QR Attendance Scanner
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              Student ka pass camera ke samne layein ya pass image upload karein — scan hote hi <strong className="text-white">unka naam show hoga</strong> aur attendance <strong className="text-emerald-400">PRESENT</strong> lag jayegi!
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {!isCameraActive ? (
              <Button
                variant="electric"
                size="md"
                icon={Camera}
                onClick={startCamera}
                className="font-bold shadow-lg shadow-sky-500/20"
              >
                Start Live Camera Scanner
              </Button>
            ) : (
              <Button
                variant="danger"
                size="md"
                icon={CameraOff}
                onClick={stopCamera}
                className="font-bold"
              >
                Turn Off Camera
              </Button>
            )}

            <Button
              variant="outline"
              size="md"
              icon={Upload}
              onClick={() => fileInputRef.current?.click()}
              className="border-slate-700 text-slate-200 hover:text-white"
            >
              Upload Pass QR Image
            </Button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept="image/*"
              className="hidden"
            />
          </div>
        </div>

        {/* Live Camera Viewfinder or Standby Box */}
        <div className="mt-5 grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 flex flex-col items-center">
            <div className="w-full relative rounded-2xl bg-black/80 border-2 border-dashed border-sky-400/50 flex flex-col items-center justify-center p-4 min-h-[300px] overflow-hidden">
              {/* HTML5 QR Container for Video Feed */}
              <div id="qr-reader-container" className="w-full max-w-sm rounded-xl overflow-hidden" />

              {!isCameraActive && (
                <div className="flex flex-col items-center justify-center text-center p-6 space-y-3">
                  <div className="w-20 h-20 rounded-2xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center">
                    <QrCode className="w-10 h-10 text-sky-400" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-base">Camera Standby</h3>
                    <p className="text-xs text-slate-400 mt-1 max-w-xs">
                      Click <strong>"Start Live Camera Scanner"</strong> to scan physical or mobile screen passes, or upload a pass image.
                    </p>
                  </div>
                  <Button
                    variant="electric"
                    size="sm"
                    icon={Camera}
                    onClick={startCamera}
                  >
                    Open Camera
                  </Button>
                </div>
              )}
            </div>

            {/* Status bar */}
            <div className="w-full mt-2 flex items-center justify-between text-[11px] font-mono px-1">
              <span className={`flex items-center gap-1.5 ${scannerError ? 'text-rose-400' : 'text-sky-300'}`}>
                <span className={`w-2 h-2 rounded-full ${isCameraActive ? 'bg-emerald-400 animate-pulse' : 'bg-slate-500'}`} />
                {scannerError || scannerStatusMessage}
              </span>
              <span className="text-slate-500">Optical Engine: Ready</span>
            </div>
          </div>

          {/* Right Side: USB Scanner Input & Scanned Confirmation Card */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
            {/* Scanned Student Card */}
            {lastScannedStudent ? (
              <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-950/60 via-navy-900 to-slate-900 border-2 border-emerald-500/60 shadow-xl shadow-emerald-950/50 animate-in fade-in zoom-in-95 duration-200">
                <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-2">
                  <CheckCircle2 className="w-4 h-4" /> QR Pass Scanned & Verified
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 border-2 border-emerald-400/60 flex items-center justify-center text-emerald-300 font-black text-2xl shadow-inner shrink-0">
                    {lastScannedStudent.studentName?.charAt(0) || '✓'}
                  </div>
                  <div>
                    <h2 className="text-xl font-black text-white">{lastScannedStudent.studentName}</h2>
                    <p className="text-xs text-sky-300 font-mono mt-0.5">
                      Roll ID: <strong>{lastScannedStudent.studentId}</strong>
                    </p>
                    <p className="text-xs text-slate-300 mt-0.5">
                      Program: <span className="font-semibold">{lastScannedStudent.course || 'BCA'}</span>
                    </p>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-emerald-500/30 space-y-1.5 text-xs">
                  <div className="flex items-center justify-between text-slate-300">
                    <span className="text-slate-400">Event:</span>
                    <strong className="text-white text-right truncate max-w-[200px]">{lastScannedStudent.eventTitle}</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Gate Status:</span>
                    <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                      PRESENT (Marked)
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-slate-400 font-mono text-[11px]">
                    <span>Checked-in at:</span>
                    <span className="text-emerald-400">{new Date(lastScannedStudent.markedAt || Date.now()).toLocaleTimeString('en-IN')}</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-6 rounded-2xl bg-navy-950/70 border border-slate-800 text-center flex flex-col items-center justify-center flex-1">
                <UserCheck className="w-12 h-12 text-slate-600 mb-2" />
                <p className="font-bold text-slate-300 text-sm">No Student Scanned Yet</p>
                <p className="text-xs text-slate-500 mt-1 max-w-xs">
                  Hold a student's digital pass QR code in front of the camera, upload an image, or use a barcode scanner.
                </p>
              </div>
            )}

            {/* Hardware / Manual Scanner Input */}
            <form onSubmit={handleUsbScanSubmit} className="p-3.5 rounded-2xl bg-navy-950/90 border border-slate-800 space-y-2">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between">
                <span>Hardware QR Gun / Token Scanner</span>
                <span className="text-[10px] text-sky-400">Auto Enter</span>
              </label>
              <div className="flex gap-2">
                <input
                  ref={usbInputRef}
                  type="text"
                  value={usbInput}
                  onChange={(e) => setUsbInput(e.target.value)}
                  placeholder="Scan pass or enter token (e.g. REG-2025-001)..."
                  className="flex-1 px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:border-sky-400"
                />
                <Button variant="electric" size="sm" type="submit">
                  Scan
                </Button>
              </div>
            </form>
          </div>
        </div>

        {/* Live Gate Feed of Scanned Attendees */}
        {recentScans.length > 0 && (
          <div className="mt-5 pt-4 border-t border-slate-800">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              Live Gate Entry Stream:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
              {recentScans.map(scan => (
                <div key={scan.scanId} className="p-3 rounded-xl bg-slate-900/60 border border-emerald-500/30 flex items-center justify-between text-xs">
                  <div>
                    <p className="font-bold text-white text-xs">{scan.studentName}</p>
                    <p className="text-[10px] font-mono text-sky-400">{scan.studentId} &bull; {scan.course || 'BCA'}</p>
                  </div>
                  <span className="text-[10px] text-emerald-400 font-mono bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    {scan.time}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ─────────────────────────────────────────────────────────────
          2. EVENT SESSION ROSTER & ATTENDANCE TABLE
      ───────────────────────────────────────────────────────────── */}
      <div className="glass-panel p-5 rounded-3xl border border-slate-800 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
          <div className="md:col-span-2">
            <Select
              label="Selected Event Roster"
              options={events.map(e => ({
                value: e.id,
                label: `${e.title} (${e.date}) — ${e.venue}`,
              }))}
              value={selectedEventId}
              onChange={(e) => setSelectedEventId(e.target.value)}
            />
          </div>

          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-navy-950/90 border border-slate-800 shadow-inner">
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Gate Turnout</span>
              <p className="text-2xl font-black text-emerald-400 font-mono">
                {attendanceData?.stats?.percentage || 0}%
              </p>
            </div>
            <div className="text-right text-xs text-slate-300 space-y-0.5">
              <p>
                <span className="font-bold text-white text-sm font-mono">{attendanceData?.stats?.present || 0}</span> Present
              </p>
              <p className="text-slate-500 font-mono">
                {attendanceData?.stats?.total || 0} Total Enrolled
              </p>
            </div>
          </div>
        </div>

        {/* Search */}
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Filter attendees by student name, roll number, or pass token..."
        />
      </div>

      {/* Attendance Roster Table */}
      <DataTable
        columns={columns}
        data={filteredRecords}
        isLoading={loading}
        emptyMessage="No registered attendees found for this event."
      />

      {/* Attendance Correction Modal */}
      <ConfirmationModal
        isOpen={correctModalOpen}
        onClose={() => setCorrectModalOpen(false)}
        onConfirm={handleConfirmCorrection}
        title="Correct Attendance Record"
        description="Attendance modifications alter official academic records and will be logged in the permanent institutional audit registry."
        confirmText="Save Status Correction"
        confirmVariant="danger"
        type="warning"
        requireReason={true}
        reasonPlaceholder="e.g. Scanner error at exit gate; student signed manual departure ledger."
        details={selectedRecord ? {
          'Student Name': selectedRecord.studentName,
          'Student ID': selectedRecord.studentId,
          'Current Gate Status': selectedRecord.attendanceStatus,
          'Modified Status': targetStatus,
        } : null}
      />
    </div>
  );
};
