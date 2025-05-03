import api from './index';

export const getAllSongs = async () => {
  const response = await api.get('/songs');
  return response.data;
};

export const getSongById = async (id) => {
  const response = await api.get(`/songs/${id}`);
  return response.data;
};