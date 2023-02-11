import "@/styles/reset.css";
import "@/styles/globals.css";

import { GlassPane } from "@/components/core/GlassPane";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <html lang="en">
      <head />
      <body className="h-screen w-screen random-mesh p-6">
        <GlassPane className="w-full h-full flex items-center justify-center mx-auto">
          {children}
        </GlassPane>
      </body>
    </html>
  );
}
