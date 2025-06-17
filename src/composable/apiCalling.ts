import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to inject the JWT token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers = config.headers || {};
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

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

export const getFood = async (params: object) => {
  return await fetchData('/foods/by-webid', params);
};

export const createFood = async (params: object) => {
  return await fetchData('/foods', params);
};

export const deleteFood = async (params: object) => {
  return await fetchData('/foods/delete', params);
};

export const updateFood = async (params: object) => {
  return await fetchData('/foods/update', params);
};

export const getCategory = async (params: object) => {
  return await fetchData('/categories', params);
};

export const createCategory = async (params: object) => {
  return await fetchData('/categories/create', params);
};

export const updateCategory = async (params: object) => {
  return await fetchData('/categories/update', params);
};

export const deleteCategory = async (params: object) => {
  return await fetchData('/categories/delete', params);
};

export const getTable = async (params: object) => {
  return await fetchData('/tables', params);
};

export const createTable = async (params: object) => {
  return await fetchData('/tables/create', params);
};

export const deleteTable = async (params: object) => {
  return await fetchData('/tables/delete', params);
};

export const updateTable = async (params: object) => {
  return await fetchData('/tables/update', params);
};

export const getOrders = async (params: object) => {
  return await fetchData('/getorder', params);
};

export const updateOrder = async (params: object) => {
  return await fetchData('/payment-status', params);
};
