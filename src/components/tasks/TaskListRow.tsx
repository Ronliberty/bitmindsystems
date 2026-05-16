import { Task } from "@/types/task/types";
import { TaskStatusBadge } from "./TaskStatusBadge";
import { TaskPriorityBadge } from "./TaskPriorityBadge";
import { TaskPaymentBadge } from "./TaskPaymentBadge";
import { TaskProgressBar } from "./TaskProgressBar";
import { cn } from "@/app/lib/utils"; 
import { CalendarDays } from "lucide-react";
import { format, parseISO } from "date-fns";

interface Props {
  task: Task;
  selected?: boolean;
  onClick: () => void;
  showAssignee?: boolean; // manager shows it, moderator hides it
}

export function TaskListRow({ task, selected, onClick, showAssignee = true }: Props) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full text-left px-4 py-3.5 border-b border-border transition-colors",
        "hover:bg-muted/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        selected && "bg-muted"
      )}
    >
      {/* Row: title + badges */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium truncate">{task.title}</p>
          {task.project_title && (
            <p className="text-xs text-muted-foreground truncate mt-0.5">{task.project_title}</p>
          )}
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <TaskStatusBadge status={task.status} />
        </div>
      </div>

      {/* Row: meta */}
      <div className="flex items-center flex-wrap gap-x-3 gap-y-1 mt-2">
        <TaskPriorityBadge priority={task.priority} />
        <TaskPaymentBadge status={task.payment_status} />

        {showAssignee && task.assigned_to_name && (
          <span className="text-xs text-muted-foreground truncate max-w-[120px]">
            → {task.assigned_to_name}
          </span>
        )}

        {task.deadline && (
          <span className="inline-flex items-center gap-1 text-xs text-muted-foreground ml-auto">
            <CalendarDays className="w-3 h-3" />
            {format(parseISO(task.deadline), "MMM d")}
          </span>
        )}
      </div>

      {/* Progress */}
      <div className="mt-2.5">
        <TaskProgressBar value={task.progress_percentage} showLabel={false} size="sm" />
      </div>
    </button>
  );
}