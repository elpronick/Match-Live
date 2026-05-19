import axios from 'axios';

// En desarrollo (sin VITE_BACKEND_URL) la baseURL es '' (vacía):
//   → axios enviará peticiones relativas (/api/...) que el proxy de Vite
//     reenvía automáticamente a http://localhost:5000.
// En producción define VITE_BACKEND_URL con la URL de tu backend remoto:
//   → axios llamará directamente a https://tu-backend.com/api/...
export const API_BASE_URL = import.meta.env.VITE_BACKEND_URL ?? '';

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
