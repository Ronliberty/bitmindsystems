"use client";

import { AnimatePresence, motion } from "framer-motion";

import { X } from "lucide-react";

import {
  useProjectUI,
} from "./ProjectProvider";

import ProjectForm from "./ProjectForm";

export default function ProjectCreateModal() {
  const {
    createOpen,
    setCreateOpen,
  } = useProjectUI();

  return (
    <AnimatePresence>
      {createOpen && (
        <>
          {/* OVERLAY */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() =>
              setCreateOpen(false)
            }
            className="fixed inset-0 bg-black/50 z-50"
          />

          {/* MODAL */}
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
              scale: 0.95,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: 20,
              scale: 0.95,
            }}
            transition={{
              duration: 0.2,
            }}
            className="fixed left-1/2 top-1/2 z-50 w-full max-w-2xl -translate-x-1/2 -translate-y-1/2 px-4"
          >
            <div className="bg-card border border-border rounded-3xl shadow-2xl overflow-hidden">
              {/* HEADER */}
              <div className="flex items-center justify-between p-6 border-b border-border">
                <div>
                  <h2 className="text-xl font-semibold">
                    Create Project
                  </h2>

                  <p className="text-sm text-muted-foreground mt-1">
                    Add a new company project
                  </p>
                </div>

                <button
                  onClick={() =>
                    setCreateOpen(false)
                  }
                  className="w-10 h-10 rounded-xl hover:bg-muted flex items-center justify-center transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* BODY */}
              <div className="p-6">
                <ProjectForm />
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}