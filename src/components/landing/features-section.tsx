"use client";

import { motion } from "motion/react";
import { MessageSquare, CalendarCheck, Clock, ShieldCheck, Zap, HeartHandshake } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  {
    title: "Conversational Booking",
    description: "Chat naturally with our AI to find the perfect slot. No more clunky forms or calendars.",
    icon: MessageSquare,
  },
  {
    title: "Smart Scheduling",
    description: "Real-time availability checking ensures you only see slots that actually work for you.",
    icon: CalendarCheck,
  },
  {
    title: "24/7 Availability",
    description: "Book an appointment at 2 AM or on a Sunday. Our assistant never sleeps.",
    icon: Clock,
  },
  {
    title: "Instant Qualification",
    description: "Our AI helps figure out exactly which service or package matches your specific needs.",
    icon: Zap,
  },
  {
    title: "Secure & Private",
    description: "Your details are kept completely private and only shared directly with the business owner.",
    icon: ShieldCheck,
  },
  {
    title: "Premium Experience",
    description: "Enjoy a luxurious, VIP booking flow that respects your time and preferences.",
    icon: HeartHandshake,
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-24 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">
            Why Book with AI?
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            We've reimagined the booking experience to make it faster, smarter, and infinitely more pleasant.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="glass-card border-white/5 bg-card/20 hover:bg-card/40 transition-colors h-full">
                <CardHeader>
                  <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center mb-4 text-amber-500">
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
