import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { SideNavigationBarItem } from "ui";
import { SideNavigationBar } from "ui";

export default {
  title: "SideNavigationBarItem",
  component: SideNavigationBarItem,
} as ComponentMeta<typeof SideNavigationBarItem>;

const Template: ComponentStory<typeof SideNavigationBarItem> = ({
  children,
  ...args
}) => <SideNavigationBarItem {...args}>{children}</SideNavigationBarItem>;

export const Menu = Template.bind({});
Menu.args = {
  href: "/",
  icon: "menu",
  textValue: "Menu",
};

const TemplateBar: ComponentStory<typeof SideNavigationBar> = ({ ...args }) => (
  <SideNavigationBar {...args}></SideNavigationBar>
);

export const SideNavBar = TemplateBar.bind({});
SideNavBar.args = {
  items: [
    { href: "/", icon: "menu", textValue: "Menu" },
    { href: "/", icon: "history", textValue: "History" },
    { href: "/", icon: "settings", textValue: "Settings" },
    { href: "/", icon: "shopping_cart", textValue: "Shopping cart" },
  ],
};
