import { apiClient } from './api';
import { INITIAL_NOTIFICATIONS } from '../data/mockData';

export const notificationService = {
  getUserNotifications: async (user) => {
    let apiData = [];
    try {
      const res = await apiClient.get('/notifications');
      if (res.success && Array.isArray(res.data) && res.data.length > 0) {
        apiData = res.data;
      }
    } catch (e) {
      // Backend offline or empty
    }

    // Broadcasts from localStorage
    let broadcasts = [];
    try {
      broadcasts = JSON.parse(localStorage.getItem('technox_broadcasts') || '[]');
    } catch (e) {}

    // Read IDs from localStorage
    let readIds = [];
    try {
      readIds = JSON.parse(localStorage.getItem('technox_read_notifs') || '[]');
    } catch (e) {}

    // Role-specific fallback notifications from mockData
    const userRole = user?.role || 'STUDENT';
    const roleNotifs = INITIAL_NOTIFICATIONS.filter(n => 
      !n.role || n.role === userRole || n.role === 'ALL'
    );

    // Merge: broadcasts first, then backend data, then role mock notifications
    const all = [...broadcasts, ...apiData, ...(apiData.length === 0 ? roleNotifs : [])];

    // Deduplicate by ID
    const seen = new Set();
    const unique = [];
    for (const item of all) {
      if (!seen.has(item.id)) {
        seen.add(item.id);
        unique.push({
          ...item,
          read: item.read || readIds.includes(item.id)
        });
      }
    }

    return {
      success: true,
      data: unique
    };
  },

  getUnreadCount: async (user) => {
    const res = await notificationService.getUserNotifications(user);
    return {
      success: true,
      data: res.data.filter(n => !n.read).length
    };
  },

  markAsRead: async (notificationId) => {
    try {
      await apiClient.patch(`/notifications/${notificationId}/read`);
    } catch (e) {}
    try {
      const readIds = JSON.parse(localStorage.getItem('technox_read_notifs') || '[]');
      if (!readIds.includes(notificationId)) {
        localStorage.setItem('technox_read_notifs', JSON.stringify([...readIds, notificationId]));
      }
    } catch (e) {}
    return { success: true };
  },

  markAllAsRead: async () => {
    try {
      await apiClient.patch('/notifications/read-all');
    } catch (e) {}
    try {
      const res = await notificationService.getUserNotifications();
      const allIds = res.data.map(n => n.id);
      localStorage.setItem('technox_read_notifs', JSON.stringify(allIds));
    } catch (e) {}
    return { success: true };
  },

  sendAnnouncement: async ({ eventId, title, message, type = 'INFO' }) => {
    const payload = {
      eventId: eventId ? Number(eventId) : null,
      title,
      message,
      type: type || 'INFO'
    };
    try {
      await apiClient.post('/notifications/announce', payload);
    } catch (e) {}

    // Store in localStorage broadcast feed so it appears immediately for everyone
    const newNotif = {
      id: `ANNOUNCE-${Date.now()}`,
      title,
      message,
      type: type || 'INFO',
      category: 'EVENT',
      read: false,
      createdAt: new Date().toISOString(),
      timestamp: new Date().toISOString()
    };
    try {
      const broadcasts = JSON.parse(localStorage.getItem('technox_broadcasts') || '[]');
      localStorage.setItem('technox_broadcasts', JSON.stringify([newNotif, ...broadcasts]));
    } catch (e) {}

    return { success: true };
  },

  sendEventOneDayReminder: async (eventId) => {
    return apiClient.post(`/notifications/remind/${eventId}`);
  },

  broadcastLiveSchedule: async (eventId) => {
    return apiClient.post(`/notifications/schedule/${eventId}`);
  }
};
