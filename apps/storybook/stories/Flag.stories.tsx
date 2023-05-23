import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Flag } from "ui";

export default {
  title: "Flag",
  component: Flag,
} as ComponentMeta<typeof Flag>;

const Template: ComponentStory<typeof Flag> = ({ ...args }) => (
  <Flag {...args} />
);

export const PolishFlag = Template.bind({});
PolishFlag.args = {
  src: "/flags/pl.svg",
  alt: "Flag of Poland",
};

export const UKFlag = Template.bind({});
UKFlag.args = {
  src: "/flags/en.svg",
  alt: "Flag of UK",
};

export const FrenchFlag = Template.bind({});
FrenchFlag.args = {
  src: "/flags/fr.svg",
  alt: "Flag of France",
};
