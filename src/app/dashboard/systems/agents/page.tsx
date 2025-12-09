"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Clock } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { getTasks } from "@/app/lib/api";
import { Task } from "@/app/lib/api";

export default function TaskHub() {
  const { access } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      if (!access) return setLoading(false);

      try {
        const data = await getTasks(access);
        setTasks(data);
      } catch (err) {
        console.error("Failed to fetch tasks:", err);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [access]);

  // Compute stats
  const taskStats = {
    openTickets: tasks.filter(t => t.status === "open").length,
    dueToday: tasks.filter(t => {
      const due = new Date(t.due_date);
      const today = new Date();
      return due.toDateString() === today.toDateString();
    }).length,
    pendingApprovals: tasks.filter(t => t.status === "pending").length,
  };

  // Recent tasks (latest 5)
  const recentTasks = tasks
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, 5);

  // Upcoming deadlines
  const dueTodayCount = taskStats.dueToday;

  return (
    <section className="min-h-screen w-full bg-[#0d0d0d] text-white px-6 py-10">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-3xl font-bold mb-6"
        >
          🛠️ Task Hub
        </motion.h1>

        {loading ? (
          <p className="text-center text-gray-400">Loading tasks...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Task Stats */}
            <motion.div
              className="p-6 bg-[#1a1a1a] border border-gray-800 rounded-2xl shadow-sm"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <h2 className="text-lg font-semibold mb-4">📊 Task Statistics</h2>
              <ul className="space-y-4">
                <li className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">Open Tickets</p>
                  </div>
                  <p className="text-xl font-bold text-cyan-400">{taskStats.openTickets}</p>
                </li>
                <li className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">Tasks Due Today</p>
                  </div>
                  <p className="text-xl font-bold text-cyan-400">{taskStats.dueToday}</p>
                </li>
                <li className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">Pending Approvals</p>
                  </div>
                  <p className="text-xl font-bold text-cyan-400">{taskStats.pendingApprovals}</p>
                </li>
              </ul>
            </motion.div>

            {/* Recent Tasks */}
            <motion.div
              className="p-6 bg-[#1a1a1a] border border-gray-800 rounded-2xl shadow-sm"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-lg font-semibold mb-4">📝 Recent Tasks</h2>
              <ul className="space-y-3">
                {recentTasks.map((task) => (
                  <li
                    key={task.id}
                    className="flex justify-between items-center p-3 rounded-lg bg-[#222] hover:bg-[#2a2a2a] transition"
                  >
                    <div>
                      <p className="font-medium">{task.title}</p>
                      <p className="text-xs text-gray-400">
                        Assigned to {task.assigned_to || "Unassigned"} • Due {task.due_date || "N/A"}
                      </p>
                    </div>
                    <span
                      className={`text-xs font-semibold px-2 py-1 rounded ${
                        task.status === "open"
                          ? "bg-red-500/20 text-red-400"
                          : task.status === "in_progress"
                          ? "bg-yellow-500/20 text-yellow-400"
                          : "bg-green-500/20 text-green-400"
                      }`}
                    >
                      {task.status.replace("_", " ")}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Upcoming Deadlines */}
            <motion.div
              className="p-6 bg-[#1a1a1a] border border-gray-800 rounded-2xl shadow-sm text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Clock className="w-10 h-10 text-cyan-400 mb-2 mx-auto" />
              <h2 className="text-lg font-semibold mb-2">⏰ Upcoming Deadlines</h2>
              <p className="text-sm text-gray-400 mb-3">
                Track tasks and ticket deadlines to stay on top of your work.
              </p>
              <p className="text-2xl font-bold text-cyan-400">{dueTodayCount} tasks due today</p>
              <p className="text-sm text-gray-400 mt-1">
                {dueTodayCount - 1 >= 0 ? `+${dueTodayCount - 1} from yesterday` : "No change"}
              </p>
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
}
