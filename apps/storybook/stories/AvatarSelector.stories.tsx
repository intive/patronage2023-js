// write story with useState

import React, { useState } from "react";
import { AvatarSelector } from "ui";
import { ComponentStory, ComponentMeta } from "@storybook/react";

export default {
  title: "AvatarSelector",
  component: AvatarSelector,
  argTypes: {},
} as ComponentMeta<typeof AvatarSelector>;

const Template: ComponentStory<typeof AvatarSelector> = (args) => {
  const [selected, setSelected] = useState<string>();
  return (
    <div
      style={{
        width: "480px",
      }}>
      <h3>Wybrany awatar: {selected || "brak"}</h3>
      <AvatarSelector
        {...args}
        selectedAvatar={selected}
        onSelect={setSelected}
      />
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {
  avatars: [
    "/avatars/1.svg",
    "/avatars/2.svg",
    "/avatars/3.svg",
    "/avatars/4.svg",
    "/avatars/5.svg",
    "/avatars/6.svg",
    "/avatars/7.svg",
    "/avatars/8.svg",
  ]
};
