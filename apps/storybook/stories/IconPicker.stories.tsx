import React, { useState } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { IconPicker } from "ui";

export default {
  title: "Icon picker",
  component: IconPicker,
} as ComponentMeta<typeof IconPicker>;

const Template: ComponentStory<typeof IconPicker> = ({ ...args }) => {
  const preSelectedIcon = "savings";
  const [selectedIcon, setSelectedIcon] = useState(preSelectedIcon);

  return (
    <>
      <IconPicker
        {...args}
        defaultIcon={preSelectedIcon}
        onSelect={(icon) => setSelectedIcon(icon)}
      />
      <p>{`Wybrano ikonę: ${selectedIcon}`}</p>
    </>
  );
};

export const BasicIconPicker = Template.bind({});
BasicIconPicker.args = {
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
