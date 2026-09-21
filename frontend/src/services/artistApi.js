import api from './api';

export const uploadMusic = async (formData, onUploadProgress) => {
  const response = await api.post('/api/artist/uploadMusic', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    onUploadProgress,
  });
  return response.data;
};

export const createAlbum = async ({ title, songId }) => {
  const response = await api.post('/api/artist/createAlbum', {
    title,
    songId,
  });
  return response.data;
};
