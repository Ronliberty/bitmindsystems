"use client";

import { Message } from "@/app/lib/ai/types";
import { motion } from "framer-motion";
import { Bot, User, Copy } from "lucide-react";
import { toast } from "sonner";


export default function MessageBubble({
  msg,
  isSending,
  onCopy,
}: {
  msg: Message;
  isSending: boolean;
  onCopy: (text: string) => Promise<void>;
}) {
  const isUser = msg.role === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 340, damping: 26 }}
      className={`flex items-start gap-3 group ${isUser ? "justify-end" : ""}`}
    >
      {!isUser && (
        <div className="mt-0.5 rounded-full bg-primary/10 p-2 shrink-0">
          <Bot className="h-5 w-5 text-primary" />
        </div>
      )}

      <div
        className={`relative max-w-[86%] sm:max-w-[78%] px-4 py-3.5 rounded-2xl text-sm leading-relaxed
          shadow-sm border transition-colors duration-150
          ${
            isUser
              ? "bg-primary text-primary-foreground rounded-br-none border-primary/30 ml-auto"
              : "bg-muted/70 rounded-bl-none border-border/40 mr-auto"
          }`}
      >
        {isSending ? (
          <div className="flex items-center gap-1.5 py-1.5 px-1">
            <div className="size-2 rounded-full bg-primary/60 animate-bounce [animation-delay:-0.32s]"></div>
            <div className="size-2 rounded-full bg-primary/60 animate-bounce [animation-delay:-0.16s]"></div>
            <div className="size-2 rounded-full bg-primary/60 animate-bounce"></div>
          </div>
        ) : (
          <div className="whitespace-pre-line">{msg.content}</div>
        )}

        {!isUser && !isSending && msg.content && (
          <button
            onClick={() => onCopy(msg.content)}
            className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity p-1.5 hover:bg-muted rounded-full"
            title="Copy response"
          >
            <Copy className="h-3.5 w-3.5 text-muted-foreground" />
          </button>
        )}
      </div>

      {isUser && (
        <div className="mt-0.5 rounded-full bg-primary/10 p-2 shrink-0">
          <User className="h-5 w-5 text-primary" />
        </div>
      )}
    </motion.div>
  );
}