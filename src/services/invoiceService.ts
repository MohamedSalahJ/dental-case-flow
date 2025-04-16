
import api from './api';

export interface Invoice {
  id: string;
  invoiceNumber: string;
  status: 'paid' | 'unpaid' | 'overdue';
  patientId: number;
  patientName?: string;
  dentistId: number;
  dentistName?: string;
  caseId?: number;
  amount: number;
  tax: number;
  total: number;
  notes?: string;
  issueDate: string;
  dueDate: string;
  paidDate?: string;
  createdAt: string;
  updatedAt: string;
  items: InvoiceItem[];
}

export interface InvoiceItem {
  id: number;
  invoiceId: number;
  description: string;
  quantity: number;
  unitPrice: number;
  amount: number;
}

export interface InvoiceCreateRequest {
  patientId: number;
  dentistId: number;
  caseId?: number;
  amount: number;
  tax: number;
  notes?: string;
  issueDate: string;
  dueDate: string;
  items: Omit<InvoiceItem, 'id' | 'invoiceId' | 'amount'>[];
}

const invoiceService = {
  getAll: async (filter?: string): Promise<Invoice[]> => {
    const url = filter ? `/invoices?status=${filter}` : '/invoices';
    const response = await api.get<Invoice[]>(url);
    return response.data;
  },

  getById: async (id: string): Promise<Invoice> => {
    const response = await api.get<Invoice>(`/invoices/${id}`);
    return response.data;
  },

  create: async (invoice: InvoiceCreateRequest): Promise<Invoice> => {
    const response = await api.post<Invoice>('/invoices', invoice);
    return response.data;
  },

  update: async (id: string, invoice: Partial<Invoice>): Promise<Invoice> => {
    const response = await api.put<Invoice>(`/invoices/${id}`, invoice);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/invoices/${id}`);
  },

  updateStatus: async (id: string, status: 'paid' | 'unpaid' | 'overdue'): Promise<Invoice> => {
    const response = await api.put<Invoice>(`/invoices/${id}/status`, { status });
    return response.data;
  }
};

export default invoiceService;
