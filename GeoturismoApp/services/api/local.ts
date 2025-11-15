import { api } from '../config';

export interface Local {
  id_locais: number;
  nome: string;
  descricao: string;
  endereco: string;
  latitude: number;
  longitude: number;
}

export interface LocalUnique {
    id_locais: number,
    nome: string,
    descricao: string,
    media_avaliacao: number,
    categorias: string[]
}

export const LocalService = {
  async getAll(): Promise<Local[]> {
    const response = await api.get('/Locais');
    return response.data;
  },

  async getById(id: number): Promise<LocalUnique> {
    const response = await api.get(`/Locais/${id}`);
    return response.data;
  },

  async getByUser(): Promise<Local[]> {
    const response = await api.get('/Locais/meuslocais');
    return response.data;
  },

  async create(dados: Omit<Local, 'id_locais'>): Promise<Local> {
    const response = await api.post('/Locais', dados);
    return response.data;
  },

  async delete(id: number){
    const response = await api.delete(`/Locais/${id}`);
    return response.status
  }
};
