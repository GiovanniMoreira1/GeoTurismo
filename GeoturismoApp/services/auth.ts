import * as SecureStore from 'expo-secure-store';
import { api } from './config';

const TOKEN_KEY = 'authToken';

// Token helpers
export async function setToken(token: string) {
  await SecureStore.setItemAsync(TOKEN_KEY, token);
}

export async function getToken() {
  return await SecureStore.getItemAsync(TOKEN_KEY);
}

export async function clearToken() {
  await SecureStore.deleteItemAsync(TOKEN_KEY);
}

// --- Auth Endpoints ---
export interface LoginResponse {
  token: string;
}

export interface LoginData {
  email: string;
  senha: string;
}

export interface RegisterData {
  nome: string;
  email: string;
  senha: string;
}

export const AuthService = {
  async login(data: LoginData): Promise<LoginResponse> {
    //const response = await api.post(`/Login?email=${encodeURIComponent(data.email)}&senha=${encodeURIComponent(data.senha)}`);
    const response = await api.post('/Login', data);
    const token = response.data?.token;
    if (token) {
      await setToken(token);
    }
    return response.data;
  },

  async register(data: RegisterData) {
    const response = await api.post('/Usuario', data);
    return response.data;
  },

  async logout() {
    await clearToken();
  },

  async isAuthenticated() {
    const token = await getToken();
    return !!token;
  },
};
