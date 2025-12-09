"use client";

import { useEffect, useState } from "react";
import { getTasks } from "@/app/lib/api"; 
import { Task } from "@/app/lib/api";  
import { motion } from "framer-motion";
import { Loader2, ListChecks } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function EditorTasksPage() {
  const { access, user } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  async function load() {
    if (!access) {
      setLoading(false);   // important
      return;
    }

    try {
      const data = await getTasks(access);
      const filtered = data.filter((t: Task) => t.task_type === "editing");
      setTasks(filtered);
    } catch (e) {
      console.error("Failed to load tasks:", e);
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
          <ListChecks className="w-6 h-6 text-primary" />
          Editing Tasks
        </h2>
        <p className="text-muted-foreground mt-1">
          Tasks assigned to you or available for editing.
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
        <p className="text-muted-foreground text-center py-10">
          No editing tasks available right now.
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
            className="p-5 border border-border rounded-xl bg-card hover:shadow-md transition-all"
          >
            <h3 className="text-lg font-semibold">{task.title}</h3>

            

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

            {/* Raw footage + details */}
            {task.task_details?.raw_footage_url && (
              <div className="mt-4">
                <p className="font-medium">Raw Footage:</p>
                <a
                  href={task.task_details.raw_footage_url}
                  target="_blank"
                  className="text-cyan-400 underline"
                >
                  Open Video
                </a>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
