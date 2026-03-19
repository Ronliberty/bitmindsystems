"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Bot, Sparkles } from "lucide-react";
import { toast } from "sonner";

import MessageBubble from "./MessageBubble";
import QuickPrompts from "./QuickPrompts";
import ChatInput from "./ChatInput";

type Message = {
  id: string;
  role: "user" | "ai";
  content: string;
  timestamp: Date;
};

const initialMessages: Message[] = [
  {
    id: crypto.randomUUID(),
    role: "ai",
    content:
      "Hello 👋 I'm your AI Manager Assistant.\n\nYou can ask me about jobs, partnerships, subscriptions, or request reports.",
    timestamp: new Date(),
  },
];

const defaultPrompts = [
  "Show inactive partnerships",
  "How many jobs expired?",
  "Generate subscription report",
];

export default function ManagerOverviewAI() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [showPrompts, setShowPrompts] = useState(true);
  const scrollToBottom = (behavior: "smooth" | "auto" = "smooth") => {
    messagesEndRef.current?.scrollIntoView({ behavior });
  };

  useEffect(() => {
    const container = messagesEndRef.current?.parentElement;
    if (!container) return;

    const isNearBottom =
      container.scrollHeight - container.scrollTop - container.clientHeight < 180;

    if (isNearBottom || messages.length < 4) {
      scrollToBottom(messages.length <= 4 ? "auto" : "smooth");
    }
  }, [messages]);

  const handleSend = () => {
    if (!input.trim() || isSending) return;

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    };

    const thinkingMessage: Message = {
      id: crypto.randomUUID(),
      role: "ai",
      content: "",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage, thinkingMessage]);
    setInput("");
    setIsSending(true);
    inputRef.current?.blur();

    // Simulate AI response
    setTimeout(() => {
      setMessages((prev) =>
        prev.map((m) =>
          m.id === thinkingMessage.id
            ? {
                ...m,
                content:
                  "This is a simulated AI response.\n\nYou can ask me to:\n• List inactive partnerships\n• Count expired jobs last quarter\n• Summarize subscription metrics",
              }
            : m
        )
      );
      setIsSending(false);
      inputRef.current?.focus();
    }, 1400);
  };

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Copied", { duration: 1600 });
    } catch {
      toast.error("Copy failed");
    }
  };

  return (
    <div className="flex flex-col h-full space-y-6">
      {/* Header */}
      {/* <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-primary/10 p-2.5">
            <Bot className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h2 className="text-lg font-semibold tracking-tight">
              AI Manager Assistant
            </h2>
            <p className="text-sm text-muted-foreground">
              Ask anything about jobs, partnerships, reports…
            </p>
          </div>
        </div>
        <Sparkles className="h-5 w-5 text-yellow-500/70" />
      </motion.div> */}

      {/* Chat Card */}
      <div className="flex flex-col flex-1 bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
          {messages.map((msg) => (
            <MessageBubble
              key={msg.id}
              msg={msg}
              isSending={isSending && msg.role === "ai" && !msg.content}
              onCopy={handleCopy}
            />
          ))}
          <div ref={messagesEndRef} />
        </div>

        {showPrompts && (
        <QuickPrompts
            prompts={defaultPrompts}
            onSelect={(p) => {
            setInput(p);
            inputRef.current?.focus();
            }}
            onClose={() => setShowPrompts(false)}
        />
        )}

        <ChatInput
          input={input}
          onChange={setInput}
          onSend={handleSend}
          isSending={isSending}
          inputRef={inputRef}
        />
      </div>
    </div>
  );
}