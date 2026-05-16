"use client";

import { useState } from "react";
import { Task, TaskFilters } from "@/types/task/types";
import { useTasks, useDeleteTask } from "@/hooks/task/hooks";
import { TaskFiltersBar } from "@/components/tasks/TaskFiltersBar";
import { TaskListRow } from "@/components/tasks/TaskListRow";
import { TaskDetailPanel } from "@/components/tasks/TaskDetailPanel";
import { AssignmentControls } from "@/components/tasks/manager/AssignmentControls";
import { TaskStatusControl } from "@/components/tasks/manager/TaskStatusControl";
import { CreateTaskModal } from "@/components/tasks/modals/CreateTaskModal";
import { CreateCategoryModal } from "@/components/tasks/modals/CreateCategoryModal";
import {
  Loader2, Plus, Trash2,
  PanelRightClose, PanelRightOpen, ChevronDown,
} from "lucide-react";
import { cn } from "@/app/lib/utils";

type ActiveModal = "task" | "category" | null;

export default function ManagerTasksPage() {
  const [filters, setFilters]           = useState<TaskFilters>({});
  const [selected, setSelected]         = useState<Task | null>(null);
  const [panelOpen, setPanelOpen]       = useState(false);
  const [activeModal, setActiveModal]   = useState<ActiveModal>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const { data, isLoading, isError }              = useTasks(filters);
  const { mutate: deleteTask, isPending: deleting } = useDeleteTask();

  const tasks = data?.results ?? [];

  // Ensures the previous modal fully unmounts before the next one mounts,
  // preventing stale state (form fields, step index) from bleeding across.
  const openModal = (m: ActiveModal) => {
    setActiveModal(null);
    setDropdownOpen(false);
    setTimeout(() => setActiveModal(m), 50);
  };

  const closeModal = () => setActiveModal(null);

  const select = (task: Task) => { setSelected(task); setPanelOpen(true); };

  const handleDelete = () => {
    if (!selected) return;
    deleteTask(selected.id, {
      onSuccess: () => { setSelected(null); setPanelOpen(false); },
    });
  };

  return (
    <>
      {/* Only one modal mounts at a time — clean state guaranteed */}
      {activeModal === "task" && (
        <CreateTaskModal open onClose={closeModal} />
      )}
      {activeModal === "category" && (
        <CreateCategoryModal open onClose={closeModal} />
      )}

      <div className="flex h-[calc(100vh-4rem)] overflow-hidden">

        {/* ── Left: list ───────────────────────────────────────────────── */}
        <div className={cn(
          "flex flex-col border-r border-border bg-background transition-all duration-300",
          panelOpen ? "w-full md:w-[420px] lg:w-[480px] hidden md:flex" : "w-full flex"
        )}>

          {/* Toolbar */}
          {/* {/* Side-by-side create buttons */}
<div className="flex items-stretch gap-2">
  <button
    onClick={() => openModal("task")}
    className="flex items-center gap-1.5 bg-primary text-primary-foreground text-xs font-medium px-3 py-1.5 rounded-lg hover:bg-primary/90 transition"
  >
    <Plus className="w-3.5 h-3.5" />
    New Task
  </button>
  <button
    onClick={() => openModal("category")}
    className="flex items-center gap-1.5 bg-muted text-foreground text-xs font-medium px-3 py-1.5 rounded-lg hover:bg-muted/70 border border-border transition"
  >
    <Plus className="w-3.5 h-3.5" />
    New Category
  </button>
</div> 

          {/* Filters */}
          <TaskFiltersBar filters={filters} onChange={setFilters} showAssigneeFilter />

          {/* List */}
          <div className="flex-1 overflow-y-auto">
            {isLoading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
              </div>
            ) : isError ? (
              <p className="text-sm text-red-500 text-center py-10">
                Failed to load tasks.
              </p>
            ) : tasks.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-10">
                No tasks match your filters.
              </p>
            ) : (
              tasks.map((task) => (
                <TaskListRow
                  key={task.id}
                  task={task}
                  selected={selected?.id === task.id}
                  onClick={() => select(task)}
                  showAssignee
                />
              ))
            )}
          </div>
        </div>

        {/* ── Right: detail panel ───────────────────────────────────────── */}
        {panelOpen && selected && (
          <div className="flex-1 flex flex-col overflow-hidden">
            <TaskDetailPanel
              task={selected}
              onClose={() => { setPanelOpen(false); setSelected(null); }}
              actions={
                <>
                  <TaskStatusControl task={selected} />
                  <div className="pt-2 border-t border-border">
                    <AssignmentControls task={selected} />
                  </div>
                  <button
                    onClick={handleDelete}
                    disabled={deleting}
                    className="w-full flex items-center justify-center gap-2 text-red-500 text-sm py-2 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg transition mt-1"
                  >
                    {deleting
                      ? <Loader2 className="w-4 h-4 animate-spin" />
                      : <Trash2 className="w-4 h-4" />}
                    Delete Task
                  </button>
                </>
              }
            />
          </div>
        )}

        {!panelOpen && (
          <div className="hidden md:flex flex-1 items-center justify-center text-muted-foreground text-sm">
            Select a task to view details
          </div>
        )}
      </div>
    </>
  );
}