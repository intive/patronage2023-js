import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { ErrorMessage } from "ui";

export default {
  title: "Error message",
  component: ErrorMessage,
} as ComponentMeta<typeof ErrorMessage>;

const Template: ComponentStory<typeof ErrorMessage> = ({ ...args }) => (
  <ErrorMessage {...args} />
);

export const Error = Template.bind({});
Error.args = {
  message: "Invalid credentials. Please try again.",
};
