// "use client";

// import Link from "next/link";
// import { motion } from "framer-motion";

// import {
//   Plus,
//   FolderKanban,
//   Search,
//   SlidersHorizontal,
//   ArrowUpDown,
//   Briefcase,
//   CheckCircle2,
//   Clock3,
//   AlertCircle,
// } from "lucide-react";

// import { useProjects } from "@/hooks/useProjects";

// export default function ProjectsPage() {
//   const {
//     data: projects,
//     isLoading,
//     isError,
//   } = useProjects();

//   const totalProjects = projects?.length || 0;

//   const completedProjects =
//     projects?.filter((p) => p.status === "completed").length || 0;

//   const activeProjects =
//     projects?.filter((p) => p.status === "active").length || 0;

//   const planningProjects =
//     projects?.filter((p) => p.status === "planning").length || 0;

//   return (
//     <div className="space-y-6">
//       {/* HEADER */}
//       <motion.div
//         initial={{ opacity: 0, y: 10 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between"
//       >
//         <div>
//           <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
//             Projects
//           </h1>

//           <p className="text-muted-foreground mt-1 text-sm md:text-base">
//             Manage, monitor and organize all company projects.
//           </p>
//         </div>

//         <button className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary text-primary-foreground px-5 py-3 text-sm font-medium shadow hover:opacity-90 transition">
//           <Plus className="w-4 h-4" />
//           Create Project
//         </button>
//       </motion.div>

//       {/* STATS */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
//         <StatsCard
//           title="Total Projects"
//           value={totalProjects}
//           icon={<FolderKanban className="w-5 h-5" />}
//         />

//         <StatsCard
//           title="Active"
//           value={activeProjects}
//           icon={<Briefcase className="w-5 h-5" />}
//         />

//         <StatsCard
//           title="Completed"
//           value={completedProjects}
//           icon={<CheckCircle2 className="w-5 h-5" />}
//         />

//         <StatsCard
//           title="Planning"
//           value={planningProjects}
//           icon={<Clock3 className="w-5 h-5" />}
//         />
//       </div>

//       {/* TOOLBAR */}
//       <motion.div
//         initial={{ opacity: 0, y: 10 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ delay: 0.1 }}
//         className="bg-card border border-border rounded-2xl p-4 flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between"
//       >
//         {/* SEARCH */}
//         <div className="relative w-full lg:max-w-md">
//           <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />

//           <input
//             type="text"
//             placeholder="Search projects..."
//             className="w-full rounded-xl border border-border bg-background pl-10 pr-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary"
//           />
//         </div>

//         {/* ACTIONS */}
//         <div className="flex flex-wrap items-center gap-3">
//           <button className="inline-flex items-center gap-2 rounded-xl border border-border bg-background px-4 py-3 text-sm hover:bg-muted transition">
//             <SlidersHorizontal className="w-4 h-4" />
//             Filters
//           </button>

//           <button className="inline-flex items-center gap-2 rounded-xl border border-border bg-background px-4 py-3 text-sm hover:bg-muted transition">
//             <ArrowUpDown className="w-4 h-4" />
//             Sort
//           </button>
//         </div>
//       </motion.div>

//       {/* CONTENT */}
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ delay: 0.15 }}
//       >
//         {isLoading ? (
//           <ProjectsLoading />
//         ) : isError ? (
//           <ProjectsError />
//         ) : !projects || projects.length === 0 ? (
//           <ProjectsEmpty />
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
//             {projects.map((project) => (
//               <Link
//                 key={project.id}
//                 href={`/dashboard/projects/${project.id}`}
//                 className="group"
//               >
//                 <motion.div
//                   whileHover={{ y: -4 }}
//                   transition={{ duration: 0.2 }}
//                   className="bg-card border border-border rounded-2xl p-5 h-full hover:border-primary/40 transition-all"
//                 >
//                   {/* TOP */}
//                   <div className="flex items-start justify-between gap-3 mb-4">
//                     <div>
//                       <h2 className="font-semibold text-lg line-clamp-1 group-hover:text-primary transition-colors">
//                         {project.title}
//                       </h2>

//                       <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
//                         {project.description ||
//                           "No project description available."}
//                       </p>
//                     </div>

//                     <StatusBadge status={project.status} />
//                   </div>

