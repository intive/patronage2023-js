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
  type: "Done",
};

export const Due = Template.bind({});
Due.args = {
  children: "Due",
  type: "Due",
};

export const Recurring = Template.bind({});
Recurring.args = {
  children: "Recurring",
  type: "Recurring",
};

// export const Overdue = Template.bind({});
// Overdue.args = {
//   children: "Overdue",
//   type: "failed",
// };

export const Cancelled = Template.bind({});
Cancelled.args = {
  children: "Cancelled",
  type: "Cancelled",
};
