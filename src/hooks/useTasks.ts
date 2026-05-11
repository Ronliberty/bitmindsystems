"use client";

import { useEffect, useState } from "react";
import { getMyTasks } from "@/app/lib/task/api";
import type { Task } from "@/app/lib/task/types";

interface UseTasksOptions {
  task_type?: string;
  status?: string;
}

export function useTasks(options?: UseTasksOptions) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function fetchTasks() {
    try {
      setLoading(true);

      const data = await getMyTasks();

      let filtered = Array.isArray(data) ? data : [];

      if (options?.task_type) {
        filtered = filtered.filter(
          (task) => task.task_type === options.task_type
        );
      }

      if (options?.status) {
        filtered = filtered.filter(
          (task) => task.status === options.status
        );
      }

      setTasks(filtered);
    } catch (err: any) {
      setError(
        err?.response?.data?.error ||
        err?.message ||
        "Failed to fetch tasks"
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchTasks();
  }, []);

  return {
    tasks,
    loading,
    error,
    refresh: fetchTasks,
    setTasks,
  };
}