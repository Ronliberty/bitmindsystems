"use client";

import { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { useCreateTask, useTaskCategories } from "@/hooks/task/hooks";
import { useProjects } from "@/hooks/useProjects"; 
import {
  CreateTaskPayload, TaskPriority, TaskStatus,
  TaskAssignmentMode,
  TaskCategory,
} from "@/types/task/types";
import { ChevronRight, ChevronLeft, Loader2, Check } from "lucide-react";
import { cn } from "@/app/lib/utils"; 

interface Props {
  open: boolean;
  onClose: () => void;
}

// ── Step types ───────────────────────────────────────────────────────────────

interface StepOneData {
  title: string;
  description: string;
  project: number | null;
  category: number | null;
}

interface StepTwoData {
  priority: TaskPriority;
  status: TaskStatus;
  deadline: string;
  due_date: string;
}

interface StepThreeData {
  assignment_mode: TaskAssignmentMode;
  estimated_hours: string;
}

const STEP_LABELS = ["Basic Info", "Schedule", "Assignment"];
const PRIORITIES: TaskPriority[] = ["low", "high", "critical"];
const STATUSES: TaskStatus[] = ["pending", "in_progress"];
const ASSIGN_MODES: TaskAssignmentMode[] = ["manual", "auto", "suggested", "queued"];

// ── Field wrappers ────────────────────────────────────────────────────────────

function Field({ label, required, children }: {
  label: string; required?: boolean; children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-medium text-muted-foreground">
        {label}{required && <span className="text-red-400 ml-0.5">*</span>}
      </label>
      {children}
    </div>
  );
}

const inputCls =
  "w-full text-sm bg-muted rounded-lg px-3 py-2 border-0 focus:outline-none focus:ring-2 focus:ring-ring";

// ── Pill selector ─────────────────────────────────────────────────────────────

function PillSelect<T extends string>({
  options, value, onChange, className,
}: {
  options: T[];
  value: T;
  onChange: (v: T) => void;
  className?: string;
}) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {options.map((opt) => (
        <button
          key={opt}
          type="button"
          onClick={() => onChange(opt)}
          className={cn(
            "px-3 py-1 rounded-full text-xs font-medium border transition capitalize",
            value === opt
              ? "bg-primary text-primary-foreground border-primary"
              : "bg-muted border-transparent text-muted-foreground hover:border-border",
            className
          )}
        >
          {opt.replace(/_/g, " ")}
        </button>
      ))}
    </div>
  );
}

// ── Step indicator ────────────────────────────────────────────────────────────

function StepIndicator({ current }: { current: number }) {
  return (
    <div className="flex items-center gap-2 px-5 py-3 border-b border-border">
      {STEP_LABELS.map((label, i) => (
        <div key={label} className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <div className={cn(
              "w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold transition-colors",
              i < current
                ? "bg-primary text-primary-foreground"
                : i === current
                ? "bg-primary/20 text-primary ring-2 ring-primary"
                : "bg-muted text-muted-foreground"
            )}>
              {i < current ? <Check className="w-3 h-3" /> : i + 1}
            </div>
            <span className={cn(
              "text-xs font-medium hidden sm:block",
              i === current ? "text-foreground" : "text-muted-foreground"
            )}>
              {label}
            </span>
          </div>
          {i < STEP_LABELS.length - 1 && (
            <div className={cn(
              "h-px w-6 sm:w-10 transition-colors",
              i < current ? "bg-primary" : "bg-border"
            )} />
          )}
        </div>
      ))}
    </div>
  );
}

// ── Main modal ────────────────────────────────────────────────────────────────

