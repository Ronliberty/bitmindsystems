// "use client";

// import { useEffect, useState } from "react";
// import { getTasks } from "@/app/lib/api"; 
// import { Task } from "@/app/lib/api";  
// import { motion } from "framer-motion";
// import { Loader2, ListChecks } from "lucide-react";
// import { useAuth } from "@/context/AuthContext";

// export default function EditorTasksPage() {
//   const { access, user } = useAuth();
//   const [tasks, setTasks] = useState<Task[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//   async function load() {
//     if (!access) {
//       setLoading(false);   // important
//       return;
//     }

//     try {
//       const data = await getTasks(access);
//       const filtered = data.filter((t: Task) => t.task_type === "editing");
//       setTasks(filtered);
//     } catch (e) {
//       console.error("Failed to load tasks:", e);
//     } finally {
//       setLoading(false);
//     }
//   }

//   load();
// }, [access]);


//   return (
//     <section>
//       {/* Header */}
//       <motion.div
//         initial={{ opacity: 0, y: -10 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.4 }}
//         className="mb-6"
//       >
//         <h2 className="text-2xl font-bold flex items-center gap-2">
//           <ListChecks className="w-6 h-6 text-primary" />
//           Editing Tasks
//         </h2>
//         <p className="text-muted-foreground mt-1">
//           Tasks assigned to you or available for editing.
//         </p>
//       </motion.div>

//       {/* Loading state */}
//       {loading && (
//         <div className="flex justify-center py-10">
//           <Loader2 className="animate-spin w-6 h-6 text-primary" />
//         </div>
//       )}

//       {/* No tasks */}
//       {!loading && tasks.length === 0 && (
//         <p className="text-muted-foreground text-center py-10">
//           No editing tasks available right now.
//         </p>
//       )}

//       {/* Task list */}
//       <div className="space-y-4">
//         {tasks.map((task) => (
//           <motion.div
//             key={task.id}
//             initial={{ opacity: 0, y: 10 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.3 }}
//             className="p-5 border border-border rounded-xl bg-card hover:shadow-md transition-all"
//           >
//             <h3 className="text-lg font-semibold">{task.title}</h3>

            

//             <div className="grid grid-cols-2 gap-4 text-sm">
//               <div>
//                 <span className="font-medium">Status:</span> {task.status}
//               </div>
//               <div>
//                 <span className="font-medium">Progress:</span> {task.progress_percentage}%
//               </div>
//               <div>
//                 <span className="font-medium">Deadline:</span> {task.due_date || "N/A"}
//               </div>
//               <div>
//                 <span className="font-medium">Reward:</span> ${task.reward_amount}
//               </div>
//             </div>

//             {/* Raw footage + details */}
//             {task.task_details?.raw_footage_url && (
//               <div className="mt-4">
//                 <p className="font-medium">Raw Footage:</p>
//                 <a
//                   href={task.task_details.raw_footage_url}
//                   target="_blank"
//                   className="text-cyan-400 underline"
//                 >
//                   Open Video
//                 </a>
//               </div>
//             )}
//           </motion.div>
//         ))}
//       </div>
//     </section>
//   );
// }



"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Loader2, ListChecks } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

// Import from our new API
import { taskApi } from "@/services/editing/api";  // ← Adjust path if needed
import type { Task } from "@/types/editing/types";    // Better to import types separately

export default function EditorTasksPage() {
  const { access, user } = useAuth();
  
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
  async function loadTasks() {
    if (!access) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Properly typed call
      const result = await taskApi.getAll({
        task_type: "editing",
        // assigned_to_id: user?.id,   // Uncomment if you want only tasks assigned to current user
      });

      // Safe way to extract tasks (handles both possible backend structures)
      let tasksData: Task[] = [];

      if (Array.isArray(result)) {
        tasksData = result;
      } else if (result && typeof result === 'object') {
        tasksData = Array.isArray(result.data) 
          ? result.data 
          : (result as any).data?.data || [];   // fallback for nested structures
      }

      setTasks(tasksData);
    } catch (err: any) {
      console.error("Failed to load editing tasks:", err);
      setError(
        err?.response?.data?.message || 
        err?.message || 
        "Failed to load tasks. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  loadTasks();
}, [access, user?.id]);
  return (
    <section className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <ListChecks className="w-6 h-6 text-primary" />
          Editing Tasks
        </h2>
        <p className="text-muted-foreground mt-1">
          Tasks assigned to you or available for editing work.
        </p>
      </motion.div>

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center py-12">
          <Loader2 className="animate-spin w-8 h-8 text-primary" />
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <div className="bg-destructive/10 border border-destructive/30 text-destructive p-4 rounded-xl text-center">
          {error}
        </div>
      )}

      {/* No Tasks */}
      {!loading && !error && tasks.length === 0 && (
        <div className="text-center py-12 border border-dashed rounded-2xl">
          <ListChecks className="w-12 h-12 mx-auto text-muted-foreground mb-3" />
          <p className="text-muted-foreground">No editing tasks available right now.</p>
        </div>
      )}

      {/* Task List */}
      <div className="space-y-4">
        {tasks.map((task, index) => (
          <motion.div
            key={task.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="p-6 border border-border rounded-2xl bg-card hover:shadow-lg transition-all duration-200"
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-semibold leading-tight">{task.title}</h3>
              <span className={`px-3 py-1 text-xs font-medium rounded-full capitalize
                ${task.status === 'in_progress' ? 'bg-green-100 text-green-700' : 
                  task.status === 'assigned' ? 'bg-blue-100 text-blue-700' : 
                  'bg-gray-100 text-gray-700'}`}>
                {task.status.replace('_', ' ')}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground block text-xs">Progress</span>
                <p className="font-medium">{task.progress_percentage}%</p>
              </div>
              <div>
                <span className="text-muted-foreground block text-xs">Deadline</span>
                <p className="font-medium">
                  {task.due_date 
                    ? new Date(task.due_date).toLocaleDateString() 
                    : "No deadline"}
                </p>
              </div>
              <div>
                <span className="text-muted-foreground block text-xs">Reward</span>
                <p className="font-medium text-emerald-600">${task.reward_amount}</p>
              </div>
              <div>
                <span className="text-muted-foreground block text-xs">Client</span>
                <p className="font-medium">{task.client_name}</p>
              </div>
            </div>

            {/* Raw Footage Link */}
            {task.task_details?.raw_footage_url && (
              <div className="mt-5 pt-5 border-t border-border">
                <p className="font-medium text-sm mb-1.5">Raw Footage:</p>
                <a
                  href={task.task_details.raw_footage_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-cyan-500 hover:text-cyan-600 underline underline-offset-4"
                >
                  Open Video Link →
                </a>
              </div>
            )}

            {/* Action Button (Optional - you can expand later) */}
            <div className="mt-6">
              <button className="w-full sm:w-auto px-6 py-2.5 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition">
                View & Start Editing
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}