//                   {/* META */}
//                   <div className="space-y-3 text-sm">
//                     <div className="flex items-center justify-between">
//                       <span className="text-muted-foreground">Client</span>
//                       <span className="font-medium">
//                         {project.client_name || "N/A"}
//                       </span>
//                     </div>

//                     <div className="flex items-center justify-between">
//                       <span className="text-muted-foreground">Lead</span>
//                       <span className="font-medium">
//                         {project.project_lead_name || "N/A"}
//                       </span>
//                     </div>

//                     <div className="flex items-center justify-between">
//                       <span className="text-muted-foreground">Budget</span>
//                       <span className="font-medium">
//                         {project.currency} {project.budget}
//                       </span>
//                     </div>
//                   </div>

//                   {/* PROGRESS */}
//                   <div className="mt-5">
//                     <div className="flex items-center justify-between text-xs mb-2">
//                       <span className="text-muted-foreground">
//                         Task Progress
//                       </span>

//                       <span className="font-medium">
//                         {project.completed_tasks}/{project.total_tasks}
//                       </span>
//                     </div>

//                     <div className="h-2 rounded-full bg-muted overflow-hidden">
//                       <div
//                         className="h-full bg-primary rounded-full"
//                         style={{
//                           width:
//                             project.total_tasks > 0
//                               ? `${
//                                   (project.completed_tasks /
//                                     project.total_tasks) *
//                                   100
//                                 }%`
//                               : "0%",
//                         }}
//                       />
//                     </div>
//                   </div>
//                 </motion.div>
//               </Link>
//             ))}
//           </div>
//         )}
//       </motion.div>
//     </div>
//   );
// }

// function StatsCard({
//   title,
//   value,
//   icon,
// }: {
//   title: string;
//   value: number;
//   icon: React.ReactNode;
// }) {
//   return (
//     <div className="bg-card border border-border rounded-2xl p-5">
//       <div className="w-11 h-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
//         {icon}
//       </div>

//       <p className="text-sm text-muted-foreground">{title}</p>

//       <h3 className="text-2xl font-bold mt-1">{value}</h3>
//     </div>
//   );
// }

// function StatusBadge({ status }: { status: string }) {
//   const statusStyles: Record<string, string> = {
//     active: "bg-green-500/10 text-green-500 border-green-500/20",
//     completed: "bg-blue-500/10 text-blue-500 border-blue-500/20",
//     planning: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
//     on_hold: "bg-orange-500/10 text-orange-500 border-orange-500/20",
//     cancelled: "bg-red-500/10 text-red-500 border-red-500/20",
//   };

//   return (
//     <div
//       className={`px-3 py-1 rounded-full text-xs font-medium border capitalize ${
//         statusStyles[status] || "bg-muted"
//       }`}
//     >
//       {status.replace("_", " ")}
//     </div>
//   );
// }

// function ProjectsLoading() {
//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
//       {Array.from({ length: 6 }).map((_, i) => (
//         <div
//           key={i}
//           className="bg-card border border-border rounded-2xl p-5 animate-pulse"
//         >
//           <div className="h-5 w-40 rounded bg-muted mb-4" />
//           <div className="h-4 w-full rounded bg-muted mb-2" />
//           <div className="h-4 w-2/3 rounded bg-muted mb-6" />
//         </div>
//       ))}
//     </div>
//   );
// }

// function ProjectsEmpty() {
//   return (
//     <div className="bg-card border border-border rounded-2xl p-10 text-center">
//       <h2 className="text-xl font-semibold mb-2">
//         No projects found
//       </h2>

//       <p className="text-muted-foreground text-sm">
//         Start by creating your first project.
//       </p>
//     </div>
//   );
// }

// function ProjectsError() {
//   return (
//     <div className="bg-card border border-border rounded-2xl p-10 text-center">
//       <AlertCircle className="w-10 h-10 mx-auto mb-4 text-red-500" />

//       <h2 className="text-xl font-semibold mb-2">
//         Failed to load projects
//       </h2>

//       <p className="text-muted-foreground text-sm">
//         Something went wrong while fetching projects.
//       </p>
//     </div>
//   );
// }




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

  const totalProjects = projects?.length || 0;

  const completedProjects =
    projects?.filter((p) => p.status === "completed").length || 0;

  const activeProjects =
    projects?.filter((p) => p.status === "active").length || 0;

  const planningProjects =
    projects?.filter((p) => p.status === "planning").length || 0;

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