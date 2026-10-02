import { apiClient } from './api';

export const notificationService = {
  getUserNotifications: async () => {
    const res = await apiClient.get('/notifications');
    if (res.success && res.data) {
      return {
        success: true,
        data: Array.isArray(res.data) ? res.data : []
      };
    }
    return {
      success: false,
      data: [],
      error: res.error || 'Failed to fetch notifications'
    };
  },

  getUnreadCount: async () => {
    return apiClient.get('/notifications/unread-count');
  },

  markAsRead: async (notificationId) => {
    return apiClient.patch(`/notifications/${notificationId}/read`);
  },

  markAllAsRead: async () => {
    return apiClient.patch('/notifications/read-all');
  },

  sendAnnouncement: async ({ eventId, title, message, type = 'INFO' }) => {
    const payload = {
      eventId: eventId ? Number(eventId) : null,
      title,
      message,
      type: type || 'INFO'
    };
    return apiClient.post('/notifications/announce', payload);
  },

  sendEventOneDayReminder: async (eventId) => {
    return apiClient.post(`/notifications/remind/${eventId}`);
  },

  broadcastLiveSchedule: async (eventId) => {
    return apiClient.post(`/notifications/schedule/${eventId}`);
  }
};
