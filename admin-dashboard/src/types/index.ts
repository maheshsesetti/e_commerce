export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'super_admin';
  avatar?: string;
  createdAt: string;
  lastLogin?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  comparePrice?: number;
  sku: string;
  stock: number;
  images: string[];
  category: string;
  subcategory?: string;
  status: 'active' | 'inactive' | 'draft';
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  parentId?: string;
  children?: Category[];
  status: 'active' | 'inactive';
  createdAt: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  items: OrderItem[];
  totalAmount: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded';
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  shippingAddress: Address;
  billingAddress: Address;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  id: string;
  productId: string;
  productName: string;
  price: number;
  quantity: number;
  total: number;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  status: 'active' | 'banned';
  totalOrders: number;
  totalSpent: number;
  createdAt: string;
}

export interface Banner {
  id: string;
  title: string;
  subtitle?: string;
  image: string;
  link?: string;
  position: 'hero' | 'sidebar' | 'footer';
  status: 'active' | 'inactive';
  startDate: string;
  endDate?: string;
  createdAt: string;
}

export interface Coupon {
  id: string;
  code: string;
  type: 'percentage' | 'fixed';
  value: number;
  minimumAmount?: number;
  maxUses?: number;
  usedCount: number;
  status: 'active' | 'inactive' | 'expired';
  startDate: string;
  endDate?: string;
  createdAt: string;
}

export interface Transaction {
  id: string;
  orderId: string;
  amount: number;
  type: 'payment' | 'refund';
  status: 'pending' | 'completed' | 'failed';
  method: 'card' | 'paypal' | 'bank_transfer';
  transactionId: string;
  createdAt: string;
}

export interface DashboardStats {
  totalSales: number;
  totalOrders: number;
  totalCustomers: number;
  totalProducts: number;
  salesGrowth: number;
  ordersGrowth: number;
  customersGrowth: number;
}

export interface SalesData {
  date: string;
  sales: number;
  orders: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}