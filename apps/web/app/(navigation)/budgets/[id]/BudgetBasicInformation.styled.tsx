import styled from "styled-components";
import { BudgetIcon, CurrencyAmount } from "ui";
import { device } from "lib/media-queries";

export const TopWrapperStyled = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;

  background-color: #78b7ef;
`;

export const BasicBudgetInfoWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
  background-color: antiquewhite;
  padding-right: 16px;
`;

export const BudgetIconStyled = styled(BudgetIcon)`
  margin-right: 16px;
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

export const BudgetNameWrapperStyled = styled.div`
  flex: 1;
  flex-direction: column;
  display: flex;
`;

export const BudgetNameIconsWrapperStyled = styled.div`
  flex-direction: row;
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const BudgetNameStyled = styled.h1`
  font-family: "Signika", sans-serif;
  font-size: 28px;
  font-weight: 600;
  line-height: 28px;
  color: ${({ theme }) => theme.main};
  ${device.largeMobile} {
    font-size: 32px;
    line-height: 150%;
    width: auto;
  }
`;

export const BudgetDescriptionStyled = styled.span`
  line-height: 150%;
  letter-spacing: 0px;
  font-size: 12px;
  color: ${({ theme }) => theme.infoTile.label};
  ${device.largeMobile} {
    font-size: 14px;
    display: initial;
  }
`;

export const InfoTileWrapperStyled = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  gap: 4px;
  ${device.largeMobile} {
    flex-direction: row;
    gap: 8px;
  }

  background-color: #e8f381;
`;

export const InfoTileAmount = styled(CurrencyAmount)`
  color: ${({ theme }) => theme.infoTile.value};
`;
