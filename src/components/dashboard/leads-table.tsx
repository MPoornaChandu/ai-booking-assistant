"use client";

import { useState } from "react";
import { Lead } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MessageCircle, Check, Clock } from "lucide-react";
import { BUSINESS_CONFIG } from "@/config/business-config";

export function LeadsTable({ leads }: { leads: Lead[] }) {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleWhatsAppCopy = (lead: Lead) => {
    const message = `Hi ${lead.name || 'there'}, thank you for your interest in ${BUSINESS_CONFIG.name}. We noticed you were looking for ${lead.interest || 'booking a session'} on ${lead.preferredDate || 'your preferred date'}. Our team can help confirm your slot. Would you like us to proceed with the booking?`;
    
    navigator.clipboard.writeText(message);
    setCopiedId(lead.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getScoreBadge = (score: string) => {
    switch (score) {
      case 'HOT': return <Badge className="bg-red-500/10 text-red-500 border-red-500/20 hover:bg-red-500/20">🔥 Hot</Badge>;
      case 'WARM': return <Badge className="bg-amber-500/10 text-amber-500 border-amber-500/20 hover:bg-amber-500/20">☀️ Warm</Badge>;
      case 'COLD': return <Badge className="bg-blue-500/10 text-blue-500 border-blue-500/20 hover:bg-blue-500/20">❄️ Cold</Badge>;
      default: return <Badge variant="outline">{score}</Badge>;
    }
  };

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full text-sm text-left">
        <thead className="text-xs text-muted-foreground uppercase bg-muted/50 border-y border-white/5">
          <tr>
            <th className="px-4 py-3 font-medium">Customer</th>
            <th className="px-4 py-3 font-medium">Contact</th>
            <th className="px-4 py-3 font-medium">Interest</th>
            <th className="px-4 py-3 font-medium">Date Pref</th>
            <th className="px-4 py-3 font-medium">Score</th>
            <th className="px-4 py-3 font-medium text-right">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {leads.length === 0 ? (
            <tr>
              <td colSpan={6} className="px-4 py-8 text-center text-muted-foreground">
                No leads captured yet.
              </td>
            </tr>
          ) : (
            leads.map((lead) => (
              <tr key={lead.id} className="hover:bg-muted/30 transition-colors">
                <td className="px-4 py-3 font-medium text-foreground">{lead.name || 'Anonymous'}</td>
                <td className="px-4 py-3 text-muted-foreground">{lead.phone || '-'}</td>
                <td className="px-4 py-3 text-muted-foreground truncate max-w-[150px]">{lead.interest || '-'}</td>
                <td className="px-4 py-3 text-muted-foreground">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    {lead.preferredDate || 'Any'}
                  </div>
                </td>
                <td className="px-4 py-3">{getScoreBadge(lead.score)}</td>
                <td className="px-4 py-3 text-right">
                  {lead.score === 'HOT' && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="h-8 border-green-500/20 text-green-500 hover:bg-green-500/10 hover:text-green-400"
                      onClick={() => handleWhatsAppCopy(lead)}
                    >
                      {copiedId === lead.id ? (
                        <Check className="w-4 h-4 mr-1.5" />
                      ) : (
                        <MessageCircle className="w-4 h-4 mr-1.5" />
                      )}
                      {copiedId === lead.id ? 'Copied!' : 'WhatsApp'}
                    </Button>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
