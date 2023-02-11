import { Card } from "../shared/Card";
import { SidebarLink } from "./SidebarLink";

const links = [
  { label: "Home", icon: "Grid", href: "/home" },
  {
    label: "Calendar",
    icon: "Calendar",
    href: "/calendar",
  },
  { label: "Profile", icon: "User", href: "/profile" },
  {
    label: "Settings",
    icon: "Settings",
    href: "/settings",
  },
] as const;

const Sidebar = () => {
  return (
    <Card className="h-full w-40 flex items-center justify-between flex-wrap">
      <div className="w-full flex justify-center items-center">Organizer</div>
      {links.map((link) => (
        <SidebarLink key={link.href} link={link} />
      ))}
    </Card>
  );
};

export default Sidebar;
