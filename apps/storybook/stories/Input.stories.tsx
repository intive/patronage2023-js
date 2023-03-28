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
        onChange={(event) => setValue(event.target.value)}
        onInputCleared={() => setValue("")}
      />
    </div>
  );
};

export const Normal = Template.bind({});
Normal.args = {
  label: "Label",
  hasError: false,
  name: "normal",
  type: "text",
};

export const SupportingLabel = Template.bind({});
SupportingLabel.args = {
  label: "Label",
  hasError: false,
  name: "supportingLabel",
  supportingLabel: "Supporting label",
  type: "text",
};

export const Error = Template.bind({});
Error.args = {
  label: "Label",
  hasError: true,
  name: "error",
  supportingLabel: "Supporting label",
};

export const Password = Template.bind({});
Password.args = {
  label: "Label",
  hasError: false,
  name: "password",
  supportingLabel: (
    <div>
      <a href="#">Forgot password?</a>
    </div>
  ),
  type: "password",
};

export const PasswordWithError = Template.bind({});
PasswordWithError.args = {
  label: "Label",
  hasError: true,
  name: "passwordWithError",
  supportingLabel: (
    <div>
      <a href="#">Forgot password?</a>
    </div>
  ),
  type: "password",
};
