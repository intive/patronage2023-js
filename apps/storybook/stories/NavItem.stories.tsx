import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { NavItem} from "ui";

export default {
  title: "Nav Item",
  component: NavItem,
} as ComponentMeta<typeof NavItem>;

const Template: ComponentStory<typeof NavItem> = ({ children, ...args }) => (
  <NavItem {...args}>{children}</NavItem>
);

export const Inactive = Template.bind({});
Inactive.args = {
  children: "Language",
  href: "#",
};

export const Active = Template.bind({});
Active.args = {
  active:true,
  children: "Language",
  href: "#",
};

