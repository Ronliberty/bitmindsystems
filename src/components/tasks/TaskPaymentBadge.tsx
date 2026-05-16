import { TaskPaymentStatus } from "@/types/task/types";
import { cn } from "@/app/lib/utils"; 

const config: Record<TaskPaymentStatus, { label: string; classes: string }> = {
  unpaid:     { label: "Unpaid",     classes: "bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400" },
  pending:    { label: "Pending",    classes: "bg-amber-50 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400" },
  processing: { label: "Processing", classes: "bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400" },
  paid:       { label: "Paid",       classes: "bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400" },
  partial:    { label: "Partial",    classes: "bg-orange-50 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400" },
};

export function TaskPaymentBadge({ status }: { status: TaskPaymentStatus }) {
  const { label, classes } = config[status] ?? config.unpaid;
  return (
    <span className={cn("inline-flex items-center px-2 py-0.5 rounded text-xs font-medium", classes)}>
      {label}
    </span>
  );
}