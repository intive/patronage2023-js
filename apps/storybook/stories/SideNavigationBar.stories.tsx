import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { SideNavigationBar } from "ui";
import { SideNavigationBarItem } from "ui";

export default {
  title: "SideNavigationBar",
  component: SideNavigationBar,
} as ComponentMeta<typeof SideNavigationBar>;

const SideNavigationBarTemplate: ComponentStory<typeof SideNavigationBar> = ({
  ...args
}) => <SideNavigationBar {...args}></SideNavigationBar>;

const SideNavigationBarItemTemplate: ComponentStory<
  typeof SideNavigationBarItem
> = ({ ...args }) => <SideNavigationBarItem {...args}></SideNavigationBarItem>;

export const SideNavBar = SideNavigationBarTemplate.bind({});
SideNavBar.args = {
  items: [
    { href: "/budgets", icon: "wallet", textValue: "Budgets" },
    { href: "/reports", icon: "query_stats", textValue: "Reports" },
    { href: "/team", icon: "account_circle", textValue: "Team" },
    {
      href: "/settings",
      icon: "settings",
      textValue: "Settings",
    },
  ],
  pathname: "/budgets",
};

export const SideNavBarItem = SideNavigationBarItemTemplate.bind({});
SideNavBarItem.args = {
  href: "/budgets",
  icon: "wallet",
  textValue: "Budgets",
  activeFlag: true,
};
