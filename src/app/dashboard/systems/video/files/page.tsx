"use client";

import { useEffect, useState } from "react";
import { getFiles } from "@/app/lib/api"; // API endpoint to fetch files
import { FileReference } from "@/app/lib/api";
import { motion } from "framer-motion";
import { Loader2, FileText } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function FilesPage({ contextType }: { contextType?: string }) {
  const { access } = useAuth();
  const [files, setFiles] = useState<FileReference[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      if (!access) {
        setLoading(false);
        return;
      }

      try {
        const data = await getFiles(access);
        const filtered = contextType
          ? data.filter((f: FileReference) => f.context_type === contextType)
          : data;
        setFiles(filtered);
      } catch (e) {
        console.error("Failed to load files:", e);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [access, contextType]);

  return (
    <section>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-6"
      >
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <FileText className="w-6 h-6 text-primary" />
          Files
        </h2>
        {contextType && (
          <p className="text-gray-400 mt-1">
            Showing files related to <span className="font-medium">{contextType}</span>.
          </p>
        )}
      </motion.div>

      {/* Loading */}
      {loading && (
        <div className="flex justify-center py-10">
          <Loader2 className="animate-spin w-6 h-6 text-primary" />
        </div>
      )}

      {/* No files */}
      {!loading && files.length === 0 && (
        <p className="text-gray-400 text-center py-10">No files available.</p>
      )}

      {/* File list */}
      <div className="space-y-4">
        {files.map((f) => (
          <motion.div
            key={f.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="p-5 border border-gray-800 rounded-xl bg-[#1a1a1a] hover:shadow-md transition-all"
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-semibold">{f.file_name}</h3>
              <span className="text-sm text-gray-400">{f.file_type}</span>
            </div>

            <p className="text-gray-400 text-sm mb-2">
              {f.description || "No description"}
            </p>

            <div className="flex flex-wrap gap-4 text-sm">
              <a
                href={f.file_url}
                target="_blank"
                className="text-cyan-400 underline"
              >
                Open File
              </a>
              <span className="text-gray-400">v{f.version}</span>
              {f.tags.length > 0 && (
                <span className="text-gray-400">
                  Tags: {f.tags.join(", ")}
                </span>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
