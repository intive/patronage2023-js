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

// import PL from "../../web/public/flags/pl.svg";

export const PolishFlag = Template.bind({});
PolishFlag.args = {
  src: "/flags/pl.svg",
};

export const UKFlag = Template.bind({});
UKFlag.args = {
  src: "/flags/en.svg",
};

export const FrenchFlag = Template.bind({});
FrenchFlag.args = {
  src: "/flags/fr.svg",
};
