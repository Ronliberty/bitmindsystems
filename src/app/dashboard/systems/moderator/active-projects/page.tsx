"use client";

import { Timer, Users, CheckCircle2 } from "lucide-react";
import { useProjects } from "@/hooks/useProjects"; 
import { Project, ProjectStatus } from "@/types/project/types";

const getStatusColor = (status: ProjectStatus) => {
  switch (status) {
    case "active": return "text-emerald-500";
    case "on_hold": return "text-yellow-500";
    case "cancelled": return "text-red-500";
    case "completed": return "text-blue-500";
    case "planning": return "text-muted-foreground";
    default: return "text-muted-foreground";
  }
};

const getProgressColor = (status: ProjectStatus) => {
  switch (status) {
    case "active": return "bg-emerald-500";
    case "on_hold": return "bg-yellow-500";
    case "cancelled": return "bg-red-500";
    case "completed": return "bg-blue-500";
    default: return "bg-muted-foreground";
  }
};

export default function ActiveProjects() {
  const { data, isLoading, isError } = useProjects();

  const projects: Project[] = Array.isArray(data) ? data : ((data as unknown) as { results: Project[] })?.results ?? [];

  const totalTasksDone = projects.reduce((s, p) => s + p.completed_tasks, 0);

  if (isLoading) {
    return (
      <div className="w-full max-w-[1200px] mx-auto space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-card border border-border rounded-2xl p-6 animate-pulse">
            <div className="h-5 bg-muted rounded w-1/3 mb-3" />
            <div className="h-4 bg-muted rounded w-1/2 mb-6" />
            <div className="h-2 bg-muted rounded-full" />
          </div>
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="w-full max-w-[1200px] mx-auto p-10 text-center text-red-500 bg-card border border-border rounded-2xl">
        Failed to load projects. Please try again.
      </div>
    );
  }

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
          <p className="text-sm text-muted-foreground">Total Projects</p>
          <p className="text-2xl font-semibold mt-1">{projects.length}</p>
        </div>

        <div className="bg-card border border-border rounded-2xl p-5">
          <p className="text-sm text-muted-foreground">Tasks Completed</p>
          <p className="text-2xl font-semibold mt-1">{totalTasksDone}</p>
        </div>

        <div className="bg-card border border-border rounded-2xl p-5">
          <p className="text-sm text-muted-foreground">Active Projects</p>
          <p className="text-2xl font-semibold mt-1">
            {projects.filter((p) => p.status === "active").length}
          </p>
        </div>
      </div>

      {/* Project List */}
      <div className="space-y-4">
        {projects.map((project) => {
          const progress =
            project.total_tasks > 0
              ? Math.round((project.completed_tasks / project.total_tasks) * 100)
              : 0;

          return (
            <div
              key={project.id}
              className="bg-card border border-border rounded-2xl p-6 hover:bg-muted/40 transition"
            >
              {/* Top Row */}
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="font-semibold text-lg">{project.title}</h2>
                  <p className="text-sm text-muted-foreground">{project.description}</p>
                </div>
                <div className={`text-sm font-medium capitalize ${getStatusColor(project.status)}`}>
                  {project.status.replace("_", " ")}
                </div>
              </div>

              {/* Meta */}
              <div className="flex flex-wrap items-center gap-6 mt-4 text-sm text-muted-foreground">
                {project.project_lead_name && (
                  <span className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {project.project_lead_name}
                  </span>
                )}

                {project.client_name && (
                  <span className="text-muted-foreground">
                    Client: <span className="text-foreground">{project.client_name}</span>
                  </span>
                )}

                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" />
                  {project.completed_tasks}/{project.total_tasks} tasks
                </span>

                <span className="flex items-center gap-1">
                  <Timer className="w-4 h-4" />
                  {progress}% complete
                </span>

                {project.end_date && (
                  <span className="text-muted-foreground">
                    Due: {new Date(project.end_date).toLocaleDateString()}
                  </span>
                )}
              </div>

              {/* Progress Bar */}
              <div className="mt-4 h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all ${getProgressColor(project.status)}`}
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {projects.length === 0 && (
        <div className="p-10 text-center text-muted-foreground bg-card border border-border rounded-2xl">
          No projects found.
        </div>
      )}
    </div>
  );
}