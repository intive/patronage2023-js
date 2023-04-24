import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import styled from "styled-components";

import { InfoTileList, InfoTileContents, InfoTileListProps } from "ui/InfoTileList";
import { Icon, Avatar } from 'ui'
import { StyledAddInfoSpan } from "ui/InfoTile/infoTile.styled";

const Wrapper = styled.div`
  width: fit-content;
`;

const DUMMY_DATA: Array<InfoTileContents> = [
  {
    dataToRender: "Jan 1 - Jan 31",
    label: "Budget period",
    id: 1,
  },
  {
    dataToRender: (
      <>
        <span>$ 10,000.00</span>
      </>
    ),
    label: "Budget limit",
    id: 2,
  },
  {
    dataToRender: (
      <>
        <span>USD</span>
        <StyledAddInfoSpan>United States Dollar</StyledAddInfoSpan>
      </>
    ),
    label: "Currency",
    id: 3,
  },
  {
    dataToRender: (
      <>
        <Icon icon="subscriptions" />
      </>
    ),
    label: "Some icon",
    id: 4,
  },
  {
    dataToRender: (
      <>
        <div style={{fontSize: "24px"}}>
          <Avatar src="/avatar.svg" />
        </div>
        
      </>
    ),
    label: "Some avatar",
    id: 5,
  },
];

export default {
  title: "Info Tile List",
  component: InfoTileList,
} as ComponentMeta<typeof InfoTileList>;

const Template: ComponentStory<typeof InfoTileList> = ({ ...args }: InfoTileListProps) => (
  <Wrapper>
    <InfoTileList {...args}></InfoTileList>
  </Wrapper>
);

export const InfoTileListDemo = Template.bind({});
InfoTileListDemo.args = {
  contents: DUMMY_DATA,
}



