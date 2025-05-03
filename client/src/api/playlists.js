import api from './index';

export const createPlaylist = async (playlistData) => {
  const response = await api.post('/playlists', playlistData);
  
  return response.data;
};

export const addSongToPlaylist = async (playlistId, songId) => {
  const response = await api.post(`/playlists/${playlistId}/songs/${songId}`);
  return response.data;
};
export const deleteSongFromPlaylist = async (playlistId, songId) => {
  const response = await api.delete(`/playlists/${playlistId}/songs/${songId}`);
  return response.data;
};

export const getUserPlaylists = async () => {
  const response = await api.get('/playlists/me');
  return response.data;
};

export const getPlaylistById = async (id) => {
  const response = await api.get(`/playlists/${id}`);
  return response.data;
};

export const deletePlaylist = async (id) => {
    const response = await api.delete(`/playlists/${id}`);
    return response.data;
  };
  