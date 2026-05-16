import { TaskStatus } from "@/types/task/types";
import { cn } from "@/app/lib/utils"; 

const config: Record<TaskStatus, { label: string; classes: string }> = {
  pending:     { label: "Pending",     classes: "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400" },
  in_progress: { label: "In Progress", classes: "bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400" },
  in_review:   { label: "In Review",   classes: "bg-amber-50 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400" },
  completed:   { label: "Completed",   classes: "bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400" },
  cancelled:   { label: "Cancelled",   classes: "bg-red-50 text-red-500 dark:bg-red-900/30 dark:text-red-400" },
  queued:      { label: "Queued",      classes: "bg-purple-50 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400" },
};

export function TaskStatusBadge({ status }: { status: TaskStatus }) {
  const { label, classes } = config[status] ?? config.pending;
  return (
    <span className={cn("inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium", classes)}>
      {label}
    </span>
  );
}