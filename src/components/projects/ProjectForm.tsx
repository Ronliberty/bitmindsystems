"use client";

import { useState } from "react";

export default function ProjectForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] =
    useState("");

  return (
    <form className="space-y-5">
      {/* TITLE */}
      <div>
        <label className="text-sm font-medium mb-2 block">
          Project Title
        </label>

        <input
          type="text"
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
          placeholder="Enter project title"
          className="w-full rounded-xl border border-border bg-background px-4 py-3 outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {/* DESCRIPTION */}
      <div>
        <label className="text-sm font-medium mb-2 block">
          Description
        </label>

        <textarea
          rows={5}
          value={description}
          onChange={(e) =>
            setDescription(e.target.value)
          }
          placeholder="Project description..."
          className="w-full rounded-xl border border-border bg-background px-4 py-3 outline-none focus:ring-2 focus:ring-primary resize-none"
        />
      </div>

      {/* ACTIONS */}
      <div className="flex items-center justify-end gap-3 pt-2">
        <button
          type="button"
          className="px-5 py-3 rounded-xl border border-border hover:bg-muted transition"
        >
          Cancel
        </button>

        <button
          type="submit"
          className="px-5 py-3 rounded-xl bg-primary text-primary-foreground hover:opacity-90 transition"
        >
          Create Project
        </button>
      </div>
    </form>
  );
}