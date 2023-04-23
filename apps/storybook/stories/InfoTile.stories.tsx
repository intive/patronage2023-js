import React from "react";
import { ComponentMeta } from "@storybook/react";
import styled from "styled-components";

import { InfoTile, InfoTileProps } from "ui/InfoTile";
import { Icon } from 'ui'
import { StyledAddInfoSpan } from "ui/Infotile/infoTile.styled";

const Wrapper = styled.div`
  width: fit-content;
`;

export default {
  title: "InfoTile",
  component: InfoTile,
} as ComponentMeta<typeof InfoTile>;

const Template = ({ children, ...args }: InfoTileProps) => (
  <Wrapper>
    <InfoTile {...args}>{children}</InfoTile>
  </Wrapper>
  
);

export const TileWithStrings = Template.bind({});
TileWithStrings.args = {
  label: "Budget period",
  children: "Jan 1 - Jan 31",
};

export const TileWithReactFragment = Template.bind({});
TileWithReactFragment.args = {
  label: "Currency",
  children: (
    <>
      <span>USD</span>
      <StyledAddInfoSpan>United States Dollar</StyledAddInfoSpan>
    </>
  ),
};

export const TileWithComponent = Template.bind({});
TileWithComponent.args = {
  label: "Some icon",
  children: (
    <>
      <Icon icon="subscriptions"/>
      <span>Awesome Icon</span>
    </>
      
  ),
};
