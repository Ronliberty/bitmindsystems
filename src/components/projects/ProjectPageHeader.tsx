"use client";

import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useProjectUI } from "./ProjectProvider";

export default function ProjectPageHeader() {
    const { setCreateOpen } = useProjectUI();
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between"
    >
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
          Projects
        </h1>

        <p className="text-muted-foreground mt-1 text-sm md:text-base">
          Manage, monitor and organize all company projects.
        </p>
      </div>

      <button 
       onClick={() => setCreateOpen(true)}
      className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary text-primary-foreground px-5 py-3 text-sm font-medium shadow hover:opacity-90 transition">
        <Plus className="w-4 h-4" />
        Create Project
      </button>
    </motion.div>
  );
}