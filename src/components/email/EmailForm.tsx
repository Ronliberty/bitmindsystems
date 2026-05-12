"use client";

import { useState } from "react";
import {
  Send,
  UserPlus,
  UserX,
  Mail,
  FileText,
  Sparkles,
} from "lucide-react";

import { motion } from "framer-motion";
import { EmailActionType } from "@/types/admin/types";

export default function EmailForm({
  onSubmit,
}: {
  onSubmit: (data: {
    email: string;
    type: EmailActionType;
    description: string;
  }) => void;
}) {
  const [email, setEmail] = useState("");
  const [type, setType] = useState<EmailActionType>("invite");
  const [description, setDescription] = useState("");

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

      {/* ================= LEFT FORM ================= */}
      <motion.div
        initial={{ opacity: 0, x: -15 }}
        animate={{ opacity: 1, x: 0 }}
        className="bg-card border border-border rounded-3xl p-6 md:p-8 relative overflow-hidden"
      >

        {/* Glow */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-primary/10 blur-3xl rounded-full" />

        {/* Header */}
        <div className="relative z-10 mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-11 h-11 rounded-2xl bg-primary/10 flex items-center justify-center">
              <Mail className="w-5 h-5 text-primary" />
            </div>

            <div>
              <h2 className="text-2xl font-bold">
                Email Action Center
              </h2>

              <p className="text-sm text-muted-foreground">
                Invite or revoke user system access.
              </p>
            </div>
          </div>
        </div>

        {/* EMAIL */}
        <div className="space-y-2 mb-5">
          <label className="text-sm font-medium text-muted-foreground">
            Recipient Email
          </label>

          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="user@example.com"
            className="
              w-full
              px-4
              py-3.5
              rounded-2xl
              bg-background
              border
              border-border
              outline-none
              transition-all
              focus:border-primary
              focus:ring-4
              focus:ring-blue-500/10
            "
          />
        </div>

        {/* ACTION TYPE */}
        <div className="space-y-2 mb-5">
          <label className="text-sm font-medium text-muted-foreground">
            Action Type
          </label>

          <div className="grid grid-cols-2 gap-3">

            {/* INVITE */}
            <button
              type="button"
              onClick={() => setType("invite")}
              className={`
                group
                rounded-2xl
                border
                px-4
                py-4
                transition-all
                flex
                items-center
                justify-center
                gap-3
                ${
                  type === "invite"
                    ? "bg-green-600 text-white border-green-600 shadow-lg shadow-green-500/20"
                    : "border-border hover:bg-muted"
                }
              `}
            >
              <UserPlus className="w-5 h-5" />

              <div className="text-left">
                <p className="font-medium">Invite</p>
                <p
                  className={`text-xs ${
                    type === "invite"
                      ? "text-white/80"
                      : "text-muted-foreground"
                  }`}
                >
                  Grant access
                </p>
              </div>
            </button>

            {/* REVOKE */}
            <button
              type="button"
              onClick={() => setType("revoke")}
              className={`
                group
                rounded-2xl
                border
                px-4
                py-4
                transition-all
                flex
                items-center
                justify-center
                gap-3
                ${
                  type === "revoke"
                    ? "bg-red-600 text-white border-red-600 shadow-lg shadow-red-500/20"
                    : "border-border hover:bg-muted"
                }
              `}
            >
              <UserX className="w-5 h-5" />

              <div className="text-left">
                <p className="font-medium">Revoke</p>
                <p
                  className={`text-xs ${
                    type === "revoke"
                      ? "text-white/80"
                      : "text-muted-foreground"
                  }`}
                >
                  Remove access
                </p>
              </div>
            </button>

          </div>
        </div>

        {/* DESCRIPTION */}
        <div className="space-y-2 mb-6">
          <label className="text-sm font-medium text-muted-foreground">
            Description / Message
          </label>

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder={
              type === "invite"
                ? "We are pleased to invite you to our platform..."
                : "Your access to the platform has been revoked..."
            }
            className="
              w-full
              h-40
              px-4
              py-4
              rounded-2xl
              bg-background
              border
              border-border
              resize-none
              outline-none
              transition-all
              focus:border-primary
              focus:ring-4
              focus:ring-blue-500/10
            "
          />
        </div>

        {/* SUBMIT */}
        <button
          onClick={() => {
            onSubmit({
              email,
              type,
              description,
            });

            setEmail("");
            setDescription("");
          }}
          className="
            w-full
            rounded-2xl
            bg-primary
            text-primary-foreground
            py-4
            font-medium
            flex
            items-center
            justify-center
            gap-2
            transition-all
            hover:scale-[1.01]
            hover:opacity-90
            active:scale-[0.99]
            shadow-lg
            shadow-blue-500/20
          "
        >
          <Send className="w-5 h-5" />
          Send Email Action
        </button>
      </motion.div>

      {/* ================= PREVIEW ================= */}
      <motion.div
        initial={{ opacity: 0, x: 15 }}
        animate={{ opacity: 1, x: 0 }}
        className="bg-card border border-border rounded-3xl p-6 md:p-8 relative overflow-hidden"
      >

        {/* Glow */}
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-primary/10 blur-3xl rounded-full" />

        {/* Header */}
        <div className="relative z-10 flex items-center gap-3 mb-8">
          <div className="w-11 h-11 rounded-2xl bg-primary/10 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-primary" />
          </div>

          <div>
            <h2 className="text-2xl font-bold">
              Live Preview
            </h2>

            <p className="text-sm text-muted-foreground">
              Real-time email preview.
            </p>
          </div>
        </div>

        {/* PREVIEW CARD */}
        <div className="relative z-10 bg-background border border-border rounded-3xl p-6 space-y-5">

          {/* TO */}
          <div className="space-y-1">
            <p className="text-xs uppercase tracking-wide text-muted-foreground">
              Recipient
            </p>

            <div className="flex items-center gap-2 text-sm font-medium">
              <Mail className="w-4 h-4 text-primary" />
              {email || "user@example.com"}
            </div>
          </div>

          {/* TYPE */}
          <div className="space-y-1">
            <p className="text-xs uppercase tracking-wide text-muted-foreground">
              Action
            </p>

            <span
              className={`
                inline-flex
                items-center
                gap-2
                px-4
                py-2
                rounded-full
                text-sm
                font-medium
                ${
                  type === "invite"
                    ? "bg-green-500/15 text-green-500"
                    : "bg-red-500/15 text-red-500"
                }
              `}
            >
              {type === "invite" ? (
                <UserPlus className="w-4 h-4" />
              ) : (
                <UserX className="w-4 h-4" />
              )}

              {type === "invite"
                ? "Invitation Email"
                : "Access Revocation"}
            </span>
          </div>

          {/* MESSAGE */}
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-wide text-muted-foreground">
              Message
            </p>

            <div className="rounded-2xl border border-border bg-card p-5 text-sm leading-7 text-muted-foreground">
              {description || (
                <span className="italic opacity-70">
                  Your email message preview will appear here...
                </span>
              )}
            </div>
          </div>

          {/* FOOTER */}
          <div className="pt-3 border-t border-border text-xs text-muted-foreground flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Automated system-generated email
          </div>

        </div>
      </motion.div>
    </div>
  );
}