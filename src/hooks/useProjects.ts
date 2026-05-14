import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { projectAPI } from "@/services/project/api"; 
import {
  CreateProjectPayload,
  UpdateProjectPayload,
} from "@/types/project/types";

export const useProjects = (params?: any) => {
  return useQuery({
    queryKey: ["projects", params],
    queryFn: () => projectAPI.getProjects(params),
  });
};

export const useProject = (id: number) => {
  return useQuery({
    queryKey: ["project", id],
    queryFn: () => projectAPI.getProject(id),
    enabled: !!id,
  });
};

export const useCreateProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateProjectPayload) =>
      projectAPI.createProject(data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["projects"],
      });
    },
  });
};

export const useUpdateProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: number;
      data: UpdateProjectPayload;
    }) => projectAPI.updateProject(id, data),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["projects"],
      });

      queryClient.invalidateQueries({
        queryKey: ["project", variables.id],
      });
    },
  });
};

export const useDeleteProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) =>
      projectAPI.deleteProject(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["projects"],
      });
    },
  });
};