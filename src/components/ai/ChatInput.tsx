"use client";

import { useState, useRef, RefObject } from "react";
import { Send, Mic, Plus, X, Check } from "lucide-react";

export default function ChatInput({
  input,
  onChange,
  onSend,
  isSending,
  inputRef,
}: {
  input: string;
  onChange: (val: string) => void;
  onSend: () => void;
  isSending: boolean;
 inputRef: RefObject<HTMLInputElement | null>;
}) {
  const [showUploadMenu, setShowUploadMenu] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [tempInput, setTempInput] = useState(""); // store typed text before recording

  const fileInputRef = useRef<HTMLInputElement>(null);

  // 🎤 Start Recording
  const startRecording = async () => {
    setTempInput(input); // save typed text
    onChange(""); // clear input UI

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);

      let chunks: BlobPart[] = [];

      recorder.ondataavailable = (e) => {
        chunks.push(e.data);
      };

      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: "audio/webm" });
        setAudioBlob(blob);
      };

      recorder.start();
      setMediaRecorder(recorder);
      setIsRecording(true);
    } catch (err) {
      console.error(err);
    }
  };

  // ❌ Cancel Recording
  const cancelRecording = () => {
    mediaRecorder?.stop();
    setIsRecording(false);
    setAudioBlob(null);

    // restore previous text
    onChange(tempInput);
  };

  // ✅ Submit Recording
  const submitRecording = () => {
    mediaRecorder?.stop();
    setIsRecording(false);

    console.log("Send audio:", audioBlob);

    // clear everything
    setAudioBlob(null);
    setTempInput("");
    onChange(""); // do NOT restore text
  };

  return (
    <div className="p-4 border-t bg-background">
      <div className="relative flex items-center gap-3 bg-muted/40 border border-border rounded-full px-4 py-3 shadow-sm">
        
        {/* ➕ Upload */}
        <button
          onClick={() => setShowUploadMenu((prev) => !prev)}
          className="p-2 rounded-full hover:bg-muted transition"
        >
          <Plus className="h-5 w-5 text-muted-foreground" />
        </button>

        {/* Upload Menu */}
        {showUploadMenu && (
          <div className="absolute bottom-14 left-4 bg-card border border-border rounded-xl shadow-lg p-2 w-48">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-full text-left px-3 py-2 hover:bg-muted rounded-md text-sm"
            >
              📄 Upload File
            </button>
            <button className="w-full text-left px-3 py-2 hover:bg-muted rounded-md text-sm">
              🖼 Upload Image
            </button>
          </div>
        )}

        <input
          ref={fileInputRef}
          type="file"
          hidden
          onChange={(e) => {
            const file = e.target.files?.[0];
            console.log("Selected file:", file);
            setShowUploadMenu(false);
          }}
        />

        {/* 🎤 Recording Mode */}
        {isRecording ? (
          <div className="flex-1 flex items-center justify-between px-2">
            
            {/* Waves */}
            <div className="flex items-center gap-1">
              {[...Array(10)].map((_, i) => (
                <div
                  key={i}
                  className="w-1 bg-red-500 rounded animate-pulse"
                  style={{ height: `${8 + Math.random() * 16}px` }}
                />
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={cancelRecording}
                className="p-2 rounded-full bg-muted hover:bg-muted/70"
              >
                <X className="h-4 w-4" />
              </button>

              <button
                onClick={submitRecording}
                className="p-2 rounded-full bg-green-500 text-white hover:opacity-90"
              >
                <Check className="h-4 w-4" />
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Input */}
            <input
              ref={inputRef}
              type="text"
              placeholder="Ask anything..."
              value={input}
              onChange={(e) => onChange(e.target.value)}
              disabled={isSending}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  onSend();
                }
              }}
              className="flex-1 bg-transparent outline-none text-sm px-2"
            />

            {/* Right Actions */}
            <div className="flex items-center gap-2">
              
              {/* 🎤 Start Recording */}
              <button
                onClick={startRecording}
                className="p-2 rounded-full hover:bg-muted transition"
              >
                <Mic className="h-5 w-5 text-muted-foreground" />
              </button>

              {/* 📤 Send */}
              <button
                onClick={onSend}
                disabled={!input.trim() || isSending}
                className="p-2.5 rounded-full bg-primary text-primary-foreground hover:opacity-90 disabled:opacity-50"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}