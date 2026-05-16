"use client";

import { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { useCreateTaskCategory } from "@/hooks/task/hooks";
import { Loader2 } from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
}

function slugify(v: string) {
  return v.toLowerCase().trim().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
}

export function CreateCategoryModal({ open, onClose }: Props) {
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [slugTouched, setSlugTouched] = useState(false);

  const { mutate: create, isPending, isError } = useCreateTaskCategory();

  const handleNameChange = (v: string) => {
    setName(v);
    if (!slugTouched) setSlug(slugify(v));
  };

  const handleSlugChange = (v: string) => {
    setSlugTouched(true);
    setSlug(slugify(v));
  };

  const reset = () => {
    setName(""); setSlug(""); setSlugTouched(false);
  };

  const handleClose = () => { reset(); onClose(); };

  const handleSubmit = () => {
    if (!name.trim() || !slug.trim()) return;
    create(
      { name: name.trim(), slug: slug.trim() },
      { onSuccess: handleClose }
    );
  };

  return (
    <Modal open={open} onClose={handleClose} title="New Category" size="sm"
      description="Categories help organise tasks by type or workflow."
    >
      <div className="p-5 space-y-4">
        {/* Name */}
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-muted-foreground">Name *</label>
          <input
            type="text"
            value={name}
            onChange={(e) => handleNameChange(e.target.value)}
            placeholder="e.g. Video Review"
            className="w-full text-sm bg-muted rounded-lg px-3 py-2 border-0 focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        {/* Slug */}
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-muted-foreground">
            Slug *
            <span className="ml-1 font-normal text-muted-foreground/60">(auto-generated)</span>
          </label>
          <input
            type="text"
            value={slug}
            onChange={(e) => handleSlugChange(e.target.value)}
            placeholder="video-review"
            className="w-full text-sm bg-muted rounded-lg px-3 py-2 border-0 focus:outline-none focus:ring-2 focus:ring-ring font-mono"
          />
        </div>

        {isError && (
          <p className="text-xs text-red-500">Failed to create category. Try again.</p>
        )}

        {/* Actions */}
        <div className="flex gap-2 pt-1">
          <button
            onClick={handleClose}
            className="flex-1 text-sm py-2 rounded-lg bg-muted hover:bg-muted/70 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={!name.trim() || !slug.trim() || isPending}
            className="flex-1 flex items-center justify-center gap-2 text-sm py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 transition"
          >
            {isPending && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
            Create
          </button>
        </div>
      </div>
    </Modal>
  );
}