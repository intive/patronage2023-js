import styled from "styled-components";
import {
  BudgetIcon,
  CurrencyAmount,
  NavBudgetIcon,
  TransactionDropdownMenu,
} from "ui";
import { device } from "lib/media-queries";

export const TopWrapperStyled = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  ${device.tv} {
    flex-direction: row;
  }
`;

export const BasicBudgetInfoWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
  padding-right: 0;
  max-width: 100%;
  align-items: center;

  ${device.tablet} {
    align-items: flex-start;
  }

  ${device.tv} {
    padding-right: 16px;
  }
`;

export const BudgetIconStyled = styled(BudgetIcon)`
  margin-right: 16px;
  height: 58px;
  width: 58px;
  font-size: 0.9em;
  flex-shrink: 0;
  ${device.tablet} {
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
  max-width: calc(100% - 74px);
  ${device.tablet} {
    max-width: calc(100% - 96px);
  }
`;

export const BudgetNameIconsWrapperStyled = styled.div`
  flex-direction: row;
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const NavBudgetIconStyled = styled(NavBudgetIcon)`
  display: none;
  ${device.tablet} {
    display: initial;
  }
`;

export const DropdownMenuStyled = styled(TransactionDropdownMenu)`
  ${device.tablet} {
    display: none;
  }
`;

export const BudgetNameStyled = styled.h1`
  font-family: "Signika", sans-serif;
  font-size: 20px;
  line-height: 150%;
  font-weight: 600;
  color: ${({ theme }) => theme.main};
  margin-right: auto;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  ${device.tablet} {
    font-size: 32px;
    margin-bottom: 4px;
    max-width: calc(100% - 120px);
  }

  ${device.tv} {
    margin-right: 8px;
    line-height: 150%;
  }
`;

export const BudgetDescriptionStyled = styled.span`
  font-size: 12px;
  line-height: 150%;
  color: ${({ theme }) => theme.infoTile.label};
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  ${device.tablet} {
    font-size: 14px;
    max-width: calc(100% - 120px);
  }
`;

export const InfoTileWrapperStyled = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  gap: 4px;
  width: 100%;
  margin-top: -16px;
  ${device.tv} {
    flex-direction: row;
    gap: 8px;
    margin-top: 0;
  }
`;

export const InfoTileAmountStyled = styled(CurrencyAmount)`
  color: ${({ theme }) => theme.infoTile.value};
`;
