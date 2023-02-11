"use client";

import Link from "next/link";
import { Settings, User, Grid, Calendar } from "react-feather";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const icons = { Settings, User, Grid, Calendar };

interface SidebarLinkProps {
  link: {
    href: string;
    icon: keyof typeof icons;
  };
}

export const SidebarLink = ({ link }: SidebarLinkProps) => {
  const pathname = usePathname();
  let isActive = false;

  if (pathname === link.href) {
    isActive = true;
  }

  const Icon = icons[link.icon];

  return (
    <Link href={link.href} className="w-full flex justify-center items-center">
      <Icon
        size={40}
        className={clsx(
          "stroke-gray-400 hover:stroke-violet-600 transition duration-200 ease-in-out",
          isActive && "stroke-violet-600"
        )}
      />
    </Link>
  );
};
