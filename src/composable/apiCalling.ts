import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://qr-menu-backend-hxlj.onrender.com/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchData = async (endpoint: string, params: object) => {
  try {
    const response = await apiClient.post(endpoint, params);
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

export const getLogin = async (params: object) => {
  return await fetchData('/auth/login', params);
};

export const getRegister = async (params: object) => {
  return await fetchData('/auth/register', params);
};
