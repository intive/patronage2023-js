"use client"

import {InfoTileStyled, InfoValueWrapper} from './infoTile.styled'

export type InfoTileProps = {
  label: string;
  children: string | JSX.Element;
}

export const InfoTile = ({ label, children }: InfoTileProps) => {

  return (
    <InfoTileStyled>
      {label}
      <InfoValueWrapper>{children}</InfoValueWrapper>
    </InfoTileStyled>
  );
};