export function CreateTaskModal({ open, onClose }: Props) {
  const [step, setStep] = useState(0);

  const [one, setOne] = useState<StepOneData>({
    title: "", description: "", project: null, category: null,
  });
  const [two, setTwo] = useState<StepTwoData>({
    priority: "low", status: "pending", deadline: "", due_date: "",
  });
  const [three, setThree] = useState<StepThreeData>({
    assignment_mode: "manual", estimated_hours: "",
  });

  const { data: projectsData } = useProjects();
  const { data: categoriesData } = useTaskCategories();
const categories = Array.isArray(categoriesData)
  ? categoriesData
  : ((categoriesData as unknown) as { results: TaskCategory[] })?.results ?? [];
  const { mutate: create, isPending, isError } = useCreateTask();

  const projects = Array.isArray(projectsData)
    ? projectsData
    : ((projectsData as unknown) as { results: typeof projectsData[] })?.results ?? [];

  const reset = () => {
    setStep(0);
    setOne({ title: "", description: "", project: null, category: null });
    setTwo({ priority: "low", status: "pending", deadline: "", due_date: "" });
    setThree({ assignment_mode: "manual", estimated_hours: "" });
  };

  const handleClose = () => { reset(); onClose(); };

  const canNext = step === 0 ? !!one.title.trim() : true;

  const handleSubmit = () => {
    const payload: CreateTaskPayload = {
      title: one.title.trim(),
      description: one.description.trim() || undefined,
      project: one.project,
      category: one.category,
      priority: two.priority,
      status: two.status,
      deadline: two.deadline || undefined,
      due_date: two.due_date || undefined,
      assignment_mode: three.assignment_mode,
      estimated_hours: three.estimated_hours || undefined,
    };
    create(payload, { onSuccess: handleClose });
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      title="Create Task"
      description="Fill in the details to add a new task."
      size="md"
    >
      <StepIndicator current={step} />

      <div className="p-5">
        {/* ── Step 0: Basic Info ─────────────────────────────────────────── */}
        {step === 0 && (
          <div className="space-y-4">
            <Field label="Title" required>
              <input
                type="text"
                value={one.title}
                onChange={(e) => setOne({ ...one, title: e.target.value })}
                placeholder="e.g. Review uploaded video content"
                className={inputCls}
                autoFocus
              />
            </Field>

            <Field label="Description">
              <textarea
                rows={3}
                value={one.description}
                onChange={(e) => setOne({ ...one, description: e.target.value })}
                placeholder="Provide context, goals, or instructions..."
                className={cn(inputCls, "resize-none")}
              />
            </Field>

            <Field label="Project">
              <select
                value={one.project ?? ""}
                onChange={(e) => setOne({ ...one, project: Number(e.target.value) || null })}
                className={inputCls}
              >
                <option value="">No project</option>
                {(projects as any[]).map((p: any) => (
                  <option key={p.id} value={p.id}>{p.title}</option>
                ))}
              </select>
            </Field>

            <Field label="Category">
              <select
                value={one.category ?? ""}
                onChange={(e) => setOne({ ...one, category: Number(e.target.value) || null })}
                className={inputCls}
              >
                <option value="">No category</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </Field>
          </div>
        )}

        {/* ── Step 1: Schedule & Priority ────────────────────────────────── */}
        {step === 1 && (
          <div className="space-y-4">
            <Field label="Priority">
              <PillSelect
                options={PRIORITIES}
                value={two.priority}
                onChange={(v) => setTwo({ ...two, priority: v })}
              />
            </Field>

            <Field label="Initial Status">
              <PillSelect
                options={STATUSES}
                value={two.status}
                onChange={(v) => setTwo({ ...two, status: v })}
              />
            </Field>

            <div className="grid grid-cols-2 gap-3">
              <Field label="Due Date">
                <input
                  type="date"
                  value={two.due_date}
                  onChange={(e) => setTwo({ ...two, due_date: e.target.value })}
                  className={inputCls}
                />
              </Field>
              <Field label="Deadline">
                <input
                  type="date"
                  value={two.deadline}
                  onChange={(e) => setTwo({ ...two, deadline: e.target.value })}
                  className={inputCls}
                />
              </Field>
            </div>
          </div>
        )}

        {/* ── Step 2: Assignment ─────────────────────────────────────────── */}
        {step === 2 && (
          <div className="space-y-4">
            <Field label="Assignment Mode">
              <PillSelect
                options={ASSIGN_MODES}
                value={three.assignment_mode}
                onChange={(v) => setThree({ ...three, assignment_mode: v })}
              />
              <p className="text-xs text-muted-foreground mt-2">
                {three.assignment_mode === "auto" &&
                  "The system will pick the best available team member."}
                {three.assignment_mode === "manual" &&
                  "You'll assign this task from the task detail view."}
                {three.assignment_mode === "suggested" &&
                  "The system will suggest candidates for you to confirm."}
                {three.assignment_mode === "queued" &&
                  "Task will sit in the queue until manually assigned."}
              </p>
            </Field>

            <Field label="Estimated Hours">
              <input
                type="number"
                min={0}
                step={0.5}
                value={three.estimated_hours}
                onChange={(e) => setThree({ ...three, estimated_hours: e.target.value })}
                placeholder="e.g. 4.5"
                className={inputCls}
              />
            </Field>

            {isError && (
              <p className="text-xs text-red-500">
                Failed to create task. Please check your inputs and try again.
              </p>
            )}
          </div>
        )}
      </div>

      {/* Footer nav */}
      <div className="flex items-center justify-between px-5 py-4 border-t border-border">
        <button
          onClick={() => step === 0 ? handleClose() : setStep(step - 1)}
          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition"
        >
          <ChevronLeft className="w-4 h-4" />
          {step === 0 ? "Cancel" : "Back"}
        </button>

        {step < 2 ? (
          <button
            onClick={() => setStep(step + 1)}
            disabled={!canNext}
            className="flex items-center gap-1.5 bg-primary text-primary-foreground text-sm font-medium px-4 py-2 rounded-lg hover:bg-primary/90 disabled:opacity-50 transition"
          >
            Next
            <ChevronRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={isPending}
            className="flex items-center gap-1.5 bg-primary text-primary-foreground text-sm font-medium px-4 py-2 rounded-lg hover:bg-primary/90 disabled:opacity-50 transition"
          >
            {isPending && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
            Create Task
          </button>
        )}
      </div>
    </Modal>
  );
}