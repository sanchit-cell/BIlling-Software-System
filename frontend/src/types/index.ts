// Types for the application

// User Types
export interface User {
  _id: string;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'manager';
  createdAt: string;
  updatedAt: string;
}

// Order Types
export interface OrderItem {
  _id: string;
  item: Item;
  quantity: number;
  price: number;
}

export interface Order {
  _id: string;
  customer: Customer;
  items: OrderItem[];
  totalAmount: number;
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  createdAt: string;
  updatedAt: string;
}

// Customer Types
export interface Customer {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  createdAt: string;
  updatedAt: string;
}

// Item/Inventory Types
export interface Item {
  _id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  sku?: string;
  category?: string;
  inStock: boolean;
  createdAt: string;
  updatedAt: string;
}

// API Response Types
export interface PaginatedResponse<T> {
  data: T[];
  page: number;
  totalPages: number;
  totalItems: number;
  hasMore: boolean;
}

export interface ApiError {
  message: string;
  statusCode: number;
  errors?: Record<string, string[]>;
}

// Form Types
export interface LoginFormValues {
  email: string;
  password: string;
  token: string;
}

export interface RegisterFormValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  token: string;
}

export interface CreateOrderFormValues {
  customerId: string;
  items: {
    itemId: string;
    quantity: number;
  }[];
}

export interface CreateItemFormValues {
  name: string;
  description: string;
  price: number;
  quantity: number;
  category?: string;
}

// Redux State Types
export interface RootState {
  UserSlice: {
    user: User | null;
  };
  SidebarSlice: {
    collapsed: boolean;
    toggle: boolean;
  };
}

// Theme Types
export type Theme = 'light' | 'dark' | 'system';

// Table Column Types
export interface TableColumn<T> {
  key: keyof T | string;
  header: string;
  sortable?: boolean;
  render?: (value: any, row: T) => React.ReactNode;
}

// Filter Types
export interface FilterOption {
  label: string;
  value: string;
}

export interface Filters {
  search?: string;
  status?: string;
  dateRange?: {
    start: string;
    end: string;
  };
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}
