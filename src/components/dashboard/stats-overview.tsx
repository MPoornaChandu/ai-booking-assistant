"use client";

import { motion } from "motion/react";
import { MessageSquare, Users, CalendarCheck, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface StatsProps {
  conversationsCount: number;
  hotLeadsCount: number;
  bookingsCount: number;
}

export function StatsOverview({ conversationsCount, hotLeadsCount, bookingsCount }: StatsProps) {
  const stats = [
    {
      title: "Total Inquiries",
      value: conversationsCount.toString(),
      icon: MessageSquare,
      trend: "+12%",
      color: "text-blue-500",
      bg: "bg-blue-500/10"
    },
    {
      title: "Hot Leads",
      value: hotLeadsCount.toString(),
      icon: Users,
      trend: "+4.5%",
      color: "text-amber-500",
      bg: "bg-amber-500/10"
    },
    {
      title: "Pending Bookings",
      value: bookingsCount.toString(),
      icon: CalendarCheck,
      trend: "+2.1%",
      color: "text-emerald-500",
      bg: "bg-emerald-500/10"
    },
    {
      title: "AI Conversion Rate",
      value: "28%",
      icon: TrendingUp,
      trend: "+1.2%",
      color: "text-purple-500",
      bg: "bg-purple-500/10"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, idx) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: idx * 0.1 }}
        >
          <Card className="glass-card border-white/5 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <div className={`w-8 h-8 rounded-md flex items-center justify-center ${stat.bg} ${stat.color}`}>
                <stat.icon className="w-4 h-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">
                <span className="text-emerald-500 font-medium">{stat.trend}</span> from last month
              </p>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
