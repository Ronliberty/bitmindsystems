// app/dashboard/tasks/page.tsx
import { format } from "date-fns";
import { 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  Hourglass, 
  XCircle,
  Flame,
  Calendar,
  FileText
} from "lucide-react";
import { TaskMode } from "@/app/lib/api"; // ← your interface

async function getTasks(): Promise<TaskMode[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tasks/`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch tasks");
  const data = await res.json();
  return Array.isArray(data) ? data : data.results ?? [];
}

export default async function TasksOverview() {
  const tasks = await getTasks();

  // KPI Calculations
  const total = tasks.length;
  const completed = tasks.filter(t => t.status === "completed").length;
  const inProgress = tasks.filter(t => ["in_progress", "review", "submitted"].includes(t.status)).length;
  const overdue = tasks.filter(t => {
    if (!t.due_date) return false;
    return new Date(t.due_date) < new Date() && t.status !== "completed";
  }).length;
  const urgent = tasks.filter(t => t.priority === "urgent" && t.status !== "completed").length;

  const statusColors: Record<string, string> = {
    completed: "bg-green-100 text-green-800",
    in_progress: "bg-blue-100 text-blue-800",
    submitted: "bg-purple-100 text-purple-800",
    review: "bg-indigo-100 text-indigo-800",
    pending: "bg-yellow-100 text-yellow-800",
    draft: "bg-gray-100 text-gray-800",
    revision: "bg-orange-100 text-orange-800",
    cancelled: "bg-red-100 text-red-800",
  };

  const priorityColors: Record<string, string> = {
    urgent: "bg-red-100 text-red-800",
    high: "bg-orange-100 text-orange-800",
    normal: "bg-blue-100 text-blue-800",
    low: "bg-gray-100 text-gray-800",
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Tasks Overview</h1>
        <p className="text-gray-600 mt-1">Monitor all tasks, deadlines, and team progress</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Tasks</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{total}</p>
            </div>
            <FileText className="w-8 h-8 text-gray-500" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Completed</p>
              <p className="text-3xl font-bold text-green-600 mt-2">{completed}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">In Progress</p>
              <p className="text-3xl font-bold text-blue-600 mt-2">{inProgress}</p>
            </div>
            <Hourglass className="w-8 h-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Overdue</p>
              <p className="text-3xl font-bold text-red-600 mt-2">{overdue}</p>
            </div>
            <AlertCircle className="w-8 h-8 text-red-500" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Urgent</p>
              <p className="text-3xl font-bold text-orange-600 mt-2">{urgent}</p>
            </div>
            <Flame className="w-8 h-8 text-orange-500" />
          </div>
        </div>
      </div>

      {/* Recent / Active Tasks Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-900">Active Tasks</h2>
          <span className="text-sm text-gray-500">{tasks.length} total</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Task</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Priority</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Due Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {tasks.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center py-12 text-gray-500">
                    No tasks found
                  </td>
                </tr>
              ) : (
                tasks.slice(0, 10).map((task) => (
                  <tr key={task.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      <div className="max-w-xs truncate">{task.title}</div>
                      {task.description && (
                        <p className="text-xs text-gray-500 mt-1 truncate max-w-md">
                          {task.description}
                        </p>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${statusColors[task.status] || "bg-gray-100 text-gray-800"}`}>
                        {task.status_display}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${priorityColors[task.priority]}`}>
                        {task.priority_display}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {task.due_date ? (
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          {format(new Date(task.due_date), "MMM dd, yyyy")}
                          {new Date(task.due_date) < new Date() && task.status !== "completed" && (
                            <span className="text-red-600 text-xs font-medium">Overdue</span>
                          )}
                        </div>
                      ) : (
                        <span className="text-gray-400">No due date</span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}