import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { getSystemPrompt } from "@/lib/ai/system-prompt";
import { calculateLeadScore, detectIntent } from "@/lib/ai/lead-scoring";
import { BUSINESS_CONFIG } from "@/config/business-config";

const isDev = process.env.NODE_ENV === "development";

// --- Gemini Client (server-side only) ---
const apiKey = process.env.GOOGLE_GEMINI_API_KEY;
const isValidKey = !!(apiKey && apiKey !== "your_api_key_here" && apiKey.length > 20);

const ai = isValidKey ? new GoogleGenAI({ apiKey }) : null;

if (isDev) {
  console.log(`[AI Engine] Gemini API key ${isValidKey ? "✅ detected" : "❌ missing — using mock fallback"}`);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { message, history = [], currentScore = "COLD" } = body;

    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    // 1. Detect intent & calculate lead score
    const intent = detectIntent(message);
    const newScore = calculateLeadScore(message, currentScore);

    if (isDev) {
      console.log(`[Chat] Intent: ${intent} | Score: ${currentScore} → ${newScore} | Message: "${message.slice(0, 60)}"`);
    }

    // 2. Try Gemini, fall back to mock
    let reply = "";
    let source: "gemini" | "mock" = "mock";

    if (ai) {
      try {
        reply = await callGemini(message, history);
        source = "gemini";
      } catch (err) {
        if (isDev) console.error("[Gemini Error]", err);
        reply = getMockResponse(message, intent, history);
        source = "mock";
      }
    } else {
      reply = getMockResponse(message, intent, history);
    }

    if (isDev) {
      console.log(`[AI SOURCE] ${source === "gemini" ? "Gemini API response used" : "Mock fallback response used"}`);
      console.log(`[Chat Reply] "${reply.slice(0, 100)}..."`);
    }

    // 3. Booking intent detection from the AI's reply
    const replyLower = reply.toLowerCase();
    const bookingIntent =
      replyLower.includes("name and phone") ||
      replyLower.includes("your name") ||
      replyLower.includes("phone number") ||
      replyLower.includes("finalize") ||
      replyLower.includes("confirm your booking") ||
      intent === "lead_capture";

    return NextResponse.json({
      reply,
      metadata: {
        leadScore: newScore,
        bookingIntent,
        intent,
      },
    });
  } catch (error) {
    if (isDev) console.error("[Chat API Fatal]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// ─── Gemini Call with Proper Conversation History ─────────────────────────

interface HistoryMessage {
  role: "user" | "assistant";
  content: string;
}

async function callGemini(message: string, history: HistoryMessage[]): Promise<string> {
  // Build the Gemini-compatible contents array
  // System instruction + conversation history + new message
  const contents: Array<{ role: "user" | "model"; parts: Array<{ text: string }> }> = [];

  // Inject recent history (last 10 messages for context window efficiency)
  const recent = history.slice(-10);
  for (const msg of recent) {
    contents.push({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.content }],
    });
  }

  // Add the current user message
  contents.push({
    role: "user",
    parts: [{ text: message }],
  });

  const response = await ai!.models.generateContent({
    model: "gemini-2.0-flash",
    contents,
    config: {
      systemInstruction: getSystemPrompt(),
      temperature: 0.7,
      topP: 0.9,
      topK: 40,
      maxOutputTokens: 300,
    },
  });

  const text = response.text?.trim();
  if (!text) throw new Error("Empty response from Gemini");

  return text;
}

// ─── High-Quality Mock Fallback ──────────────────────────────────────────

