import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Button } from "ui";

export default {
  title: "Button",
  component: Button,
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = ({ children, ...args }) => (
  <Button {...args}>{children}</Button>
);

export const Normal = Template.bind({});
Normal.args = {
  children: "Normal",
};

export const Disabled = Template.bind({});
Disabled.args = {
  children: "Disabled",
  disabled: true,
};

export const Secondary = Template.bind({});
Secondary.args = {
  children: "Secondary",
  secondary: true,
};
