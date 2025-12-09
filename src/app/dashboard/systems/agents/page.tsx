"use client";

import { motion } from "framer-motion";
import { Mail, Ticket, Pencil, Clock, CheckCircle, Calendar } from "lucide-react";
import Link from "next/link";

// Sample task data


const taskStats = [
  { label: "Open Tickets", value: 42, change: "+5%" },
  { label: "Tasks Due Today", value: 18, change: "-2%" },
  { label: "Pending Approvals", value: 7, change: "+1%" },
];

const recentTasks = [
  { task: "Reply to ticket #2456", assigned: "John Doe", due: "Today", status: "Open" },
  { task: "Draft welcome email", assigned: "Jane Smith", due: "Tomorrow", status: "Pending" },
  { task: "Design Instagram post", assigned: "Alex Lee", due: "Today", status: "In Progress" },
  { task: "Update product catalog", assigned: "Maria Gomez", due: "Nov 20", status: "Completed" },
];

export default function TaskHub() {
  return (
    <section className="min-h-screen w-full bg-[#0d0d0d] text-white px-6 py-10">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        

        {/* Quick Task Categories */}
       

        {/* Stats and Recent Tasks */}
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
              {taskStats.map((stat) => (
                <li key={stat.label} className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{stat.label}</p>
                    <p className="text-xs text-gray-400">{stat.change} this week</p>
                  </div>
                  <p className="text-xl font-bold text-cyan-400">{stat.value}</p>
                </li>
              ))}
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
              {recentTasks.map((task, i) => (
                <li
                  key={i}
                  className="flex justify-between items-center p-3 rounded-lg bg-[#222] hover:bg-[#2a2a2a] transition"
                >
                  <div>
                    <p className="font-medium">{task.task}</p>
                    <p className="text-xs text-gray-400">
                      Assigned to {task.assigned} • Due {task.due}
                    </p>
                  </div>
                  <span
                    className={`text-xs font-semibold px-2 py-1 rounded ${
                      task.status === "Open"
                        ? "bg-red-500/20 text-red-400"
                        : task.status === "In Progress"
                        ? "bg-yellow-500/20 text-yellow-400"
                        : "bg-green-500/20 text-green-400"
                    }`}
                  >
                    {task.status}
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
            <p className="text-2xl font-bold text-cyan-400">5 tasks due today</p>
            <p className="text-sm text-gray-400 mt-1">+2 from yesterday</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
