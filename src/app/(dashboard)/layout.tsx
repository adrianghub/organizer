import "@/styles/reset.css";
import "@/styles/globals.css";

import { GlassPane } from "@/components/core/GlassPane";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <html lang="en">
      <head />
      <body className="h-screen w-screen random-mesh p-6">
        <GlassPane className="w-full h-full flex align-center mx-auto">
          {children}
        </GlassPane>
      </body>
    </html>
  );
}
