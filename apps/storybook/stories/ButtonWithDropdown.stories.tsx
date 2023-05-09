import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { ButtonWithDropdown, ButtonWithDropdownProps } from "ui/ButtonWithDropdown";

const DUMMY_DROPDOWNITEMS = [
  {
    label: "New income",
    callback: () => alert("New income modal"),
  },
  {
    label: "New expense",
    callback: () => alert("New expense modal"),
  },
];

export default {
  title: "Button With Dropdown",
  component: ButtonWithDropdown,
} as ComponentMeta<typeof ButtonWithDropdown>;

const Template: ComponentStory<typeof ButtonWithDropdown> = ({ ...args }: ButtonWithDropdownProps) => (
    <ButtonWithDropdown {...args}></ButtonWithDropdown>
);

export const CreateButtonWithDropdown = Template.bind({})
CreateButtonWithDropdown.args = {
  label: "Create",
  items: DUMMY_DROPDOWNITEMS
  };
