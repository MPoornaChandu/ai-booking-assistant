"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Conversation, Lead } from "@/lib/types";
import { MOCK_CONVERSATIONS, MOCK_LEADS } from "@/lib/data/mock-dashboard-data";
import { StatsOverview } from "@/components/dashboard/stats-overview";
import { LeadsTable } from "@/components/dashboard/leads-table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function DashboardPage() {
  const [conversations, setConversations] = useState<Conversation[]>(MOCK_CONVERSATIONS);
  const [leads, setLeads] = useState<Lead[]>(MOCK_LEADS);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    
    // Load from localStorage, securely validating the data shape
    try {
      const storedConvsStr = localStorage.getItem('ai_booking_conversations');
      const storedLeadsStr = localStorage.getItem('ai_booking_leads');
      
      const parsedConvs = storedConvsStr ? JSON.parse(storedConvsStr) : null;
      const parsedLeads = storedLeadsStr ? JSON.parse(storedLeadsStr) : null;

      // Validate data to prevent crashes from old/invalid localStorage schemas
      const validConvs = Array.isArray(parsedConvs) 
        ? parsedConvs.filter(c => c && Array.isArray(c.messages)) 
        : [];
        
      const validLeads = Array.isArray(parsedLeads) 
        ? parsedLeads.filter(l => l && typeof l === 'object') 
        : [];

      if (validConvs.length > 0) {
        setConversations(validConvs);
      }
      if (validLeads.length > 0) {
        setLeads(validLeads);
      }
    } catch (e) {
      console.error("Failed to parse storage", e);
    }
  }, []);

  if (!isMounted) {
    // Return a skeleton or just the mock data structure initially to avoid hydration mismatch,
    // but returning a loading state is also fine if it's identical on server and client.
    // However, returning null or a simpler loader is safer.
    return (
      <div className="h-full flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-4 text-muted-foreground">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p>Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const hotLeadsCount = leads.filter(l => l?.score === 'HOT').length;

  return (
    <>
      <div>
        <h1 className="text-2xl font-heading font-bold text-foreground">Overview</h1>
        <p className="text-muted-foreground mt-1">Monitor your AI assistant's performance and manage leads.</p>
      </div>

      <StatsOverview 
        conversationsCount={conversations.length} 
        hotLeadsCount={hotLeadsCount} 
        bookingsCount={leads.length} // Just using leads as proxy for bookings in demo
      />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* Main Leads Table */}
        <div className="xl:col-span-2">
          <Card className="glass-card border-white/5 h-full">
            <CardHeader>
              <CardTitle>Captured Leads</CardTitle>
              <CardDescription>Recent potential customers captured by the AI.</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <LeadsTable leads={leads} />
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity / Conversations */}
        <div>
          <Card className="glass-card border-white/5 h-full">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest AI conversations.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {conversations.slice(0, 5).map((conv) => (
                  <Link href={`/dashboard/conversations/${conv.id}`} key={conv.id} className="flex gap-4 hover:bg-white/5 p-2 rounded-lg transition-colors cursor-pointer block">
                    <div className="w-2 h-2 mt-2 rounded-full shrink-0 bg-primary shadow-[0_0_8px_currentColor]" />
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none text-foreground">
                        Conversation started
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {conv.messages.length} messages exchanged
                      </p>
                      <div className="pt-2">
                        <Badge variant="outline" className="text-[10px] uppercase bg-muted/50 text-foreground">
                          {conv.leadScore} LEAD
                        </Badge>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

      </div>
    </>
  );
}
