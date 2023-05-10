import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { TrendChip } from "ui";
import styled from "styled-components";

export default {
  title: "TrendChip",
  component: TrendChip,
} as ComponentMeta<typeof TrendChip>;

//imitation of parent component for proper display on storybook
const TrendChipWrapper = styled.div`
  width: 5%;
`;

const Template: ComponentStory<typeof TrendChip> = ({ ...args }) => (
  <TrendChipWrapper>
    <TrendChip {...args} />
  </TrendChipWrapper>
);

export const PositiveValue = Template.bind({});
PositiveValue.args = {
  value: 20,
};

export const NegativeValue = Template.bind({});
NegativeValue.args = {
  value: -20,
};
