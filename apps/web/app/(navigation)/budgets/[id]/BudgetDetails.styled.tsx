import styled from "styled-components";
import { CurrencyAmount } from "ui";
import { device } from "lib/media-queries";

export const DetailsWrapperStyled = styled.div`
  width: 100%;
  border: 2px solid ${({ theme }) => theme.budgetContent.budgetDetails};
  border-radius: 16px;
  display: flex;
  padding: 24px 32px;
  gap: 48px;
  flex-direction: column;

  ${device.tablet} {
    flex-direction: row;

    > :first-child {
      width: 50%;
    }
  }

  @media screen and (min-width: 1200px) {
    > :first-child {
      width: 63%;
    }
  }
`;

export const SuspensedChart = styled.div`
  flex: 1;
`;

export const StatisticsWrapperStyled = styled.div`
  display: flex;
  flex-direction: column;
  border-top: 1px solid
    ${({ theme }) => theme.budgetContent.budgetStatistics.border};
  gap: 8px;
  padding-top: 24px;
  ${device.tablet} {
    padding-top: 0;
    padding-left: 48px;
    border-left: 1px solid
      ${({ theme }) => theme.budgetContent.budgetStatistics.border};
    border-top: none;
  }
`;

export const CurrencyAmountStyled = styled(CurrencyAmount)`
  font-size: 32px;
  line-height: 150%;
  font-weight: 600;
  color: ${({ theme }) => theme.budgetContent.budgetStatistics.currency};
  /* ${device.tablet} {
    font-size: 32px;
  } */
`;

export const TitleStyled = styled.span`
  font-family: "Inter", sans-serif;
  font-size: 12px;
  line-height: 24px;
  color: ${({ theme }) => theme.budgetContent.budgetStatistics.title};
`;

export const TotalWrapperStyled = styled.div`
  display: flex;
  flex-direction: column;

  gap: 8px;
`;

export const DetailsWrapperSuspense = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
