import styled from "styled-components";
import { BudgetIcon, CurrencyAmount } from "ui";
import { device } from "lib/media-queries";

export const BasicInfoWrapper = styled.div`
  width: 100%;
`;

export const TitleEditButton = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
`;

export const TopSectionWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 16px;
  margin-bottom: 32px;
  align-items: flex-start;
  gap: 8px;
  margin-bottom: 16px;
  ${device.tablet} {
    margin-bottom: 32px;
    align-items: center;
    gap: 16px;
  }
`;

export const TileWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  flex-direction: column;
  gap: 4px;
  ${device.tablet} {
    flex-direction: row;
    flex-wrap: wrap;
    gap: 8px;
  }
`;

export const BudgetIconStyled = styled(BudgetIcon)`
  height: 80px;
  width: 80px;
  font-size: 1.5em;
  height: 40px;
  width: 40px;
  font-size: 0.9em;
  flex-shrink: 0;
  ${device.tablet} {
    height: 80px;
    width: 80px;
    font-size: 1.5em;
  }
`;

export const StyledTitle = styled.h1`
  font-family: "Signika", sans-serif;
  font-size: 32px;
  font-size: 28px;
  font-weight: 600;
  line-height: 48px;
  line-height: 28px;
  color: ${({ theme }) => theme.main};
  ${device.tablet} {
    font-size: 32px;
    line-height: 48px;
  }
`;

export const StyledDescription = styled.span`
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0px;
  font-size: 12px;
  color: ${({ theme }) => theme.infoTile.label};
  ${device.tablet} {
    font-size: 14px;
    line-height: 20px;
  }
`;

export const InfoTileAmount = styled(CurrencyAmount)`
  color: ${({ theme }) => theme.infoTile.value};
`;
