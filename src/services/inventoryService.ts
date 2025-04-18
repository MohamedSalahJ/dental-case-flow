
import api from './api';

export interface InventoryItem {
  id: number;
  name: string;
  description?: string;
  quantity: number;
  unitPrice: number;
  reorderLevel: number;
  unit: string;
  categoryId?: number;
  categoryName?: string;
  supplierId?: number;
  supplierName?: string;
  lastOrdered?: string;
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
  unit: string;
  categoryId?: number;
  supplierId?: number;
}

const inventoryService = {
  getAllItems: async (): Promise<InventoryItem[]> => {
    try {
      const response = await api.get<InventoryItem[]>('/inventory');
      return response;
    } catch (error) {
      console.error("Error fetching inventory items:", error);
      
      // Fallback mock data until backend is fully implemented
      return [
        {
          id: 1,
          name: "Dental Composite",
          description: "Light-cured composite resin",
          quantity: 25,
          unitPrice: 45.99,
          reorderLevel: 10,
          unit: "pack",
          categoryName: "Restorative Materials",
          supplierName: "Dental Supplies Inc",
          lastOrdered: "2023-04-15",
          createdAt: "2023-01-15T14:30:00",
          updatedAt: "2023-04-15T09:12:00"
        },
        {
          id: 2,
          name: "Dental Cement",
          description: "Glass ionomer cement",
          quantity: 8,
          unitPrice: 32.50,
          reorderLevel: 10,
          unit: "bottle",
          categoryName: "Adhesives",
          supplierName: "Dental Supplies Inc",
          lastOrdered: "2023-05-01",
          createdAt: "2023-01-22T11:45:00",
          updatedAt: "2023-05-01T16:30:00"
        }
      ];
    }
  },

  getItemById: async (id: number): Promise<InventoryItem> => {
    try {
      const response = await api.get<InventoryItem>(`/inventory/${id}`);
      return response;
    } catch (error) {
      console.error(`Error fetching inventory item ${id}:`, error);
      throw error;
    }
  },

  createItem: async (item: InventoryItemCreateRequest): Promise<InventoryItem> => {
    try {
      const response = await api.post<InventoryItem>('/inventory', item);
      return response;
    } catch (error) {
      console.error("Error creating inventory item:", error);
      throw error;
    }
  },

  updateItem: async (id: number, item: Partial<InventoryItemCreateRequest>): Promise<InventoryItem> => {
    try {
      const response = await api.put<InventoryItem>(`/inventory/${id}`, item);
      return response;
    } catch (error) {
      console.error(`Error updating inventory item ${id}:`, error);
      throw error;
    }
  },

  deleteItem: async (id: number): Promise<void> => {
    try {
      return await api.delete<void>(`/inventory/${id}`);
    } catch (error) {
      console.error(`Error deleting inventory item ${id}:`, error);
      throw error;
    }
  },

  getAllCategories: async (): Promise<InventoryCategory[]> => {
    try {
      const response = await api.get<InventoryCategory[]>('/inventory/categories');
      return response;
    } catch (error) {
      console.error("Error fetching inventory categories:", error);
      throw error;
    }
  },

  getAllSuppliers: async (): Promise<Supplier[]> => {
    try {
      const response = await api.get<Supplier[]>('/inventory/suppliers');
      return response;
    } catch (error) {
      console.error("Error fetching suppliers:", error);
      throw error;
    }
  }
};

export default inventoryService;
