import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Icon } from "ui";

export default {
  title: "Icon",
  component: Icon,
} as ComponentMeta<typeof Icon>;

const Template: ComponentStory<typeof Icon> = ({ ...args }) => (
  <Icon {...args} />
);

export const Normal = Template.bind({});
Normal.args = {
  icon: "home",
  variant: "outlined",
  color: "black",
};
