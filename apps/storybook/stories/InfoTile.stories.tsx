import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import styled from "styled-components";

import { InfoTile, InfoTileProps, StyledAddInfoSpan } from "ui/InfoTile";
import { Icon } from 'ui'

const Wrapper = styled.div`
  width: fit-content;
`;

export default {
  title: "Info Tile",
  component: InfoTile,
} as ComponentMeta<typeof InfoTile>;

const Template: ComponentStory<typeof InfoTile> = ({ ...args }: InfoTileProps) => (
  <Wrapper>
    <InfoTile {...args}></InfoTile>
  </Wrapper>
);

export const InfoTileStrings = Template.bind({});
InfoTileStrings.args = {
  dataToRender: "Jan 1 - Jan 31",
  label: "Budget period",
};

export const InfoTileAddInfo = Template.bind({});
InfoTileAddInfo.args = {
  dataToRender: (
    <>
      <span>USD</span>
      <StyledAddInfoSpan>United States Dollar</StyledAddInfoSpan>
    </>
  ),
  label: "Currency",
};

export const InfoTileWithIcon = Template.bind({});
InfoTileWithIcon.args = {
  dataToRender: (
    <>
      <Icon icon="subscriptions" />
      <span>Super Icon</span>
    </>
  ),
  label: "Some icon",
}



