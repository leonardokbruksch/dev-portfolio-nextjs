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
import { MicIcon } from "lucide-react";
import { type FormEventHandler, useEffect, useRef, useState } from "react";
import { Bot, User } from "lucide-react";
import { Loader } from "@/components/ui/ai/loader";

type Msg = { role: "user" | "assistant"; content: string };

const MODEL = { id: "gpt-4o-mini", name: "GPT-4o mini" };

export default function AmaChat() {
  const [text, setText] = useState("");
  const [status, setStatus] = useState<"submitted" | "streaming" | "ready" | "error">("ready");
  const [messages, setMessages] = useState<Msg[]>([]);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messages.length > 0) listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, status]);

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
          placeholder="Type your message..."
        />
        <PromptInputToolbar>
          <PromptInputTools>
            <PromptInputButton>
              <MicIcon size={16} />
              <span>Voice</span>
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
  );
}
