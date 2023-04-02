"use client";

import { usePathname } from "next/navigation";
import { SideNavigationBar } from "ui";

export default function SideNav() {
  const pathname = usePathname() || "";

  // Missing: sort icon (+functionality), search input (+functionality) - separate features
  // Once navigation item is clicked, it should be active? or is it a hover state with green background and arrow right?
  const BudgetsSubMenuData = {
    title: "Budgets",
    sort: {
      method: () => {},
      icon: "filter_list",
    },
    searchInput: {
      icon: "search",
      placeholder: "Search budgets",
    },
    items: [
      {
        icon: "payments",
        label: "Bills",
        href: "/budgets/bills",
      },
      {
        icon: "subscriptions",
        label: "Subscriptions",
        href: "/budgets/subscriptions",
      },
      {
        icon: "savings",
        label: "Savings",
        href: "/budgets/savings",
      },
    ],
  };

  const TeamSubMenuData = {
    title: "Team",
    sort: {
      method: () => {},
      icon: "filter_list",
    },
    searchInput: {
      icon: "search",
      placeholder: "Search team",
    },
    items: [
      { avatarSrc: "./avatar.svg", username: "Leonard" },
      { avatarSrc: "./avatar.svg", username: "Howard" },
      { avatarSrc: "./avatar.svg", username: "Rajesh" },
    ],
  };

  const SettingsSubMenuData = {
    title: "Settings",
    items: [
      {
        label: "Edit profile",
      },
      {
        label: "Change password",
      },
      {
        label: "Language",
      },
    ],
  };

  return (
    <SideNavigationBar
      items={[
        {
          href: "/budgets",
          icon: "wallet",
          textValue: "Budgets",
          subMenu: BudgetsSubMenuData,
        },
        { href: "/reports", icon: "query_stats", textValue: "Reports" },
        {
          href: "/team",
          icon: "account_circle",
          textValue: "Team",
          subMenu: TeamSubMenuData,
        },
        {
          href: "/settings",
          icon: "settings",
          textValue: "Settings",
          subMenu: SettingsSubMenuData,
        },
      ]}
      pathname={pathname}
    />
  );
}
