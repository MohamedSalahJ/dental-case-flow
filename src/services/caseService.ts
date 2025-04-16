
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
    const url = filter ? `/cases?status=${filter}` : '/cases';
    const response = await api.get<Case[]>(url);
    return response.data;
  },

  getById: async (id: number): Promise<Case> => {
    const response = await api.get<Case>(`/cases/${id}`);
    return response.data;
  },

  create: async (caseData: CaseCreateRequest): Promise<Case> => {
    const response = await api.post<Case>('/cases', caseData);
    return response.data;
  },

  update: async (id: number, caseData: Partial<Case>): Promise<Case> => {
    const response = await api.put<Case>(`/cases/${id}`, caseData);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/cases/${id}`);
  },

  updateStatus: async (id: number, status: string): Promise<Case> => {
    const response = await api.put<Case>(`/cases/${id}/status`, { status });
    return response.data;
  }
};

export default caseService;
