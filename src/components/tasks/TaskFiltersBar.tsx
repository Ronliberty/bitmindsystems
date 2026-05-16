"use client";

import { TaskFilters, TaskStatus, TaskPriority } from "@/types/task/types";
import { Search, X } from "lucide-react";
import { useTaskCategories } from "@/hooks/task/hooks";

interface Props {
  filters: TaskFilters;
  onChange: (f: TaskFilters) => void;
  showAssigneeFilter?: boolean; // manager only
}

const STATUSES: { value: TaskStatus; label: string }[] = [
  { value: "pending",     label: "Pending" },
  { value: "in_progress", label: "In Progress" },
  { value: "in_review",   label: "In Review" },
  { value: "completed",   label: "Completed" },
  { value: "cancelled",   label: "Cancelled" },
  { value: "queued",      label: "Queued" },
];

const PRIORITIES: { value: TaskPriority; label: string }[] = [
  { value: "low",      label: "Low" },
 
  { value: "high",     label: "High" },
  { value: "critical", label: "Critical" },
];

export function TaskFiltersBar({ filters, onChange, showAssigneeFilter = false }: Props) {
  const { data: categories = [] } = useTaskCategories();

  const set = (patch: Partial<TaskFilters>) => onChange({ ...filters, ...patch });
  const clear = () => onChange({});

  const hasActive =
    !!filters.status || !!filters.priority || !!filters.search || !!filters.category;

  return (
    <div className="flex flex-wrap items-center gap-2 px-4 py-3 border-b border-border bg-background">
      {/* Search */}
      <div className="relative flex-1 min-w-[180px]">
        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search tasks..."
          value={filters.search ?? ""}
          onChange={(e) => set({ search: e.target.value || undefined })}
          className="w-full pl-8 pr-3 py-1.5 text-sm bg-muted rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      {/* Status */}
      <select
        value={filters.status ?? ""}
        onChange={(e) => set({ status: (e.target.value as TaskStatus) || undefined })}
        className="text-sm bg-muted rounded-lg px-2.5 py-1.5 border-0 focus:outline-none focus:ring-2 focus:ring-ring text-muted-foreground"
      >
        <option value="">All statuses</option>
        {STATUSES.map((s) => (
          <option key={s.value} value={s.value}>{s.label}</option>
        ))}
      </select>

      {/* Priority */}
      <select
        value={filters.priority ?? ""}
        onChange={(e) => set({ priority: (e.target.value as TaskPriority) || undefined })}
        className="text-sm bg-muted rounded-lg px-2.5 py-1.5 border-0 focus:outline-none focus:ring-2 focus:ring-ring text-muted-foreground"
      >
        <option value="">All priorities</option>
        {PRIORITIES.map((p) => (
          <option key={p.value} value={p.value}>{p.label}</option>
        ))}
      </select>

      {/* Category */}
      {categories.length > 0 && (
        <select
          value={filters.category ?? ""}
          onChange={(e) => set({ category: Number(e.target.value) || undefined })}
          className="text-sm bg-muted rounded-lg px-2.5 py-1.5 border-0 focus:outline-none focus:ring-2 focus:ring-ring text-muted-foreground"
        >
          <option value="">All categories</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
      )}

      {/* Clear */}
      {hasActive && (
        <button
          onClick={clear}
          className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="w-3.5 h-3.5" />
          Clear
        </button>
      )}
    </div>
  );
}