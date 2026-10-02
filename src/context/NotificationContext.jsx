import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { notificationService } from '../services/notificationService';

const NotificationContext = createContext(null);

export const NotificationProvider = ({ children }) => {
  const { user } = useAuth();
  const [toasts, setToasts] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback((type, message, title = '') => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    const newToast = { id, type, message, title };
    setToasts((prev) => [...prev, newToast]);

    setTimeout(() => {
      removeToast(id);
    }, 4500);
  }, [removeToast]);

  const showSuccess = useCallback((msg, title = 'Success') => showToast('success', msg, title), [showToast]);
  const showError = useCallback((msg, title = 'Error') => showToast('error', msg, title), [showToast]);
  const showInfo = useCallback((msg, title = 'Notice') => showToast('info', msg, title), [showToast]);
  const showWarning = useCallback((msg, title = 'Warning') => showToast('warning', msg, title), [showToast]);

  const refreshNotifications = useCallback(async (activeUser) => {
    const targetUser = activeUser || user;
    if (!targetUser) {
      setNotifications([]);
      setUnreadCount(0);
      return;
    }
    const res = await notificationService.getUserNotifications(targetUser);
    if (res.success && Array.isArray(res.data)) {
      setNotifications(res.data);
      setUnreadCount(res.data.filter((n) => !n.read).length);
    }
  }, [user]);

  // Auto-refresh notifications when user logs in or changes, and poll periodically
  useEffect(() => {
    if (user) {
      refreshNotifications(user);
      const interval = setInterval(() => {
        refreshNotifications(user);
      }, 15000);
      return () => clearInterval(interval);
    } else {
      setNotifications([]);
      setUnreadCount(0);
    }
  }, [user, refreshNotifications]);

  const markNotificationRead = async (id, currentUser) => {
    await notificationService.markAsRead(id);
    refreshNotifications(currentUser || user);
  };

  const markAllNotificationsRead = async (currentUser) => {
    await notificationService.markAllAsRead();
    refreshNotifications(currentUser || user);
  };

  return (
    <NotificationContext.Provider
      value={{
        toasts,
        notifications,
        unreadCount,
        showToast,
        showSuccess,
        showError,
        showInfo,
        showWarning,
        removeToast,
        refreshNotifications,
        markNotificationRead,
        markAllNotificationsRead,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};
