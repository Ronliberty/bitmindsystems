"use client";

import { useState } from "react";
import { CheckCircle2, XCircle, Clock, User } from "lucide-react";

interface HistoryItem {
  id: number;
  action: string;
  user: string;
  status: "approved" | "rejected" | "pending";
  timestamp: string;
  project: string;
}

const sampleHistory: HistoryItem[] = [
  {
    id: 1,
    action: "Approved content batch #42",
    user: "Admin Team",
    status: "approved",
    timestamp: "2026-04-18 14:32",
    project: "Content Moderation",
  },
  {
    id: 2,
    action: "Rejected flagged post review",
    user: "QA Supervisor",
    status: "rejected",
    timestamp: "2026-04-18 11:10",
    project: "Community Safety",
  },
  {
    id: 3,
    action: "Pending AI review queue",
    user: "System",
    status: "pending",
    timestamp: "2026-04-17 09:45",
    project: "AI Pipeline",
  },
  {
    id: 4,
    action: "Approved audit report",
    user: "Moderator A",
    status: "approved",
    timestamp: "2026-04-16 18:22",
    project: "AI Review",
  },
];

export default function HistoryPage() {
  const [history] = useState(sampleHistory);

  const getIcon = (status: HistoryItem["status"]) => {
    if (status === "approved") return <CheckCircle2 className="w-4 h-4 text-emerald-500" />;
    if (status === "rejected") return <XCircle className="w-4 h-4 text-red-500" />;
    return <Clock className="w-4 h-4 text-yellow-500" />;
  };

  return (
    <div className="w-full max-w-[1200px] mx-auto space-y-6">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold">History</h1>
        <p className="text-sm text-muted-foreground">
          Complete activity log of moderator actions
        </p>
      </div>

      {/* Timeline List */}
      <div className="bg-card border border-border rounded-2xl divide-y">
        {history.map((item) => (
          <div
            key={item.id}
            className="p-5 flex items-start justify-between gap-4 hover:bg-muted/40 transition"
          >
            
            {/* Left */}
            <div className="flex gap-3">
              {getIcon(item.status)}

              <div>
                <p className="font-medium">{item.action}</p>

                <div className="flex flex-wrap gap-3 text-xs text-muted-foreground mt-1">
                  <span className="flex items-center gap-1">
                    <User className="w-3 h-3" />
                    {item.user}
                  </span>

                  <span>{item.project}</span>

                  <span>{item.timestamp}</span>
                </div>
              </div>
            </div>

            {/* Right status */}
            <span
              className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                item.status === "approved"
                  ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                  : item.status === "rejected"
                  ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                  : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
              }`}
            >
              {item.status}
            </span>
          </div>
        ))}
      </div>

      {/* Empty state */}
      {history.length === 0 && (
        <div className="p-10 text-center text-muted-foreground bg-card border border-border rounded-2xl">
          No history available.
        </div>
      )}
    </div>
  );
}