import "@/styles/reset.css";
import "@/styles/globals.css";

import { GlassPane } from "@/components/core/GlassPane";
import Sidebar from "@/components/core/Sidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <html lang="en">
      <head />
      <body className="h-screen w-screen random p-6 overflow-x-hidden">
        <GlassPane className="mx-auto w-full h-full flex ">
          <Sidebar />

          {children}
        </GlassPane>
        <div id="modal"></div>
      </body>
    </html>
  );
}
