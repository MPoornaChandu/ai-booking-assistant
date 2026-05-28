import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <DashboardSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Simple topbar for mobile - desktop just uses padding */}
        <header className="h-16 border-b border-white/5 bg-card flex items-center px-6 shrink-0 md:hidden">
          <span className="font-heading font-semibold text-sm">Dashboard</span>
        </header>
        <main className="flex-1 overflow-y-auto bg-primary/5 p-6 md:p-8">
          <div className="max-w-6xl mx-auto space-y-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
