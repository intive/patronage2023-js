import styled from "styled-components";
import { BudgetIcon, CurrencyAmount } from "ui";

export const BasicInfoWrapper = styled.div`
  width: 100%;
`;

export const TopSectionWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 16px;
  margin-bottom: 32px;
`;

export const TileWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

export const BudgetIconStyled = styled(BudgetIcon)`
  height: 80px;
  width: 80px;
  font-size: 1.5em;
`;

export const StyledTitle = styled.h1`
  font-family: "Signika", sans-serif;
  font-size: 32px;
  font-weight: 600;
  line-height: 48px;
  color: ${({ theme }) => theme.main};
`;

export const StyledDescription = styled.span`
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0px;
  color: ${({ theme }) => theme.infoTile.label};
`;

export const InfoTileAmount = styled(CurrencyAmount)`
  color: ${({ theme }) => theme.infoTile.value};
`;
