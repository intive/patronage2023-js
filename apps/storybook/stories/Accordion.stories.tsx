import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Accordion } from "ui";
import React from "react";

export default {
  title: "Accordion",
  component: Accordion,
} as ComponentMeta<typeof Accordion>;

const Template: ComponentStory<typeof Accordion> = ({ ...args }) => (
  <Accordion {...args} />
);

export const Default = Template.bind({});
Default.args = {
  header: "This a title",
  content: "This is content",
};
