import axios from 'axios';

const API_URL = '/api/auth';

const authService = {
  // Login user
  login: async (credentials) => {
    const response = await axios.post(`${API_URL}/login`, credentials);
    return response;
  },

  // Register user
  register: async (userData) => {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response;
  },

  // Get current user
  getCurrentUser: async () => {
    const token = localStorage.getItem('token');
    if (!token) return null;

    const response = await axios.get(`${API_URL}/me`, {
      headers: { 'x-auth-token': token }
    });
    return response.data;
  },

  // Update user profile
  updateProfile: async (profileData) => {
    const token = localStorage.getItem('token');
    const response = await axios.put(`${API_URL}/profile`, profileData, {
      headers: { 'x-auth-token': token }
    });
    return response.data;
  },

  // Verify email
  verifyEmail: async (token) => {
    const response = await axios.post(`${API_URL}/verify-email`, { token });
    return response.data;
  },

  // Request password reset
  requestPasswordReset: async (email) => {
    const response = await axios.post(`${API_URL}/forgot-password`, { email });
    return response.data;
  },

  // Reset password
  resetPassword: async (token, newPassword) => {
    const response = await axios.post(`${API_URL}/reset-password`, {
      token,
      newPassword
    });
    return response.data;
  }
};

export default authService; 