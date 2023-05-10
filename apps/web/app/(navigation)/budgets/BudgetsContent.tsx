"use client";

import { DummyAsideCardContent } from "app/DummyAsideCardContent";
import MultiCardLayout from "../MultiCardLayout";
import { TransactionsTable } from "./[id]/TransactionsTable";
import { BudgetBasicInformation } from "./[id]/BudgetBasicInformation";
import { TrendChart } from "./[id]/TrendChart";
import { Budget } from "lib/types";
import { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { usePathname } from "next/navigation";
import { device } from "lib/media-queries";

import { mockDataChart } from "./[id]/mock-data-chart";

const BudgetContentWrapperStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  align-self: flex-start;
  gap: 16px;
  ${device.tablet} {
    gap: 32px;
  }
`;

export const BudgetsContent = () => {
  const id = usePathname()?.replace("/budgets/", "");

  const [budgets, setBudgets] = useState<Budget[]>([]);

  useEffect(() => {
    fetch(`/budgets.json`)
      .then((response) => response.json())
      .then((result) => {
        setBudgets(result.budgets);
        console.log(result);
      });
  }, []);

  const budget = useMemo(
    () => budgets.find((currentBudget) => currentBudget.id === id),
    [id, budgets]
  );

  const mainCardContent = budget && (
    <BudgetContentWrapperStyled>
      <BudgetBasicInformation budget={budget} />
      <TrendChart statistics={mockDataChart.statistics} currency={budget.currency} />
      <TransactionsTable
        budget={budget}
        setSorting={(column) => console.log(column)}
      />
    </BudgetContentWrapperStyled>
  );

  return (
    <MultiCardLayout
      main={mainCardContent ? mainCardContent : <></>}
      aside={<DummyAsideCardContent />}
    />
  );
};
