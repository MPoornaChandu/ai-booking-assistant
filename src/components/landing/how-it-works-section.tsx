"use client";

import { motion } from "motion/react";
import { MessageCircleQuestion, Sparkles, CheckCircle } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Ask a Question",
    description: "Start a chat and tell us what you're looking for. Example: 'Do you have any massage slots tomorrow evening?'",
    icon: MessageCircleQuestion,
  },
  {
    number: "02",
    title: "Get Recommendations",
    description: "Our AI instantly checks availability and suggests the best packages or time slots based on your needs.",
    icon: Sparkles,
  },
  {
    number: "03",
    title: "Confirm Booking",
    description: "Provide your basic details right in the chat and we'll secure your spot immediately.",
    icon: CheckCircle,
  },
];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-24 bg-primary/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">
            How It Works
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Three simple steps to secure your premium experience.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connecting line for desktop */}
          <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-[1px] bg-gradient-to-r from-transparent via-border to-transparent" />
          
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="relative text-center"
            >
              <div className="w-24 h-24 mx-auto bg-background border border-white/10 rounded-full flex items-center justify-center mb-6 relative z-10 shadow-xl shadow-primary/5">
                <step.icon className="w-10 h-10 text-amber-500" />
                <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center">
                  {step.number}
                </div>
              </div>
              <h3 className="text-2xl font-semibold mb-3">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
