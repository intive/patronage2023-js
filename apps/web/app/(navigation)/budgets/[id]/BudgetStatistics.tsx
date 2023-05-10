import { type BudgetGeneralInfo } from "lib/types";
import React from "react";
import styled from "styled-components";
import { CurrencyAmount } from "ui";
interface Props {
  budget: BudgetGeneralInfo;
}

const DetailsWrapperStyled = styled.div`
  display: flex;
  flex-direction: column;
`;

const BudgetStatistics = ({ budget }: Props) => {
  return (
    <DetailsWrapperStyled>
      <div></div>
    </DetailsWrapperStyled>
  );
};

export default BudgetStatistics;
