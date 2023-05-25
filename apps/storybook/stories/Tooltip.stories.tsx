import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Tooltip } from "ui";
import React from "react";
import styled from "styled-components";

const StyledSpan = styled.span`
  background-color: green;
  color: white;
  padding: 10px;
`;

export default {
  title: "Tooltip",
  component: Tooltip,
} as ComponentMeta<typeof Tooltip>;

const Template: ComponentStory<typeof Tooltip> = ({ ...args }) => (
  <Tooltip {...args}>
    <StyledSpan>Hover over me!</StyledSpan>
  </Tooltip>
);

export const TooltipStory = Template.bind({});
TooltipStory.args = {
  text: "I am a tooltip!",
  position: "bottom",
};
