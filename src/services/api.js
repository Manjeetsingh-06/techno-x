// Real API Client connecting to Spring Boot 3 Backend
// In dev: Vite proxy handles /api -> localhost:8081
// In prod: VITE_API_URL points to deployed backend (e.g. Render)

const API_BASE = import.meta.env.VITE_API_URL
  ? `${import.meta.env.VITE_API_URL}/api`
  : '/api';

// Non-blocking warmup ping to awaken Render container early
if (typeof window !== 'undefined' && import.meta.env.VITE_API_URL) {
  setTimeout(() => {
    fetch(`${API_BASE}/events`, { method: 'GET', keepalive: true }).catch(() => {});
  }, 500);
}


export const apiClient = {
  getAuthHeaders() {
    const token = localStorage.getItem('technox_token');
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    return headers;
  },

  async request(endpoint, options = {}) {
    const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    const url = cleanEndpoint.startsWith('/api') ? cleanEndpoint : `${API_BASE}${cleanEndpoint}`;
    
    const headers = {
      ...this.getAuthHeaders(),
      ...(options.headers || {})
    };

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      });

      // Handle 401 Unauthorized
      if (response.status === 401) {
        // If not already on auth endpoints, clear token
        if (!cleanEndpoint.includes('/auth/login')) {
          localStorage.removeItem('technox_token');
        }
      }

      const text = await response.text();
      let json = {};
      try {
        json = text ? JSON.parse(text) : {};
      } catch {
        json = { raw: text };
      }

      if (!response.ok) {
        return {
          success: false,
          error: json.message || json.error || `Error ${response.status}: ${response.statusText}`,
          status: response.status,
          data: null
        };
      }

      // Backend returns ApiResponse<T> where payload is in .data
      const unwrappedData = json.data !== undefined ? json.data : json;
      return {
        success: json.success !== undefined ? json.success : true,
        data: unwrappedData,
        message: json.message,
        status: response.status
      };
    } catch (err) {
      console.error(`[API ERROR] ${options.method || 'GET'} ${url}:`, err);
      return {
        success: false,
        error: err.message || 'Cannot connect to backend server. Make sure Spring Boot is running on port 8081.',
        status: 0,
        data: null
      };
    }
  },

  get(endpoint, params) {
    let url = endpoint;
    if (params && typeof params === 'object') {
      const query = new URLSearchParams();
      Object.entries(params).forEach(([k, v]) => {
        if (v !== undefined && v !== null && v !== '' && v !== 'ALL') {
          query.append(k, v);
        }
      });
      const qs = query.toString();
      if (qs) {
        url += (url.includes('?') ? '&' : '?') + qs;
      }
    }
    return this.request(url, { method: 'GET' });
  },

  post(endpoint, payload) {
    return this.request(endpoint, {
      method: 'POST',
      body: payload !== undefined ? JSON.stringify(payload) : undefined
    });
  },

  put(endpoint, payload) {
    return this.request(endpoint, {
      method: 'PUT',
      body: payload !== undefined ? JSON.stringify(payload) : undefined
    });
  },

  patch(endpoint, payload) {
    return this.request(endpoint, {
      method: 'PATCH',
      body: payload !== undefined ? JSON.stringify(payload) : undefined
    });
  },

  delete(endpoint) {
    return this.request(endpoint, { method: 'DELETE' });
  }
};
