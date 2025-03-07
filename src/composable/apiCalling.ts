import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
});
export const fetchData = async (endpoint: string) => {
  const response = await apiClient.get(endpoint);
  return response.data;
};

export const fetchFoodData = async () => {
  return await fetchData('/foods/by-category');
};
