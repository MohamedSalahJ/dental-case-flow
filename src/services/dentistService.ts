
import api from './api';

export interface Dentist {
  id: number;
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
  address?: string;
  createdAt: string;
  updatedAt: string;
}

export interface DentistCreateRequest {
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
  address?: string;
}

const dentistService = {
  getAll: async (): Promise<Dentist[]> => {
    const response = await api.get<Dentist[]>('/dentists');
    return response.data;
  },

  getById: async (id: number): Promise<Dentist> => {
    const response = await api.get<Dentist>(`/dentists/${id}`);
    return response.data;
  },

  create: async (dentist: DentistCreateRequest): Promise<Dentist> => {
    const response = await api.post<Dentist>('/dentists', dentist);
    return response.data;
  },

  update: async (id: number, dentist: Partial<Dentist>): Promise<Dentist> => {
    const response = await api.put<Dentist>(`/dentists/${id}`, dentist);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/dentists/${id}`);
  }
};

export default dentistService;
