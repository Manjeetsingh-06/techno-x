import { apiClient } from './api';

export const reportService = {
  getSystemAnalytics: async () => {
    const res = await apiClient.get('/analytics');
    if (res.success && res.data) {
      const data = res.data;
      return {
        success: true,
        data: {
          totalEvents: data.totalEvents || 0,
          totalStudents: data.totalStudents || 0,
          totalRegistrations: data.totalRegistrations || 0,
          activeEvents: data.activeEvents || 0,
          attendanceRate: data.overallAttendanceRate || 0,
          registrationTrends: data.registrationTrends || [],
          categoryDistribution: data.categoryDistribution || [],
          statusDistribution: data.statusDistribution || [],
          committeePerformance: data.committeePerformance || [],
          summary: {
            totalStudents: data.totalStudents || 0,
            totalFaculty: 12,
            totalCommittee: 24,
            totalEvents: data.totalEvents || 0,
            activeEvents: data.activeEvents || 0,
            totalRegistrations: data.totalRegistrations || 0,
            attendanceRate: data.overallAttendanceRate || 0
          }
        }
      };
    }
    return {
      success: false,
      data: {
        totalEvents: 0,
        totalStudents: 0,
        totalRegistrations: 0,
        activeEvents: 0,
        registrationTrends: [],
        categoryDistribution: [],
        statusDistribution: [],
        summary: {}
      },
      error: res.error || 'Failed to fetch analytics'
    };
  }
};
