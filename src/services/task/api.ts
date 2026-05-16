import api from "@/app/lib/general/api";// your existing axios instance
import {
  Task,
  TaskCategory,
  CreateTaskPayload,
  UpdateTaskPayload,
  AssignTaskPayload,
  TaskCandidate,
  SuggestedAssignmentResponse,
  TaskFilters,
  CreateTaskCategoryPayload,
  UpdateTaskCategoryPayload,
} from "@/types/task/types";

export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export const taskCategoryAPI = {
  getCategories: async (): Promise<TaskCategory[]> => {
    const { data } = await api.get("/api/project/task-categories/");
    return data;
  },

  getCategory: async (id: number): Promise<TaskCategory> => {
    const { data } = await api.get(`/api/project/task-categories/${id}/`);
    return data;
  },

  createCategory: async (
    payload: CreateTaskCategoryPayload
  ): Promise<TaskCategory> => {
    const { data } = await api.post("/api/project/task-categories/", payload);
    return data;
  },

  updateCategory: async (
    id: number,
    payload: UpdateTaskCategoryPayload
  ): Promise<TaskCategory> => {
    const { data } = await api.patch(`/api/project/task-categories/${id}/`, payload);
    return data;
  },

  deleteCategory: async (id: number): Promise<void> => {
    await api.delete(`/api/project/task-categories/${id}/`);
  },
};

export const taskAPI = {
  getTasks: async (
    params?: TaskFilters
  ): Promise<PaginatedResponse<Task>> => {
    const { data } = await api.get("/api/project/tasks/", { params });
    return data;
  },

  getTask: async (id: number): Promise<Task> => {
    const { data } = await api.get(`/api/project/tasks/${id}/`);
    return data;
  },

  createTask: async (payload: CreateTaskPayload): Promise<Task> => {
    const { data } = await api.post("/api/project/tasks/", payload);
    return data;
  },

  updateTask: async (
    id: number,
    payload: UpdateTaskPayload
  ): Promise<Task> => {
    const { data } = await api.patch(`/api/project/tasks/${id}/`, payload);
    return data;
  },

  deleteTask: async (id: number): Promise<void> => {
    await api.delete(`/api/project/tasks/${id}/`);
  },

  // ── Assignment ─────────────────────────────────────────────────────────────

  assignTask: async (
    id: number,
    payload: AssignTaskPayload
  ): Promise<Task | SuggestedAssignmentResponse> => {
    const { data } = await api.post(`/api/project/tasks/${id}/assign/`, payload);
    return data;
  },

  unassignTask: async (id: number): Promise<Task> => {
    const { data } = await api.post(`/api/project/tasks/${id}/unassign/`);
    return data;
  },

  getCandidates: async (id: number): Promise<TaskCandidate[]> => {
    const { data } = await api.get(`/api/project/tasks/${id}/candidates/`);
    return data;
  },
};