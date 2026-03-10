import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import backendUrl from './config';

export interface DashboardStats {
  totalRevenue: number;
  totalOrders: number;
  totalCustomers: number;
  lowStockItems: number;
  totalItems: number;
  pendingOrders: number;
  revenueChange: number;
  ordersChange: number;
  customersChange: number;
  stockChange: number;
}

export interface Activity {
  id: string;
  type: 'order' | 'payment' | 'customer' | 'inventory';
  message: string;
  status: 'success' | 'warning' | 'error' | 'info';
  time: string;
  meta?: {
    orderId?: string;
    customerId?: string;
    itemId?: string;
    customerName?: string;
    itemName?: string;
    quantity?: number;
  };
}

export interface SalesAnalytics {
  labels: string[];
  sales: number[];
  orders: number[];
}

export interface CategoryStats {
  labels: string[];
  data: number[];
}

export const DashboardApi = createApi({
  reducerPath: 'DashboardApi',
  baseQuery: fetchBaseQuery({ baseUrl: backendUrl }),
  tagTypes: ['DashboardStats', 'Activity', 'Analytics'],
  endpoints: (builder) => ({
    getDashboardStats: builder.query<DashboardStats, void>({
      query: () => ({
        url: '/dashboard/stats',
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      }),
      providesTags: ['DashboardStats'],
    }),

    getRecentActivity: builder.query<Activity[], number | void>({
      query: (limit = 10) => ({
        url: `/dashboard/activity?limit=${limit}`,
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      }),
      providesTags: ['Activity'],
    }),

    getSalesAnalytics: builder.query<SalesAnalytics, number | void>({
      query: (days = 7) => ({
        url: `/dashboard/analytics?days=${days}`,
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      }),
      providesTags: ['Analytics'],
    }),

    getCategoryStats: builder.query<CategoryStats, void>({
      query: () => ({
        url: '/dashboard/categories',
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      }),
    }),
  }),
});

export const {
  useGetDashboardStatsQuery,
  useGetRecentActivityQuery,
  useGetSalesAnalyticsQuery,
  useGetCategoryStatsQuery,
} = DashboardApi;
