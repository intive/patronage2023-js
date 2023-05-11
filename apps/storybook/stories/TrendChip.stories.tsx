import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { TrendChip } from "ui";

export default {
  title: "TrendChip",
  component: TrendChip,
} as ComponentMeta<typeof TrendChip>;

const Template: ComponentStory<typeof TrendChip> = ({ ...args }) => (
  <TrendChip {...args} />
);

//in stories ariaLabel is hardcoded
export const PositiveValue = Template.bind({});
PositiveValue.args = {
  value: 20,
  ariaLabel: `Your budget's percentage growth is 20%`,
};

export const NegativeValue = Template.bind({});
NegativeValue.args = {
  value: -20,
  ariaLabel: `Your budget's percentage growth is -20%`,
};

export const ZeroValue = Template.bind({});
ZeroValue.args = {
  value: 0,
  ariaLabel: `Your budget's percentage growth is 0%`,
};
