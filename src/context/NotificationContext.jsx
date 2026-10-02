import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { notificationService } from '../services/notificationService';

const NotificationContext = createContext(null);

export const NotificationProvider = ({ children }) => {
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

  const refreshNotifications = useCallback(async (user) => {
    if (!user) {
      setNotifications([]);
      setUnreadCount(0);
      return;
    }
    const res = await notificationService.getUserNotifications();
    if (res.success) {
      setNotifications(res.data);
      setUnreadCount(res.data.filter((n) => !n.read).length);
    }
  }, []);

  const markNotificationRead = async (id, user) => {
    await notificationService.markAsRead(id);
    if (user) refreshNotifications(user);
  };

  const markAllNotificationsRead = async (user) => {
    await notificationService.markAllAsRead();
    if (user) refreshNotifications(user);
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
