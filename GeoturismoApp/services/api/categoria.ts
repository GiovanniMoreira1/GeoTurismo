import { api } from '../config';

export interface Categoria {
  id_categorias: string;
  nome: string;
  localIndex: number;
}

export const CategoriaService = {
  async getAll(): Promise<Categoria[]> {
    const response = await api.get('/Categoria');
    return response.data;
  },
};