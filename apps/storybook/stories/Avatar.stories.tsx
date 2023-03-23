import React from "react";
import { ComponentMeta } from "@storybook/react";
import styled from "styled-components";

import { Avatar, AvatarProps } from "ui/Avatar";

export default {
  title: "Avatar",
  component: Avatar,
} as ComponentMeta<typeof Avatar>;

type StoryProps = AvatarProps & { height: number };

const Template = ({ height, ...args }: StoryProps) => (
  <div style={{ height: `${height}px` }}>
    <Avatar {...args} />
  </div>
);

export const Normal = Template.bind({});
Normal.args = {
  height: 120,
  username: "Ricardo",
  src: "https://t0.gstatic.com/licensed-image?q=tbn:ANd9GcT6y09yzjZgTgDakotcP0I1a1lw1bwLenGGCQYe54D4x66GzlWTW5x-hMklvlfTDXLF",
};

// example of avatar with username

const TemplateStyledAvatar = ({ ...args }: StoryProps) => (
  <Wrapper>
    <StyledAvatar {...args} />
    <span>{args.username}</span>
  </Wrapper>
);

export const StyledWithUsername = TemplateStyledAvatar.bind({});
StyledWithUsername.args = {
  username: "Howard Wolowitz",
  src: "https://t0.gstatic.com/licensed-image?q=tbn:ANd9GcT6y09yzjZgTgDakotcP0I1a1lw1bwLenGGCQYe54D4x66GzlWTW5x-hMklvlfTDXLF",
};

const Wrapper = styled.div`
  height: 48px;
  display: flex;
  align-items: center;
  font-size: 14px;
  font-weight: 400;
`;

const StyledAvatar = styled(Avatar)`
  margin-right: 16px;
`;
