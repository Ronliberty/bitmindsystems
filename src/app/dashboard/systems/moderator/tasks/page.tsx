"use client";

import { useState } from "react";
import { CheckCircle2, Clock, AlertCircle } from "lucide-react";

interface Task {
  id: number;
  title: string;
  project: string;
  priority: "low" | "medium" | "high";
  status: "pending" | "in_progress" | "completed";
  due_date: string;
}

const sampleTasks: Task[] = [
  {
    id: 1,
    title: "Review user submissions",
    project: "Content Moderation",
    priority: "high",
    status: "pending",
    due_date: "2026-04-20",
  },
  {
    id: 2,
    title: "Approve flagged posts",
    project: "Community Safety",
    priority: "medium",
    status: "in_progress",
    due_date: "2026-04-19",
  },
  {
    id: 3,
    title: "Audit AI-generated content",
    project: "AI Review",
    priority: "low",
    status: "completed",
    due_date: "2026-04-18",
  },
];

export default function TasksPage() {
  const [tasks] = useState(sampleTasks);
  const [filter, setFilter] = useState<"all" | "pending" | "in_progress" | "completed">("all");

  const filteredTasks = tasks.filter((t) => {
    if (filter === "all") return true;
    return t.status === filter;
  });

  const getStatusIcon = (status: Task["status"]) => {
    if (status === "completed") return <CheckCircle2 className="w-4 h-4 text-emerald-500" />;
    if (status === "in_progress") return <Clock className="w-4 h-4 text-blue-500" />;
    return <AlertCircle className="w-4 h-4 text-yellow-500" />;
  };

  const getPriorityColor = (priority: Task["priority"]) => {
    if (priority === "high") return "text-red-500";
    if (priority === "medium") return "text-yellow-500";
    return "text-muted-foreground";
  };

  return (
    <div className="w-full max-w-[1200px] mx-auto space-y-6">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold">My Tasks</h1>
        <p className="text-sm text-muted-foreground">
          Manage and complete your assigned tasks
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-card border border-border rounded-2xl p-5">
          <p className="text-sm text-muted-foreground">Pending</p>
          <p className="text-2xl font-semibold">
            {tasks.filter((t) => t.status === "pending").length}
          </p>
        </div>

        <div className="bg-card border border-border rounded-2xl p-5">
          <p className="text-sm text-muted-foreground">In Progress</p>
          <p className="text-2xl font-semibold">
            {tasks.filter((t) => t.status === "in_progress").length}
          </p>
        </div>

        <div className="bg-card border border-border rounded-2xl p-5">
          <p className="text-sm text-muted-foreground">Completed</p>
          <p className="text-2xl font-semibold">
            {tasks.filter((t) => t.status === "completed").length}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2 bg-card border border-border rounded-xl p-1 w-fit">
        {["all", "pending", "in_progress", "completed"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f as any)}
            className={`px-4 py-1.5 text-sm rounded-lg capitalize ${
              filter === f
                ? "bg-primary text-primary-foreground"
                : "hover:bg-muted"
            }`}
          >
            {f.replace("_", " ")}
          </button>
        ))}
      </div>

      {/* Task List */}
      <div className="bg-card border border-border rounded-2xl divide-y">
        {filteredTasks.map((task) => (
          <div
            key={task.id}
            className="p-5 flex items-center justify-between hover:bg-muted/50 transition cursor-pointer"
          >
            
            {/* Left */}
            <div className="flex items-start gap-4">
              {getStatusIcon(task.status)}

              <div>
                <p className="font-medium">{task.title}</p>
                <p className="text-xs text-muted-foreground">
                  {task.project}
                </p>
              </div>
            </div>

            {/* Right */}
            <div className="flex items-center gap-6 text-sm">
              
              <span className={`capitalize font-medium ${getPriorityColor(task.priority)}`}>
                {task.priority}
              </span>

              <span className="text-muted-foreground">
                {task.due_date}
              </span>
            </div>
          </div>
        ))}

        {filteredTasks.length === 0 && (
          <div className="p-10 text-center text-muted-foreground">
            No tasks found.
          </div>
        )}
      </div>
    </div>
  );
}