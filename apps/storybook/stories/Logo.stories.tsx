import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Logo } from "ui";

export default {
  title: "Logo",
  component: Logo,
} as ComponentMeta<typeof Logo>;

const Template: ComponentStory<typeof Logo> = ({ ...args }) => (
  <Logo {...args} />
);

export const Normal = Template.bind({});

export const White = Template.bind({});
White.args = {
  $white: true,
};

export const CustomWidth = Template.bind({});
CustomWidth.args = {
  $logoWidth: 250,
};

export const CustomWidthWhite = Template.bind({});
CustomWidthWhite.args = {
  $logoWidth: 250,
  $white: true,
};
