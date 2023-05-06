import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Spinner } from "ui";

export default {
  title: "Spinner",
  component: Spinner,
} as ComponentMeta<typeof Spinner>;

const Template: ComponentStory<typeof Spinner> = ({ children, ...args }) => (
  <Spinner />
);

export const SpinnerExample = Template.bind({});
