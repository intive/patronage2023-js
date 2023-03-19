import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { SideNavigationBarItem } from "ui";

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
  icon: "menu",
  textValue: "Menu",
};
