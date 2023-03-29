import React from "react";
import { ComponentMeta } from "@storybook/react";
import styled from "styled-components";

import { Avatar, AvatarProps } from "ui/Avatar";

export default {
  title: "Avatar",
  component: Avatar,
} as ComponentMeta<typeof Avatar>;

const Template = ({ ...args }: AvatarProps) => (
  <Wrapper>
    <Avatar {...args} />
  </Wrapper>
);

export const Normal = Template.bind({});
Normal.args = {
  username: "Ricardo",
  src: "https://t0.gstatic.com/licensed-image?q=tbn:ANd9GcT6y09yzjZgTgDakotcP0I1a1lw1bwLenGGCQYe54D4x66GzlWTW5x-hMklvlfTDXLF",
};

// example for stacked avatars

const TemplateStyledAvatar = ({ ...args }: AvatarProps) => (
  <Wrapper>
    <Avatar {...args} />
    <Avatar {...args} />
    <Avatar {...args} />
  </Wrapper>
);

export const StackedWithOutline = TemplateStyledAvatar.bind({});
StackedWithOutline.args = {
  username: "Howard Wolowitz",
  src: "https://t0.gstatic.com/licensed-image?q=tbn:ANd9GcT6y09yzjZgTgDakotcP0I1a1lw1bwLenGGCQYe54D4x66GzlWTW5x-hMklvlfTDXLF",
  outlined: true,
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  font-size: 48px;
  line-height: 1em;

  > * + * {
    margin-left: -0.4em;
  }
`;
