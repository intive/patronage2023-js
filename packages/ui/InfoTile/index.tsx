"use client"

import { ReactHTMLElement } from 'react';
import {InfoTileStyled, InfoValueWrapper} from './infoTile.styled'

export type InfoTileProps = {
  label: string;
  children: React.ReactNode
} 

export const InfoTile = ({ label, children }: InfoTileProps) => {

  return (
    <InfoTileStyled>
      {label}
      <InfoValueWrapper>{children}</InfoValueWrapper>
    </InfoTileStyled>
  );
};
