import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Logo } from "ui";
import styled from "styled-components";

export default {
  title: "Logo",
  component: Logo,
} as ComponentMeta<typeof Logo>;

type ParentProps = {
  white?: boolean;
  logoWidth?: number;
};

const Parent = styled.span<ParentProps>`
  display: inline-block;
  background-color: ${({ white }) => white && "#1E4C40"};
  width: ${({ logoWidth }) => logoWidth + "px"};
`;

const Template: ComponentStory<typeof Logo> = ({ ...args }) => (
  <Parent white={args.white} logoWidth={args.logoWidth}>
    <Logo {...args} />
  </Parent>
);

export const Normal = Template.bind({});

export const White = Template.bind({});
White.args = {
  white: true,
};

export const CustomWidth = Template.bind({});
CustomWidth.args = {
  logoWidth: 250,
};

export const CustomWidthWhite = Template.bind({});
CustomWidthWhite.args = {
  logoWidth: 250,
  white: true,
};
