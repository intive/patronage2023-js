import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Separator } from "ui";

export default {
  title: "Separator",
  component: Separator,
} as ComponentMeta<typeof Separator>;

const Template: ComponentStory<typeof Separator> = ({ ...args }) => (
  <Separator {...args} />
);

export const Normal = Template.bind({});
Normal.args = {
  label: "or",
};
