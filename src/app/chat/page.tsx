"use client";

import { ChatProvider } from "@/context/chat-context";
import { ChatLayout } from "@/components/chat/chat-layout";

export default function ChatPage() {
  return (
    <div className="h-screen flex flex-col overflow-hidden bg-background">
      <ChatProvider>
        <ChatLayout />
      </ChatProvider>
    </div>
  );
}
