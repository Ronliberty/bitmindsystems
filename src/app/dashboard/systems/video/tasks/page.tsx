"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Loader2, ListChecks } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

import { getMyTasks } from "@/app/lib/task/api";
import type { Task } from "@/app/lib/task/types";

export default function EditorTasksPage() {
  const { user } = useAuth();

  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /* ---------------- FETCH TASKS ---------------- */
  useEffect(() => {
    async function loadTasks() {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);

        const data = await getMyTasks();

        const safeData = Array.isArray(data) ? data : [];

        // keep backend filter optional safety
        const editingTasks = safeData.filter(
          (task) => task.task_type === "editing"
        );

        setTasks(editingTasks);
      } catch (err: any) {
        console.error(err);

        setError(
          err?.response?.data?.error ||
          err?.message ||
          "Failed to load tasks"
        );
      } finally {
        setLoading(false);
      }
    }

    loadTasks();
  }, [user?.id]);

  /* ---------------- UI ---------------- */
  return (
    <section className="space-y-6">
      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <ListChecks className="w-6 h-6 text-primary" />
          Editing Tasks
        </h2>
      </motion.div>

      {/* LOADING */}
      {loading && (
        <div className="flex justify-center py-12">
          <Loader2 className="animate-spin w-8 h-8 text-primary" />
        </div>
      )}

      {/* ERROR */}
      {error && (
        <div className="text-red-500 text-sm">
          {error}
        </div>
      )}

      {/* EMPTY */}
      {!loading && tasks.length === 0 && (
        <p className="text-muted-foreground">
          No tasks available.
        </p>
      )}

      {/* TASK LIST */}
      <div className="space-y-4">
        {tasks.map((task) => (
          <motion.div
            key={task.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 border rounded-xl bg-card"
          >
            {/* CORE FIELDS FROM YOUR TYPES */}
            <h3 className="font-semibold">
              {task.title}
            </h3>

            {task.description && (
              <p className="text-sm text-muted-foreground">
                {task.description}
              </p>
            )}

            {/* META INFO (ONLY VALID TYPE FIELDS) */}
            <div className="flex flex-wrap gap-3 mt-3 text-xs text-muted-foreground">

              {task.status && (
                <span>Status: {task.status}</span>
              )}

              {task.priority && (
                <span>Priority: {task.priority}</span>
              )}

              {task.task_type && (
                <span>Type: {task.task_type}</span>
              )}

              {task.due_date && (
                <span>Due: {task.due_date}</span>
              )}

              {task.progress_percentage !== undefined && (
                <span>Progress: {task.progress_percentage}%</span>
              )}

              {task.reward_amount !== undefined && (
                <span>Reward: {task.reward_amount}</span>
              )}

            </div>

            {/* TASK DETAILS (safe dynamic object) */}
            {task.task_details && (
              <pre className="mt-3 text-xs bg-muted p-2 rounded overflow-auto">
                {JSON.stringify(task.task_details, null, 2)}
              </pre>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}