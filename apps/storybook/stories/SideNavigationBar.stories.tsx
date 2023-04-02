import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import styled from "styled-components";

import { SideNavigationBar } from "ui";

export default {
  title: "SideNavigationBar",
  component: SideNavigationBar,
} as ComponentMeta<typeof SideNavigationBar>;

const SideNavigationBarTemplate: ComponentStory<typeof SideNavigationBar> = ({
  ...args
}) => <SideNavigationBar {...args}></SideNavigationBar>;

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

export const SideNavBar = SideNavigationBarTemplate.bind({});
SideNavBar.args = {
  items: [
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
  ],
  pathname: "/reports",
};
