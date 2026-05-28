import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import { BUSINESS_CONFIG } from "@/config/business-config";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-heading",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: `${BUSINESS_CONFIG.name} | AI Booking Assistant`,
  description: `Book your next appointment with ${BUSINESS_CONFIG.name}. Fast, easy, and AI-powered.`,
};

import { TooltipProvider } from "@/components/ui/tooltip";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable} dark`}>
      <body className="min-h-screen bg-background font-sans antialiased flex flex-col">
        <TooltipProvider>
          <main className="flex-1 flex flex-col">
            {children}
          </main>
        </TooltipProvider>
      </body>
    </html>
  );
}
