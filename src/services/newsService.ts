
// src/services/newsService.ts
import api from "@/app/lib/prod/api";
import { PaginatedNews, NewsArticle, PaginatedSources, NewsSource } from "@/types/news";

interface GetNewsParams {
  search?: string;
  featured?: boolean;
  page?: number;
  page_size?: number;
}

interface GetSourcesParams {
  page?: number;
  page_size?: number;
}

export const newsService = {
  // Articles
  getAll: async (params?: GetNewsParams): Promise<PaginatedNews> => {
    const response = await api.get<PaginatedNews>("/api/nayo/news/manager/articles/", { params });
    return response.data;
  },

  getOne: async (id: number): Promise<NewsArticle> => {
    const response = await api.get<NewsArticle>(`/api/nayo/news/manager/articles/${id}/`);
    return response.data;
  },

  create: async (data: any): Promise<NewsArticle> => {
    const config = data instanceof FormData ? { headers: { 'Content-Type': 'multipart/form-data' } } : {};
    const response = await api.post<NewsArticle>("/api/nayo/news/manager/articles/", data, config);
    return response.data;
  },

  update: async (id: number, data: any): Promise<NewsArticle> => {
    const config = data instanceof FormData ? { headers: { 'Content-Type': 'multipart/form-data' } } : {};
    const response = await api.patch<NewsArticle>(`/api/nayo/news/manager/articles/${id}/`, data, config);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/news/articles/${id}/`);
  },

  toggleFeatured: async (id: number, is_featured: boolean): Promise<NewsArticle> => {
    const response = await api.patch<NewsArticle>(`/api/nayo/news/manager/articles/${id}/`, { is_featured });
    return response.data;
  },

  // Sources
  getAllSources: async (params?: GetSourcesParams): Promise<PaginatedSources> => {
    const response = await api.get<PaginatedSources>("/api/nayo/news/manager/sources/", { params });
    return response.data;
  },

  createSource: async (data: Partial<NewsSource>): Promise<NewsSource> => {
    const response = await api.post<NewsSource>("/api/nayo/news/manager/sources/", data);
    return response.data;
  },

  updateSource: async (id: number, data: Partial<NewsSource>): Promise<NewsSource> => {
    const response = await api.patch<NewsSource>(`/api/nayo/news/manager/sources/${id}/`, data);
    return response.data;
  },

  deleteSource: async (id: number): Promise<void> => {
    await api.delete(`/api/nayo/news/manager/sources/${id}/`);
  },
};