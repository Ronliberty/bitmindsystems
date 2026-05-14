"use client";

export default function ProjectStatusBadge({
  status,
}: {
  status: string;
}) {
  const statusStyles: Record<string, string> = {
    active: "bg-green-500/10 text-green-500 border-green-500/20",
    completed: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    planning: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
    on_hold: "bg-orange-500/10 text-orange-500 border-orange-500/20",
    cancelled: "bg-red-500/10 text-red-500 border-red-500/20",
  };

  return (
    <div
      className={`px-3 py-1 rounded-full text-xs font-medium border capitalize ${
        statusStyles[status] || "bg-muted"
      }`}
    >
      {status.replace("_", " ")}
    </div>
  );
}