"use client";

import { useState } from "react";

import EmailForm from "@/components/email/EmailForm";
import EmailList from "@/components/email/EmailList";
import EmailTabs from "@/components/email/EmailTabs";

import {
  EmailAction,
} from "@/types/admin/types";

import {
  sendEmailAction,
} from "@/services/admin/api";

export default function Page() {

  const [data, setData] = useState<EmailAction[]>([
    {
      id: "1",
      email: "john@example.com",
      type: "invite",
      description: "Join our platform",
      status: "sent",
      createdAt: "2026-05-12",
    },
  ]);

  const [loading, setLoading] = useState(false);

  async function handleSubmit(item: {
    email: string;
    type: "invite" | "revoke";
    description: string;
  }) {

    /* =========================================
       CREATE TEMP RECORD
    ========================================= */

    const tempId = crypto.randomUUID();

    const pendingItem: EmailAction = {
      id: tempId,
      email: item.email,
      type: item.type,
      description: item.description,
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    /* =========================================
       OPTIMISTIC UPDATE
    ========================================= */

    setData((prev) => [
      pendingItem,
      ...prev,
    ]);

    try {

      setLoading(true);

      /* =========================================
         SUBJECT
      ========================================= */

      let subject = "";

      if (item.type === "invite") {

        subject =
          "You're Invited to BitMind Systems";

      } else if (item.type === "revoke") {

        subject =
          "Your Access Has Been Revoked";

      } else {

        subject =
          "Notification from BitMind Systems";
      }

      /* =========================================
         SEND API REQUEST
      ========================================= */

      const res = await sendEmailAction({
        email: item.email,
        type: item.type,
        subject,
        message: item.description,
      });

      console.log(res);

      /* =========================================
         UPDATE STATUS SUCCESS
      ========================================= */

      setData((prev) =>
        prev.map((mail) =>
          mail.id === tempId
            ? {
                ...mail,
                status: "sent",
              }
            : mail
        )
      );

    } catch (err: any) {

      console.error(err);

      /* =========================================
         UPDATE STATUS FAILED
      ========================================= */

      setData((prev) =>
        prev.map((mail) =>
          mail.id === tempId
            ? {
                ...mail,
                status: "failed",
              }
            : mail
        )
      );

      alert(
        err?.message ||
        "Failed to send email"
      );

    } finally {

      setLoading(false);
    }
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">

      <EmailTabs>
        {(tab) => (
          <>
            {tab === "compose" && (
              <EmailForm
                onSubmit={handleSubmit}
              />
            )}

            {tab === "history" && (
              <EmailList
                data={data}
              />
            )}
          </>
        )}
      </EmailTabs>

      {/* ================= LOADING ================= */}

      {loading && (
        <div className="text-center text-sm text-muted-foreground">
          Sending email...
        </div>
      )}

    </div>
  );
}