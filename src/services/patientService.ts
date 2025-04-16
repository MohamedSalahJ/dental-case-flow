
import api from './api';

export interface Patient {
  id: number;
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
  address?: string;
  dentistId?: number;
  createdAt: string;
  updatedAt: string;
}

export interface PatientCreateRequest {
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
  address?: string;
  dentistId?: number;
}

const patientService = {
  getAll: async (): Promise<Patient[]> => {
    const response = await api.get<Patient[]>('/patients');
    return response.data;
  },

  getById: async (id: number): Promise<Patient> => {
    const response = await api.get<Patient>(`/patients/${id}`);
    return response.data;
  },

  create: async (patient: PatientCreateRequest): Promise<Patient> => {
    const response = await api.post<Patient>('/patients', patient);
    return response.data;
  },

  update: async (id: number, patient: Partial<Patient>): Promise<Patient> => {
    const response = await api.put<Patient>(`/patients/${id}`, patient);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/patients/${id}`);
  }
};

export default patientService;
