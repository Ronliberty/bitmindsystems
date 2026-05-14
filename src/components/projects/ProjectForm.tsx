"use client";

import { useState } from "react";
import { projectAPI } from "@/services/project/api";
import { useProjectUI } from "./ProjectProvider";

export default function ProjectForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [projectType, setProjectType] =
    useState<"client" | "internal">("client");

  const [client, setClient] = useState<number | null>(null);

  const [loading, setLoading] = useState(false);

  const { setCreateOpen } = useProjectUI();

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      setLoading(true);

      await projectAPI.createProject({
        title,
        description,
        project_type: projectType,
        client: projectType === "client" ? client : null,
      });

      console.log("Project created");

      // CLOSE MODAL
      setCreateOpen(false);

      // RESET FORM
      setTitle("");
      setDescription("");
      setProjectType("client");
      setClient(null);

    } catch (error) {
      console.error("Failed to create project", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">

      {/* TITLE */}
      <div>
        <label className="text-sm font-medium mb-2 block">
          Project Title
        </label>

        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter project title"
          className="w-full rounded-xl border border-border bg-background px-4 py-3 outline-none focus:ring-2 focus:ring-primary"
          required
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
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Project description..."
          className="w-full rounded-xl border border-border bg-background px-4 py-3 outline-none focus:ring-2 focus:ring-primary resize-none"
        />
      </div>

      {/* PROJECT TYPE */}
      <div>
        <label className="text-sm font-medium mb-2 block">
          Project Type
        </label>

        <select
          value={projectType}
          onChange={(e) =>
            setProjectType(e.target.value as "client" | "internal")
          }
          className="w-full rounded-xl border border-border bg-background px-4 py-3 outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="client">Client Project</option>
          <option value="internal">Internal Project</option>
        </select>
      </div>

      {/* CLIENT (only if client project) */}
      {projectType === "client" && (
        <div>
          <label className="text-sm font-medium mb-2 block">
            Client ID
          </label>

          <input
            type="number"
            value={client ?? ""}
            onChange={(e) =>
              setClient(e.target.value ? Number(e.target.value) : null)
            }
            placeholder="Enter client ID"
            className="w-full rounded-xl border border-border bg-background px-4 py-3 outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>
      )}

      {/* ACTIONS */}
      <div className="flex items-center justify-end gap-3 pt-2">

        <button
          type="button"
          onClick={() => setCreateOpen(false)}
          className="px-5 py-3 rounded-xl border border-border hover:bg-muted transition"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={loading}
          className="px-5 py-3 rounded-xl bg-primary text-primary-foreground hover:opacity-90 transition disabled:opacity-50"
        >
          {loading ? "Creating..." : "Create Project"}
        </button>
      </div>
    </form>
  );
}