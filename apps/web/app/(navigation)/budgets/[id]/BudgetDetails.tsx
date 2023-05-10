import React from "react";

import styled from "styled-components";
import BudgetStatistics from "./BudgetStatistics";
import { type BudgetGeneralInfo } from "lib/types";

interface Props {
  budget: BudgetGeneralInfo;
}
const DetailsWrapperStyled = styled.div`
  width: 100%;
  border: 2px solid #f7f7f7;
  border-radius: 16px;
  display: flex;
  justify-content: center;
  padding: 24px 32px;
`;

const BudgetDetails = ({ budget }: Props) => {
  const { id, currency, startDate, endDate } = budget;

  return (
    <DetailsWrapperStyled>
      <div>lewy</div>
      <BudgetStatistics budget={budget} />
    </DetailsWrapperStyled>
  );
};

export default BudgetDetails;
