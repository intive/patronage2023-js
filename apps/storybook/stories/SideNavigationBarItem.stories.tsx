import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { SideNavigationBarItem } from "ui";
import { Span } from "ui";

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
      <span>ICON</span>
      <Span textSize={10}>anything</Span>
    </>
  ),
};
