import api from './api';

export const getAllSongs = async () => {
  const response = await api.get('/api/getMusic/');
  return response.data;
};

export const getAllAlbums = async () => {
  const response = await api.get('/api/getMusic/albums');
  return response.data;
};

export const getAlbumById = async (id) => {
  const response = await api.get(`/api/getMusic/albums/${id}`);
  return response.data;
};
