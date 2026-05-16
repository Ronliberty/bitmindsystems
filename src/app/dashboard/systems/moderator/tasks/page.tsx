// "use client";

// import { useState } from "react";
// import { CheckCircle2, Clock, AlertCircle } from "lucide-react";

// interface Task {
//   id: number;
//   title: string;
//   project: string;
//   priority: "low" | "medium" | "high";
//   status: "pending" | "in_progress" | "completed";
//   due_date: string;
// }

// const sampleTasks: Task[] = [
//   {
//     id: 1,
//     title: "Review user submissions",
//     project: "Content Moderation",
//     priority: "high",
//     status: "pending",
//     due_date: "2026-04-20",
//   },
//   {
//     id: 2,
//     title: "Approve flagged posts",
//     project: "Community Safety",
//     priority: "medium",
//     status: "in_progress",
//     due_date: "2026-04-19",
//   },
//   {
//     id: 3,
//     title: "Audit AI-generated content",
//     project: "AI Review",
//     priority: "low",
//     status: "completed",
//     due_date: "2026-04-18",
//   },
// ];

// export default function TasksPage() {
//   const [tasks] = useState(sampleTasks);
//   const [filter, setFilter] = useState<"all" | "pending" | "in_progress" | "completed">("all");

//   const filteredTasks = tasks.filter((t) => {
//     if (filter === "all") return true;
//     return t.status === filter;
//   });

//   const getStatusIcon = (status: Task["status"]) => {
//     if (status === "completed") return <CheckCircle2 className="w-4 h-4 text-emerald-500" />;
//     if (status === "in_progress") return <Clock className="w-4 h-4 text-blue-500" />;
//     return <AlertCircle className="w-4 h-4 text-yellow-500" />;
//   };

//   const getPriorityColor = (priority: Task["priority"]) => {
//     if (priority === "high") return "text-red-500";
//     if (priority === "medium") return "text-yellow-500";
//     return "text-muted-foreground";
//   };

//   return (
//     <div className="w-full max-w-[1200px] mx-auto space-y-6">
      
//       {/* Header */}
//       <div>
//         <h1 className="text-2xl font-semibold">My Tasks</h1>
//         <p className="text-sm text-muted-foreground">
//           Manage and complete your assigned tasks
//         </p>
//       </div>

//       {/* Stats */}
//       <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//         <div className="bg-card border border-border rounded-2xl p-5">
//           <p className="text-sm text-muted-foreground">Pending</p>
//           <p className="text-2xl font-semibold">
//             {tasks.filter((t) => t.status === "pending").length}
//           </p>
//         </div>

//         <div className="bg-card border border-border rounded-2xl p-5">
//           <p className="text-sm text-muted-foreground">In Progress</p>
//           <p className="text-2xl font-semibold">
//             {tasks.filter((t) => t.status === "in_progress").length}
//           </p>
//         </div>

//         <div className="bg-card border border-border rounded-2xl p-5">
//           <p className="text-sm text-muted-foreground">Completed</p>
//           <p className="text-2xl font-semibold">
//             {tasks.filter((t) => t.status === "completed").length}
//           </p>
//         </div>
//       </div>

//       {/* Filters */}
//       <div className="flex gap-2 bg-card border border-border rounded-xl p-1 w-fit">
//         {["all", "pending", "in_progress", "completed"].map((f) => (
//           <button
//             key={f}
//             onClick={() => setFilter(f as any)}
//             className={`px-4 py-1.5 text-sm rounded-lg capitalize ${
//               filter === f
//                 ? "bg-primary text-primary-foreground"
//                 : "hover:bg-muted"
//             }`}
//           >
//             {f.replace("_", " ")}
//           </button>
//         ))}
//       </div>

//       {/* Task List */}
//       <div className="bg-card border border-border rounded-2xl divide-y">
//         {filteredTasks.map((task) => (
//           <div
//             key={task.id}
//             className="p-5 flex items-center justify-between hover:bg-muted/50 transition cursor-pointer"
//           >
            
//             {/* Left */}
//             <div className="flex items-start gap-4">
//               {getStatusIcon(task.status)}

//               <div>
//                 <p className="font-medium">{task.title}</p>
//                 <p className="text-xs text-muted-foreground">
//                   {task.project}
//                 </p>
//               </div>
//             </div>

//             {/* Right */}
//             <div className="flex items-center gap-6 text-sm">
              
//               <span className={`capitalize font-medium ${getPriorityColor(task.priority)}`}>
//                 {task.priority}
//               </span>

//               <span className="text-muted-foreground">
//                 {task.due_date}
//               </span>
//             </div>
//           </div>
//         ))}

//         {filteredTasks.length === 0 && (
//           <div className="p-10 text-center text-muted-foreground">
//             No tasks found.
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }


"use client";

import { useState } from "react";
import { Task, TaskFilters } from "@/types/task/types";
import { useTasks } from "@/hooks/task/hooks";
import { TaskFiltersBar } from "@/components/tasks/TaskFiltersBar";
import { TaskListRow } from "@/components/tasks/TaskListRow";
import { TaskDetailPanel } from "@/components/tasks/TaskDetailPanel";
import { ModeratorTaskActions } from "@/components/tasks/moderator/ModeratorTaskActions";
import { Loader2 } from "lucide-react";
import { cn } from "@/app/lib/utils"; 

export default function ModeratorTasksPage() {
  const [filters, setFilters] = useState<TaskFilters>({});
  const [selected, setSelected] = useState<Task | null>(null);
  const [panelOpen, setPanelOpen] = useState(false);

  // Moderators only see tasks assigned to them
  // Pass assigned_to from auth context — replace `ME_ID` with useCurrentUser().id
  const { data, isLoading, isError } = useTasks(filters);

  const tasks = data?.results ?? [];

  const select = (task: Task) => {
    setSelected(task);
    setPanelOpen(true);
  };

  return (
    <div className="flex h-[calc(100vh-4rem)] overflow-hidden">

      {/* Left: list */}
      <div
        className={cn(
          "flex flex-col border-r border-border bg-background transition-all duration-300",
          panelOpen ? "w-full md:w-[420px] lg:w-[480px] hidden md:flex" : "w-full flex"
        )}
      >
        {/* Toolbar */}
        <div className="px-4 py-3 border-b border-border">
          <h1 className="text-base font-semibold">My Tasks</h1>
          <p className="text-xs text-muted-foreground">
            {data?.count ?? 0} assigned to you
          </p>
        </div>

        {/* Filters — no assignee filter for moderators */}
        <TaskFiltersBar filters={filters} onChange={setFilters} />

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
              No tasks assigned to you.
            </p>
          ) : (
            tasks.map((task) => (
              <TaskListRow
                key={task.id}
                task={task}
                selected={selected?.id === task.id}
                onClick={() => select(task)}
                showAssignee={false} // moderator doesn't need to see "assigned to"
              />
            ))
          )}
        </div>
      </div>

      {/* Right: detail panel */}
      {panelOpen && selected && (
        <div className="flex-1 flex flex-col overflow-hidden">
          <TaskDetailPanel
            task={selected}
            onClose={() => { setPanelOpen(false); setSelected(null); }}
            actions={<ModeratorTaskActions task={selected} />}
          />
        </div>
      )}

      {!panelOpen && (
        <div className="hidden md:flex flex-1 items-center justify-center text-muted-foreground text-sm">
          Select a task to see details
        </div>
      )}
    </div>
  );
}