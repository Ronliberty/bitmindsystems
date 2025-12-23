// src/services/jobsService.ts
import api from "@/app/lib/prod/api";
import { PaginatedJobs, JobOpportunity, RemoteType } from "@/types/jobs";

interface GetJobsParams {
  search?: string;
  remote_type?: RemoteType;
  is_active?: boolean;
  page?: number;
  page_size?: number;
}

export const jobsService = {
  // GET /jobs/opportunities/
  getAll: async (params?: GetJobsParams): Promise<PaginatedJobs> => {
    const response = await api.get<PaginatedJobs>("/jobs/opportunities/", { params });
    return response.data;
  },

  // GET /jobs/opportunities/{id}/
  getOne: async (id: string): Promise<JobOpportunity> => {
    const response = await api.get<JobOpportunity>(`/jobs/opportunities/${id}/`);
    return response.data;
  },

  // POST /jobs/opportunities/
  create: async (data: Partial<JobOpportunity>): Promise<JobOpportunity> => {
    const response = await api.post<JobOpportunity>("/jobs/opportunities/", data);
    return response.data;
  },

  // PATCH /jobs/opportunities/{id}/
  update: async (id: string, data: Partial<JobOpportunity>): Promise<JobOpportunity> => {
    const response = await api.patch<JobOpportunity>(`/jobs/opportunities/${id}/`, data);
    return response.data;
  },

  // DELETE /jobs/opportunities/{id}/
  delete: async (id: string): Promise<void> => {
    await api.delete(`/jobs/opportunities/${id}/`);
  },

  // Toggle active (PATCH)
  toggleActive: async (id: string, is_active: boolean): Promise<JobOpportunity> => {
    const response = await api.patch<JobOpportunity>(`/jobs/opportunities/${id}/`, { is_active });
    return response.data;
  },
};