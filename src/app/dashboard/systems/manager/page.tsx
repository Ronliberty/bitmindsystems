// "use client";

// import { useState, useRef, useEffect } from "react";
// import { motion } from "framer-motion";
// import { Bot, User, Send, Mic, Sparkles } from "lucide-react";

// export default function ManagerOverviewAI() {
//   const [messages, setMessages] = useState([
//     {
//       role: "ai",
//       content:
//         "Hello 👋 I'm your AI Manager Assistant.\n\nYou can ask me about jobs, partnerships, subscriptions, or request reports.",
//     },
//   ]);

//   const [input, setInput] = useState("");
//   const bottomRef = useRef<HTMLDivElement | null>(null);

//   const sendMessage = () => {
//     if (!input.trim()) return;

//     const updated = [
//       ...messages,
//       { role: "user", content: input },
//       {
//         role: "ai",
//         content: "Thinking... (connect this to your backend AI)",
//       },
//     ];

//     setMessages(updated);
//     setInput("");
//   };

//   // ✅ Auto-scroll
//   useEffect(() => {
//     bottomRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   return (
//     <div className="flex flex-col h-full">
      
//       {/* Header */}
//       <div className="mb-4 flex items-center justify-between">
//         <div className="flex items-center gap-3">
//           <Bot className="w-6 h-6 text-primary" />
//           <div>
//             <h2 className="font-semibold text-lg">AI Manager Assistant</h2>
//             <p className="text-xs text-muted-foreground">
//               Ask anything about your system
//             </p>
//           </div>
//         </div>
//         <Sparkles className="w-5 h-5 text-yellow-500" />
//       </div>

//       {/* Chat Container */}
//       <div className="flex flex-col flex-1 bg-card border border-border rounded-xl overflow-hidden">
        
//         {/* Messages */}
//         <div className="flex-1 overflow-y-auto p-6 space-y-5">
//           {messages.map((msg, i) => (
//             <motion.div
//               key={i}
//               initial={{ opacity: 0, y: 10 }}
//               animate={{ opacity: 1, y: 0 }}
//               className={`flex items-start gap-3 ${
//                 msg.role === "user" ? "justify-end" : ""
//               }`}
//             >
//               {msg.role === "ai" && (
//                 <Bot className="w-5 h-5 mt-1 text-primary" />
//               )}

//               <div
//                 className={`max-w-2xl px-4 py-3 rounded-2xl text-sm whitespace-pre-line leading-relaxed ${
//                   msg.role === "user"
//                     ? "bg-primary text-primary-foreground"
//                     : "bg-muted"
//                 }`}
//               >
//                 {msg.content}
//               </div>

//               {msg.role === "user" && (
//                 <User className="w-5 h-5 mt-1 text-primary" />
//               )}
//             </motion.div>
//           ))}

//           {/* Auto scroll anchor */}
//           <div ref={bottomRef} />
//         </div>

//         {/* Quick Prompts */}
//         <div className="px-6 py-3 border-t border-border flex flex-wrap gap-2">
//           {[
//             "Show inactive partnerships",
//             "How many jobs expired?",
//             "Generate subscription report",
//           ].map((q) => (
//             <button
//               key={q}
//               onClick={() => setInput(q)}
//               className="text-xs px-3 py-1 rounded-full bg-muted hover:bg-muted/80 transition"
//             >
//               {q}
//             </button>
//           ))}
//         </div>

//         {/* Input */}
//         <div className="p-4 border-t border-border flex items-center gap-3 bg-background">
          
//           {/* Voice */}
//           <button className="p-2 rounded-full bg-muted hover:bg-muted/80 transition">
//             <Mic className="w-5 h-5" />
//           </button>

//           <input
//             type="text"
//             placeholder="Ask your AI assistant..."
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//             onKeyDown={(e) => e.key === "Enter" && sendMessage()}
//             className="flex-1 px-4 py-2 rounded-xl bg-card border border-border focus:outline-none"
//           />

//           <button
//             onClick={sendMessage}
//             className="p-2 rounded-xl bg-primary text-primary-foreground hover:opacity-90 transition"
//           >
//             <Send className="w-5 h-5" />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// "use client";

