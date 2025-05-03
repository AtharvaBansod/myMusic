import api from './index';

export const login = async (credentials) => {
    console.log('atleast here');
    
  const response = await api.post('/auth/login', credentials);
  console.log('retruend response...',response);
  return response.data;
};

export const register = async (userData) => {
  const response = await api.post('/auth/register', userData);
  return response.data;
};

export const logout = async () => {
  await api.post('/auth/logout');
};

export const refreshToken = async () => {
  try {
    const response = await api.get('/auth/refresh');
    return response.data.accessToken;
  } catch (error) {
    throw error;
  }
};