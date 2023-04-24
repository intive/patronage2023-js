"use client";

import { InfoTile } from "ui";
import { TileListStyled } from 'ui/InfoTile/infoTile.styled'


export type InfoTileContents = {
  dataToRender: React.ReactNode;
  label: string;
  id: number;
};

export type InfoTileListProps = {
  contents: InfoTileContents[];
}

export function InfoTileList({ contents }: InfoTileListProps ) {
  return (
    <>
      <TileListStyled>
        {contents.map( el => <InfoTile key={el.id} label={el.label}>{el.dataToRender}</InfoTile>)}
      </TileListStyled>
    </>
  );
}
