// Use environment variable for API URL, fallback to localhost for development
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Session timeout configuration (in milliseconds)
// Default: 5 minutes of inactivity
// You can change this to any duration you prefer:
// - 5 minutes: 5 * 60 * 1000
// - 1 hour: 60 * 60 * 1000
// - 1 day: 24 * 60 * 60 * 1000
// - 7 days: 7 * 24 * 60 * 60 * 1000
// - 30 days: 30 * 24 * 60 * 60 * 1000
export const SESSION_TIMEOUT = 5 * 60 * 1000; // 5 minutes

// API helper function
export const apiCall = async (endpoint, options = {}) => {
  const token = localStorage.getItem('token');
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Something went wrong');
    }
    
    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};