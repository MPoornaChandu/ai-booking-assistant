"use client";

import { motion } from "motion/react";
import { Sparkles, User } from "lucide-react";
import { Message } from "@/lib/types";
import { cn } from "@/lib/utils";

interface ChatBubbleProps {
  message: Message;
  isLatest: boolean;
}

export function ChatBubble({ message, isLatest }: ChatBubbleProps) {
  const isAI = message.role === "assistant";

  return (
    <motion.div
      initial={isLatest ? { opacity: 0, y: 10, scale: 0.95 } : false}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "flex w-full gap-4 max-w-3xl mx-auto",
        isAI ? "justify-start" : "justify-end"
      )}
    >
      {/* AI Avatar */}
      {isAI && (
        <div className="w-8 h-8 md:w-10 md:h-10 shrink-0 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30 mt-auto mb-1">
          <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-amber-500" />
        </div>
      )}

      {/* Message Bubble */}
      <div
        className={cn(
          "relative px-4 py-3 md:px-5 md:py-4 text-[15px] leading-relaxed shadow-sm",
          isAI 
            ? "bg-card border border-white/10 rounded-2xl rounded-bl-sm text-foreground" 
            : "bg-primary text-primary-foreground rounded-2xl rounded-br-sm"
        )}
      >
        <p className="whitespace-pre-wrap">{message.content}</p>
        
        <div className={cn(
          "text-[10px] md:text-xs mt-2 opacity-50 flex items-center gap-2",
          isAI ? "justify-start" : "justify-end"
        )}>
          {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>

      {/* User Avatar */}
      {!isAI && (
        <div className="w-8 h-8 md:w-10 md:h-10 shrink-0 rounded-full bg-muted flex items-center justify-center border border-white/10 mt-auto mb-1">
          <User className="w-4 h-4 md:w-5 md:h-5 text-muted-foreground" />
        </div>
      )}
    </motion.div>
  );
}

export function TypingIndicator() {
  return (
    <div className="flex w-full gap-4 max-w-3xl mx-auto justify-start">
      <div className="w-8 h-8 md:w-10 md:h-10 shrink-0 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30 mt-auto mb-1">
        <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-amber-500" />
      </div>
      <div className="bg-card border border-white/10 rounded-2xl rounded-bl-sm px-5 py-4 flex items-center gap-1 shadow-sm">
        <motion.div className="w-2 h-2 rounded-full bg-muted-foreground/50" animate={{ y: [0, -5, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0 }} />
        <motion.div className="w-2 h-2 rounded-full bg-muted-foreground/50" animate={{ y: [0, -5, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }} />
        <motion.div className="w-2 h-2 rounded-full bg-muted-foreground/50" animate={{ y: [0, -5, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }} />
      </div>
    </div>
  );
}
