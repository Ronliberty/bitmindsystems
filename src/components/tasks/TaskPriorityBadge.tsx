import { TaskPriority } from "@/types/task/types";
import { cn } from "@/app/lib/utils"; 

const config: Record<TaskPriority, { label: string; dot: string }> = {
  low:      { label: "Low",      dot: "bg-zinc-400" },
  medium:   { label: "Medium",   dot: "bg-amber-400" },
  high:     { label: "High",     dot: "bg-orange-500" },
  critical: { label: "Critical", dot: "bg-red-500" },
};

export function TaskPriorityBadge({ priority }: { priority: TaskPriority }) {
  const { label, dot } = config[priority] ?? config.low;
  return (
    <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
      <span className={cn("w-1.5 h-1.5 rounded-full", dot)} />
      {label}
    </span>
  );
}