"use client";

import { useState } from "react";
import { CheckCircle2, Calendar, Briefcase } from "lucide-react";

interface ApprovedTask {
  id: number;
  title: string;
  project: string;
  approved_date: string;
  reviewer: string;
}

const sampleApproved: ApprovedTask[] = [
  {
    id: 1,
    title: "User content moderation batch #24",
    project: "Content Moderation",
    approved_date: "2026-04-18",
    reviewer: "Admin Team",
  },
  {
    id: 2,
    title: "Flagged posts verification",
    project: "Community Safety",
    approved_date: "2026-04-17",
    reviewer: "QA Supervisor",
  },
  {
    id: 3,
    title: "AI-generated content audit",
    project: "AI Review",
    approved_date: "2026-04-15",
    reviewer: "System Auto-Approval",
  },
];

export default function ApprovedPage() {
  const [tasks] = useState(sampleApproved);
  const [search, setSearch] = useState("");

  const filtered = tasks.filter((t) =>
    t.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-full max-w-[1200px] mx-auto space-y-6">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold">Approved Tasks</h1>
        <p className="text-sm text-muted-foreground">
          Tasks successfully reviewed and completed
        </p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        
        <div className="bg-card border border-border rounded-2xl p-5">
          <p className="text-sm text-muted-foreground">Total Approved</p>
          <p className="text-2xl font-semibold mt-1">{tasks.length}</p>
        </div>

        <div className="bg-card border border-border rounded-2xl p-5">
          <p className="text-sm text-muted-foreground">This Week</p>
          <p className="text-2xl font-semibold mt-1">12</p>
        </div>

        <div className="bg-card border border-border rounded-2xl p-5">
          <p className="text-sm text-muted-foreground">Approval Rate</p>
          <p className="text-2xl font-semibold mt-1">98%</p>
        </div>
      </div>

      {/* Search */}
      <div className="max-w-sm">
        <input
          type="text"
          placeholder="Search approved tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-2 border border-border rounded-xl bg-card text-sm"
        />
      </div>

      {/* List */}
      <div className="bg-card border border-border rounded-2xl divide-y">
        {filtered.map((task) => (
          <div
            key={task.id}
            className="p-5 flex items-center justify-between hover:bg-muted/50 transition"
          >
            
            {/* Left */}
            <div className="flex items-start gap-4">
              <CheckCircle2 className="w-5 h-5 text-emerald-500 mt-1" />

              <div>
                <p className="font-medium">{task.title}</p>
                <div className="flex items-center gap-4 text-xs text-muted-foreground mt-1">
                  <span className="flex items-center gap-1">
                    <Briefcase className="w-3 h-3" />
                    {task.project}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {task.approved_date}
                  </span>
                </div>
              </div>
            </div>

            {/* Right */}
            <div className="text-xs text-muted-foreground">
              Reviewed by {task.reviewer}
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="p-10 text-center text-muted-foreground">
            No approved tasks found.
          </div>
        )}
      </div>
    </div>
  );
}