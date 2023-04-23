import { ReactNode } from "react";
import {InfoTileStyled, InfoValueWrapper} from './infoTile.styled'

type InfoTileProps = {
  label: string;
  children: ReactNode | JSX.Element;
}

export const InfoTile = ({ label, children }: InfoTileProps) => {

  return (
    <InfoTileStyled>
      {label}
      <InfoValueWrapper>{children}</InfoValueWrapper>
    </InfoTileStyled>
  );
};
