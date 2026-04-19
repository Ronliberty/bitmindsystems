"use client";

import { useState } from "react";
import { Globe, LayoutTemplate, Sparkles, Upload } from "lucide-react";

interface SiteTemplate {
  id: number;
  name: string;
  description: string;
  type: string;
}

const templates: SiteTemplate[] = [
  {
    id: 1,
    name: "Business Website",
    description: "Corporate site with about, services, contact pages",
    type: "Business",
  },
  {
    id: 2,
    name: "Portfolio Website",
    description: "Showcase projects, case studies, and skills",
    type: "Portfolio",
  },
  {
    id: 3,
    name: "E-commerce Store",
    description: "Product listings, cart, checkout system",
    type: "E-commerce",
  },
  {
    id: 4,
    name: "Landing Page",
    description: "High-conversion marketing page",
    type: "Marketing",
  },
];

export default function Add() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div className="w-full max-w-[1200px] mx-auto space-y-8">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold">
          Create Website Portfolio
        </h1>
        <p className="text-sm text-muted-foreground">
          Build and manage client websites inside your system
        </p>
      </div>

      {/* Main Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Left: Configuration */}
        <div className="lg:col-span-2 space-y-6">
          
          <div className="bg-card border border-border rounded-2xl p-6 space-y-5">
            
            <div>
              <label className="text-sm font-medium">Website Name</label>
              <input
                type="text"
                placeholder="e.g. Nayo Agency Website"
                className="w-full mt-2 px-4 py-3 border border-border rounded-xl bg-background text-sm"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Domain / URL</label>
              <input
                type="text"
                placeholder="https://example.com"
                className="w-full mt-2 px-4 py-3 border border-border rounded-xl bg-background text-sm"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Description</label>
              <textarea
                rows={4}
                placeholder="Describe the website purpose..."
                className="w-full mt-2 px-4 py-3 border border-border rounded-xl bg-background text-sm resize-none"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Upload Assets</label>
              <div className="mt-2 border border-dashed border-border rounded-xl p-6 text-center text-sm text-muted-foreground">
                Drag & drop logos, images, or documents
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition">
              <Upload className="w-4 h-4" />
              Create Website
            </button>

            <button className="px-6 py-3 border border-border rounded-xl hover:bg-muted transition">
              Save Draft
            </button>
          </div>
        </div>

        {/* Right: Templates */}
        <div className="space-y-4">
          
          <div className="flex items-center gap-2 text-sm font-medium">
            <LayoutTemplate className="w-4 h-4 text-primary" />
            Website Templates
          </div>

          {templates.map((t) => (
            <div
              key={t.id}
              onClick={() => setSelected(t.id)}
              className={`p-4 border rounded-2xl cursor-pointer transition ${
                selected === t.id
                  ? "border-primary bg-primary/5"
                  : "border-border hover:bg-muted"
              }`}
            >
              <div className="flex justify-between">
                <div>
                  <p className="font-medium">{t.name}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {t.description}
                  </p>
                </div>

                <Globe className="w-4 h-4 text-muted-foreground" />
              </div>

              <span className="text-xs inline-block mt-3 px-2 py-1 bg-muted rounded-lg">
                {t.type}
              </span>
            </div>
          ))}

          {/* AI Suggestion */}
          <div className="p-4 bg-card border border-border rounded-2xl">
            <div className="flex items-center gap-2 text-sm font-medium">
              <Sparkles className="w-4 h-4 text-yellow-500" />
              AI Suggestion
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              This client is best suited for a “Portfolio Website” based on their profile.
            </p>
          </div>
        </div>
      </div>

      {/* Preview */}
      <div className="bg-card border border-border rounded-2xl p-6">
        <h2 className="font-semibold mb-4">Website Preview</h2>

        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Website Name</span>
            <span>N/A</span>
          </div>

          <div className="flex justify-between">
            <span className="text-muted-foreground">Domain</span>
            <span>N/A</span>
          </div>

          <div className="flex justify-between">
            <span className="text-muted-foreground">Template</span>
            <span>N/A</span>
          </div>
        </div>

        <div className="mt-6 p-6 border border-dashed border-border rounded-xl text-center text-muted-foreground text-sm">
          Live website structure preview will appear here
        </div>
      </div>
    </div>
  );
}