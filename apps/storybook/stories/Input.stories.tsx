import React, { useState } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Input } from "ui";

export default {
  title: "Input",
  component: Input,
} as ComponentMeta<typeof Input>;

const Template: ComponentStory<typeof Input> = ({ ...args }) => {
  const [value, setValue] = useState("");
  return (
    <div style={{ maxWidth: "300px" }}>
      <Input
        {...args}
        value={value}
        onChange={(newValue) => setValue(newValue)}
      />
    </div>
  );
};

export const Normal = Template.bind({});
Normal.args = {
  label: "Label",
  hasError: false,
  id: "",
  supportingLabel: "Supporting label",
  type: "text",
};

export const Error = Template.bind({});
Error.args = {
  label: "Label",
  hasError: true,
  id: "",
  supportingLabel: "Supporting label",
};

export const Password = Template.bind({});
Password.args = {
  label: "Label",
  hasError: false,
  id: "",
  supportingLabel: (
    <div>
      <a href="#">Forgot password?</a>
    </div>
  ),
  type: "password",
};
