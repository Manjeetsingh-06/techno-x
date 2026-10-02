import { apiClient } from './api';

export const studentService = {
  getStudents: async (filters = {}) => {
    const res = await apiClient.get('/students', filters);
    if (res.success && res.data) {
      const raw = Array.isArray(res.data) 
        ? res.data 
        : (Array.isArray(res.data.data) ? res.data.data : []);
      
      let list = raw.map(s => ({
        ...s,
        id: s.id,
        name: s.user ? s.user.name : s.name,
        email: s.user ? s.user.email : s.email,
        phone: s.user ? s.user.mobile : s.phone,
        status: s.user ? s.user.status : (s.status || 'ACTIVE')
      }));

      if (filters.search) {
        const q = filters.search.toLowerCase();
        list = list.filter(s =>
          (s.name && s.name.toLowerCase().includes(q)) ||
          (s.studentId && s.studentId.toLowerCase().includes(q)) ||
          (s.email && s.email.toLowerCase().includes(q))
        );
      }
      if (filters.course && filters.course !== 'ALL') {
        list = list.filter(s => s.course === filters.course);
      }
      if (filters.year && filters.year !== 'ALL') {
        list = list.filter(s => s.year === filters.year);
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
      error: res.error || 'Failed to fetch students'
    };
  },

  getStudentById: async (studentId) => {
    const res = await apiClient.get(`/students/${studentId}`);
    if (res.success && res.data) {
      const s = res.data;
      return {
        success: true,
        data: {
          ...s,
          name: s.user ? s.user.name : s.name,
          email: s.user ? s.user.email : s.email,
          phone: s.user ? s.user.mobile : s.phone
        }
      };
    }
    return res;
  },

  createStudent: async (studentData) => {
    const payload = {
      name: studentData.name,
      email: studentData.email,
      mobile: studentData.phone || studentData.mobile,
      studentId: studentData.studentId,
      course: studentData.course || 'BCA',
      year: studentData.year || '1st Year',
      semester: studentData.semester || '1st Semester',
      department: studentData.department || 'Department of Computer Applications',
      bloodGroup: studentData.bloodGroup || 'O+',
      address: studentData.address || 'Lucknow, UP'
    };

    return apiClient.post('/students', payload);
  }
};
