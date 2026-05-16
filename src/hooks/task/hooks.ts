import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { taskAPI, taskCategoryAPI } from "@/services/task/api";
import {
  AssignTaskPayload,
  CreateTaskCategoryPayload,
  CreateTaskPayload,
  SuggestedAssignmentResponse,
  Task,
  TaskFilters,
  UpdateTaskCategoryPayload,
  UpdateTaskPayload,
} from "@/types/task/types";

// ── Category Hooks ────────────────────────────────────────────────────────────

export const useTaskCategories = () =>
  useQuery({
    queryKey: ["task-categories"],
    queryFn: () => taskCategoryAPI.getCategories(),
  });

export const useTaskCategory = (id: number) =>
  useQuery({
    queryKey: ["task-category", id],
    queryFn: () => taskCategoryAPI.getCategory(id),
    enabled: !!id,
  });

export const useCreateTaskCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateTaskCategoryPayload) =>
      taskCategoryAPI.createCategory(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["task-categories"] });
    },
  });
};

export const useUpdateTaskCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateTaskCategoryPayload }) =>
      taskCategoryAPI.updateCategory(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["task-categories"] });
      queryClient.invalidateQueries({ queryKey: ["task-category", id] });
    },
  });
};

export const useDeleteTaskCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => taskCategoryAPI.deleteCategory(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["task-categories"] });
    },
  });
};

// ── Task Hooks ────────────────────────────────────────────────────────────────

export const useTasks = (filters?: TaskFilters) =>
  useQuery({
    queryKey: ["tasks", filters],
    queryFn: () => taskAPI.getTasks(filters),
  });

export const useTask = (id: number) =>
  useQuery({
    queryKey: ["task", id],
    queryFn: () => taskAPI.getTask(id),
    enabled: !!id,
  });

export const useCreateTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateTaskPayload) => taskAPI.createTask(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
};

export const useUpdateTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateTaskPayload }) =>
      taskAPI.updateTask(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      queryClient.invalidateQueries({ queryKey: ["task", id] });
    },
  });
};

export const useDeleteTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => taskAPI.deleteTask(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
};

// ── Assignment Hooks ──────────────────────────────────────────────────────────

export const useAssignTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: AssignTaskPayload }) =>
      taskAPI.assignTask(id, payload),
    onSuccess: (result, { id }) => {
      // suggested mode returns candidates, not a Task — don't invalidate yet
      const isSuggested =
        (result as SuggestedAssignmentResponse).mode === "suggested";
      if (!isSuggested) {
        queryClient.invalidateQueries({ queryKey: ["tasks"] });
        queryClient.invalidateQueries({ queryKey: ["task", id] });
      }
    },
  });
};

export const useUnassignTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => taskAPI.unassignTask(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      queryClient.invalidateQueries({ queryKey: ["task", id] });
    },
  });
};

export const useTaskCandidates = (id: number, enabled = false) =>
  useQuery({
    queryKey: ["task-candidates", id],
    queryFn: () => taskAPI.getCandidates(id),
    enabled: enabled && !!id,
  });