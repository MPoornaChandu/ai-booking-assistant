import { LeadScore } from "@/lib/types";

// Detected intent type for richer downstream logic
export type DetectedIntent =
  | "pricing"
  | "availability"
  | "location"
  | "offers"
  | "booking_process"
  | "cancellation"
  | "package_recommendation"
  | "booking_intent"
  | "lead_capture"
  | "general_faq";

/**
 * Detects the primary intent of a user message.
 */
export function detectIntent(message: string): DetectedIntent {
  const text = message.toLowerCase();

  // Order matters — more specific intents first
  if (/\b(my name is|my number|phone.*(is|:)|call me at|here.*(my|is).*number)\b/.test(text) || /\d{7,}/.test(text)) {
    return "lead_capture";
  }
  if (/\b(book|reserve|lock in|schedule|finalize|confirm.*(slot|booking|appointment))\b/.test(text)) {
    return "booking_intent";
  }
  if (/\b(cancel|reschedule|refund|no.?show|policy|policies|rules)\b/.test(text)) {
    return "cancellation";
  }
  if (/\b(slot|availab|open.*(time|slot)|free.*(time|slot)|when.*can|what time|tomorrow|today|this week|next week|evening|morning|afternoon)\b/.test(text)) {
    return "availability";
  }
  if (/\b(price|pricing|cost|how much|rate|fee|charge|expensive|cheap|budget|afford)\b/.test(text)) {
    return "pricing";
  }
  if (/\b(offer|discount|deal|promo|coupon|sale|special|first.?time|loyalty|free)\b/.test(text)) {
    return "offers";
  }
  if (/\b(where|location|address|direction|parking|landmark|find you|map|near|how.*get.*there)\b/.test(text)) {
    return "location";
  }
  if (/\b(recommend|suggest|which.*package|which.*service|best.*for|not sure|confused|help.*choose|what.*should)\b/.test(text)) {
    return "package_recommendation";
  }
  if (/\b(how.*book|booking.*process|step|procedure|how.*work|how.*do.*i)\b/.test(text)) {
    return "booking_process";
  }

  return "general_faq";
}

/**
 * Calculates lead score based on the current message and all previous messages' cumulative score.
 */
export function calculateLeadScore(message: string, historyScore: LeadScore = "COLD"): LeadScore {
  const intent = detectIntent(message);

  // Once HOT, stay HOT for this conversation
  if (historyScore === "HOT") return "HOT";

  // Immediate HOT triggers
  if (intent === "lead_capture" || intent === "booking_intent") {
    return "HOT";
  }

  // Additional HOT patterns — sharing specific date/time or mentioning urgency
  const text = message.toLowerCase();
  if (/\b(today|tomorrow|tonight|this evening|asap|urgent|right away)\b/.test(text)) {
    return "HOT";
  }

  // WARM triggers
  if (intent === "pricing" || intent === "availability" || intent === "offers" || intent === "package_recommendation") {
    return "WARM";
  }

  // If already warm, stay warm
  if (historyScore === "WARM") return "WARM";

  return "COLD";
}
