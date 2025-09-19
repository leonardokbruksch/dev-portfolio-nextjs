"use client";

import {
  PromptInput,
  PromptInputButton,
  PromptInputModelSelect,
  PromptInputModelSelectContent,
  PromptInputModelSelectItem,
  PromptInputModelSelectTrigger,
  PromptInputModelSelectValue,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputToolbar,
  PromptInputTools,
} from "@/components/ui/ai/prompt-input";
import { MicIcon, SquareIcon } from "lucide-react";
import { type FormEventHandler, useEffect, useRef, useState } from "react";
import { Bot, User } from "lucide-react";
import { Loader } from "@/components/ui/ai/loader";

type Msg = { role: "user" | "assistant"; content: string };

const MODEL = { id: "gpt-4o-mini", name: "GPT-4o mini" };

export default function AmaChat() {
  const [text, setText] = useState("");
  const [status, setStatus] = useState<"submitted" | "streaming" | "ready" | "error">("ready");
  const [messages, setMessages] = useState<Msg[]>([]);
  const [recording, setRecording] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messages.length > 0) listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, status]);

  const toggleRecording = async () => {
    if (!recording) {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mime = MediaRecorder.isTypeSupported("audio/webm;codecs=opus") ? "audio/webm;codecs=opus" : "audio/webm";
      const mr = new MediaRecorder(stream, { mimeType: mime });
      chunksRef.current = [];
      mr.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) chunksRef.current.push(e.data);
      };
      mr.onstop = async () => {
        const blob = new Blob(chunksRef.current, { type: mime });
        const file = new File([blob], "speech.webm", { type: mime });
        const fd = new FormData();
        fd.append("file", file);
        try {
          const res = await fetch("/api/ama/transcribe", { method: "POST", body: fd });
          const data = await res.json();
          if (data?.text) setText((t) => (t ? `${t} ${data.text}` : data.text));
        } catch {
          setText((t) => (t ? `${t} [transcription failed]` : "[transcription failed]"));
        }
        mr.stream.getTracks().forEach((t) => t.stop());
      };
      mr.start(100);
      mediaRecorderRef.current = mr;
      setRecording(true);
    } else {
      mediaRecorderRef.current?.stop();
      setRecording(false);
    }
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    if (!text.trim() || status === "submitted" || status === "streaming") return;
    const content = text.trim();
    setMessages((m) => [...m, { role: "user", content }]);
    setStatus("submitted");
    setText("");
    try {
      const res = await fetch("/api/ama", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: content }),
      });
      setStatus("streaming");
      const data = await res.json();
      const reply = data?.reply || "Sorry, something went wrong.";
      setMessages((m) => [...m, { role: "assistant", content: reply }]);
      setStatus("ready");
    } catch {
      setMessages((m) => [...m, { role: "assistant", content: "Failed to fetch a response." }]);
      setStatus("error");
    }
  };

  return (
    <>
      <div className="w-full space-y-4">
        {messages.length > 0 && (
          <div ref={listRef} className="h-80 w-full overflow-y-auto rounded-xl border bg-background/40 p-3">
            <div className="space-y-4">
              {messages.map((m, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full border bg-background">
                    {m.role === "user" ? <User className="h-3.5 w-3.5" /> : <Bot className="h-3.5 w-3.5" />}
                  </div>
                  <div className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap leading-relaxed">
                    {m.content}
                  </div>
                </div>
              ))}
              {(status === "submitted" || status === "streaming") && (
                <div className="flex items-center gap-3 text-sm text-foreground/70">
                  <div className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full border bg-background">
                    <Bot className="h-3.5 w-3.5" />
                  </div>
                  <Loader className="text-foreground/70" size={16} />
                  <span>Thinking…</span>
                </div>
              )}
            </div>
          </div>
        )}

        <PromptInput onSubmit={handleSubmit}>
          <PromptInputTextarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type or record your message..."
            disabled={recording}
          />
          <PromptInputToolbar>
            <PromptInputTools>
              <PromptInputButton
                onClick={toggleRecording}
                variant={recording ? "destructive" : "ghost"}
                aria-pressed={recording}
                aria-label={recording ? "Stop recording" : "Start voice recording"}
              >
                {recording ? <SquareIcon size={16} /> : <MicIcon size={16} />}
                <span>{recording ? "Stop" : "Voice"}</span>
                {recording && <span className="ml-2 inline-block h-2 w-2 animate-pulse rounded-full bg-red-500" />}
              </PromptInputButton>

              <PromptInputModelSelect value={MODEL.id} onValueChange={() => { }} disabled>
                <PromptInputModelSelectTrigger className="pointer-events-none">
                  <PromptInputModelSelectValue placeholder={MODEL.name} />
                </PromptInputModelSelectTrigger>
                <PromptInputModelSelectContent>
                  <PromptInputModelSelectItem value={MODEL.id} disabled>
                    {MODEL.name}
                  </PromptInputModelSelectItem>
                </PromptInputModelSelectContent>
              </PromptInputModelSelect>
            </PromptInputTools>
            <PromptInputSubmit disabled={!text || status === "submitted" || status === "streaming"} status={status} />
          </PromptInputToolbar>
        </PromptInput>
      </div>
      <p className="mt-10 text-center text-sm text-foreground/50">AI Chatbot made with Open AI API. Backend built with Next.js router API.</p>
    </>
  );
}
