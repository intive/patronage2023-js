import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Button } from "ui";

export default {
  title: "Button",
  component: Button,
  argTypes: {
    secondary: { control: "boolean" },
    simple: { control: "boolean" },
    fullWidth: { control: "boolean" },
  },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = ({ children, ...args }) => (
  <Button {...args}>{children}</Button>
);

export const Primary = Template.bind({});
Primary.args = {
  children: "Primary",
  disabled: false,
};

export const Secondary = Template.bind({});
Secondary.args = {
  children: "Secondary",
  secondary: true,
};

export const Simple = Template.bind({});
Simple.args = {
  children: "Simple",
  simple: true,
};

export const NormalFullWidth = Template.bind({});
NormalFullWidth.args = {
  children: "Normal FullWidth",
  fullWidth: true,
};

export const SecondaryFullWidth = Template.bind({});
SecondaryFullWidth.args = {
  children: "Secondary FullWidth",
  secondary: true,
  fullWidth: true,
};

export const PrimaryDisabled = Template.bind({});
PrimaryDisabled.args = {
  children: "Primary Disabled",
  secondary: false,
  disabled: true,
};

export const SecondaryDisabled = Template.bind({});
SecondaryDisabled.args = {
  children: "Secondary Disabled",
  secondary: true,
  disabled: true,
};

export const SimpleDisabled = Template.bind({});
SimpleDisabled.args = {
  children: "Simple Disabled",
  simple: true,
  disabled: true,
};
