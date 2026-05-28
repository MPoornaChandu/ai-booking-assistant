import Link from "next/link";
import { Sparkles, Globe, Mail, Phone } from "lucide-react";
import { BUSINESS_CONFIG } from "@/config/business-config";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-background/50 backdrop-blur-sm pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-2 group mb-4">
              <div className="bg-primary/20 p-2 rounded-lg">
                <Sparkles className="w-5 h-5 text-amber-500" />
              </div>
              <span className="font-heading font-semibold text-xl tracking-tight">
                {BUSINESS_CONFIG.name}
              </span>
            </Link>
            <p className="text-muted-foreground max-w-sm mb-6">
              Experience the future of bookings with our intelligent AI assistant. 
              {BUSINESS_CONFIG.brandTone} service starts from the very first chat.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="text-muted-foreground hover:text-amber-500 transition-colors">
                <Globe className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-amber-500 transition-colors">
                <Mail className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-amber-500 transition-colors">
                <Phone className="w-5 h-5" />
              </Link>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-foreground">Contact</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>{BUSINESS_CONFIG.contact.phone}</li>
              <li>{BUSINESS_CONFIG.contact.email}</li>
              <li className="leading-relaxed">{BUSINESS_CONFIG.contact.address}</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-foreground">Links</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <Link href="#features" className="hover:text-amber-500 transition-colors">Features</Link>
              </li>
              <li>
                <Link href="#how-it-works" className="hover:text-amber-500 transition-colors">How it Works</Link>
              </li>
              <li>
                <Link href="/chat" className="hover:text-amber-500 transition-colors">Book Now</Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-amber-500 transition-colors">Admin Login</Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} {BUSINESS_CONFIG.name}. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="#" className="hover:text-foreground transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-foreground transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
