"use client";

import { useEffect, useState } from "react";
import { getTasks } from "@/app/lib/api"; 
import { Task } from "@/app/lib/api";  
import { motion } from "framer-motion";
import { Loader2, CheckCircle } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function CompletedTasksPage() {
  const { access, user } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      if (!access) {
        setLoading(false);
        return;
      }

      try {
        const data = await getTasks(access);
        // Filter only completed tasks
        const filtered = data.filter((t: Task) => t.status === "completed");
        setTasks(filtered);
      } catch (e) {
        console.error("Failed to load completed tasks:", e);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [access]);

  return (
    <section>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-6"
      >
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <CheckCircle className="w-6 h-6 text-primary" />
          Completed Tasks
        </h2>
        <p className="text-gray-400 mt-1">
          Review tasks that have been completed by you or your team.
        </p>
      </motion.div>

      {/* Loading state */}
      {loading && (
        <div className="flex justify-center py-10">
          <Loader2 className="animate-spin w-6 h-6 text-primary" />
        </div>
      )}

      {/* No tasks */}
      {!loading && tasks.length === 0 && (
        <p className="text-gray-400 text-center py-10">
          No completed tasks available.
        </p>
      )}

      {/* Task list */}
      <div className="space-y-4">
        {tasks.map((task) => (
          <motion.div
            key={task.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="p-5 border border-gray-800 rounded-xl bg-[#1a1a1a] hover:shadow-md transition-all"
          >
            <h3 className="text-lg font-semibold">{task.title}</h3>

            {/* Client / Project Info */}
            <div className="text-sm text-gray-400 mb-3">
              <p>
                <span className="font-medium">Client:</span> {task.client_name || "N/A"}
              </p>
              <p>
                <span className="font-medium">Project:</span> {task.project_name || "N/A"}
              </p>
            </div>

            {/* Task Details */}
            {task.task_details && (
              <div className="mb-3 text-sm text-gray-400">
                {Object.entries(task.task_details).map(([key, value]) => (
                  <p key={key}>
                    <span className="font-medium">{key.replace(/_/g, " ")}:</span> {value || "N/A"}
                  </p>
                ))}
              </div>
            )}

            {/* Progress and Reward */}
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium">Status:</span> {task.status}
              </div>
              <div>
                <span className="font-medium">Progress:</span> {task.progress_percentage}%
              </div>
              <div>
                <span className="font-medium">Deadline:</span> {task.due_date || "N/A"}
              </div>
              <div>
                <span className="font-medium">Reward:</span> ${task.reward_amount}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
