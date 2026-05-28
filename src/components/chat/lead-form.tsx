"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { CheckCircle2, User, Phone, CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lead } from "@/lib/types";
import { useChat } from "@/context/chat-context";

export function LeadForm() {
  const { leadScore, conversationId } = useChat();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    date: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;

    // Save lead to localStorage for dashboard
    try {
      const existingStr = localStorage.getItem('ai_booking_leads');
      const existing = existingStr ? JSON.parse(existingStr) : [];
      
      const newLead: Lead = {
        id: crypto.randomUUID(),
        name: formData.name,
        phone: formData.phone,
        preferredDate: formData.date,
        score: leadScore,
        interest: "General Booking", // Could be extracted dynamically
        createdAt: new Date().toISOString()
      };
      
      localStorage.setItem('ai_booking_leads', JSON.stringify([newLead, ...existing]));
      setIsSubmitted(true);
    } catch (e) {
      console.error("Failed to save lead", e);
    }
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-sm mx-auto my-4 bg-primary/10 border border-primary/20 rounded-2xl p-6 text-center"
      >
        <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4 text-amber-500">
          <CheckCircle2 className="w-6 h-6" />
        </div>
        <h3 className="font-heading font-semibold text-lg mb-2">Request Received!</h3>
        <p className="text-sm text-muted-foreground">
          Thank you, {formData.name}. Our team will contact you shortly at {formData.phone} to confirm your appointment.
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-sm mx-auto my-4 bg-card border border-white/10 rounded-2xl p-5 shadow-lg"
    >
      <div className="mb-4">
        <h3 className="font-heading font-semibold text-foreground">Secure Your Booking</h3>
        <p className="text-xs text-muted-foreground mt-1">Please provide your details so our team can reach out to confirm your slot.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-xs text-muted-foreground">Full Name</Label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              id="name"
              required
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              placeholder="John Doe"
              className="pl-9 bg-background/50 border-white/10"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone" className="text-xs text-muted-foreground">Phone Number</Label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              id="phone"
              type="tel"
              required
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              placeholder="+1 (555) 000-0000"
              className="pl-9 bg-background/50 border-white/10"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="date" className="text-xs text-muted-foreground">Preferred Date (Optional)</Label>
          <div className="relative">
            <CalendarDays className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              id="date"
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({...formData, date: e.target.value})}
              className="pl-9 bg-background/50 border-white/10 text-sm"
            />
          </div>
        </div>

        <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
          Request Confirmation
        </Button>
      </form>
    </motion.div>
  );
}
