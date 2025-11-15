// services/api/usuarios.ts
import { api } from '../config';

export interface Usuario {
  id: number;
  nome: string;
  email: string;
  senha?: string;
}

export const UsuarioService = {
  async getById(id: number): Promise<Usuario> {
    const response = await api.get(`/Usuario/${id}`);
    return response.data;
  }
};
