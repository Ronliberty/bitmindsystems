"use client";

import {
  FolderKanban,
  Briefcase,
  CheckCircle2,
  Clock3,
} from "lucide-react";

function StatsCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: number;
  icon: React.ReactNode;
}) {
  return (
    <div className="bg-card border border-border rounded-2xl p-5">
      <div className="w-11 h-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
        {icon}
      </div>

      <p className="text-sm text-muted-foreground">{title}</p>

      <h3 className="text-2xl font-bold mt-1">{value}</h3>
    </div>
  );
}

export default function ProjectStatsCards({
  totalProjects,
  activeProjects,
  completedProjects,
  planningProjects,
}: {
  totalProjects: number;
  activeProjects: number;
  completedProjects: number;
  planningProjects: number;
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      <StatsCard
        title="Total Projects"
        value={totalProjects}
        icon={<FolderKanban className="w-5 h-5" />}
      />

      <StatsCard
        title="Active"
        value={activeProjects}
        icon={<Briefcase className="w-5 h-5" />}
      />

      <StatsCard
        title="Completed"
        value={completedProjects}
        icon={<CheckCircle2 className="w-5 h-5" />}
      />

      <StatsCard
        title="Planning"
        value={planningProjects}
        icon={<Clock3 className="w-5 h-5" />}
      />
    </div>
  );
}