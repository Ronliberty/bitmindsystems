"use client";

import { Task, TaskStatus, TaskPaymentStatus } from "@/types/task/types";
import { useUpdateTask } from "@/hooks/task/hooks";
import { Loader2 } from "lucide-react";

const STATUSES: TaskStatus[] = ["pending", "in_progress", "in_review", "completed", "cancelled", "queued"];
const PAYMENTS: TaskPaymentStatus[] = ["unpaid", "pending", "processing", "paid", "partial"];

interface Props { task: Task }

export function TaskStatusControl({ task }: Props) {
  const { mutate: update, isPending } = useUpdateTask();

  const setStatus = (status: TaskStatus) =>
    update({ id: task.id, data: { status } });

  const setPayment = (payment_status: TaskPaymentStatus) =>
    update({ id: task.id, data: { payment_status } });

  return (
    <div className="space-y-3">
      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
        Controls
      </p>

      <div className="space-y-1.5">
        <label className="text-xs text-muted-foreground">Status</label>
        <select
          value={task.status}
          onChange={(e) => setStatus(e.target.value as TaskStatus)}
          disabled={isPending}
          className="w-full text-sm bg-muted rounded-lg px-2.5 py-2 border-0 focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50"
        >
          {STATUSES.map((s) => (
            <option key={s} value={s}>{s.replace("_", " ")}</option>
          ))}
        </select>
      </div>

      <div className="space-y-1.5">
        <label className="text-xs text-muted-foreground">Payment</label>
        <select
          value={task.payment_status}
          onChange={(e) => setPayment(e.target.value as TaskPaymentStatus)}
          disabled={isPending}
          className="w-full text-sm bg-muted rounded-lg px-2.5 py-2 border-0 focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50"
        >
          {PAYMENTS.map((p) => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>
      </div>

      {isPending && (
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Loader2 className="w-3 h-3 animate-spin" />
          Saving...
        </div>
      )}
    </div>
  );
}