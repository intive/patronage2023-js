import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { SideNavigationBar } from "ui";

export default {
  title: "SideNavigationBar",
  component: SideNavigationBar,
} as ComponentMeta<typeof SideNavigationBar>;

const Template: ComponentStory<typeof SideNavigationBar> = ({ ...args }) => (
  <SideNavigationBar {...args}></SideNavigationBar>
);

export const SideNavBar = Template.bind({});
SideNavBar.args = {
  items: [
    { href: "#", icon: "menu", textValue: "Menu" },
    { href: "#", icon: "history", textValue: "History" },
    { href: "#", icon: "settings", textValue: "Settings" },
    { href: "#", icon: "shopping_cart", textValue: "Shopping cart" },
  ],
};
