import { Conversation, Lead } from "@/lib/types";

export const MOCK_CONVERSATIONS: Conversation[] = [
  {
    id: "conv_1",
    messages: [
      { id: "m1", role: "user", content: "Hi, I need a massage tomorrow", timestamp: new Date(Date.now() - 3600000 * 2).toISOString() },
      { id: "m2", role: "assistant", content: "I can help with that. What time works for you?", timestamp: new Date(Date.now() - 3600000 * 1.9).toISOString() }
    ],
    leadScore: "HOT",
    contactName: "Sarah Jenkins",
    startedAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 1.9).toISOString()
  },
  {
    id: "conv_2",
    messages: [
      { id: "m1", role: "user", content: "How much is the premium package?", timestamp: new Date(Date.now() - 86400000).toISOString() },
      { id: "m2", role: "assistant", content: "The Premium Rejuvenation package is $299.", timestamp: new Date(Date.now() - 86400000 + 10000).toISOString() }
    ],
    leadScore: "WARM",
    startedAt: new Date(Date.now() - 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 + 10000).toISOString()
  }
];

export const MOCK_LEADS: Lead[] = [
  {
    id: "lead_1",
    name: "Sarah Jenkins",
    phone: "+1 (555) 987-6543",
    interest: "Deep Tissue Massage",
    budget: "$150+",
    preferredDate: "Tomorrow afternoon",
    score: "HOT",
    createdAt: new Date(Date.now() - 3600000 * 1.5).toISOString()
  },
  {
    id: "lead_2",
    name: "Michael Chen",
    phone: "+1 (555) 234-5678",
    interest: "Couples Package",
    score: "WARM",
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString()
  }
];
