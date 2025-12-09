"use client";

import { PortaSubmission } from "@/app/lib/api";  
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

interface SubmissionsPageProps {
  submissions?: PortaSubmission[]; // optional so page won't crash if undefined
}

export default function SubmissionsPage({ submissions = [] }: SubmissionsPageProps) {
  return (
    <section className="min-h-screen w-full bg-background text-foreground px-6 py-10">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <header className="mb-8">
          <motion.h1
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold"
          >
            📬 Portfolio Submissions
          </motion.h1>

          <p className="text-muted-foreground mt-2">
            View all form submissions linked to your React App.
          </p>

        </header>

        {/* Submissions List */}
        <div className="grid gap-4 mt-6">
          {submissions.length > 0 ? (
            submissions.map((submission) => (
              <div
                key={submission.id}
                className="border border-border bg-card rounded-xl p-4 hover:shadow-lg transition-all"
              >
                <h2 className="font-semibold text-lg">{submission.name}</h2>
                <p className="text-sm text-muted-foreground">{submission.email}</p>
                <p className="text-sm text-muted-foreground">{submission.contact}</p>
                <p className="text-sm mt-2">{submission.country}</p>
                <p className="text-sm">{submission.address}</p>
                <p className="text-xs text-muted-foreground mt-2">
                  Submitted on: {new Date(submission.created_at).toLocaleString()}
                </p>
              </div>
            ))
          ) : (
            <p className="text-muted-foreground">No submissions yet.</p>
          )}
        </div>
      </div>
    </section>
  );
}
