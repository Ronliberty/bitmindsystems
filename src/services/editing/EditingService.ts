import { api } from "@/app/lib/admin/api"; 
import type { Task, TaskStatus, TaskPriority, TaskType } from "@/types/editing/types";

export const taskApi = {
  getAll: async (params?: {
    status?: TaskStatus;
    priority?: TaskPriority;
    task_type?: TaskType;
    assigned_to_id?: number;
    client_name?: string;
    project_id?: string;
    page?: number;
    limit?: number;
  }) => {
    const res = await api.get("/employee/tasks", { params });
    return res.data;
  },

  getById: async (id: number): Promise<Task> => {
    const res = await api.get(`/employee/tasks/${id}`);
    return res.data.data;
  },

  create: async (taskData: Partial<Task>) => {
    const res = await api.post("/employee/tasks", taskData);
    return res.data;
  },

  update: async (id: number, taskData: Partial<Task>) => {
    const res = await api.put(`/employee/tasks/${id}`, taskData);
    return res.data.data;
  },

  delete: async (id: number) => {
    const res = await api.delete(`/employee/tasks/${id}`);
    return res.data;
  },

  updateStatus: async (id: number, status: TaskStatus, notes?: string) => {
    const res = await api.patch(`/employee/tasks/${id}/status`, {
      status,
      notes,
    });
    return res.data.data;
  },

  assign: async (id: number, assigned_to_id: number) => {
    const res = await api.patch(`/employee/tasks/${id}/assign`, {
      assigned_to_id,
    });
    return res.data.data;
  },

  updateProgress: async (id: number, progress_percentage: number) => {
    const res = await api.patch(`/employee/tasks/${id}/progress`, {
      progress_percentage,
    });
    return res.data.data;
  },

  submitForReview: async (id: number, revision_notes?: string) => {
    const res = await api.post(`/employee/tasks/${id}/submit`, {
      revision_notes,
    });
    return res.data.data;
  },

  uploadFiles: async (id: number, files: File[]) => {
    const formData = new FormData();

    files.forEach((file, i) => {
      formData.append(`files[${i}]`, file);
    });

    const res = await api.post(`/employee/tasks/${id}/files`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return res.data.data;
  },

  getStats: async () => {
    const res = await api.get("/employee/tasks/stats");
    return res.data;
  },
};