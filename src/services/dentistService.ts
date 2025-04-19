
import api from './api';

export interface Dentist {
  id: number;
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
  specialization?: string;
  clinic?: string;
  address?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface DentistCreateRequest {
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
  specialization?: string;
  clinic?: string;
  address?: string;
}

const dentistService = {
  getAll: async (): Promise<Dentist[]> => {
    try {
      return await api.get<Dentist[]>('/dentists');
    } catch (error) {
      console.error("Failed to fetch dentists:", error);
      throw error;
    }
  },

  getById: async (id: number): Promise<Dentist> => {
    try {
      return await api.get<Dentist>(`/dentists/${id}`);
    } catch (error) {
      console.error(`Failed to fetch dentist with ID ${id}:`, error);
      throw error;
    }
  },

  create: async (dentist: DentistCreateRequest): Promise<Dentist> => {
    try {
      return await api.post<Dentist>('/dentists', dentist);
    } catch (error) {
      console.error("Failed to create dentist:", error);
      throw error;
    }
  },

  update: async (id: number, dentist: Partial<Dentist>): Promise<Dentist> => {
    try {
      return await api.put<Dentist>(`/dentists/${id}`, dentist);
    } catch (error) {
      console.error(`Failed to update dentist ${id}:`, error);
      throw error;
    }
  },

  delete: async (id: number): Promise<void> => {
    try {
      await api.delete(`/dentists/${id}`);
    } catch (error) {
      console.error(`Failed to delete dentist ${id}:`, error);
      throw error;
    }
  }
};

export default dentistService;
