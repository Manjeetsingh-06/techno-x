import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';
import { DEMO_CREDENTIALS } from '../config/demoCredentials';

export { DEMO_CREDENTIALS };

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('technox_auth_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      localStorage.setItem('technox_auth_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('technox_auth_user');
    }
  }, [user]);

  const login = async ({ identifier, password, role }) => {
    setLoading(true);
    try {
      const res = await authService.login({ identifier, password, role });
      if (res.success) {
        setUser(res.data);
        return { success: true, user: res.data };
      } else {
        return { success: false, error: res.error || 'Login failed' };
      }
    } catch (err) {
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const switchDemoRole = async (targetRole) => {
    setLoading(true);
    try {
      const cred = DEMO_CREDENTIALS[targetRole];
      if (!cred) throw new Error('Invalid demo role');
      const res = await authService.login({ identifier: cred.email, password: cred.password, role: targetRole });
      if (res.success) {
        setUser(res.data);
        return { success: true, user: res.data };
      }
    } catch (err) {
      console.error('Demo switch error', err);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    authService.logout().catch(() => {});
    setUser(null);
    localStorage.removeItem('technox_auth_user');
    localStorage.removeItem('technox_token');
    localStorage.removeItem('technox_refresh_token');
  };

  const updateUserProfile = async (updates) => {
    if (!user) return;
    const res = await authService.updateProfile(user.id, updates);
    if (res.success) {
      setUser(prev => ({ ...prev, ...updates }));
    }
    return res;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role: user?.role || null,
        isAuthenticated: !!user,
        loading,
        login,
        logout,
        switchDemoRole,
        updateUserProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