// import { useState, useRef, useEffect } from "react";
// import { motion } from "framer-motion";
// import { Bot, User, Send, Mic, Sparkles, Copy } from "lucide-react";
// import { toast } from "sonner";

// type Message = {
//   id: string;
//   role: "user" | "ai";
//   content: string;
//   timestamp: Date;
// };

// const initialMessages: Message[] = [
//   {
//     id: crypto.randomUUID(),
//     role: "ai",
//     content:
//       "Hello 👋 I'm your AI Manager Assistant.\n\nYou can ask me about jobs, partnerships, subscriptions, or request reports.",
//     timestamp: new Date(),
//   },
// ];

// export default function ManagerOverviewAI() {
//   const [messages, setMessages] = useState<Message[]>(initialMessages);
//   const [input, setInput] = useState("");
//   const [isSending, setIsSending] = useState(false);

//   const messagesEndRef = useRef<HTMLDivElement>(null);
//   const inputRef = useRef<HTMLInputElement>(null);

//   const scrollToBottom = (behavior: "smooth" | "auto" = "smooth") => {
//     messagesEndRef.current?.scrollIntoView({ behavior });
//   };

//   useEffect(() => {
//     const container = messagesEndRef.current?.parentElement;
//     if (!container) return;

//     const isNearBottom =
//       container.scrollHeight - container.scrollTop - container.clientHeight < 180;

//     if (isNearBottom || messages.length < 4) {
//       scrollToBottom(messages.length <= 4 ? "auto" : "smooth");
//     }
//   }, [messages]);

//   const handleSend = () => {
//     if (!input.trim() || isSending) return;

//     const userMessage: Message = {
//       id: crypto.randomUUID(),
//       role: "user",
//       content: input.trim(),
//       timestamp: new Date(),
//     };

//     const thinkingMessage: Message = {
//       id: crypto.randomUUID(),
//       role: "ai",
//       content: "",
//       timestamp: new Date(),
//     };

//     setMessages((prev) => [...prev, userMessage, thinkingMessage]);
//     setInput("");
//     setIsSending(true);
//     inputRef.current?.blur();

//     // Simulate backend AI response
//     setTimeout(() => {
//       setMessages((prev) =>
//         prev.map((m) =>
//           m.id === thinkingMessage.id
//             ? {
//                 ...m,
//                 content:
//                   "This is a simulated AI response.\n\nYou can ask me to:\n• List inactive partnerships\n• Count expired jobs last quarter\n• Summarize subscription metrics",
//               }
//             : m
//         )
//       );
//       setIsSending(false);
//       inputRef.current?.focus();
//     }, 1400);
//   };

//   const handleCopy = async (text: string) => {
//     try {
//       await navigator.clipboard.writeText(text);
//       toast.success("Copied", { duration: 1600 });
//     } catch {
//       toast.error("Copy failed");
//     }
//   };

//   return (
//     <div className="flex flex-col h-full space-y-6">
//       {/* Page Header */}
//       <motion.div
//         initial={{ opacity: 0, y: -8 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="flex items-center justify-between"
//       >
//         <div className="flex items-center gap-3">
//           <div className="rounded-lg bg-primary/10 p-2.5">
//             <Bot className="h-6 w-6 text-primary" />
//           </div>
//           <div>
//             <h2 className="text-lg font-semibold tracking-tight">
//               AI Manager Assistant
//             </h2>
//             <p className="text-sm text-muted-foreground">
//               Ask anything about jobs, partnerships, reports…
//             </p>
//           </div>
//         </div>
//         <Sparkles className="h-5 w-5 text-yellow-500/70" />
//       </motion.div>

//       {/* Chat Card */}
//       <div className="flex flex-col flex-1 bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
//         {/* Messages */}
//         <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
//           {messages.map((msg) => (
//             <MessageBubble
//               key={msg.id}
//               msg={msg}
//               isSending={isSending && msg.role === "ai" && !msg.content}
//               onCopy={handleCopy}
//             />
//           ))}
//           <div ref={messagesEndRef} />
//         </div>

