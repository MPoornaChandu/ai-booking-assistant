"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Sparkles, MessageSquare } from "lucide-react";
import { BUSINESS_CONFIG } from "@/config/business-config";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Navbar() {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 w-full glass border-b border-white/5"
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-primary/20 p-2 rounded-lg group-hover:bg-primary/30 transition-colors">
            <Sparkles className="w-5 h-5 text-amber-500" />
          </div>
          <span className="font-heading font-semibold text-lg tracking-tight">
            {BUSINESS_CONFIG.name}
          </span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
          <Link href="#features" className="hover:text-foreground transition-colors">Features</Link>
          <Link href="#how-it-works" className="hover:text-foreground transition-colors">How it Works</Link>
        </nav>
        
        <div className="flex items-center gap-4">
          <Link href="/dashboard" className="hidden sm:block text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Dashboard
          </Link>
          <Link 
            href="/chat" 
            className={cn(buttonVariants(), "bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20 group rounded-full px-6")}
          >
            <MessageSquare className="w-4 h-4 mr-2 group-hover:animate-pulse-slow" />
            Book Now
          </Link>
        </div>
      </div>
    </motion.header>
  );
}
