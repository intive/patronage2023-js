"use client";

import { useTranslate } from "lib/hooks";
import { SideNavigationBar } from "ui";
import { Icon } from "ui";

export default function SideNav() {
  const { dict, t } = useTranslate("NavigationLayout");
  const { SideNav } = dict;
  // Missing: sort icon (+functionality), search input (+functionality) - separate features
  // Once navigation item is clicked, it should be active? or is it a hover state with green background and arrow right?
  const BudgetsSubMenuData = {
    title: "Budgets",
    sort: {
      method: () => {},
      icon: <Icon icon="filter_list" />,
    },
    searchInput: {
      placeholder: "Search budgets",
      icon: <Icon icon="search" />,
    },
    items: [
      {
        icon: <Icon icon="payments" />,
        label: "Bills",
        href: "/budgets/bills",
        id: "1",
      },
      {
        icon: <Icon icon="subscriptions" />,
        label: "Subscriptions",
        href: "/budgets/subscriptions",
        id: "2",
      },
      {
        icon: <Icon icon="savings" />,
        label: "Savings",
        href: "/budgets/savings",
        id: "3",
      },
    ],
    button: {
      method: () => {},
      label: "Add new budget",
    },
  };

  const TeamSubMenuData = {
    title: "Team",
    sort: {
      method: () => {},
      icon: <Icon icon="filter_list" />,
    },
    searchInput: {
      icon: <Icon icon="search" />,
      placeholder: "Search team",
    },
    items: [
      { avatarSrc: "./avatar.svg", username: "Leonard", id: "1" },
      { avatarSrc: "./avatar.svg", username: "Howard", id: "2" },
      { avatarSrc: "./avatar.svg", username: "Rajesh", id: "3" },
    ],
    button: {
      method: () => {},
      label: "Add new member",
    },
  };

  const SettingsSubMenuData = {
    title: "Settings",
    items: [
      {
        label: "Edit profile",
        id: "1",
      },
      {
        label: "Change password",
        id: "2",
      },
      {
        label: "Language",
        id: "3",
      },
    ],
  };

  return (
    <SideNavigationBar
      items={[
        {
          href: "/budgets",
          icon: "wallet",
          textValue: t(SideNav.budgetsItem),
          subMenu: BudgetsSubMenuData,
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
          subMenu: TeamSubMenuData,
        },
        {
          href: "/settings",
          icon: "settings",
          textValue: t(SideNav.settingsItem),
          subMenu: SettingsSubMenuData,
        },
      ]}
    />
  );
}
