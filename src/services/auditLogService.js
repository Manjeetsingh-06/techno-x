import { apiClient } from './api';

export const auditLogService = {
  getAuditLogs: async (filters = {}) => {
    const res = await apiClient.get('/audit-logs', filters);
    if (res.success && res.data) {
      const raw = Array.isArray(res.data) 
        ? res.data 
        : (Array.isArray(res.data.data) ? res.data.data : []);
      
      let logs = raw.map(l => ({
        ...l,
        timestamp: l.timestamp || l.createdAt,
        user: l.user ? (l.user.name || l.user.email) : (l.performedBy || 'System'),
        role: l.role || 'USER',
        action: l.action,
        target: l.targetEntity || l.target || 'General',
        reason: l.details || l.reason || '',
        status: l.status || 'SUCCESS'
      }));

      if (filters.search) {
        const q = filters.search.toLowerCase();
        logs = logs.filter(l =>
          (l.user && l.user.toLowerCase().includes(q)) ||
          (l.action && l.action.toLowerCase().includes(q)) ||
          (l.target && l.target.toLowerCase().includes(q)) ||
          (l.reason && l.reason.toLowerCase().includes(q))
        );
      }

      return {
        success: true,
        data: logs,
        total: res.data.totalElements || logs.length
      };
    }
    return {
      success: false,
      data: [],
      error: res.error || 'Failed to fetch audit logs'
    };
  },

  logAction: async (entry) => {
    return apiClient.post('/audit-logs', entry);
  }
};
