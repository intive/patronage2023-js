import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Button, Icon } from "ui";

export default {
  title: "Button",
  component: Button,
  argTypes: {
    variant: { control: "radio", options: ["primary", "secondary", "simple"] },
    fullWidth: { control: "boolean" },
    small: { control: "boolean" },
  },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = ({ children, ...args }) => (
  <Button {...args}>{children}</Button>
);

export const Primary = Template.bind({});
Primary.args = {
  children: "Primary",
};

export const Secondary = Template.bind({});
Secondary.args = {
  children: "Secondary",
  variant: "secondary",
};

export const Simple = Template.bind({});
Simple.args = {
  children: "Simple",
  variant: "simple",
};

export const PrimaryFullWidth = Template.bind({});
PrimaryFullWidth.args = {
  children: "Primary FullWidth",
  variant: "primary",
  fullWidth: true,
};

export const SecondaryFullWidth = Template.bind({});
SecondaryFullWidth.args = {
  children: "Secondary FullWidth",
  variant: "secondary",
  fullWidth: true,
};

export const PrimaryDisabled = Template.bind({});
PrimaryDisabled.args = {
  children: "Primary Disabled",
  variant: "primary",
  disabled: true,
};

export const SecondaryDisabled = Template.bind({});
SecondaryDisabled.args = {
  children: "Secondary Disabled",
  variant: "secondary",
  disabled: true,
};

export const SimpleDisabled = Template.bind({});
SimpleDisabled.args = {
  children: "Simple Disabled",
  variant: "simple",
  disabled: true,
};

export const PrimaryWithIcon = Template.bind({});
PrimaryWithIcon.args = {
  children: (
    <>
      Primary with Icon
      <Icon icon="arrow_drop_down" color="white" iconSize={30} />
    </>
  ),
  variant: "primary",
  disabled: false,
  fullWidth: false,
  small: true,
};

export const PrimaryWithLongText = Template.bind({});
PrimaryWithLongText.args = {
  children:
    "Primary With Long Long Long Long Long Long Long Long Long Long Long Long Long Long Long Text",
};
