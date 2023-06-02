import styled from "styled-components";
import { CurrencyAmount } from "ui";
import { device } from "lib/media-queries";

export const PageWrapper = styled.div`
  width: 100%;
  display: flex;
  align-self: flex-start;
  flex-direction: column;
`;

export const TitleStyled = styled.h1`
  align-self: flex-start;
  width: 100%;
  font-family: "Signika", sans-serif;
  font-size: 32px;
  font-weight: 600;
  line-height: 48px;
  color: ${({ theme }) => theme.main};
  margin-bottom: 1em;
`;

export const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  font-size: 12px;
  line-height: 150%;
  color: ${({ theme }) => theme.trendChart.titleLeft};
  border: 1px solid ${({ theme }) => theme.infoTile.border};
  border-radius: 8px;
  padding: 1em 2em;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 300px;
  gap: 1em;
  margin-top: 2em;
  margin-bottom: 2em;
  ${device.tablet} {
    width: 400px;
  }
`;

export const ChartButtonsWrapper = styled.div`
  height: 54px;
`;

export const StyledReportsBalanceWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

export const StyledTitle = styled.div`
  line-height: 26px;
`;

export const StyledCurrencyAmount = styled(CurrencyAmount)`
  font-size: 28px;
  line-height: 150%;
  font-weight: 600;
  color: ${({ theme }) => theme.trendChart.currencyAmount};
`;

