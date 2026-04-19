"use client";

import { motion } from "framer-motion";
import { Mail, Phone, Globe, MessageSquare, Eye } from "lucide-react";

interface Submission {
  id: number;
  name: string;
  email: string;
  phone?: string;
  message: string;
  source_website: string;
  created_at: string;
  status: "new" | "read" | "replied";
}

const sampleSubmissions: Submission[] = [
  {
    id: 1,
    name: "John Kamau",
    email: "john@gmail.com",
    phone: "+254712345678",
    message: "Hi, I would like to build a business website for my company. How much does it cost?",
    source_website: "Nayo Digital Agency",
    created_at: "2026-04-18T10:30:00",
    status: "new",
  },
  {
    id: 2,
    name: "Sarah Wanjiku",
    email: "sarah@mail.com",
    message: "Interested in your portfolio package. Do you also offer hosting?",
    source_website: "Creative Hub Studios",
    created_at: "2026-04-17T14:12:00",
    status: "read",
  },
  {
    id: 3,
    name: "Michael Otieno",
    email: "mike@business.com",
    phone: "+254701112233",
    message: "Need an e-commerce website for my shop. Please contact me ASAP.",
    source_website: "BrightTech Solutions",
    created_at: "2026-04-16T09:45:00",
    status: "replied",
  },
];

export default function SubmissionsPage() {
  const submissions = sampleSubmissions;

  const getStatusColor = (status: Submission["status"]) => {
    if (status === "new") return "text-blue-500 bg-blue-100 dark:bg-blue-900/30";
    if (status === "read") return "text-yellow-500 bg-yellow-100 dark:bg-yellow-900/30";
    return "text-emerald-500 bg-emerald-100 dark:bg-emerald-900/30";
  };

  return (
    <div className="w-full max-w-[1200px] mx-auto space-y-6">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold">Website Inquiries</h1>
        <p className="text-sm text-muted-foreground">
          Messages submitted from your portfolio websites
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        
        <div className="bg-card border border-border rounded-2xl p-5">
          <p className="text-sm text-muted-foreground">Total Messages</p>
          <p className="text-2xl font-semibold">{submissions.length}</p>
        </div>

        <div className="bg-card border border-border rounded-2xl p-5">
          <p className="text-sm text-muted-foreground">New Leads</p>
          <p className="text-2xl font-semibold">
            {submissions.filter((s) => s.status === "new").length}
          </p>
        </div>

        <div className="bg-card border border-border rounded-2xl p-5">
          <p className="text-sm text-muted-foreground">Replied</p>
          <p className="text-2xl font-semibold">
            {submissions.filter((s) => s.status === "replied").length}
          </p>
        </div>
      </div>

      {/* Inbox */}
      <div className="space-y-4">
        {submissions.map((sub) => (
          <motion.div
            key={sub.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card border border-border rounded-2xl p-6 hover:shadow-md transition"
          >
            
            {/* Top */}
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-lg font-semibold">{sub.name}</h2>
                <p className="text-xs text-muted-foreground">
                  From: {sub.source_website}
                </p>
              </div>

              <span
                className={`text-xs px-3 py-1 rounded-full font-medium ${getStatusColor(
                  sub.status
                )}`}
              >
                {sub.status}
              </span>
            </div>

            {/* Contact Info */}
            <div className="mt-4 space-y-2 text-sm text-muted-foreground">
              
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                {sub.email}
              </div>

              {sub.phone && (
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  {sub.phone}
                </div>
              )}

              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4" />
                {sub.source_website}
              </div>
            </div>

            {/* Message */}
            <div className="mt-4 bg-muted/40 p-4 rounded-xl text-sm flex gap-2">
              <MessageSquare className="w-4 h-4 mt-0.5 text-muted-foreground" />
              <p>{sub.message}</p>
            </div>

            {/* Footer Actions */}
            <div className="mt-5 flex justify-between items-center">
              <p className="text-xs text-muted-foreground">
                {new Date(sub.created_at).toLocaleString()}
              </p>

              <div className="flex gap-3">
                <button className="text-sm text-primary font-medium flex items-center gap-1">
                  <Eye className="w-4 h-4" />
                  View
                </button>

                <button className="text-xs px-3 py-1 border border-border rounded-lg hover:bg-muted">
                  Reply
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}