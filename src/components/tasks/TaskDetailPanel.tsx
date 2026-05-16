"use client";

import { Task } from "@/types/task/types";
import { TaskStatusBadge } from "./TaskStatusBadge";
import { TaskPriorityBadge } from "./TaskPriorityBadge";
import { TaskPaymentBadge } from "./TaskPaymentBadge";
import { TaskProgressBar } from "./TaskProgressBar";
import {
  X, Clock, CalendarDays, Star, RefreshCw,
  User, Briefcase, Tag, Zap,
} from "lucide-react";
import { format, parseISO } from "date-fns";

interface Props {
  task: Task;
  onClose: () => void;
  /** Slot for role-specific action buttons rendered at the bottom */
  actions?: React.ReactNode;
}

function Row({ icon, label, value }: { icon: React.ReactNode; label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-start gap-3 py-2.5 border-b border-border last:border-0">
      <span className="text-muted-foreground mt-0.5 shrink-0">{icon}</span>
      <div className="flex-1 min-w-0">
        <p className="text-xs text-muted-foreground mb-0.5">{label}</p>
        <div className="text-sm">{value}</div>
      </div>
    </div>
  );
}

export function TaskDetailPanel({ task, onClose, actions }: Props) {
  const fmt = (d: string | null) =>
    d ? format(parseISO(d), "MMM d, yyyy") : "—";

  return (
    <div className="flex flex-col h-full bg-background border-l border-border">
      {/* Header */}
      <div className="flex items-start gap-3 p-4 border-b border-border">
        <div className="flex-1 min-w-0">
          <h2 className="font-semibold text-base leading-snug">{task.title}</h2>
          {task.project_title && (
            <p className="text-xs text-muted-foreground mt-0.5">{task.project_title}</p>
          )}
        </div>
        <button
          onClick={onClose}
          className="text-muted-foreground hover:text-foreground transition-colors shrink-0 mt-0.5"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Scrollable body */}
      <div className="flex-1 overflow-y-auto p-4 space-y-1">

        {/* Status + Priority */}
        <div className="flex items-center gap-2 pb-3 border-b border-border">
          <TaskStatusBadge status={task.status} />
          <TaskPriorityBadge priority={task.priority} />
          <TaskPaymentBadge status={task.payment_status} />
        </div>

        {/* Progress */}
        <div className="py-3 border-b border-border">
          <p className="text-xs text-muted-foreground mb-2">Progress</p>
          <TaskProgressBar value={task.progress_percentage} />
        </div>

        {/* Description */}
        {task.description && (
          <div className="py-3 border-b border-border">
            <p className="text-xs text-muted-foreground mb-1">Description</p>
            <p className="text-sm leading-relaxed text-foreground/80">{task.description}</p>
          </div>
        )}

        {/* Details grid */}
        <div className="pt-1">
          <Row
            icon={<User className="w-3.5 h-3.5" />}
            label="Assigned To"
            value={task.assigned_to_name ?? "Unassigned"}
          />
          <Row
            icon={<User className="w-3.5 h-3.5" />}
            label="Assigned By"
            value={task.assigned_by_name ?? "—"}
          />
          <Row
            icon={<Briefcase className="w-3.5 h-3.5" />}
            label="Category"
            value={task.category_name ?? "—"}
          />
          <Row
            icon={<CalendarDays className="w-3.5 h-3.5" />}
            label="Deadline"
            value={fmt(task.deadline)}
          />
          <Row
            icon={<CalendarDays className="w-3.5 h-3.5" />}
            label="Due Date"
            value={fmt(task.due_date)}
          />
          <Row
            icon={<Clock className="w-3.5 h-3.5" />}
            label="Hours"
            value={
              <span>
                <span className="font-medium">{task.actual_hours}h</span>
                <span className="text-muted-foreground"> / {task.estimated_hours}h est.</span>
              </span>
            }
          />
          <Row
            icon={<Star className="w-3.5 h-3.5" />}
            label="Quality Rating"
            value={
              <span>
                {task.quality_rating > 0
                  ? `${task.quality_rating} / 10`
                  : "Not rated"}
              </span>
            }
          />
          <Row
            icon={<RefreshCw className="w-3.5 h-3.5" />}
            label="Revisions"
            value={
              <div>
                <span>{task.revision_count} revision{task.revision_count !== 1 ? "s" : ""}</span>
                {task.revision_notes && (
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                    {task.revision_notes}
                  </p>
                )}
              </div>
            }
          />
          <Row
            icon={<Tag className="w-3.5 h-3.5" />}
            label="Assignment Mode"
            value={
              <span className="capitalize">{task.assignment_mode}</span>
            }
          />
          {task.assignment_confidence !== null && (
            <Row
              icon={<Zap className="w-3.5 h-3.5" />}
              label="Assignment Confidence"
              value={`${Math.round((task.assignment_confidence ?? 0) * 100)}%`}
            />
          )}
        </div>
      </div>

      {/* Actions slot */}
      {actions && (
        <div className="p-4 border-t border-border space-y-2">
          {actions}
        </div>
      )}
    </div>
  );
}