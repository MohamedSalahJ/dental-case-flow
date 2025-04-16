
import api from './api';

export interface Case {
  id: number;
  caseNumber: string;
  title: string;
  description?: string;
  status: string;
  priority?: string;
  patientId: number;
  patientName?: string;
  dentistId: number;
  dentistName?: string;
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CaseCreateRequest {
  title: string;
  description?: string;
  status: string;
  priority?: string;
  patientId: number;
  dentistId: number;
  dueDate?: string;
}

const caseService = {
  getAll: async (filter?: string): Promise<Case[]> => {
    try {
      const url = filter ? `/cases?status=${filter}` : '/cases';
      return await api.get<Case[]>(url);
    } catch (error) {
      console.error("Failed to fetch cases:", error);
      throw error;
    }
  },

  getById: async (id: number): Promise<Case> => {
    try {
      return await api.get<Case>(`/cases/${id}`);
    } catch (error) {
      console.error(`Failed to fetch case with ID ${id}:`, error);
      throw error;
    }
  },

  create: async (caseData: CaseCreateRequest): Promise<Case> => {
    try {
      return await api.post<Case>('/cases', caseData);
    } catch (error) {
      console.error("Failed to create case:", error);
      throw error;
    }
  },

  update: async (id: number, caseData: Partial<Case>): Promise<Case> => {
    try {
      return await api.put<Case>(`/cases/${id}`, caseData);
    } catch (error) {
      console.error(`Failed to update case ${id}:`, error);
      throw error;
    }
  },

  delete: async (id: number): Promise<void> => {
    try {
      await api.delete(`/cases/${id}`);
    } catch (error) {
      console.error(`Failed to delete case ${id}:`, error);
      throw error;
    }
  },

  updateStatus: async (id: number, status: string): Promise<Case> => {
    try {
      return await api.put<Case>(`/cases/${id}/status`, { status });
    } catch (error) {
      console.error(`Failed to update status for case ${id}:`, error);
      throw error;
    }
  }
};

export default caseService;
