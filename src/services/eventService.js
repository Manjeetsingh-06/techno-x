import { apiClient } from './api';

const normalizeEvent = (e) => {
  if (!e) return e;
  return {
    ...e,
    id: e.id,
    date: e.date || e.eventDate,
    time: e.time || (e.startTime ? `${e.startTime} - ${e.endTime || ''}` : ''),
    category: typeof e.category === 'object' && e.category?.name ? e.category.name : (e.category || 'General'),
    categoryObj: typeof e.category === 'object' ? e.category : null,
    banner: e.banner || e.bannerUrl,
    bannerUrl: e.bannerUrl || e.banner,
    registeredCount: e.registeredCount !== undefined ? e.registeredCount : 0,
    waitlistCount: e.waitlistCount !== undefined ? e.waitlistCount : 0,
  };
};

export const eventService = {
  getEvents: async (filters = {}) => {
    const res = await apiClient.get('/events', filters);
    if (res.success && res.data) {
      // Backend returns PagedResponse { data: [...], page, size, totalElements, ... } or List
      const rawList = Array.isArray(res.data) 
        ? res.data 
        : (Array.isArray(res.data.data) ? res.data.data : []);
      
      let events = rawList.map(normalizeEvent);

      // Apply client-side search query if passed
      if (filters.search) {
        const q = filters.search.toLowerCase();
        events = events.filter(e =>
          (e.title && e.title.toLowerCase().includes(q)) ||
          (e.description && e.description.toLowerCase().includes(q)) ||
          (e.venue && e.venue.toLowerCase().includes(q)) ||
          (e.organizer && e.organizer.toLowerCase().includes(q))
        );
      }

      if (filters.category && filters.category !== 'ALL') {
        events = events.filter(e => e.category === filters.category);
      }

      if (filters.status && filters.status !== 'ALL') {
        events = events.filter(e => e.status === filters.status);
      }

      return {
        success: true,
        data: events,
        total: res.data.totalElements || events.length
      };
    }
    return {
      success: false,
      data: [],
      error: res.error || 'Failed to fetch events'
    };
  },

  getEventById: async (id) => {
    const res = await apiClient.get(`/events/${id}`);
    if (res.success && res.data) {
      return {
        success: true,
        data: normalizeEvent(res.data)
      };
    }
    return res;
  },

  getEventBySlug: async (slug) => {
    const res = await apiClient.get(`/events/slug/${slug}`);
    if (res.success && res.data) {
      return {
        success: true,
        data: normalizeEvent(res.data)
      };
    }
    return res;
  },

  createEvent: async (eventData) => {
    // Map frontend fields to backend CreateEventRequest
    const payload = {
      title: eventData.title,
      slug: eventData.slug || eventData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      description: eventData.description,
      categoryId: eventData.categoryId || 1,
      clubId: eventData.clubId || null,
      committeeCode: eventData.committeeCode || eventData.committeeId || 'ABHIVYAKTI',
      organizer: eventData.organizer || 'Techno Event Council',
      bannerUrl: eventData.banner || eventData.bannerUrl || 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80',
      eventDate: eventData.date || eventData.eventDate || new Date().toISOString().split('T')[0],
      startTime: eventData.startTime ? (eventData.startTime.length === 5 ? `${eventData.startTime}:00` : eventData.startTime) : '10:00:00',
      endTime: eventData.endTime ? (eventData.endTime.length === 5 ? `${eventData.endTime}:00` : eventData.endTime) : '16:00:00',
      venue: eventData.venue || 'TIHS Campus Auditorium',
      capacity: parseInt(eventData.capacity, 10) || 100,
      registrationDeadline: eventData.registrationDeadline || new Date(Date.now() + 86400000 * 7).toISOString(),
      eligibility: eventData.eligibility || 'Open to all students',
      rules: Array.isArray(eventData.rules) ? eventData.rules.join('\n') : eventData.rules,
      requirements: Array.isArray(eventData.requirements) ? eventData.requirements.join('\n') : eventData.requirements,
      facultyCoordinator: eventData.facultyCoordinator || 'Dr. Vikram Malhotra',
      committeeCoordinator: eventData.committeeCoordinator || 'Priya Verma'
    };

    const res = await apiClient.post('/events', payload);
    if (res.success && res.data) {
      return {
        success: true,
        data: normalizeEvent(res.data),
        message: res.message
      };
    }
    return res;
  },

  updateEvent: async (id, updates) => {
    const res = await apiClient.put(`/events/${id}`, updates);
    if (res.success && res.data) {
      return {
        success: true,
        data: normalizeEvent(res.data)
      };
    }
    return res;
  },

  approveEvent: async (id) => {
    return apiClient.patch(`/events/${id}/approve`, {
      approved: true,
      notes: 'Approved via management portal'
    });
  },

  publishEvent: async (id) => {
    return apiClient.patch(`/events/${id}/publish`);
  },

  cancelEvent: async (id, reason) => {
    const reasonParam = encodeURIComponent(typeof reason === 'string' ? reason : 'Administrative cancellation');
    return apiClient.patch(`/events/${id}/cancel?reason=${reasonParam}`);
  },

  getCategories: async () => {
    const res = await apiClient.get('/categories');
    if (res.success && res.data) {
      return {
        success: true,
        data: Array.isArray(res.data) ? res.data : []
      };
    }
    return res;
  },

  getClubs: async () => {
    const res = await apiClient.get('/clubs');
    if (res.success && res.data) {
      return {
        success: true,
        data: Array.isArray(res.data) ? res.data : []
      };
    }
    return res;
  },

  getCommittees: async () => {
    const res = await apiClient.get('/committee');
    if (res.success && res.data) {
      return {
        success: true,
        data: Array.isArray(res.data) ? res.data : []
      };
    }
    return res;
  },

  // Helper function to calculate registration state for a student
  calculateStudentEventState: (event, studentId, existingRegistrations = []) => {
    if (!event) return 'CLOSED';
    if (event.status === 'CANCELLED') return 'CLOSED';
    if (event.status === 'COMPLETED') return 'CLOSED';
    if (event.status === 'DRAFT' || event.status === 'PENDING_APPROVAL') return 'CLOSED';

    const userReg = existingRegistrations.find(r => 
      String(r.eventId) === String(event.id) || String(r.event?.id) === String(event.id)
    );

    if (userReg) {
      if (userReg.status === 'WAITLISTED') return 'WAITLIST';
      return 'REGISTERED';
    }

    const now = new Date();
    const deadline = event.registrationDeadline ? new Date(event.registrationDeadline) : null;
    if (deadline && now > deadline) return 'CLOSED';

    if (event.capacity && event.registeredCount >= event.capacity) {
      return 'FULL';
    }

    return 'OPEN';
  }
};
