import styled from "styled-components";
import { BudgetIcon, CurrencyAmount } from "ui";
import { device, budgetDetailsDevices } from "lib/media-queries";

export const TopWrapperStyled = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  ${budgetDetailsDevices.big} {
    flex-direction: row;
  }
`;

export const BasicBudgetInfoWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
  padding-right: 16px;

  ${budgetDetailsDevices.small} {
    padding-right: 0;
  }
`;

export const BudgetIconStyled = styled(BudgetIcon)`
  margin-right: 16px;
  height: 58px;
  width: 58px;
  font-size: 0.9em;
  flex-shrink: 0;
  ${budgetDetailsDevices.big} {
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

  & :not(:first-child) {
    display: none;
  }

  ${budgetDetailsDevices.small} {
    & :not(:first-child) {
      display: initial;
    }
  }
`;

export const BudgetNameStyled = styled.h1`
  font-family: "Signika", sans-serif;
  font-size: 28px;
  font-weight: 600;
  line-height: 28px;
  color: ${({ theme }) => theme.main};

  ${budgetDetailsDevices.small} {
    margin-right: auto;
  }

  ${budgetDetailsDevices.big} {
    font-size: 32px;
    line-height: 150%;
    margin-right: 8px;
  }
`;

export const DropdownMenuButtonStyled = styled.button`
  background-color: transparent;
  border: none;
`

export const BudgetDescriptionStyled = styled.span`
  line-height: 150%;
  letter-spacing: 0px;
  font-size: 12px;
  color: ${({ theme }) => theme.infoTile.label};
  ${budgetDetailsDevices.big} {
    font-size: 14px;
    display: initial;
  }
`;

export const InfoTileWrapperStyled = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  gap: 4px;
  width: 100%;
  margin-top: -16px;
  ${budgetDetailsDevices.big} {
    flex-direction: row;
    gap: 8px;
    margin-top: 0;
  }
`;

export const InfoTileAmount = styled(CurrencyAmount)`
  color: ${({ theme }) => theme.infoTile.value};
`;
