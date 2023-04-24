"use client"

import styled from "styled-components";

export const InfoTileStyled = styled.div`
  border: 1px solid ${({ theme }) => theme.infoTile.border};
  color: ${({ theme }) => theme.infoTile.label};
  padding: 8px 32px 8px 16px;
  border-radius: 8px;
  font-size: 12px;
  line-height: 24px;
  display: flex;
  flex-direction: column;
`;

export const InfoValueWrapper = styled.div`
margin-top: 4px;
  font-family: "Signika", sans-serif;
  display: flex;
  gap: 8px;
  color: ${({ theme }) => theme.infoTile.value};
  font-size: 16px;
  font-weight: 600;
`;

export const StyledAddInfoSpan = styled.span`
  font-weight: 400;
`;

export type InfoTileProps = {
  label: string;
  dataToRender: React.ReactNode
} & React.HTMLProps<HTMLDivElement>

export const InfoTile = ({ label, dataToRender }: InfoTileProps) => {

  return (
    <InfoTileStyled>
      {label}
      <InfoValueWrapper>{dataToRender}</InfoValueWrapper>
    </InfoTileStyled>
  );
};
