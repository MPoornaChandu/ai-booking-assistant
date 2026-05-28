"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

export function CtaSection() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="glass-card rounded-3xl p-10 md:p-16 text-center max-w-4xl mx-auto border border-primary/20 bg-primary/5"
        >
          <h2 className="text-3xl md:text-5xl font-heading font-bold mb-6">
            Ready to Transform Your <br className="hidden md:block" />
            <span className="text-gradient-gold">Booking Experience?</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            Stop waiting on hold. Start chatting with our AI assistant to find your perfect appointment time instantly.
          </p>
          <Link 
            href="/chat"
            className={cn(buttonVariants({ size: "lg" }), "h-14 px-8 text-lg rounded-full bg-amber-500 hover:bg-amber-600 text-primary-foreground shadow-xl shadow-amber-500/20 group")}
          >
            Launch AI Assistant
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
      
      {/* Decorative background blobs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl aspect-square bg-primary/20 rounded-full blur-[100px] -z-10" />
    </section>
  );
}
