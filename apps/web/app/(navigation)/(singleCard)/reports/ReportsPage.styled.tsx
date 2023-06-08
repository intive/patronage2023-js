import { Line, Bar } from "react-chartjs-2";
import styled from "styled-components";
import { CurrencyAmount } from "ui";
import { device } from "lib/media-queries";

export const PageWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-self: flex-start;
  flex-direction: column;
`;

export const TopWrapper = styled.div`
  display: flex;
  justify-content: space-between;
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
  padding: 16px 24px;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  gap: 1em;
  margin-top: 2em;
  margin-bottom: 2em;
  ${device.tablet} {
    width: 400px;
  }
`;

export const SelectWrapper = styled.div`
  width: 200px;
`;

export const ChartButtonsWrapper = styled.div`
  margin-top: 1px;
  max-height: 54px;
  width: 120px;
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

export const StyledInfo = styled.h2`
  font-family: "Signika", sans-serif;
  font-size: 24px;
  font-weight: 600;
  line-height: 48px;
`;

export const SpinnerWrapper = styled.div`
  width: 100%;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: flex-end;
`;

export const ButtonGroupWrapper = styled.div`
  height: 36px;
`;

export const StyledLine = styled(Line)`
  max-height: 50vh;
`;

export const StyledBar = styled(Bar)`
  max-height: 50vh;
`;
