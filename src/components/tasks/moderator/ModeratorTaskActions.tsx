"use client";

import { useState } from "react";
import { Task } from "@/types/task/types";
import { useUpdateTask } from "@/hooks/task/hooks";
import { Loader2, Save } from "lucide-react";

interface Props { task: Task }

export function ModeratorTaskActions({ task }: Props) {
  const [progress, setProgress] = useState(task.progress_percentage);
  const [notes, setNotes] = useState(task.revision_notes ?? "");
  const { mutate: update, isPending } = useUpdateTask();

  const isDirty =
    progress !== task.progress_percentage || notes !== (task.revision_notes ?? "");

  const save = () =>
    update({
      id: task.id,
      data: { progress_percentage: progress, revision_notes: notes },
    });

  return (
    <div className="space-y-3">
      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
        Update Task
      </p>

      {/* Progress slider */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <label className="text-xs text-muted-foreground">Progress</label>
          <span className="text-xs font-medium tabular-nums">{progress}%</span>
        </div>
        <input
          type="range"
          min={0}
          max={100}
          value={progress}
          onChange={(e) => setProgress(Number(e.target.value))}
          className="w-full accent-primary"
        />
      </div>

      {/* Status quick-set — moderator only changes to in_review or in_progress */}
      <div className="space-y-1.5">
        <label className="text-xs text-muted-foreground">Mark as</label>
        <div className="flex gap-2">
          {(["in_progress", "in_review", "completed"] as const).map((s) => (
            <button
              key={s}
              onClick={() => update({ id: task.id, data: { status: s } })}
              disabled={isPending || task.status === s}
              className="flex-1 text-xs py-1.5 rounded-md bg-muted hover:bg-muted/70 disabled:opacity-40 disabled:cursor-not-allowed transition capitalize"
            >
              {s.replace("_", " ")}
            </button>
          ))}
        </div>
      </div>

      {/* Revision notes */}
      <div className="space-y-1.5">
        <label className="text-xs text-muted-foreground">Revision Notes</label>
        <textarea
          rows={3}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Add revision notes..."
          className="w-full text-sm bg-muted rounded-lg px-2.5 py-2 border-0 focus:outline-none focus:ring-2 focus:ring-ring resize-none"
        />
      </div>

      <button
        onClick={save}
        disabled={!isDirty || isPending}
        className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground rounded-lg px-3 py-2 text-sm font-medium hover:bg-primary/90 disabled:opacity-50 transition"
      >
        {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
        Save Changes
      </button>
    </div>
  );
}