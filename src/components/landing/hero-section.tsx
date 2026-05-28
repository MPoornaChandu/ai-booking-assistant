"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { BUSINESS_CONFIG } from "@/config/business-config";

export function HeroSection() {
  return (
    <section className="relative pt-24 pb-32 md:pt-32 md:pb-40 overflow-hidden">
      <div className="container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-sm font-medium text-amber-500 mb-8"
        >
          <Sparkles className="w-4 h-4" />
          <span>AI-Powered Booking Experience</span>
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl md:text-7xl font-heading font-bold tracking-tight mb-6 max-w-4xl mx-auto"
        >
          Book Your Next Session <br className="hidden md:block" />
          with <span className="text-gradient-gold">Intelligent Ease</span>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed"
        >
          Experience {BUSINESS_CONFIG.brandTone} service before you even arrive. 
          Our AI assistant is ready 24/7 to help you find the perfect time and package at {BUSINESS_CONFIG.name}.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link 
            href="/chat"
            className={cn(buttonVariants({ size: "lg" }), "h-14 px-8 text-lg rounded-full w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground shadow-xl shadow-primary/20")}
          >
            Start Booking Now
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
          <Link 
            href="#how-it-works"
            className={cn(buttonVariants({ variant: "outline", size: "lg" }), "h-14 px-8 text-lg rounded-full w-full sm:w-auto glass-card hover:bg-white/5 border-white/10")}
          >
            See How It Works
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-16 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-sm text-muted-foreground font-medium"
        >
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-amber-500" />
            <span>24/7 Availability</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-amber-500" />
            <span>Instant Confirmation</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-amber-500" />
            <span>Smart Recommendations</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
