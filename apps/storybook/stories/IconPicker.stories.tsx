import React, { useState } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { IconPicker } from "ui";

export default {
  title: "Icon picker",
  component: IconPicker,
} as ComponentMeta<typeof IconPicker>;

const TemplateWithIcon: ComponentStory<typeof IconPicker> = ({ ...args }) => {
  const defaultIcon = "savings";
  const [selectedIcon, setSelectedIcon] = useState(defaultIcon);

  return (
    <>
      <IconPicker
        {...args}
        defaultIcon={defaultIcon}
        onSelect={(icon) => setSelectedIcon(icon)}
      />
      <p>{`Wybrano ikonę: ${selectedIcon}`}</p>
    </>
  );
};

const TemplateWithoutIcon: ComponentStory<typeof IconPicker> = ({
  ...args
}) => {
  const [selectedIcon, setSelectedIcon] = useState("");

  return (
    <>
      <IconPicker {...args} onSelect={(icon) => setSelectedIcon(icon)}>
        <p style={{ width: "50%", textAlign: "center" }}>Wybierz ikonę</p>
      </IconPicker>
      <p>{`Wybrano ikonę: ${selectedIcon}`}</p>
    </>
  );
};

export const WithDefaultIcon = TemplateWithIcon.bind({});
WithDefaultIcon.args = {
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

export const WithoutDefaultIcon = TemplateWithoutIcon.bind({});
WithoutDefaultIcon.args = {
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
