import apiClient from './client';

export async function getProfiles() {
  const { data } = await apiClient.get('/api/profiles');
  return data;
}

export async function getRooms() {
  const { data } = await apiClient.get('/api/rooms');
  return data;
}

export async function likeProfile(profileId) {
  const { data } = await apiClient.post(`/api/profiles/${profileId}/like`, {});
  return data;
}
