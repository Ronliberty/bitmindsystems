"use client";

import { X } from "lucide-react";

export default function QuickPrompts({
  prompts,
  onSelect,
  onClose,
}: {
  prompts: string[];
  onSelect: (prompt: string) => void;
  onClose: () => void;
}) {
  return (
    <div className="relative px-6 py-3.5 border-t bg-muted/30">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute right-3 top-3 p-1 rounded-full hover:bg-muted transition-colors"
        aria-label="Close prompts"
      >
        <X className="h-4 w-4 text-muted-foreground" />
      </button>

      {/* Prompts */}
      <div className="flex flex-wrap gap-2 pr-8">
        {prompts.map((prompt) => (
          <button
            key={prompt}
            onClick={() => onSelect(prompt)}
            className="text-xs px-3.5 py-1.5 rounded-full bg-background border border-border hover:bg-muted transition-colors"
          >
            {prompt}
          </button>
        ))}
      </div>
    </div>
  );
}