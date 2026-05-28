"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export function AnimatedGradientBg({ className }: { className?: string }) {
  return (
    <div className={cn("fixed inset-0 overflow-hidden -z-10 pointer-events-none", className)}>
      <motion.div
        className="absolute -top-[40%] -left-[10%] w-[70%] h-[70%] rounded-full bg-primary/20 blur-[120px]"
        animate={{
          x: [0, 50, 0],
          y: [0, -30, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute top-[20%] -right-[10%] w-[60%] h-[60%] rounded-full bg-amber-500/10 blur-[120px]"
        animate={{
          x: [0, -40, 0],
          y: [0, 50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />
      <div className="absolute inset-0 bg-background/40 backdrop-blur-[1px]" />
    </div>
  );
}
