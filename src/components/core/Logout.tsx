"use client";

import { logout } from "@/lib/api";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { Button } from "../shared/Button";

interface LogoutProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Logout = ({ className, children }: LogoutProps) => {
  const router = useRouter();

  async function handleLogout() {
    try {
      await logout();
      router.replace("/signin");
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className={clsx("drop-shadow-xl bg-transparent", className)}>
      <Button onClick={handleLogout}>logout</Button>

      {children}
    </div>
  );
};
