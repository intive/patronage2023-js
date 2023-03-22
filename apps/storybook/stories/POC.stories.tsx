import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Prove } from "ui";
export default {
  title: "Prove",
  component: Prove,
} as ComponentMeta<typeof Prove>;

const Template: ComponentStory<typeof Prove> = ({ ...args }) => (
  <Prove {...args} />
);

export const Normal = Template.bind({});
Normal.args = {
  src: "/avatar.png",
  alt: "alt",
  width: 500,
  height: 500,
};
