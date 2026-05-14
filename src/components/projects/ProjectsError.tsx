"use client";

import { AlertCircle } from "lucide-react";

export default function ProjectsError() {
  return (
    <div className="bg-card border border-border rounded-2xl p-10 text-center">
      <AlertCircle className="w-10 h-10 mx-auto mb-4 text-red-500" />

      <h2 className="text-xl font-semibold mb-2">
        Failed to load projects
      </h2>

      <p className="text-muted-foreground text-sm">
        Something went wrong while fetching projects.
      </p>
    </div>
  );
}