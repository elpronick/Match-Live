import apiClient from './client';

export async function getCurrentUser() {
  const { data } = await apiClient.get('/api/auth/me');
  return data;
}

export async function loginUser(email, password) {
  const { data } = await apiClient.post('/api/auth/login', { email, password });
  return data;
}

export async function registerUser(formData) {
  const { data } = await apiClient.post('/api/auth/register', formData);
  return data;
}

export async function logoutUser() {
  await apiClient.post('/api/auth/logout', {});
}

export async function updateUserProfile(profileData) {
  const { data } = await apiClient.put('/api/auth/profile', profileData);
  return data;
}
