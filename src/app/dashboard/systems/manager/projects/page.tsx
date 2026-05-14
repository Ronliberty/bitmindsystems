


"use client";

import { motion } from "framer-motion";

import { useProjects } from "@/hooks/useProjects";

import ProjectPageHeader from "@/components/projects/ProjectPageHeader";
import ProjectStatsCards from "@/components/projects/ProjectStatsCards";
import ProjectToolbar from "@/components/projects/ProjectToolbar";
import ProjectGrid from "@/components/projects/ProjectGrid";

import ProjectsLoading from "@/components/projects/ProjectsLoading";
import ProjectsEmpty from "@/components/projects/ProjectsEmpty";
import ProjectsError from "@/components/projects/ProjectsError";
import { ProjectProvider } from "@/components/projects/ProjectProvider";
import ProjectCreateModal from "@/components/projects/ProjectCreateModal";

export default function ProjectsPage() {
  const {
    data: projects,
    isLoading,
    isError,
  } = useProjects();

  // const totalProjects = projects?.length || 0;

  // const completedProjects =
  //   projects?.filter((p) => p.status === "completed").length || 0;

  // const activeProjects =
  //   projects?.filter((p) => p.status === "active").length || 0;

  // const planningProjects =
  //   projects?.filter((p) => p.status === "planning").length || 0;


  const projectList = Array.isArray(projects)
  ? projects
  : [];

const totalProjects =
  projectList.length;

const completedProjects =
  projectList.filter(
    (p) => p.status === "completed"
  ).length;

const activeProjects =
  projectList.filter(
    (p) => p.status === "active"
  ).length;

const planningProjects =
  projectList.filter(
    (p) => p.status === "planning"
  ).length;

  return (
    <ProjectProvider>
    <div className="space-y-6">
      <ProjectPageHeader />
      <ProjectCreateModal />

      <ProjectStatsCards
        totalProjects={totalProjects}
        activeProjects={activeProjects}
        completedProjects={completedProjects}
        planningProjects={planningProjects}
      />

      <ProjectToolbar />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15 }}
      >
        {isLoading ? (
          <ProjectsLoading />
        ) : isError ? (
          <ProjectsError />
        ) : !projects || projects.length === 0 ? (
          <ProjectsEmpty />
        ) : (
          <ProjectGrid projects={projects} />
        )}
      </motion.div>
    </div>
    </ProjectProvider>
  );
}