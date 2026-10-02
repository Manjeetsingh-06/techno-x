import { apiClient } from './api';

export const attendanceService = {
  // Get attendance roster for an event
  getEventAttendance: async (eventId) => {
    const res = await apiClient.get(`/attendance/event/${eventId}`);
    if (res.success && res.data) {
      const records = Array.isArray(res.data) ? res.data : [];
      const total = records.length;
      const present = records.filter(r => r.status === 'PRESENT').length;
      const absent = records.filter(r => r.status === 'ABSENT').length;
      const pending = records.filter(r => !r.status || r.status === 'PENDING').length;
      const percentage = total > 0 ? Math.round((present / total) * 100) : 0;

      return {
        success: true,
        data: {
          eventId,
          records: records.map(r => ({
            ...r,
            studentName: r.student?.user?.name || r.student?.studentId || 'Student',
            studentId: r.student?.studentId || r.studentId,
            course: r.student?.course || 'BCA',
            attendanceStatus: r.status,
            markedAt: r.markedAt || r.scannedAt,
            markedBy: r.markedByName || 'Staff'
          })),
          stats: {
            total,
            present,
            absent,
            pending,
            percentage
          }
        }
      };
    }
    return {
      success: false,
      data: { eventId, records: [], stats: { total: 0, present: 0, absent: 0, pending: 0, percentage: 0 } },
      error: res.error || 'Failed to fetch attendance'
    };
  },

  // Mark attendance via scanned QR pass token or direct ID
  markAttendance: async ({ qrToken, token, eventId, registrationId, studentId, status = 'PRESENT', operator }) => {
    const payload = {
      eventId: eventId ? parseInt(eventId, 10) : 1,
      token: token || qrToken || registrationId || null,
      studentId: studentId ? parseInt(studentId, 10) : null,
      status: status
    };

    const res = await apiClient.post('/attendance/mark', payload);
    return res;
  },

  // Process QR Code Scan Payload
  processQRScan: async ({ qrPayload, operator }) => {
    // Parse QR payload
    let token = qrPayload;
    let eventId = null;
    try {
      if (typeof qrPayload === 'string' && qrPayload.startsWith('{')) {
        const parsed = JSON.parse(qrPayload);
        token = parsed.qrToken || parsed.token || qrPayload;
        eventId = parsed.eventId;
      }
    } catch {}

    const payload = {
      eventId: eventId ? parseInt(eventId, 10) : null,
      token: token,
      status: 'PRESENT'
    };

    return apiClient.post('/attendance/mark', payload);
  },

  // Log Attendance Correction
  submitCorrection: async ({ attendanceId, newStatus, reason, correctedBy }) => {
    const payload = {
      newStatus,
      reason: reason || 'Administrative correction'
    };

    return apiClient.post(`/attendance/${attendanceId}/correct`, payload);
  }
};
