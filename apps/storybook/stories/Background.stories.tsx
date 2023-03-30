import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Background, Button } from "ui";

export default {
  title: "Background",
  component: Background,
} as ComponentMeta<typeof Background>;

const Template: ComponentStory<typeof Background> = ({ children, ...args }) => (
  <Background {...args}>{children}</Background>
);

export const BackgroundPattern = Template.bind({});
BackgroundPattern.args = {
  children: <Button>Normal</Button>,
};

export const BackgroundWithoutPattern = Template.bind({});
BackgroundWithoutPattern.args = {
  children: <Button>Normal</Button>,
  withoutPattern: true,
};
