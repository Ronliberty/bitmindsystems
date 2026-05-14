"use client";

export default function ProjectsEmpty() {
  return (
    <div className="bg-card border border-border rounded-2xl p-10 text-center">
      <h2 className="text-xl font-semibold mb-2">
        No projects found
      </h2>

      <p className="text-muted-foreground text-sm">
        Start by creating your first project.
      </p>
    </div>
  );
}