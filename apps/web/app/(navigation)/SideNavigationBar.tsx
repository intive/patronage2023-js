"use client";

import { usePathname } from "next/navigation";
import { SideNavigationBar } from "ui";
import { useTranslate } from "lib/hooks";

export default function SideNav() {
  const pathname = usePathname() || "";
  const { dict, t } = useTranslate("NavigationLayout");
  const { SideNav } = dict;

  return (
    <SideNavigationBar
      items={[
        {
          href: "/budgets",
          icon: "wallet",
          textValue: t(SideNav.budgetsItem),
        },
        {
          href: "/reports",
          icon: "query_stats",
          textValue: t(SideNav.reportsItem),
        },
        {
          href: "/team",
          icon: "account_circle",
          textValue: t(SideNav.teamsItem),
        },
        {
          href: "/settings",
          icon: "settings",
          textValue: t(SideNav.settingsItem),
        },
      ]}
      pathname={pathname}
    />
  );
}
