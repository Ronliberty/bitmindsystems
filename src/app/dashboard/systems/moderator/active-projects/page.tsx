"use client";

import { useState } from "react";
import { Timer, Users, CheckCircle2, AlertCircle } from "lucide-react";

interface Project {
  id: number;
  name: string;
  description: string;
  progress: number;
  tasks_total: number;
  tasks_done: number;
  priority: "low" | "medium" | "high";
  status: "active" | "at_risk" | "on_track";
  team_size: number;
}

const sampleProjects: Project[] = [
  {
    id: 1,
    name: "Content Moderation System",
    description: "Review and approve user-generated content",
    progress: 72,
    tasks_total: 120,
    tasks_done: 86,
    priority: "high",
    status: "on_track",
    team_size: 5,
  },
  {
    id: 2,
    name: "AI Content Review Pipeline",
    description: "Automated AI + human verification flow",
    progress: 45,
    tasks_total: 80,
    tasks_done: 36,
    priority: "medium",
    status: "at_risk",
    team_size: 3,
  },
  {
    id: 3,
    name: "Community Safety Audit",
    description: "Flagged content review and reporting",
    progress: 90,
    tasks_total: 60,
    tasks_done: 54,
    priority: "high",
    status: "on_track",
    team_size: 4,
  },
];

export default function ActiveProjects() {
  const [projects] = useState(sampleProjects);

  const getStatusColor = (status: Project["status"]) => {
    if (status === "on_track") return "text-emerald-500";
    if (status === "at_risk") return "text-red-500";
    return "text-yellow-500";
  };

  const getPriorityColor = (priority: Project["priority"]) => {
    if (priority === "high") return "text-red-500";
    if (priority === "medium") return "text-yellow-500";
    return "text-muted-foreground";
  };

  return (
    <div className="w-full max-w-[1200px] mx-auto space-y-6">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold">Active Projects</h1>
        <p className="text-sm text-muted-foreground">
          Monitor ongoing workflows and team progress
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        
        <div className="bg-card border border-border rounded-2xl p-5">
          <p className="text-sm text-muted-foreground">Active Projects</p>
          <p className="text-2xl font-semibold mt-1">{projects.length}</p>
        </div>

        <div className="bg-card border border-border rounded-2xl p-5">
          <p className="text-sm text-muted-foreground">Tasks Completed</p>
          <p className="text-2xl font-semibold mt-1">
            {projects.reduce((s, p) => s + p.tasks_done, 0)}
          </p>
        </div>

        <div className="bg-card border border-border rounded-2xl p-5">
          <p className="text-sm text-muted-foreground">Team Members</p>
          <p className="text-2xl font-semibold mt-1">
            {projects.reduce((s, p) => s + p.team_size, 0)}
          </p>
        </div>
      </div>

      {/* Project List */}
      <div className="space-y-4">
        {projects.map((project) => (
          <div
            key={project.id}
            className="bg-card border border-border rounded-2xl p-6 hover:bg-muted/40 transition"
          >
            
            {/* Top Row */}
            <div className="flex items-start justify-between gap-4">
              
              <div>
                <h2 className="font-semibold text-lg">
                  {project.name}
                </h2>
                <p className="text-sm text-muted-foreground">
                  {project.description}
                </p>
              </div>

              <div className={`text-sm font-medium ${getStatusColor(project.status)}`}>
                {project.status.replace("_", " ")}
              </div>
            </div>

            {/* Meta */}
            <div className="flex items-center gap-6 mt-4 text-sm">
              
              <span className={`font-medium ${getPriorityColor(project.priority)}`}>
                {project.priority} priority
              </span>

              <span className="flex items-center gap-1 text-muted-foreground">
                <Users className="w-4 h-4" />
                {project.team_size} members
              </span>

              <span className="flex items-center gap-1 text-muted-foreground">
                <CheckCircle2 className="w-4 h-4" />
                {project.tasks_done}/{project.tasks_total} tasks
              </span>

              <span className="flex items-center gap-1 text-muted-foreground">
                <Timer className="w-4 h-4" />
                {project.progress}% complete
              </span>
            </div>

            {/* Progress Bar (clean, minimal) */}
            <div className="mt-4 h-2 bg-muted rounded-full overflow-hidden">
              <div
                className={`h-full transition-all ${
                  project.status === "at_risk"
                    ? "bg-red-500"
                    : project.status === "on_track"
                    ? "bg-emerald-500"
                    : "bg-yellow-500"
                }`}
                style={{ width: `${project.progress}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {projects.length === 0 && (
        <div className="p-10 text-center text-muted-foreground bg-card border border-border rounded-2xl">
          No active projects found.
        </div>
      )}
    </div>
  );
}