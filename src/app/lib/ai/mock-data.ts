import { Message } from "./types";

export const initialMessages: Message[] = [
  {
    id: crypto.randomUUID(),
    role: "ai",
    content:
      "Hello 👋 I'm your AI Manager Assistant.\n\nYou can ask me about jobs, partnerships, subscriptions, or request reports.",
    timestamp: new Date(),
  },
];