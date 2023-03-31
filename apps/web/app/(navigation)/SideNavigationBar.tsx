"use client";

import { usePathname } from "next/navigation";
import { SideNavigationBar } from "ui";

export default function SideNav() {
  const pathname = usePathname() || "";

  return (
    <SideNavigationBar
      items={[
        { href: "/budgets", icon: "wallet", textValue: "Budgets" },
        { href: "/reports", icon: "query_stats", textValue: "Reports" },
        { href: "/team", icon: "account_circle", textValue: "Team" },
        {
          href: "/settings",
          icon: "settings",
          textValue: "Settings",
        },
      ]}
      pathname={pathname}
    />
  );
}
