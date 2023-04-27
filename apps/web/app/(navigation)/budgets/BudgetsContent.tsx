"use client";

import { useTranslate } from "lib/hooks";
import { DummyAsideCardContent } from "app/DummyAsideCardContent";
import MultiCardLayout from "../MultiCardLayout";

import { TransactionsTable } from "./[id]/TransactionsTable";
import { BudgetBasicInformation } from "./[id]/BudgetBasicInformation";
import { Budget } from "lib/types";
import { useEffect, useState } from "react";
import styled from "styled-components";

// const budget = {
//   id: "71ee9a04-6b27-423a-9caa-7d6a92335dae",
//   name: "Main budget",
//   description: "Main budget of me and my wife",
//   icon: "home",
//   currency: {
//     locale: "en-US",
//     tag: "USD",
//   },
//   startDate: 1680307200000,
//   endDate: 1682899200000,
//   limit: 10000,
// };
type BudgetsContentProps = {
  id: string;
};

const BudgetContentWrapperStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 32px;
`;

export const BudgetsContent = ({ id }: BudgetsContentProps) => {
  const [budgets, setBudgets] = useState<Budget[]>();
  const [budget, setBudget] = useState<Budget>();
  const { t, dict } = useTranslate("BudgetsPage");
  const mainCardContent = budget && (
    <BudgetContentWrapperStyled>
      <BudgetBasicInformation budget={budget} />
      <TransactionsTable
        budget={budget}
        setSorting={(column) => console.log(column)}
      />
    </BudgetContentWrapperStyled>
  );

  useEffect(() => {
    fetch(`../budgets.json`)
      .then((response) => response.json())
      .then((result) => {
        setBudgets(result.budgets);
        console.log(result);
      });
  }, []);

  useEffect(() => {
    console.log(id);
    console.log(budgets);
    budgets &&
      budgets.map((currentBudget) => {
        if (currentBudget.id === id) {
          setBudget(currentBudget);
          console.log(currentBudget);
        }
      });
  }, [budgets, id]);

  return (
    <MultiCardLayout
      main={mainCardContent ? mainCardContent : <></>}
      aside={<DummyAsideCardContent />}
    />
  );
};
