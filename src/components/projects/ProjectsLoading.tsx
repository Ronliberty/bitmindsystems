"use client";

export default function ProjectsLoading() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="bg-card border border-border rounded-2xl p-5 animate-pulse"
        >
          <div className="h-5 w-40 rounded bg-muted mb-4" />
          <div className="h-4 w-full rounded bg-muted mb-2" />
          <div className="h-4 w-2/3 rounded bg-muted mb-6" />
        </div>
      ))}
    </div>
  );
}