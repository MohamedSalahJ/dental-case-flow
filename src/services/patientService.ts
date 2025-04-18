
import api from './api';

export interface Patient {
  id: number;
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
  address?: string;
  dentistId?: number;
  dentistName?: string;
  createdAt?: string;
  updatedAt?: string;
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
    try {
      return await api.get<Patient[]>('/patients');
    } catch (error) {
      console.error("Failed to fetch patients:", error);
      throw error;
    }
  },

  getDentistPatients: async (dentistId: number): Promise<Patient[]> => {
    try {
      return await api.get<Patient[]>(`/patients/dentist/${dentistId}`);
    } catch (error) {
      console.error(`Failed to fetch patients for dentist ${dentistId}:`, error);
      throw error;
    }
  },

  getById: async (id: number): Promise<Patient> => {
    try {
      return await api.get<Patient>(`/patients/${id}`);
    } catch (error) {
      console.error(`Failed to fetch patient with ID ${id}:`, error);
      throw error;
    }
  },

  create: async (patient: PatientCreateRequest): Promise<Patient> => {
    try {
      return await api.post<Patient>('/patients', patient);
    } catch (error) {
      console.error("Failed to create patient:", error);
      throw error;
    }
  },

  update: async (id: number, patient: Partial<Patient>): Promise<Patient> => {
    try {
      return await api.put<Patient>(`/patients/${id}`, patient);
    } catch (error) {
      console.error(`Failed to update patient ${id}:`, error);
      throw error;
    }
  },

  delete: async (id: number): Promise<void> => {
    try {
      await api.delete(`/patients/${id}`);
    } catch (error) {
      console.error(`Failed to delete patient ${id}:`, error);
      throw error;
    }
  }
};

export default patientService;
