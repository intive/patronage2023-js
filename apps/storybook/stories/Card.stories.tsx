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
  padding: "20px",
  margin: "",
  minWidth: "",
  minHeight: "",
  noBorder: false,
  children: (
    <img
      src="form_img.png"
      alt=""
      height={250}
      style={{ border: "1px solid red" }}
    />
  ),
};

export const CardWithColor = Template.bind({});
CardWithColor.args = {
  children:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus est accusantium eligendi? Totam asperiores nemo modi accusantium libero autem, nihil quisquam, velit numquam minus tempore quidem in dolorem soluta exercitationem.",
  color: "#515151",
  padding: "20px",
  margin: "",
  minWidth: "",
  minHeight: "",
  noBorder: false,
};
