
import api from './api';

export interface InvoiceItem {
  id?: number;
  description: string;
  quantity: number;
  unitPrice: number;
  amount?: number;
}

export interface Invoice {
  id?: string | number;
  invoiceNumber?: string;
  status: 'paid' | 'unpaid' | 'overdue';
  patientId: number;
  patientName?: string;
  dentistId: number;
  dentistName?: string;
  caseId?: number | null;
  amount: number;
  tax: number;
  total: number;
  notes?: string;
  issueDate: string;
  dueDate: string;
  paidDate?: string;
  createdAt?: string;
  updatedAt?: string;
  items: InvoiceItem[];
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
  items: Omit<InvoiceItem, 'id' | 'amount'>[];
}

// API paths
const INVOICES_PATH = '/invoices';

const invoiceService = {
  getAll: async (filter?: string): Promise<Invoice[]> => {
    try {
      const url = filter && filter !== 'all' 
        ? `${INVOICES_PATH}?status=${filter}` 
        : INVOICES_PATH;
      return await api.get<Invoice[]>(url);
    } catch (error) {
      console.error("Error fetching invoices:", error);
      throw error;
    }
  },

  getById: async (id: string | number): Promise<Invoice> => {
    try {
      return await api.get<Invoice>(`${INVOICES_PATH}/${id}`);
    } catch (error) {
      console.error(`Error fetching invoice ${id}:`, error);
      throw error;
    }
  },

  create: async (invoice: InvoiceCreateRequest): Promise<Invoice> => {
    try {
      return await api.post<Invoice>(INVOICES_PATH, invoice);
    } catch (error) {
      console.error("Error creating invoice:", error);
      throw error;
    }
  },

  update: async (id: string | number, invoice: Partial<Invoice>): Promise<Invoice> => {
    try {
      return await api.put<Invoice>(`${INVOICES_PATH}/${id}`, invoice);
    } catch (error) {
      console.error(`Error updating invoice ${id}:`, error);
      throw error;
    }
  },

  delete: async (id: string | number): Promise<void> => {
    try {
      return await api.delete<void>(`${INVOICES_PATH}/${id}`);
    } catch (error) {
      console.error(`Error deleting invoice ${id}:`, error);
      throw error;
    }
  },

  updateStatus: async (id: string | number, status: 'paid' | 'unpaid' | 'overdue'): Promise<Invoice> => {
    try {
      return await api.put<Invoice>(`${INVOICES_PATH}/${id}/status`, { status });
    } catch (error) {
      console.error(`Error updating invoice ${id} status:`, error);
      throw error;
    }
  }
};

export default invoiceService;
