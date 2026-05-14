"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

import {
  ArrowLeft,
  Pencil,
  Trash2,
  CalendarDays,
  Building2,
  User2,
  CircleDollarSign,
} from "lucide-react";

import { useProject } from "@/hooks/useProjects";

export default function ProjectDetailPage() {
  const params = useParams();

  const id = Number(params.id);

  const {
    data: project,
    isLoading,
    isError,
  } = useProject(id);

  if (isLoading) {
    return (
      <div className="text-sm text-muted-foreground">
        Loading project...
      </div>
    );
  }

  if (isError || !project) {
    return (
      <div className="text-sm text-red-500">
        Failed to load project.
      </div>
    );
  }

  const progress =
    project.total_tasks > 0
      ? (project.completed_tasks / project.total_tasks) * 100
      : 0;

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
        <div>
          <Link
            href="/dashboard/projects"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Projects
          </Link>

          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-3xl font-bold tracking-tight">
              {project.title}
            </h1>

            <StatusBadge status={project.status} />
          </div>

          <p className="text-muted-foreground mt-3 max-w-3xl leading-relaxed">
            {project.description || "No project description available."}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-5 py-3 text-sm hover:bg-muted transition">
            <Pencil className="w-4 h-4" />
            Edit
          </button>

          <button className="inline-flex items-center gap-2 rounded-xl border border-red-500/20 bg-red-500/10 text-red-500 px-5 py-3 text-sm">
            <Trash2 className="w-4 h-4" />
            Delete
          </button>
        </div>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <DetailCard
          title="Budget"
          value={`${project.currency} ${project.budget}`}
          icon={<CircleDollarSign className="w-5 h-5" />}
        />

        <DetailCard
          title="Total Tasks"
          value={project.total_tasks}
          icon={<Building2 className="w-5 h-5" />}
        />

        <DetailCard
          title="Completed"
          value={project.completed_tasks}
          icon={<User2 className="w-5 h-5" />}
        />

        <DetailCard
          title="Progress"
          value={`${Math.round(progress)}%`}
          icon={<CalendarDays className="w-5 h-5" />}
        />
      </div>

      {/* BODY */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* LEFT */}
        <div className="xl:col-span-2 space-y-6">
          <div className="bg-card border border-border rounded-2xl p-6">
            <h2 className="text-lg font-semibold mb-5">
              Project Overview
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <OverviewItem
                label="Client"
                value={project.client_name || "N/A"}
              />

              <OverviewItem
                label="Project Lead"
                value={project.project_lead_name || "N/A"}
              />

              <OverviewItem
                label="Start Date"
                value={project.start_date || "N/A"}
              />

              <OverviewItem
                label="End Date"
                value={project.end_date || "N/A"}
              />
            </div>
          </div>

          {/* PROGRESS */}
          <div className="bg-card border border-border rounded-2xl p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-semibold">
                Task Progress
              </h2>

              <span className="text-sm text-muted-foreground">
                {project.completed_tasks}/{project.total_tasks}
              </span>
            </div>

            <div className="h-4 rounded-full bg-muted overflow-hidden">
              <div
                className="h-full bg-primary rounded-full"
                style={{
                  width: `${progress}%`,
                }}
              />
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="space-y-6">
          <div className="bg-card border border-border rounded-2xl p-6">
            <h2 className="text-lg font-semibold mb-5">
              Project Info
            </h2>

            <div className="space-y-4 text-sm">
              <InfoRow
                label="Project Type"
                value={project.project_type || "N/A"}
              />

              <InfoRow
                label="Currency"
                value={project.currency || "N/A"}
              />

              <InfoRow
                label="Status"
                value={project.status}
              />

              <InfoRow
                label="Created"
                value={new Date(
                  project.created_at
                ).toLocaleDateString()}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DetailCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: string | number;
  icon: React.ReactNode;
}) {
  return (
    <div className="bg-card border border-border rounded-2xl p-5">
      <div className="w-11 h-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
        {icon}
      </div>

      <p className="text-sm text-muted-foreground">{title}</p>

      <h3 className="text-xl font-bold mt-1">
        {value}
      </h3>
    </div>
  );
}

function OverviewItem({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-border p-4 bg-background">
      <p className="text-sm text-muted-foreground mb-2">
        {label}
      </p>

      <p className="font-medium">{value}</p>
    </div>
  );
}

function InfoRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-muted-foreground">{label}</span>

      <span className="font-medium capitalize">
        {value.replace("_", " ")}
      </span>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const statusStyles: Record<string, string> = {
    active: "bg-green-500/10 text-green-500 border-green-500/20",
    completed: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    planning: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
    on_hold: "bg-orange-500/10 text-orange-500 border-orange-500/20",
    cancelled: "bg-red-500/10 text-red-500 border-red-500/20",
  };

  return (
    <div
      className={`px-3 py-1 rounded-full text-xs font-medium border capitalize ${
        statusStyles[status] || "bg-muted"
      }`}
    >
      {status.replace("_", " ")}
    </div>
  );
}