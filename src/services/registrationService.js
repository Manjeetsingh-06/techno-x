import { apiClient } from './api';

const normalizeRegistration = (r) => {
  if (!r) return r;
  return {
    ...r,
    id: r.id,
    registrationId: r.registrationId || `TX-REG-${r.id}`,
    eventId: r.event ? r.event.id : r.eventId,
    eventTitle: r.event ? r.event.title : (r.eventTitle || 'Techno Event'),
    studentId: r.student ? r.student.studentId : r.studentId,
    studentName: r.student ? (r.student.user ? r.student.user.name : r.student.studentId) : (r.studentName || 'Student'),
    course: r.student ? r.student.course : (r.course || 'BCA'),
    year: r.student ? r.student.year : (r.year || '3rd Year'),
    registeredAt: r.registeredAt || r.createdAt,
    status: r.status || 'REGISTERED',
    digitalPassId: r.digitalPassId || `PASS-${r.id}`,
    qrToken: r.qrToken || `TX-QR-${r.id}`,
    passValidity: r.passValidity || 'VALID'
  };
};

export const registrationService = {
  // Get registrations for the currently logged-in student (JWT auth — no ID needed)
  getStudentRegistrations: async () => {
    const res = await apiClient.get('/registrations/my');
    if (res.success && res.data) {
      const list = Array.isArray(res.data) 
        ? res.data 
        : (Array.isArray(res.data.data) ? res.data.data : []);
      return {
        success: true,
        data: list.map(normalizeRegistration)
      };
    }
    return {
      success: false,
      data: [],
      error: res.error || 'Failed to fetch student registrations'
    };
  },

  // Get all registrations (Admin / Faculty)
  getAllRegistrations: async (filters = {}) => {
    const res = await apiClient.get('/registrations', filters);
    if (res.success && res.data) {
      const raw = Array.isArray(res.data) 
        ? res.data 
        : (Array.isArray(res.data.data) ? res.data.data : []);
      
      let list = raw.map(normalizeRegistration);

      if (filters.eventId) {
        list = list.filter(r => String(r.eventId) === String(filters.eventId));
      }
      if (filters.status && filters.status !== 'ALL') {
        list = list.filter(r => r.status === filters.status);
      }
      if (filters.search) {
        const q = filters.search.toLowerCase();
        list = list.filter(r =>
          (r.studentName && r.studentName.toLowerCase().includes(q)) ||
          (r.studentId && r.studentId.toLowerCase().includes(q)) ||
          (r.eventTitle && r.eventTitle.toLowerCase().includes(q)) ||
          (r.registrationId && r.registrationId.toLowerCase().includes(q))
        );
      }

      return {
        success: true,
        data: list,
        total: res.data.totalElements || list.length
      };
    }
    return {
      success: false,
      data: [],
      error: res.error || 'Failed to fetch registrations'
    };
  },

  // Get waitlist queue
  getWaitlist: async (eventId = null) => {
    const endpoint = eventId ? `/waitlist/event/${eventId}` : '/waitlist';
    const res = await apiClient.get(endpoint);
    if (res.success && res.data) {
      const list = Array.isArray(res.data) ? res.data : [];
      return {
        success: true,
        data: list.map(item => ({
          ...item,
          studentName: item.student?.user?.name || item.student?.studentId || 'Waitlisted Student',
          eventTitle: item.event?.title || 'Techno Event',
          waitlistPosition: item.position || item.queuePosition || 1
        }))
      };
    }
    return {
      success: false,
      data: [],
      error: res.error || 'Failed to fetch waitlist'
    };
  },

  // Get single registration by ID
  getRegistrationById: async (regId) => {
    const res = await apiClient.get(`/registrations/${regId}`);
    if (res.success && res.data) {
      return {
        success: true,
        data: normalizeRegistration(res.data)
      };
    }
    return res;
  },

  // Normal Student Registration (Pessimistic Locking on Backend)
  registerStudentForEvent: async ({ eventId, user }) => {
    const studentId = user?.studentId || (user?.role === 'STUDENT' ? user.studentId : 'TGI2025BCA768');
    const payload = {
      eventId: parseInt(eventId, 10),
      studentId: studentId
    };

    const res = await apiClient.post('/registrations', payload);
    if (res.success && res.data) {
      return {
        success: true,
        data: normalizeRegistration(res.data),
        message: res.message || 'Registration successful!'
      };
    }
    return res;
  },

  // Manual Override Registration
  manualRegister: async (payload) => {
    const formatted = {
      eventId: Number(payload.eventId),
      studentId: Number(payload.studentId),
      reason: payload.reason || payload.overrideReason || 'Faculty authorization override'
    };
    const res = await apiClient.post('/registrations/manual', formatted);
    if (res.success && res.data) {
      return {
        success: true,
        data: normalizeRegistration(res.data),
        message: res.message || 'Manual registration completed'
      };
    }
    return res;
  },

  // Alias for backward compatibility
  manualRegistrationOverride: async (payload) => {
    return registrationService.manualRegister(payload);
  },

  // Cancel Registration
  cancelRegistration: async (id) => {
    return apiClient.delete(`/registrations/${id}`);
  }
};
