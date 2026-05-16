"use client";

import { useState } from "react";
import { Task, TaskCandidate } from "@/types/task/types";
import { useAssignTask, useUnassignTask, useTaskCandidates } from "@/hooks/task/hooks";
import { Loader2, Zap, Users, UserMinus, UserCheck } from "lucide-react";
import { cn } from "@/app/lib/utils"; 

interface Props {
  task: Task;
}

export function AssignmentControls({ task }: Props) {
  const [showCandidates, setShowCandidates] = useState(false);

  const { data: candidates = [], isFetching: loadingCandidates } =
    useTaskCandidates(task.id, showCandidates);

  const { mutate: assign, isPending: assigning } = useAssignTask();
  const { mutate: unassign, isPending: unassigning } = useUnassignTask();

  const handleAuto = () =>
    assign({ id: task.id, payload: { mode: "auto" } });

  const handleConfirm = (candidate: TaskCandidate) =>
    assign({
      id: task.id,
      payload: { mode: "confirm_suggested", employee_id: candidate.employee_id },
    });

  const handleUnassign = () => unassign(task.id);

  const busy = assigning || unassigning;

  return (
    <div className="space-y-3">
      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
        Assignment
      </p>

      {/* Auto-assign */}
      <button
        onClick={handleAuto}
        disabled={busy}
        className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground rounded-lg px-3 py-2 text-sm font-medium hover:bg-primary/90 disabled:opacity-50 transition"
      >
        {assigning ? <Loader2 className="w-4 h-4 animate-spin" /> : <Zap className="w-4 h-4" />}
        Auto-assign
      </button>

      {/* Suggest / pick */}
      <button
        onClick={() => setShowCandidates((v) => !v)}
        disabled={busy}
        className="w-full flex items-center justify-center gap-2 bg-muted text-foreground rounded-lg px-3 py-2 text-sm font-medium hover:bg-muted/70 disabled:opacity-50 transition"
      >
        <Users className="w-4 h-4" />
        {showCandidates ? "Hide candidates" : "Pick manually"}
      </button>

      {/* Candidate list */}
      {showCandidates && (
        <div className="rounded-lg border border-border overflow-hidden">
          {loadingCandidates ? (
            <div className="flex items-center justify-center py-6">
              <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
            </div>
          ) : candidates.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-6">
              No qualified candidates found.
            </p>
          ) : (
            <ul className="divide-y divide-border">
              {candidates.map((c) => (
                <li key={c.employee_id} className="flex items-center gap-3 px-3 py-2.5">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{c.name}</p>
                    <p className="text-xs text-muted-foreground">
                      Score: {c.score} · {c.active_tasks ?? 0} active tasks
                    </p>
                  </div>
                  <button
                    onClick={() => handleConfirm(c)}
                    disabled={busy}
                    className="shrink-0 flex items-center gap-1 text-xs bg-primary/10 text-primary hover:bg-primary/20 px-2.5 py-1 rounded-md transition disabled:opacity-50"
                  >
                    <UserCheck className="w-3.5 h-3.5" />
                    Assign
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {/* Unassign */}
      {task.assigned_to && (
        <button
          onClick={handleUnassign}
          disabled={busy}
          className="w-full flex items-center justify-center gap-2 text-red-500 bg-red-50 dark:bg-red-950/30 rounded-lg px-3 py-2 text-sm font-medium hover:bg-red-100 dark:hover:bg-red-950/50 disabled:opacity-50 transition"
        >
          {unassigning ? <Loader2 className="w-4 h-4 animate-spin" /> : <UserMinus className="w-4 h-4" />}
          Unassign
        </button>
      )}
    </div>
  );
}