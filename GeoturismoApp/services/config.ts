import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

export const api = axios.create({
  baseURL: 'https://geoturismoapi-a6gph0hxejhad5hr.canadacentral-01.azurewebsites.net/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  async (config) => {
    try {
      const token = await SecureStore.getItemAsync('authToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.warn('Erro ao obter token do SecureStore:', error);
    }
    return config;
  },
  (error) => Promise.reject(error)
);