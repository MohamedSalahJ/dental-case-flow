
import api from './api';

export interface InventoryItem {
  id: number;
  name: string;
  description?: string;
  quantity: number;
  unitPrice: number;
  reorderLevel: number;
  categoryId?: number;
  categoryName?: string;
  supplierId?: number;
  supplierName?: string;
  createdAt: string;
  updatedAt: string;
}

export interface InventoryCategory {
  id: number;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Supplier {
  id: number;
  name: string;
  contactPerson?: string;
  email?: string;
  phone?: string;
  address?: string;
  createdAt: string;
  updatedAt: string;
}

export interface InventoryItemCreateRequest {
  name: string;
  description?: string;
  quantity: number;
  unitPrice: number;
  reorderLevel: number;
  categoryId?: number;
  supplierId?: number;
}

const inventoryService = {
  getAllItems: async (): Promise<InventoryItem[]> => {
    const response = await api.get<InventoryItem[]>('/inventory');
    return response.data;
  },

  getItemById: async (id: number): Promise<InventoryItem> => {
    const response = await api.get<InventoryItem>(`/inventory/${id}`);
    return response.data;
  },

  createItem: async (item: InventoryItemCreateRequest): Promise<InventoryItem> => {
    const response = await api.post<InventoryItem>('/inventory', item);
    return response.data;
  },

  updateItem: async (id: number, item: Partial<InventoryItemCreateRequest>): Promise<InventoryItem> => {
    const response = await api.put<InventoryItem>(`/inventory/${id}`, item);
    return response.data;
  },

  deleteItem: async (id: number): Promise<void> => {
    await api.delete(`/inventory/${id}`);
  },

  getAllCategories: async (): Promise<InventoryCategory[]> => {
    const response = await api.get<InventoryCategory[]>('/inventory/categories');
    return response.data;
  },

  getAllSuppliers: async (): Promise<Supplier[]> => {
    const response = await api.get<Supplier[]>('/inventory/suppliers');
    return response.data;
  }
};

export default inventoryService;
