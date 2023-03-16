import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Chip } from "ui";

export default {
  title: "Chip",
  component: Chip,
} as ComponentMeta<typeof Chip>;

const Template: ComponentStory<typeof Chip> = ({ children, ...args }) => (
  <Chip {...args}>{children}</Chip>
);

export const Completed = Template.bind({});
Completed.args = {
  children: "Completed",
  state: "completed",
};

export const Due = Template.bind({});
Due.args = {
  children: "Due",
  state: "due",
};

export const Recurring = Template.bind({});
Recurring.args = {
  children: "Recurring",
  state: "due",
};

export const Overdue = Template.bind({});
Overdue.args = {
  children: "Overdue",
  state: "failed",
};

export const Cancelled = Template.bind({});
Cancelled.args = {
  children: "Cancelled",
  state: "failed",
};
