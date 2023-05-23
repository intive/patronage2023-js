import styled from "styled-components";
import { BudgetIcon, CurrencyAmount } from "ui";
import { device } from "lib/media-queries";

export const BasicInfoWrapper = styled.div`
  width: 100%;
`;

export const TitleEditButton = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
`;

export const TopSectionWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 8px;
  margin-bottom: 16px;
  ${device.largeMobile} {
    margin-bottom: 32px;
    align-items: center;
    gap: 16px;
  }
`;

export const TileWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  gap: 4px;
  ${device.largeMobile} {
    flex-direction: row;
    gap: 8px;
  }
`;

export const BudgetIconStyled = styled(BudgetIcon)`
  display: none;
  height: 40px;
  width: 40px;
  font-size: 0.9em;
  flex-shrink: 0;
  ${device.largeMobile} {
    height: 80px;
    width: 80px;
    font-size: 1.5em;
    display: flex;
  }
`;

export const StyledTitle = styled.h1`
  width: 100%;
  font-family: "Signika", sans-serif;
  font-size: 28px;
  font-weight: 600;
  line-height: 28px;
  color: ${({ theme }) => theme.main};
  ${device.largeMobile} {
    font-size: 32px;
    line-height: 48px;
    width: auto;
  }
`;

export const StyledDescription = styled.span`
  display: none;
  line-height: 20px;
  letter-spacing: 0px;
  font-size: 12px;
  color: ${({ theme }) => theme.infoTile.label};
  ${device.largeMobile} {
    font-size: 14px;
    display: initial;
  }
`;

export const InfoTileAmount = styled(CurrencyAmount)`
  color: ${({ theme }) => theme.infoTile.value};
`;
