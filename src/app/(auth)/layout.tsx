import "@/styles/reset.css";
import "@/styles/globals.css";

import { GlassPane } from "@/components/core/GlassPane";
import { getUserFromCookie } from "@/lib/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default async function AuthLayout({ children }: AuthLayoutProps) {
  const user = await getUserFromCookie(cookies());

  if (user) {
    return redirect("/home");
  }

  return (
    <html lang="en">
      <head />
      <body className="h-screen w-screen random p-6">
        <GlassPane className="w-full h-full flex items-center justify-center mx-auto">
          {children}
        </GlassPane>
      </body>
    </html>
  );
}
