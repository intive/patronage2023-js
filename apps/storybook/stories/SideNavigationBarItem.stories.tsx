import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { SideNavigationBarItem } from "ui";

export default {
  title: "SideNavigationBarItem",
  component: SideNavigationBarItem,
} as ComponentMeta<typeof SideNavigationBarItem>;

const Template: ComponentStory<typeof SideNavigationBarItem> = ({
  ...args
}) => <SideNavigationBarItem {...args}></SideNavigationBarItem>;

export const SideNavBarItem = Template.bind({});
SideNavBarItem.args = {
  href: "#",
  icon: "menu",
  textValue: "Menu",
};
