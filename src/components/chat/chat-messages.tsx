"use client";

import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import { useChat } from "@/context/chat-context";
import { ChatBubble, TypingIndicator } from "./chat-bubble";
import { BUSINESS_CONFIG } from "@/config/business-config";
import { QuickActions } from "./quick-actions";
import { LeadForm } from "./lead-form";

export function ChatMessages() {
  const { messages, isLoading, bookingIntent } = useChat();
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages, isLoading]);

  return (
    <div className="flex-1 overflow-y-auto scrollbar-hide" ref={scrollRef}>
      <div className="container max-w-4xl mx-auto px-4 py-8 flex flex-col gap-6">
        
        {/* Welcome Message */}
        {messages.length === 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12 px-4"
          >
            <div className="inline-flex items-center justify-center p-3 rounded-full bg-primary/10 mb-6">
              <span className="text-4xl">✨</span>
            </div>
            <h2 className="text-2xl font-heading font-semibold mb-2">
              Welcome to {BUSINESS_CONFIG.name}
            </h2>
            <p className="text-muted-foreground max-w-md mx-auto mb-8">
              I'm your personal AI concierge. How can I help you today?
            </p>
            
            <QuickActions />
          </motion.div>
        )}

        {/* Message List */}
        {messages.map((msg, idx) => (
          <ChatBubble 
            key={msg.id} 
            message={msg} 
            isLatest={idx === messages.length - 1} 
          />
        ))}

        {/* Typing Indicator */}
        {isLoading && <TypingIndicator />}
        
        {/* Conditional Lead Capture Form */}
        {bookingIntent && !isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <LeadForm />
          </motion.div>
        )}
        
        {/* Bottom Padding */}
        <div className="h-4 shrink-0" />
      </div>
    </div>
  );
}
