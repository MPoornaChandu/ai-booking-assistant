"use client";

import { useState, useRef, useEffect } from "react";
import { SendHorizontal } from "lucide-react";
import { useChat } from "@/context/chat-context";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export function ChatInput() {
  const [input, setInput] = useState("");
  const { sendMessage, isLoading } = useChat();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;
    sendMessage(input);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [input]);

  return (
    <div className="p-4 bg-background/80 backdrop-blur-xl border-t border-white/10">
      <div className="container max-w-4xl mx-auto relative">
        <form 
          onSubmit={handleSubmit}
          className="relative flex items-end gap-2 bg-card/50 border border-white/10 rounded-2xl p-2 focus-within:ring-1 focus-within:ring-primary/50 transition-all shadow-sm"
        >
          <Textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            className="min-h-[44px] max-h-[120px] resize-none border-0 bg-transparent focus-visible:ring-0 px-3 py-3 overflow-y-auto"
            disabled={isLoading}
          />
          <div className="shrink-0 mb-1 mr-1">
            <Button 
              type="submit" 
              size="icon" 
              disabled={!input.trim() || isLoading}
              className="h-10 w-10 rounded-xl bg-primary text-primary-foreground shadow-md transition-transform active:scale-95"
            >
              <SendHorizontal className="w-5 h-5" />
              <span className="sr-only">Send message</span>
            </Button>
          </div>
        </form>
        <div className="text-center mt-2 text-[10px] text-muted-foreground/60">
          Press <kbd className="font-sans px-1 py-0.5 bg-white/5 rounded border border-white/10">Enter</kbd> to send, <kbd className="font-sans px-1 py-0.5 bg-white/5 rounded border border-white/10">Shift + Enter</kbd> for new line
        </div>
      </div>
    </div>
  );
}
