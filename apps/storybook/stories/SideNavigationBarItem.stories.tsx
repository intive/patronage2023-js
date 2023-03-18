import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { SideNavigationBarItem } from "ui";
import { Icon } from "ui";

export default {
  title: "SideNavigationBarItem",
  component: SideNavigationBarItem,
} as ComponentMeta<typeof SideNavigationBarItem>;

const Template: ComponentStory<typeof SideNavigationBarItem> = ({
  children,
  ...args
}) => <SideNavigationBarItem {...args}>{children}</SideNavigationBarItem>;

export const Normal = Template.bind({});
Normal.args = {
  children: (
    <>
      <Icon icon={"menu"} iconSize={30} />
    </>
  ),
  textValue: "anything",
};
