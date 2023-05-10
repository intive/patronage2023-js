import styled from "styled-components";
import { useContext } from "react";
import { CurrencyAmount } from "ui";

export const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const StyledTitle = styled.div`
  font-size: 12px;
  line-height: 150%;
`;

export const StyledBalanceChartWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 6%;

  > * {
    flex: 1;
    flex-shrink: 0;
    width: 47% !important; //override inline styles added to <canvas>
  }

  canvas {
    height: auto !important; //override inline styles added to <canvas>
    max-width: 180px;
  }
`;

export const StyledCurrencyAmount = styled(CurrencyAmount)`
  font-size: 32px;
  line-height: 150%;
  font-weight: 600;
  color: #515151; // ADD THEME
`;
