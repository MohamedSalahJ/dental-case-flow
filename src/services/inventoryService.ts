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

export interface InventoryRestockRequest {
  itemId: number;
  quantity: number;
  notes?: string;
}

const inventoryService = {
  getAllItems: async (): Promise<InventoryItem[]> => {
    try {
      return await api.get<InventoryItem[]>('/inventory');
    } catch (error) {
      console.error("Error fetching inventory items:", error);
      throw error;
    }
  },

  getLowStockItems: async (): Promise<InventoryItem[]> => {
    try {
      return await api.get<InventoryItem[]>('/inventory/low-stock');
    } catch (error) {
      console.error("Error fetching low stock items:", error);
      throw error;
    }
  },

  getItemById: async (id: number): Promise<InventoryItem> => {
    try {
      return await api.get<InventoryItem>(`/inventory/${id}`);
    } catch (error) {
      console.error(`Error fetching inventory item ${id}:`, error);
      throw error;
    }
  },

  createItem: async (item: InventoryItemCreateRequest): Promise<InventoryItem> => {
    try {
      return await api.post<InventoryItem>('/inventory', item);
    } catch (error) {
      console.error("Error creating inventory item:", error);
      throw error;
    }
  },

  updateItem: async (id: number, item: Partial<InventoryItemCreateRequest>): Promise<InventoryItem> => {
    try {
      return await api.put<InventoryItem>(`/inventory/${id}`, item);
    } catch (error) {
      console.error(`Error updating inventory item ${id}:`, error);
      throw error;
    }
  },

  deleteItem: async (id: number): Promise<void> => {
    try {
      await api.delete(`/inventory/${id}`);
    } catch (error) {
      console.error(`Error deleting inventory item ${id}:`, error);
      throw error;
    }
  },

  restockItem: async (restockRequest: InventoryRestockRequest): Promise<InventoryItem> => {
    try {
      return await api.post<InventoryItem>('/inventory/restock', restockRequest);
    } catch (error) {
      console.error(`Error restocking inventory item:`, error);
      throw error;
    }
  },

  getAllCategories: async (): Promise<InventoryCategory[]> => {
    try {
      return await api.get<InventoryCategory[]>('/inventory/categories');
    } catch (error) {
      console.error("Error fetching inventory categories:", error);
      throw error;
    }
  },

  createCategory: async (category: { name: string; description?: string }): Promise<InventoryCategory> => {
    try {
      return await api.post<InventoryCategory>('/inventory/categories', category);
    } catch (error) {
      console.error("Error creating inventory category:", error);
      throw error;
    }
  },

  updateCategory: async (id: number, category: { name: string; description?: string }): Promise<InventoryCategory> => {
    try {
      return await api.put<InventoryCategory>(`/inventory/categories/${id}`, category);
    } catch (error) {
      console.error(`Error updating inventory category ${id}:`, error);
      throw error;
    }
  },

  deleteCategory: async (id: number): Promise<void> => {
    try {
      return await api.delete<void>(`/inventory/categories/${id}`);
    } catch (error) {
      console.error(`Error deleting inventory category ${id}:`, error);
      throw error;
    }
  },

  getAllSuppliers: async (): Promise<Supplier[]> => {
    try {
      return await api.get<Supplier[]>('/inventory/suppliers');
    } catch (error) {
      console.error("Error fetching suppliers:", error);
      throw error;
    }
  },

  createSupplier: async (supplier: Partial<Supplier>): Promise<Supplier> => {
    try {
      return await api.post<Supplier>('/inventory/suppliers', supplier);
    } catch (error) {
      console.error("Error creating supplier:", error);
      throw error;
    }
  },

  updateSupplier: async (id: number, supplier: Partial<Supplier>): Promise<Supplier> => {
    try {
      return await api.put<Supplier>(`/inventory/suppliers/${id}`, supplier);
    } catch (error) {
      console.error(`Error updating supplier ${id}:`, error);
      throw error;
    }
  },

  deleteSupplier: async (id: number): Promise<void> => {
    try {
      return await api.delete<void>(`/inventory/suppliers/${id}`);
    } catch (error) {
      console.error(`Error deleting supplier ${id}:`, error);
      throw error;
    }
  }
};

export default inventoryService;
