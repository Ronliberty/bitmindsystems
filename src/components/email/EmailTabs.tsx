"use client";

import { useState } from "react";

export default function EmailTabs({
  children,
}: {
  children: (tab: string) => React.ReactNode;
}) {
  const [tab, setTab] = useState("compose");

  return (
    <div className="space-y-4">

      {/* TAB BUTTONS */}
      <div className="flex gap-2">
        <button
          onClick={() => setTab("compose")}
          className={`px-4 py-2 rounded-xl border ${
            tab === "compose" ? "bg-primary text-white" : "border-border"
          }`}
        >
          Compose
        </button>

        <button
          onClick={() => setTab("history")}
          className={`px-4 py-2 rounded-xl border ${
            tab === "history" ? "bg-primary text-white" : "border-border"
          }`}
        >
          History
        </button>
      </div>

      {/* CONTENT */}
      {children(tab)}
    </div>
  );
}