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
    {
      src: "/avatars/1.svg",
      id: "1",
    },
    {
      src: "/avatars/2.svg",
      id: "2",
    },
    {
      src: "/avatars/3.svg",
      id: "3",
    },
    {
      src: "/avatars/4.svg",
      id: "4",
    },
    {
      src: "/avatars/5.svg",
      id: "5",
    },
    {
      src: "/avatars/6.svg",
      id: "6",
    },
    {
      src: "/avatars/7.svg",
      id: "7",
    },
    {
      src: "/avatars/8.svg",
      id: "8",
    },
  ],
};
