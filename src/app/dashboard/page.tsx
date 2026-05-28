"use client";

import { useEffect, useState } from "react";
import { Conversation, Lead } from "@/lib/types";
import { MOCK_CONVERSATIONS, MOCK_LEADS } from "@/lib/data/mock-dashboard-data";
import { StatsOverview } from "@/components/dashboard/stats-overview";
import { LeadsTable } from "@/components/dashboard/leads-table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function DashboardPage() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Load from localStorage, fallback to MOCK data if empty
    try {
      const storedConvsStr = localStorage.getItem('ai_booking_conversations');
      const storedLeadsStr = localStorage.getItem('ai_booking_leads');
      
      const storedConvs = storedConvsStr ? JSON.parse(storedConvsStr) : [];
      const storedLeads = storedLeadsStr ? JSON.parse(storedLeadsStr) : [];

      setConversations(storedConvs.length > 0 ? storedConvs : MOCK_CONVERSATIONS);
      setLeads(storedLeads.length > 0 ? storedLeads : MOCK_LEADS);
    } catch (e) {
      console.error("Failed to parse storage", e);
      setConversations(MOCK_CONVERSATIONS);
      setLeads(MOCK_LEADS);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  if (!isLoaded) {
    return <div className="h-full flex items-center justify-center">Loading dashboard...</div>;
  }

  const hotLeadsCount = leads.filter(l => l.score === 'HOT').length;

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
                  <div key={conv.id} className="flex gap-4">
                    <div className="w-2 h-2 mt-2 rounded-full shrink-0 bg-primary shadow-[0_0_8px_currentColor]" />
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">
                        Conversation started
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {conv.messages.length} messages exchanged
                      </p>
                      <div className="pt-2">
                        <Badge variant="outline" className="text-[10px] uppercase bg-muted/50">
                          {conv.leadScore} LEAD
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

      </div>
    </>
  );
}
