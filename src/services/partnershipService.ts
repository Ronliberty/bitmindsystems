// src/services/partnershipService.ts
import api from "@/app/lib/prod/api";
import { PaginatedPartnerships, Partnership } from "@/types/partnership";

interface GetPartnershipParams {
  search?: string;
  active_only?: boolean;
  page?: number;
  page_size?: number;
}

export const partnershipService = {
  // GET /partnerships/
  getAll: async (params?: GetPartnershipParams): Promise<PaginatedPartnerships> => {
    const cleanedParams: Record<string, any> = {};
    if (params?.search) cleanedParams.search = params.search;
    if (params?.active_only !== undefined) {
      cleanedParams.is_active = params.active_only;
    }
    if (params?.page) cleanedParams.page = params.page;
    if (params?.page_size) cleanedParams.page_size = params.page_size;

    const response = await api.get<PaginatedPartnerships>("/partnerships/", {
      params: cleanedParams,
    });
    return response.data;
  },

  // GET /partnerships/{id}/
  getOne: async (id: number): Promise<Partnership> => {
    const response = await api.get<Partnership>(`/partnerships/${id}/`);
    return response.data;
  },

  // POST /partnerships/
  create: async (data: Partial<Partnership>): Promise<Partnership> => {
    const response = await api.post<Partnership>("/partnerships/", data);
    return response.data;
  },

  // PATCH /partnerships/{id}/
  update: async (id: number, data: Partial<Partnership>): Promise<Partnership> => {
    const response = await api.patch<Partnership>(`/partnerships/${id}/`, data);
    return response.data;
  },

  // DELETE /partnerships/{id}/
  delete: async (id: number): Promise<void> => {
    await api.delete(`/partnerships/${id}/`);
  },

  // Toggle active (PATCH)
  toggleActive: async (id: number, is_active: boolean): Promise<Partnership> => {
    const response = await api.patch<Partnership>(`/partnerships/${id}/`, { is_active });
    return response.data;
  },

  // Increment view count (PATCH or custom endpoint)
  incrementView: async (id: number): Promise<Partnership> => {
    // Assuming a custom PATCH for view increment
    const response = await api.patch<Partnership>(`/partnerships/${id}/increment_view/`, { by: 1 });
    return response.data;
  },
};