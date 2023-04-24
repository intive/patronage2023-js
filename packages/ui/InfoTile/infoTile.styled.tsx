import styled from "styled-components";
import { device } from "../../../apps/web/lib/media-queries";

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

export const TileListStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  ${device.tablet} {
    flex-direction: row;
    flex-wrap: wrap;
  }
`;
