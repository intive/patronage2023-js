"use client";

import { usePathname } from "next/navigation";
import { SideNavigationBar } from "ui";
import dictionary from "../../lib/dictionary";

export default function SideNav() {
  const pathname = usePathname() || "";
  const t = dictionary.NavigationLayout.SideNav;

  return (
    <SideNavigationBar
      items={[
        {
          href: "/budgets",
          icon: "wallet",
          textValue: t.budgetsItem.en,
        },
        {
          href: "/reports",
          icon: "query_stats",
          textValue: t.reportsItem.en,
        },
        { href: "/team", icon: "account_circle", textValue: t.teamsItem.en },
        {
          href: "/settings",
          icon: "settings",
          textValue: t.settingsItem.en,
        },
      ]}
      pathname={pathname}
    />
  );
}
