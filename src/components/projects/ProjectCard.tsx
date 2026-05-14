"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import ProjectStatusBadge from "./ProjectStatusBadge";

import { Project } from "@/types/project/types"; 

export default function ProjectCard({
  project,
}: {
  project: Project;
}) {
  return (
    <Link
      href={`/dashboard/systems/manager/projects/${project.id}`}
      className="group"
    >
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ duration: 0.2 }}
        className="bg-card border border-border rounded-2xl p-5 h-full hover:border-primary/40 transition-all"
      >
        <div className="flex items-start justify-between gap-3 mb-4">
          <div>
            <h2 className="font-semibold text-lg line-clamp-1 group-hover:text-primary transition-colors">
              {project.title}
            </h2>

            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
              {project.description ||
                "No project description available."}
            </p>
          </div>

          <ProjectStatusBadge status={project.status} />
        </div>

        <div className="space-y-3 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Client</span>

            <span className="font-medium">
              {project.client_name || "N/A"}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Lead</span>

            <span className="font-medium">
              {project.project_lead_name || "N/A"}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Budget</span>

            <span className="font-medium">
              {project.currency} {project.budget}
            </span>
          </div>
        </div>

        <div className="mt-5">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="text-muted-foreground">
              Task Progress
            </span>

            <span className="font-medium">
              {project.completed_tasks}/{project.total_tasks}
            </span>
          </div>

          <div className="h-2 rounded-full bg-muted overflow-hidden">
            <div
              className="h-full bg-primary rounded-full"
              style={{
                width:
                  project.total_tasks > 0
                    ? `${
                        (project.completed_tasks /
                          project.total_tasks) *
                        100
                      }%`
                    : "0%",
              }}
            />
          </div>
        </div>
      </motion.div>
    </Link>
  );
}