function getMockResponse(message: string, intent: string, history: HistoryMessage[]): string {
  const cfg = BUSINESS_CONFIG;
  const turnCount = history.length;

  switch (intent) {
    case "pricing":
      return pickRandom([
        `Here's a quick look at our pricing:\n\n${cfg.services.map(s => `• ${s.name} (${s.duration}) — ${s.price}`).join("\n")}\n\nWe also have bundled packages starting at ${cfg.packages[0].price} if you'd like more value. Want me to go over those?`,
        `Great question! Our individual treatments range from ${cfg.services[cfg.services.length - 1].price} to ${cfg.services[1].price}. For the best value, many clients go with our ${cfg.packages[1].name} package at ${cfg.packages[1].price} — it ${cfg.packages[1].savings ? `saves you ${cfg.packages[1].savings}` : "bundles several treatments together"}. Would you like the full breakdown?`,
      ]);

    case "availability":
      return pickRandom([
        `On weekdays we have slots from ${cfg.availableSlots.weekday[0]} to ${cfg.availableSlots.weekday[cfg.availableSlots.weekday.length - 1]}. Saturdays we're open ${cfg.hours.saturday}. Which day were you considering? I'll check what's open for you.`,
        `We generally have good availability in the morning and early afternoon. Evening slots (5-7 PM) and Saturdays tend to fill up fast, so I'd recommend booking those early. What day works best for you?`,
        `Sure! What date and time are you thinking? I can check what we have open. Also, which service or package caught your eye?`,
      ]);

    case "location":
      return `We're located at **${cfg.contact.address}**. ${cfg.contact.landmarks} If you need help with directions, feel free to call us at ${cfg.contact.phone}. We're easy to find!`;

    case "offers":
      return pickRandom([
        `We have a few things running right now! ${cfg.policies.offers} Plus, our loyalty program gives you every 6th session free (up to $140 value). Not a bad deal if you plan to visit regularly! 😊`,
        `Absolutely — here's what's currently active:\n\n• 15% off weekday morning appointments (before 12 PM)\n• First-time visitor? Get a complimentary aromatherapy upgrade with any package\n• Loyalty: Book 5, get the 6th free\n\nWant me to help you pick a package that maximizes these savings?`,
      ]);

    case "cancellation":
      return `Our cancellation policy is straightforward: we need at least **24 hours notice** to cancel or reschedule at no charge. Late cancellations incur a 50% fee, and no-shows are charged the full amount. Refunds for valid cancellations are processed within 5-7 business days. Anything else I can clarify?`;

    case "booking_process":
      return `Booking with us is super simple:\n\n${cfg.bookingProcess.map((step, i) => `${i + 1}. ${step}`).join("\n")}\n\nThe whole process takes about 2 minutes right here in this chat. Ready to get started?`;

    case "package_recommendation":
      return pickRandom([
        `I'd love to help you pick the right one! A couple of quick questions: Is this for a special occasion or regular self-care? And roughly how much time do you have — a quick session or a full day of pampering?`,
        `It depends on what you're looking for! Our **${cfg.packages[0].name}** (${cfg.packages[0].price}) is perfect for a quick recharge, while the **${cfg.packages[2]?.name || cfg.packages[1].name}** (${cfg.packages[2]?.price || cfg.packages[1].price}) is the full luxury experience. What sounds more like your vibe?`,
      ]);

    case "booking_intent":
      return pickRandom([
        `Wonderful, let's get that booked for you! Which service or package are you interested in, and what date/time works best?`,
        `I'd be happy to help you lock in a slot! Could you let me know your preferred date, time, and which treatment you'd like?`,
        `Let's make it happen! To finalize your booking, I'll just need:\n\n1. Which service/package\n2. Your preferred date & time\n3. Your name and phone number\n\nWhat would you like to go with?`,
      ]);

    case "lead_capture":
      return `Thank you so much for sharing your details! I've noted everything down. Our team will reach out within 15 minutes to confirm your appointment. You're all set! 🎉`;

    default: {
      // General FAQ / greetings — vary based on conversation turn
      if (turnCount === 0) {
        return pickRandom([
          `Hi there! Welcome to ${cfg.name}. 👋 I'm here to help with anything — from checking slot availability to finding the perfect package. What can I do for you today?`,
          `Hello and welcome! I'm the AI concierge for ${cfg.name}. Whether you're curious about our services, want to check pricing, or ready to book — I've got you covered. What's on your mind?`,
        ]);
      }
      return pickRandom([
        `I'm happy to help with that! Could you tell me a bit more about what you're looking for? I can assist with pricing, availability, packages, or anything else about ${cfg.name}.`,
        `Of course! I can help with booking, pricing, recommendations, or answer any questions about our services. What would you like to know?`,
        `Sure thing! Feel free to ask me about our services, current offers, or available time slots. I'm here for whatever you need.`,
      ]);
    }
  }
}

/** Returns a random item from an array for response variety */
function pickRandom(options: string[]): string {
  return options[Math.floor(Math.random() * options.length)];
}
