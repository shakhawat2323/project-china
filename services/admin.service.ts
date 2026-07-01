import { apiRequest } from "./api-client";

export type AdminOverview = {
  totalOrders: number;
  pendingOrders: number;
  totalProducts: number;
  totalCustomers: number;
  totalRevenue: number;
  lowStockProducts: number;
  openTickets: number;
};

export type AdminCustomer = {
  id: string;
  email: string;
  name?: string;
  companyName?: string;
  phone?: string;
  status: string;
  isVerified: boolean;
  lastLoginAt?: string;
  createdAt: string;
  _count?: {
    orders: number;
    tickets: number;
    reviews: number;
  };
};

export type AdminInventoryProduct = {
  id: string;
  name: string;
  slug: string;
  category: string;
  price: number;
  stock: number;
  status: string;
  images: string[];
  updatedAt: string;
};

export type ProductCategoryRecord = {
  id: string;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  order: number;
  createdAt: string;
  updatedAt: string;
};

export const AdminService = {
  getOverview: () => apiRequest<AdminOverview>("/admin/overview"),

  getCustomers: () => apiRequest<AdminCustomer[]>("/admin/customers"),

  updateCustomerStatus: (userId: string, status: "ACTIVE" | "INACTIVE" | "BLOCKED" | "DELETED") =>
    apiRequest<AdminCustomer>(`/admin/customers/${userId}/status`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    }),

  getInventory: () => apiRequest<AdminInventoryProduct[]>("/admin/inventory"),

  getCategories: () => apiRequest<ProductCategoryRecord[]>("/admin/categories"),

  createCategory: (payload: { name: string; slug?: string; description?: string; icon?: string; order?: number }) =>
    apiRequest<ProductCategoryRecord>("/admin/categories", {
      method: "POST",
      body: JSON.stringify(payload),
    }),

  updateCategory: (id: string, payload: { name?: string; slug?: string; description?: string; icon?: string; order?: number }) =>
    apiRequest<ProductCategoryRecord>(`/admin/categories/${id}`, {
      method: "PATCH",
      body: JSON.stringify(payload),
    }),

  deleteCategory: (id: string) =>
    apiRequest<ProductCategoryRecord>(`/admin/categories/${id}`, {
      method: "DELETE",
    }),
};
