"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Menu } from "lucide-react";
import { ChatSidebar } from "./chat-sidebar";
import { ChatMessages } from "./chat-messages";
import { ChatInput } from "./chat-input";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { BUSINESS_CONFIG } from "@/config/business-config";

export function ChatLayout() {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  return (
    <div className="flex h-full w-full">
      {/* Desktop Sidebar */}
      <div className="hidden md:block w-80 lg:w-96 border-r border-white/10 bg-card/30">
        <ChatSidebar />
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col relative bg-[url('/bg-pattern.svg')] bg-repeat opacity-95">
        <div className="absolute inset-0 bg-background/90 backdrop-blur-sm -z-10" />
        
        {/* Mobile Header */}
        <div className="md:hidden flex items-center justify-between p-4 border-b border-white/10 bg-background/80 backdrop-blur-md">
          <Link href="/" className={cn(buttonVariants({ variant: "ghost", size: "icon" }))}>
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="font-heading font-semibold text-center leading-tight">
            <div className="text-sm">{BUSINESS_CONFIG.name}</div>
            <div className="text-xs text-muted-foreground">AI Assistant</div>
          </div>
          <Sheet open={isMobileSidebarOpen} onOpenChange={setIsMobileSidebarOpen}>
            <SheetTrigger className={cn(buttonVariants({ variant: "ghost", size: "icon" }))}>
              <Menu className="w-5 h-5" />
            </SheetTrigger>
            <SheetContent side="right" className="p-0 border-white/10">
              <ChatSidebar />
            </SheetContent>
          </Sheet>
        </div>

        <ChatMessages />
        <ChatInput />
      </div>
    </div>
  );
}
