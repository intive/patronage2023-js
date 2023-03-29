import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Card } from "ui";

export default {
  title: "Card",
  component: Card,
} as ComponentMeta<typeof Card>;

const Template: ComponentStory<typeof Card> = ({ children, ...args }) => (
  <Card {...args}>{children}</Card>
);

export const BasicCard = Template.bind({});
BasicCard.args = {
  children: (
    <img
      src="form_img.png"
      alt=""
      height={250}
      style={{ border: "1px solid red", margin: "20px" }}
    />
  ),
};
