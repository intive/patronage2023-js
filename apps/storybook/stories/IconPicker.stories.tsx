import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { IconPicker } from "ui";

export default {
  title: "Icon picker",
  component: IconPicker,
} as ComponentMeta<typeof IconPicker>;

const Template: ComponentStory<typeof IconPicker> = ({ ...args }) => (
  <IconPicker {...args}></IconPicker>
);

export const BasicIconPicker = Template.bind({});
BasicIconPicker.args = {
  selectedIcon: "payments",
  onSelect: () => {},
  icons: [
    "savings",
    "directions_car",
    "payments",
    "subscriptions",
    "shopping_cart",
    "home",
    "wallet",
    "error",
    "help",
  ],
};
