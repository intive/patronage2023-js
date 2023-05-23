import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Tooltip } from "ui";
import React from "react";

export default {
  title: "Tooltip",
  component: Tooltip,
} as ComponentMeta<typeof Tooltip>;

const Template: ComponentStory<typeof Tooltip> = ({ ...args }) => (
  <Tooltip {...args}>
    <button>Hover over me!</button>
  </Tooltip>
);

export const TooltipStory = Template.bind({});
TooltipStory.args = {
  text: "home",
  position: "bottom",
};
