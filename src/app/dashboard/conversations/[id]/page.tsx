"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Conversation, Lead } from "@/lib/types";
import { MOCK_CONVERSATIONS, MOCK_LEADS } from "@/lib/data/mock-dashboard-data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowLeft, User, Phone, CalendarDays, Check, MessageCircle, Sparkles } from "lucide-react";
import { BUSINESS_CONFIG } from "@/config/business-config";

export default function ConversationDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [conversation, setConversation] = useState<Conversation | null>(null);
  const [lead, setLead] = useState<Lead | null>(null);
  const [copied, setCopied] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    
    // Load data
    try {
      const convId = params.id as string;
      const storedConvsStr = localStorage.getItem('ai_booking_conversations');
      const storedLeadsStr = localStorage.getItem('ai_booking_leads');
      
      const parsedConvs = storedConvsStr ? JSON.parse(storedConvsStr) : [];
      const parsedLeads = storedLeadsStr ? JSON.parse(storedLeadsStr) : [];

      const validConvs = Array.isArray(parsedConvs) ? parsedConvs : [];
      const validLeads = Array.isArray(parsedLeads) ? parsedLeads : [];

      let foundConv = validConvs.find(c => c.id === convId);
      if (!foundConv) {
        foundConv = MOCK_CONVERSATIONS.find(c => c.id === convId);
      }
      
      if (foundConv) {
        setConversation(foundConv);
        
        // Try to find matching lead
        let foundLead = validLeads.find(l => l.name === foundConv?.contactName);
        if (!foundLead && foundConv) {
          foundLead = MOCK_LEADS.find(l => l.name === foundConv?.contactName);
        }
        if (foundLead) {
          setLead(foundLead);
        }
      }
    } catch (e) {
      console.error(e);
    }
  }, [params.id]);

  if (!isMounted) return <div className="p-8 text-center text-muted-foreground flex items-center justify-center min-h-[400px]"><div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div></div>;

  if (!conversation) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-xl font-bold mb-4">Conversation not found</h2>
        <Button onClick={() => router.push('/dashboard')}>Back to Dashboard</Button>
      </div>
    );
  }

  const handleWhatsAppCopy = () => {
    const name = lead?.name || conversation.contactName || 'there';
    const interest = lead?.interest || 'booking a session';
    const date = lead?.preferredDate || 'your preferred date';
    const message = `Hi ${name}, thank you for your interest in ${BUSINESS_CONFIG.name}. We noticed you were looking for ${interest} on ${date}. Our team can help confirm your slot. Would you like us to proceed with the booking?`;
    
    navigator.clipboard.writeText(message);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getScoreBadge = (score: string) => {
    switch (score) {
      case 'HOT': return <Badge className="bg-red-500/10 text-red-500 border-red-500/20">🔥 Hot</Badge>;
      case 'WARM': return <Badge className="bg-amber-500/10 text-amber-500 border-amber-500/20">☀️ Warm</Badge>;
      case 'COLD': return <Badge className="bg-blue-500/10 text-blue-500 border-blue-500/20">❄️ Cold</Badge>;
      default: return <Badge variant="outline">{score}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.push('/dashboard')}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-heading font-bold flex items-center gap-3">
              Conversation Details
              {getScoreBadge(conversation.leadScore)}
            </h1>
            <p className="text-muted-foreground text-sm">
              Started {new Date(conversation.startedAt).toLocaleString()}
            </p>
          </div>
        </div>
        {conversation.leadScore === 'HOT' && (
          <Button onClick={handleWhatsAppCopy} className="bg-green-600 hover:bg-green-700 text-white shrink-0">
            {copied ? <Check className="w-4 h-4 mr-2" /> : <MessageCircle className="w-4 h-4 mr-2" />}
            {copied ? 'Copied to Clipboard' : 'Copy WhatsApp Follow-up'}
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 space-y-6">
          <Card className="glass-card border-white/5">
            <CardHeader>
              <CardTitle>Customer Profile</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3 text-sm">
                <User className="w-4 h-4 text-muted-foreground shrink-0" />
                <span className="truncate">{lead?.name || conversation.contactName || 'Anonymous'}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Phone className="w-4 h-4 text-muted-foreground shrink-0" />
                <span className="truncate">{lead?.phone || conversation.contactPhone || 'Not provided'}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Sparkles className="w-4 h-4 text-muted-foreground shrink-0" />
                <span className="truncate">{lead?.interest || 'General Inquiry'}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <CalendarDays className="w-4 h-4 text-muted-foreground shrink-0" />
                <span className="truncate">{lead?.preferredDate || 'No date specified'}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2">
          <Card className="glass-card border-white/5 h-[600px] flex flex-col">
            <CardHeader className="border-b border-white/5 pb-4 shrink-0">
              <CardTitle>Chat History</CardTitle>
              <CardDescription>{conversation.messages.length} messages exchanged</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 overflow-y-auto p-6 space-y-4">
              {conversation.messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm ${
                    msg.role === 'user' 
                      ? 'bg-primary text-primary-foreground rounded-tr-sm' 
                      : 'bg-muted/50 text-foreground rounded-tl-sm border border-white/5'
                  }`}>
                    {msg.content}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
