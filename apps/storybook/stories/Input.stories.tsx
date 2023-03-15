import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Input } from "ui";

export default {
    title: "Input",
    component: Input,
  } as ComponentMeta<typeof Input>;
  
  const Template: ComponentStory<typeof Input> = ({ ...args }) => (
    <Input {...args} />
  );
  
  export const Normal = Template.bind({});
  Normal.args = {
    label: "Label",
    hasError: false,
    id: '',
  };

  export const Error = Template.bind({});
  Error.args = {
    label: "Label",
    hasError: true,
    id: '',
  };