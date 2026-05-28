export type LeadScore = 'HOT' | 'WARM' | 'COLD';

export interface Lead {
  id: string;
  name?: string;
  phone?: string;
  interest?: string;
  budget?: string;
  preferredDate?: string;
  score: LeadScore;
  createdAt: string;
}

export interface Booking {
  id: string;
  serviceId: string;
  date: string;
  time: string;
  customerName: string;
  customerPhone: string;
  status: 'PENDING' | 'CONFIRMED' | 'CANCELLED';
  createdAt: string;
}

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  isBookingCard?: boolean;
  bookingData?: Partial<Booking>;
}

export interface Conversation {
  id: string;
  messages: Message[];
  leadScore: LeadScore;
  contactName?: string;
  contactPhone?: string;
  startedAt: string;
  updatedAt: string;
}
