"use client";

import Link from "next/link";
import { ArrowLeft, Clock, MapPin, Phone, RefreshCcw, Sparkles } from "lucide-react";
import { BUSINESS_CONFIG } from "@/config/business-config";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useChat } from "@/context/chat-context";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

export function ChatSidebar() {
  const { clearChat } = useChat();

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 md:p-6 pb-4 flex items-center justify-between hidden md:flex border-b border-white/10">
        <Link 
          href="/"
          className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "text-muted-foreground hover:text-foreground")}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to site
        </Link>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-6 space-y-8">
          {/* Business Info Header */}
          <div className="text-center space-y-4">
            <div className="w-20 h-20 mx-auto rounded-2xl bg-primary/20 flex items-center justify-center border border-primary/30 shadow-lg shadow-primary/10">
              <Sparkles className="w-10 h-10 text-amber-500" />
            </div>
            <div>
              <h2 className="font-heading font-semibold text-xl">{BUSINESS_CONFIG.name}</h2>
              <p className="text-sm text-amber-500 mt-1 font-medium tracking-wide uppercase">AI Assistant</p>
            </div>
          </div>

          <Separator className="bg-white/10" />

          {/* Quick Info */}
          <div className="space-y-4 text-sm">
            <div className="flex gap-3 text-muted-foreground">
              <MapPin className="w-4 h-4 text-foreground/70 shrink-0 mt-0.5" />
              <span className="leading-relaxed">{BUSINESS_CONFIG.contact.address}</span>
            </div>
            <div className="flex gap-3 text-muted-foreground">
              <Clock className="w-4 h-4 text-foreground/70 shrink-0 mt-0.5" />
              <div>
                <div>Mon-Fri: {BUSINESS_CONFIG.hours.mondayToFriday}</div>
                <div>Sat: {BUSINESS_CONFIG.hours.saturday}</div>
              </div>
            </div>
            <div className="flex gap-3 text-muted-foreground">
              <Phone className="w-4 h-4 text-foreground/70 shrink-0 mt-0.5" />
              <span>{BUSINESS_CONFIG.contact.phone}</span>
            </div>
          </div>

          <Separator className="bg-white/10" />

          <div className="space-y-3">
            <h3 className="text-sm font-medium text-foreground">Services Overview</h3>
            {BUSINESS_CONFIG.services.map(s => (
              <div key={s.id} className="flex justify-between text-sm">
                <span className="text-muted-foreground">{s.name}</span>
                <span className="font-medium">{s.price}</span>
              </div>
            ))}
          </div>
        </div>
      </ScrollArea>

      <div className="p-4 md:p-6 border-t border-white/10 mt-auto bg-card/50">
        <Button 
          variant="outline" 
          className="w-full justify-start text-muted-foreground hover:text-foreground border-white/10"
          onClick={clearChat}
        >
          <RefreshCcw className="w-4 h-4 mr-2" />
          Start New Conversation
        </Button>
      </div>
    </div>
  );
}
