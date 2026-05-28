"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, MessageSquare, Users, Calendar, Settings, Sparkles, LogOut } from "lucide-react";
import { BUSINESS_CONFIG } from "@/config/business-config";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const navItems = [
  { title: "Overview", icon: LayoutDashboard, href: "/dashboard" },
  // { title: "Conversations", icon: MessageSquare, href: "/dashboard/conversations" },
  // { title: "Leads", icon: Users, href: "/dashboard/leads" },
  // { title: "Bookings", icon: Calendar, href: "/dashboard/bookings" },
];

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-full flex-col bg-card border-r border-white/5 w-64">
      <div className="h-16 flex items-center px-6 border-b border-white/5">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-primary/20 p-1.5 rounded-md">
            <Sparkles className="w-4 h-4 text-amber-500" />
          </div>
          <span className="font-heading font-semibold text-sm truncate">
            {BUSINESS_CONFIG.name}
          </span>
        </Link>
      </div>

      <div className="flex-1 py-6 px-4 space-y-1 overflow-y-auto">
        <div className="px-2 mb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          Menu
        </div>
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors",
                isActive 
                  ? "bg-primary text-primary-foreground shadow-sm shadow-primary/20" 
                  : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
              )}
            >
              <item.icon className={cn("w-4 h-4", isActive ? "text-amber-500" : "")} />
              {item.title}
            </Link>
          );
        })}
      </div>

      <div className="p-4 border-t border-white/5 space-y-2">
        <Button variant="ghost" className="w-full justify-start text-muted-foreground hover:text-foreground">
          <Settings className="w-4 h-4 mr-3" />
          Settings
        </Button>
        <Button variant="ghost" className="w-full justify-start text-red-500 hover:text-red-400 hover:bg-red-500/10">
          <LogOut className="w-4 h-4 mr-3" />
          Logout
        </Button>
      </div>
    </div>
  );
}
