import React from "react";

import { ComponentStory, ComponentMeta } from "@storybook/react";
import { FormFooter } from "ui";

export default {
  title: "FormFooter",
  component: FormFooter,
} as ComponentMeta<typeof FormFooter>;

const Template: ComponentStory<typeof FormFooter> = ({ ...args }) => (
  <FormFooter {...args} />
);

export const Simple = Template.bind({});
Simple.args = {
  basicText: "Already have an account?",
  linkText: "Log in",
  href: "/sign-in",
};
