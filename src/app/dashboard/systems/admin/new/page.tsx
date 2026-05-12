"use client";

import { useState } from "react";
import EmailForm from "@/components/email/EmailForm";
import EmailList from "@/components/email/EmailList";
import EmailTabs from "@/components/email/EmailTabs";
import { EmailAction } from "@/types/admin/types";

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

  const handleSubmit = (item: any) => {
    const newItem: EmailAction = {
      id: Math.random().toString(),
      email: item.email,
      type: item.type,
      description: item.description,
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    setData([newItem, ...data]);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">

      <EmailTabs>
        {(tab) => (
          <>
            {tab === "compose" && (
              <EmailForm onSubmit={handleSubmit} />
            )}

            {tab === "history" && (
              <EmailList data={data} />
            )}
          </>
        )}
      </EmailTabs>

    </div>
  );
}