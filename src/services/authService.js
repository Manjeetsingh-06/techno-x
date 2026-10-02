import { apiClient } from './api';
import { DEMO_CREDENTIALS } from '../config/demoCredentials';

export const authService = {
  login: async ({ identifier, password, role }) => {
    // If password not provided but role is given, check DEMO_CREDENTIALS
    let effectivePassword = password;
    if (!effectivePassword && role && DEMO_CREDENTIALS[role]) {
      effectivePassword = DEMO_CREDENTIALS[role].password;
    }
    if (!effectivePassword) {
      // Check if identifier matches one of demo accounts
      const match = Object.values(DEMO_CREDENTIALS).find(c => c.email.toLowerCase() === (identifier || '').toLowerCase().trim());
      if (match) {
        effectivePassword = match.password;
      }
    }

    const payload = {
      email: identifier ? identifier.trim() : '',
      password: effectivePassword || ''
    };

    const res = await apiClient.post('/auth/login', payload);

    if (res.success && res.data) {
      const { token, refreshToken, user } = res.data;
      if (token) {
        localStorage.setItem('technox_token', token);
      }
      if (refreshToken) {
        localStorage.setItem('technox_refresh_token', refreshToken);
      }

      // Map roles from backend (e.g. ['ADMIN']) to user.role
      const userRole = (user.roles && user.roles.length > 0) ? user.roles[0] : (role || 'STUDENT');
      const enrichedUser = {
        ...user,
        role: userRole,
        token
      };

      return {
        success: true,
        data: enrichedUser,
        message: res.message
      };
    }

    return {
      success: false,
      error: res.error || 'Invalid credentials or user not found'
    };
  },

  getCurrentUser: async () => {
    const res = await apiClient.get('/auth/me');
    if (res.success && res.data) {
      const user = res.data;
      const userRole = (user.roles && user.roles.length > 0) ? user.roles[0] : 'STUDENT';
      return {
        success: true,
        data: {
          ...user,
          role: userRole
        }
      };
    }
    return res;
  },

  logout: async () => {
    const refreshToken = localStorage.getItem('technox_refresh_token');
    if (refreshToken) {
      await apiClient.post('/auth/logout', { refreshToken }).catch(() => {});
    }
    localStorage.removeItem('technox_token');
    localStorage.removeItem('technox_refresh_token');
    return { success: true };
  },

  forgotPassword: async (email) => {
    return apiClient.post('/auth/forgot-password', { email });
  },

  resetPassword: async ({ email, otp, newPassword }) => {
    return apiClient.post('/auth/reset-password', { email, otp, newPassword });
  },

  updateProfile: async (id, updates) => {
    // If student, updates student endpoint
    return apiClient.put(`/students/${id}`, updates);
  },

  sendOtp: async ({ target, type = 'EMAIL' }) => {
    return apiClient.post('/auth/send-otp', { target, type });
  },

  verifyOtp: async ({ target, otp }) => {
    return apiClient.post('/auth/verify-otp', { target, otp });
  },

  registerStudent: async (formData) => {
    const res = await apiClient.post('/auth/register', formData);
    if (res.success && res.data) {
      const { token, refreshToken, user } = res.data;
      if (token) localStorage.setItem('technox_token', token);
      if (refreshToken) localStorage.setItem('technox_refresh_token', refreshToken);
      const enrichedUser = {
        ...user,
        role: 'STUDENT',
        token
      };
      localStorage.setItem('technox_auth_user', JSON.stringify(enrichedUser));
      return { success: true, data: enrichedUser, message: res.message };
    }
    return res;
  }
};
