import api from "@/app/lib/general/api";
import { normalizeList } from "@/app/lib/general/normalize";
import { Project, CreateProjectPayload,  UpdateProjectPayload, } from "@/types/project/types";
  


export const projectAPI = {
  // async getProjects(params?: any) {
  //   const response = await api.get<Project[]>("/api/project/projects/", {
  //     params,
  //   });

  //   return response.data;
  // },

async getProjects(params?: any) {
  const response = await api.get(
    "/api/project/projects/",
    { params }
  );

  return normalizeList<Project>(
    response.data
  );
},

  async createProject(data: CreateProjectPayload) {
    const response = await api.post<Project>("api/project/projects/", data);

    return response.data;
  },

  async updateProject(
    id: number,
    data: UpdateProjectPayload
  ) {
    const response = await api.patch<Project>(
      `/api/project//projects/${id}/`,
      data
    );

    return response.data;
  },

  async deleteProject(id: number) {
    const response = await api.delete(`/api/project/projects/${id}/`);

    return response.data;
  },
};