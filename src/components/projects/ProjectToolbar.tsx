"use client";

import { motion } from "framer-motion";

import {
  Search,
  SlidersHorizontal,
  ArrowUpDown,
} from "lucide-react";

export default function ProjectToolbar() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="bg-card border border-border rounded-2xl p-4 flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between"
    >
      <div className="relative w-full lg:max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />

        <input
          type="text"
          placeholder="Search projects..."
          className="w-full rounded-xl border border-border bg-background pl-10 pr-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <button className="inline-flex items-center gap-2 rounded-xl border border-border bg-background px-4 py-3 text-sm hover:bg-muted transition">
          <SlidersHorizontal className="w-4 h-4" />
          Filters
        </button>

        <button className="inline-flex items-center gap-2 rounded-xl border border-border bg-background px-4 py-3 text-sm hover:bg-muted transition">
          <ArrowUpDown className="w-4 h-4" />
          Sort
        </button>
      </div>
    </motion.div>
  );
}