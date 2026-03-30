// api.ts
import axios, { AxiosInstance, AxiosResponse } from 'axios';

import { Task, TaskStatus, TaskPriority, TaskType,} from '@/types/editing/types';

// Create axios instance with base configuration
const api: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api', // Change as needed
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Optional: Add request interceptor for auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token'); // or use your auth context
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Optional: Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // You can add global error handling here (e.g., 401 logout)
    return Promise.reject(error);
  }
);

// ===================== TASK API =====================

export const taskApi = {
  // Get all tasks with optional filters
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
    const response: AxiosResponse<{ data: Task[]; meta?: any }> = await api.get('/api/employee/tasks', { params });
    return response.data;
  },

  // Get single task by ID
  getById: async (id: number): Promise<Task> => {
    const response: AxiosResponse<{ data: Task }> = await api.get(`/api/employee/tasks/${id}`);
    return response.data.data;
  },

  // Create new task
  create: async (taskData: Omit<Task, 'id' | 'created_at' | 'updated_at' | 'attached_files'>) => {
    const response: AxiosResponse<{ data: Task; message?: string }> = await api.post('/api/employee/tasks', taskData);
    return response.data;
  },

  // Update task
  update: async (id: number, taskData: Partial<Omit<Task, 'id' | 'created_at' | 'updated_at'>>) => {
    const response: AxiosResponse<{ data: Task }> = await api.put(`/api/employee/tasks/${id}`, taskData);
    return response.data.data;
  },

  // Delete task
  delete: async (id: number): Promise<{ message: string }> => {
    const response: AxiosResponse<{ message: string }> = await api.delete(`/api/employee//tasks/${id}`);
    return response.data;
  },

  // Update task status
  updateStatus: async (id: number, status: TaskStatus, notes?: string) => {
    const response: AxiosResponse<{ data: Task }> = await api.patch(`/api/employee/tasks/${id}/status`, {
      status,
      notes,
    });
    return response.data.data;
  },

  // Assign task to employee
  assign: async (id: number, assigned_to_id: number) => {
    const response: AxiosResponse<{ data: Task }> = await api.patch(`/api/employee/tasks/${id}/assign`, {
      assigned_to_id,
    });
    return response.data.data;
  },

  // Update progress
  updateProgress: async (id: number, progress_percentage: number) => {
    const response: AxiosResponse<{ data: Task }> = await api.patch(`/api/employee/tasks/${id}/progress`, {
      progress_percentage,
    });
    return response.data.data;
  },

  // Submit task for review
  submitForReview: async (id: number, revision_notes?: string) => {
    const response: AxiosResponse<{ data: Task }> = await api.post(`/api/employee/tasks/${id}/submit`, {
      revision_notes,
    });
    return response.data.data;
  },

  // Add files to task
  uploadFiles: async (id: number, files: File[]) => {
    const formData = new FormData();
    files.forEach((file, index) => {
      formData.append(`files[${index}]`, file);
    });

    const response: AxiosResponse<{ data: Task }> = await api.post(`/api/employee/tasks/${id}/files`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data.data;
  },

  // Get task statistics / summary
  getStats: async () => {
    const response: AxiosResponse<any> = await api.get('/api/employee/tasks/stats');
    return response.data;
  },
};

// Export the main api instance if needed elsewhere
export default api;