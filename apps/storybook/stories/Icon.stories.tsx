import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Icon } from "ui";

export default {
  title: "Icon",
  component: Icon,
} as ComponentMeta<typeof Icon>;

const Template: ComponentStory<typeof Icon> = ({ ...args }) => (
  <Icon {...args} />
);

export const Outline = Template.bind({});
Outline.args = {
  icon: "home",
  variant: "outlined",
  color: "black",
};

export const Filled = Template.bind({});
Filled.args = {
  icon: "home",
  variant: "filled",
  color: "black",
};
