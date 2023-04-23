"use client";

import { InfoTile, Icon, Avatar } from "ui";
import { ReactElement } from "react";
import { StyledAddInfoSpan, TileListStyled } from 'ui/InfoTile/infoTile.styled'


type InfoTileContents = {
  dataToRender: string | ReactElement;
  label: string;
  id: number;
};

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
        <Icon icon="subscriptions" color="#1E4C40" />
      </>
    ),
    label: "Some icon",
    id: 4,
  },
  {
    dataToRender: (
      <>
        <div style={{fontSize: "24px"}}>
          <Avatar src="/avatars/1.svg" />
        </div>
        
      </>
    ),
    label: "Some avatar",
    id: 5,
  },
];


export default function Playground() {
  return (
    <>
      <TileListStyled>
        {Object.values(DUMMY_DATA).map( el => <InfoTile key={el.id} label={el.label}>{el.dataToRender}</InfoTile>)}
      </TileListStyled>
    </>
  );
}


