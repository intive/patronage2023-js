import { type BudgetGeneralInfo } from "lib/types";
import React from "react";

interface Props {
  budget: BudgetGeneralInfo;
}

const BudgetStatistics = ({ budget }: Props) => {
  return <div>{JSON.stringify(budget)}</div>;
};

export default BudgetStatistics;