//         {/* Quick Prompts */}
//         <div className="px-6 py-3.5 border-t bg-muted/30 flex flex-wrap gap-2">
//           {[
//             "Show inactive partnerships",
//             "How many jobs expired?",
//             "Generate subscription report",
//           ].map((prompt) => (
//             <button
//               key={prompt}
//               onClick={() => {
//                 setInput(prompt);
//                 inputRef.current?.focus();
//               }}
//               className="text-xs px-3.5 py-1.5 rounded-full bg-background border border-border hover:bg-muted transition-colors"
//             >
//               {prompt}
//             </button>
//           ))}
//         </div>

//         {/* Input */}
//         <div className="p-4 border-t bg-background flex items-center gap-3">
//           <button
//             type="button"
//             className="p-2.5 rounded-full hover:bg-muted transition-colors"
//             aria-label="Voice input (coming soon)"
//             disabled
//           >
//             <Mic className="h-5 w-5 text-muted-foreground" />
//           </button>

//           <input
//             ref={inputRef}
//             type="text"
//             placeholder="Ask your AI assistant anything..."
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//             onKeyDown={(e) => {
//               if (e.key === "Enter" && !e.shiftKey) {
//                 e.preventDefault();
//                 handleSend();
//               }
//             }}
//             disabled={isSending}
//             className="flex-1 px-4 py-3 rounded-xl bg-muted/50 border border-border focus:border-primary/60 focus:ring-1 focus:ring-primary/20 outline-none transition-all disabled:opacity-60"
//           />

//           <button
//             onClick={handleSend}
//             disabled={!input.trim() || isSending}
//             className="p-3 rounded-xl bg-primary text-primary-foreground hover:opacity-90 disabled:opacity-50 disabled:pointer-events-none transition-all"
//             aria-label="Send message"
//           >
//             <Send className="h-5 w-5" />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// // Message Bubble
// function MessageBubble({
//   msg,
//   isSending,
//   onCopy,
// }: {
//   msg: Message;
//   isSending: boolean;
//   onCopy: (text: string) => Promise<void>;
// }) {
//   const isUser = msg.role === "user";

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 16 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ type: "spring", stiffness: 340, damping: 26 }}
//       className={`flex items-start gap-3 group ${isUser ? "justify-end" : ""}`}
//     >
//       {!isUser && (
//         <div className="mt-0.5 rounded-full bg-primary/10 p-2 shrink-0">
//           <Bot className="h-5 w-5 text-primary" />
//         </div>
//       )}

//       <div
//         className={`
//           relative max-w-[86%] sm:max-w-[78%] px-4 py-3.5 rounded-2xl text-sm leading-relaxed
//           shadow-sm border transition-colors duration-150
//           ${isUser
//             ? "bg-primary text-primary-foreground rounded-br-none border-primary/30 ml-auto"
//             : "bg-muted/70 rounded-bl-none border-border/40 mr-auto"
//           }
//         `}
//       >
//         {isSending ? (
//           <div className="flex items-center gap-1.5 py-1.5 px-1">
//             <div className="size-2 rounded-full bg-primary/60 animate-bounce [animation-delay:-0.32s]"></div>
//             <div className="size-2 rounded-full bg-primary/60 animate-bounce [animation-delay:-0.16s]"></div>
//             <div className="size-2 rounded-full bg-primary/60 animate-bounce"></div>
//           </div>
//         ) : (
//           <div className="whitespace-pre-line">{msg.content}</div>
//         )}

//         {!isUser && !isSending && msg.content && (
//           <button
//             onClick={() => onCopy(msg.content)}
//             className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity p-1.5 hover:bg-muted rounded-full"
//             title="Copy response"
//           >
//             <Copy className="h-3.5 w-3.5 text-muted-foreground" />
//           </button>
//         )}
//       </div>

//       {isUser && (
//         <div className="mt-0.5 rounded-full bg-primary/10 p-2 shrink-0">
//           <User className="h-5 w-5 text-primary" />
//         </div>
//       )}
//     </motion.div>
//   );
// }



"use client";

import ManagerOverviewAI from "@/components/ai/ManagerOverviewAI";

export default function ManagerPage() {
  return (
    <div className="h-full flex flex-col">
      <ManagerOverviewAI />
    </div>
  );
}