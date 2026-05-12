"use client";

import { EmailAction } from "@/types/admin/types";
import { Mail, Trash2, Clock } from "lucide-react";

export default function EmailList({
  data,
}: {
  data: EmailAction[];
}) {
  return (
    <div className="bg-card border border-border rounded-2xl p-6">

      <h2 className="text-lg font-semibold mb-4">History</h2>

      <div className="space-y-3">

        {data.map((item) => (
          <div
            key={item.id}
            className="p-4 rounded-xl border border-border flex justify-between items-start"
          >

            <div>
              <p className="font-medium flex items-center gap-2">
                <Mail className="w-4 h-4" />
                {item.email}
              </p>

              <p className="text-sm text-muted-foreground">
                {item.type.toUpperCase()} • {item.description}
              </p>

              <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                <Clock className="w-3 h-3" />
                {item.createdAt}
              </p>
            </div>

            <span
              className={`text-xs px-3 py-1 rounded-full ${
                item.status === "sent"
                  ? "bg-green-600 text-white"
                  : item.status === "pending"
                  ? "bg-yellow-500 text-black"
                  : "bg-red-600 text-white"
              }`}
            >
              {item.status}
            </span>

          </div>
        ))}

      </div>
    </div>
  );
}