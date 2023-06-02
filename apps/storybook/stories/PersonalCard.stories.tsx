import { ComponentStory, ComponentMeta } from "@storybook/react";
import { PersonalCard } from "ui";
import React from "react";

export default {
  title: "Personal card",
  component: PersonalCard,
} as ComponentMeta<typeof PersonalCard>;

const Template: ComponentStory<typeof PersonalCard> = ({ ...args }) => (
  <PersonalCard {...args} />
);

export const Default = Template.bind({});
Default.args = {
  user: {
    avatar:
      "https://t0.gstatic.com/licensed-image?q=tbn:ANd9GcT6y09yzjZgTgDakotcP0I1a1lw1bwLenGGCQYe54D4x66GzlWTW5x-hMklvlfTDXLF",
  },
};
