// src/services/marketplaceService.ts
import api from "@/app/lib/prod/api";
import { PaginatedMarketplaceItems, MarketplaceItem, ItemType } from "@/types/marketPlace";
interface GetMarketplaceParams {
  search?: string;
  item_type?: ItemType | "all";
  active_only?: boolean;
  page?: number;
  page_size?: number;
}

export const marketplaceService = {
  // GET /marketplace/items/
  getAll: async (params?: GetMarketplaceParams): Promise<PaginatedMarketplaceItems> => {
    // Clean up params: remove "all"
    const cleanedParams: Record<string, any> = {};
    if (params?.search) cleanedParams.search = params.search;
    if (params?.item_type && params.item_type !== "all") {
      cleanedParams.item_type = params.item_type;
    }
    if (params?.active_only !== undefined) {
      cleanedParams.active = params.active_only;
    }
    if (params?.page) cleanedParams.page = params.page;
    if (params?.page_size) cleanedParams.page_size = params.page_size;

    const response = await api.get<PaginatedMarketplaceItems>("/marketplace/items/", {
      params: cleanedParams,
    });
    return response.data;
  },

  // GET /marketplace/items/{id}/
  getOne: async (id: number): Promise<MarketplaceItem> => {
    const response = await api.get<MarketplaceItem>(`/marketplace/items/${id}/`);
    return response.data;
  },

  // POST /marketplace/items/
  create: async (data: Partial<MarketplaceItem>): Promise<MarketplaceItem> => {
    const response = await api.post<MarketplaceItem>("/marketplace/items/", data);
    return response.data;
  },

  // PATCH /marketplace/items/{id}/
  update: async (id: number, data: Partial<MarketplaceItem>): Promise<MarketplaceItem> => {
    const response = await api.patch<MarketplaceItem>(`/marketplace/items/${id}/`, data);
    return response.data;
  },

  // DELETE /marketplace/items/{id}/
  delete: async (id: number): Promise<void> => {
    await api.delete(`/marketplace/items/${id}/`);
  },

  // Toggle active (PATCH)
  toggleActive: async (id: number, active: boolean): Promise<MarketplaceItem> => {
    const response = await api.patch<MarketplaceItem>(`/marketplace/items/${id}/`, { active });
    return response.data;
  },
};