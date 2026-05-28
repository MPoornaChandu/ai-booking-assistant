"use client";

import { motion } from "motion/react";
import { useChat } from "@/context/chat-context";
import { Button } from "@/components/ui/button";

const QUICK_QUESTIONS = [
  "What are your available slots?",
  "Show me your packages",
  "What's the pricing?",
  "Where are you located?",
  "Cancellation policy?",
  "Any current offers?"
];

export function QuickActions() {
  const { sendMessage, isLoading } = useChat();

  return (
    <div className="flex flex-wrap justify-center gap-2 max-w-2xl mx-auto">
      {QUICK_QUESTIONS.map((question, idx) => (
        <motion.div
          key={question}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: idx * 0.05 }}
        >
          <Button
            variant="outline"
            size="sm"
            onClick={() => sendMessage(question)}
            disabled={isLoading}
            className="rounded-full bg-card/50 hover:bg-primary hover:text-primary-foreground border-white/10 transition-colors"
          >
            {question}
          </Button>
        </motion.div>
      ))}
    </div>
  );
}
