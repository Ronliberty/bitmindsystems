import api from "@/app/lib/prod/api";
import { Project, CreateProjectPayload,  UpdateProjectPayload, } from "@/types/project/types";
  


export const projectAPI = {
  async getProjects(params?: any) {
    const response = await api.get<Project[]>("/api/project/projects/", {
      params,
    });

    return response.data;
  },

  async getProject(id: number) {
    const response = await api.get<Project>(`/api/project/projects/${id}/`);

    return response.data;
  },

  async createProject(data: CreateProjectPayload) {
    const response = await api.post<Project>("/api/project/projects/", data);

    return response.data;
  },

  async updateProject(
    id: number,
    data: UpdateProjectPayload
  ) {
    const response = await api.patch<Project>(
      `/projects/${id}/`,
      data
    );

    return response.data;
  },

  async deleteProject(id: number) {
    const response = await api.delete(`/api/project/projects/${id}/`);

    return response.data;
  },
};