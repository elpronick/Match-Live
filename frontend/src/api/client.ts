import axios from 'axios';

export const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiClient;
