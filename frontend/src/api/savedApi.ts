import apiClient from './client';

export async function getSavedProperties() {
  const { data } = await apiClient.get('/api/saved');
  return data;
}

export async function removeSavedProperty(propertyId) {
  await apiClient.delete(`/api/saved/${propertyId}`);
}
