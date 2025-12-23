// src/services/subscriptionService.ts
import api from "@/app/lib/prod/api";
import { PaginatedSubscriptions, Subscription } from "@/types/subscription";

interface GetSubscriptionsParams {
  search?: string;
  status?: "active" | "canceled" | "expired" | "pending" | "all";
  page?: number;
  page_size?: number;
}

export const subscriptionService = {
  // GET /subscriptions/
  getAll: async (params?: GetSubscriptionsParams): Promise<PaginatedSubscriptions> => {
    const cleanedParams: Record<string, any> = {};
    if (params?.search) cleanedParams.search = params.search;
    if (params?.status && params.status !== "all") {
      cleanedParams.status = params.status;
    }
    if (params?.page) cleanedParams.page = params.page;
    if (params?.page_size) cleanedParams.page_size = params.page_size;

    const response = await api.get<PaginatedSubscriptions>("/subscriptions/", {
      params: cleanedParams,
    });
    return response.data;
  },

  // GET /subscriptions/{id}/
  getOne: async (id: number): Promise<Subscription> => {
    const response = await api.get<Subscription>(`/subscriptions/${id}/`);
    return response.data;
  },

  // POST /subscriptions/ (if creating new subs as admin)
  create: async (data: Partial<Subscription>): Promise<Subscription> => {
    const response = await api.post<Subscription>("/subscriptions/", data);
    return response.data;
  },

  // PATCH /subscriptions/{id}/
  update: async (id: number, data: Partial<Subscription>): Promise<Subscription> => {
    const response = await api.patch<Subscription>(`/subscriptions/${id}/`, data);
    return response.data;
  },

  // DELETE /subscriptions/{id}/
  delete: async (id: number): Promise<void> => {
    await api.delete(`/subscriptions/${id}/`);
  },

  // Change status (PATCH)
  changeStatus: async (id: number, status: Subscription["status"]): Promise<Subscription> => {
    const response = await api.patch<Subscription>(`/subscriptions/${id}/`, { status });
    return response.data;
  },

  // Optional: Get stats or charts data (if you have a custom endpoint)
  getStats: async (): Promise<{ active: number; total: number; revenue: number; }> => {
    const response = await api.get<{ active: number; total: number; revenue: number; }>("/subscriptions/stats/");
    return response.data;
  },
};