import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
});
export const fetchData = async (endpoint: string, params: object) => {
  const response = await apiClient.post(endpoint, params);
  return response.data;
};

export const getLogin = async (params: object) => {
  return await fetchData('/auth/login', {
    params: params,
  });
};

export const getRegister = async (params: object) => {
  return await fetchData('/auth/register', {
    params: params,
  });
};
