# AI Booking Assistant

A premium, production-grade SaaS template for modern businesses to handle customer inquiries, qualify leads, and automate booking workflows through a conversational AI interface.

## 🌟 The Problem Solved
Small-to-medium businesses (spas, salons, clinics, consultants) spend countless hours answering repetitive questions about pricing, availability, and services over the phone or email. Potential customers drop off if they don't get immediate answers, leading to lost revenue. 

**This AI Booking Assistant solves this by:**
- Providing instant, 24/7 intelligent responses.
- Automatically guiding customers toward booking a slot.
- Filtering and scoring leads based on intent (Hot/Warm/Cold).
- Freeing up the business owner's time to focus on service delivery rather than admin work.

## ✨ Features

- **Premium Conversational UI:** Beautiful, responsive chat interface with typing animations, chat bubbles, and quick-action chips.
- **Smart AI Engine:** Powered by Google Gemini to provide natural, contextual answers using the business's specific data.
- **Lead Qualification (Lead Scoring):** Automatically detects if a user is a "HOT" lead (ready to book/sharing details) or just browsing.
- **Inline Lead Capture:** Seamlessly collects customer details (Name, Phone, Date) within the chat when booking intent is detected.
- **Mock AI Fallback:** Never breaks in production. If the API key is missing or fails, a robust fallback engine takes over to ensure the demo continues working perfectly.
- **Owner Dashboard:** A secure admin panel to view analytics, recent conversations, and captured leads.
- **WhatsApp Handoff:** 1-click button in the dashboard to copy a pre-formatted WhatsApp message to instantly follow up with hot leads.
- **Abstracted Business Config:** Easily swap out `Serenity Spa & Wellness` for a Clinic, Resort, or Consultancy by editing a single `business-config.ts` file.

## 🛠️ Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4 (CSS-first configuration)
- **Components:** shadcn/ui
- **Animations:** Motion (`motion/react`)
- **AI SDK:** `@google/genai` (Latest Official SDK)
- **Icons:** Lucide React
- **State Management:** React Context API + `useReducer`

## 🚀 Getting Started

### 1. Clone & Install
```bash
git clone <repository-url>
cd ai-booking-assistant
npm install
```

### 2. Add Gemini API Key
Create a `.env.local` file in the root directory and add your Google Gemini API key:
```env
GOOGLE_GEMINI_API_KEY=your_api_key_here
```
*(Note: If you don't add a key, the app will gracefully fall back to the mock AI engine, allowing you to still test the full UI flow).*

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

- **Landing Page:** `/`
- **AI Chat:** `/chat`
- **Owner Dashboard:** `/dashboard`

## 🔮 Future Scope & Production Roadmap

This template is currently an MVP using `localStorage` for demo persistence. To take this to full production, the following features should be implemented:

1. **Database Integration:** Replace localStorage with **Supabase** or **Prisma/PostgreSQL** to securely store leads and conversations.
2. **WhatsApp Business API:** Connect the AI directly to WhatsApp so customers can book without visiting the website.
3. **Google Calendar Integration:** Sync the AI's availability directly with the business owner's real-time Google Calendar to prevent double-booking.
4. **Real Notifications:** Integrate Resend or Twilio to send real Email/SMS notifications to the owner the second a "HOT" lead is captured.
5. **Authentication:** Add NextAuth/Clerk to secure the `/dashboard` route.
