"use client";

import { Project } from "@/types/project/types"; 

import ProjectCard from "./ProjectCard";

export default function ProjectGrid({
  projects,
}: {
  projects: Project[];
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          project={project}
        />
      ))}
    </div>
  );
}