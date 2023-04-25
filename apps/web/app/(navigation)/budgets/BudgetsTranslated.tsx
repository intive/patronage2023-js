"use client";

import { useTranslate } from "lib/hooks";
import { DummyAsideCardContent } from "app/DummyAsideCardContent";
import MultiCardLayout from "../MultiCardLayout";

import { TransactionsTable } from "../../../../../packages/ui/TransactionsTable";

export const BudgetsTitle = ({ name = "" }) => {
  const { t, dict } = useTranslate("BudgetsPage");
  const mainCardContent = (
    <TransactionsTable budgetId="71ee9a04-6b27-423a-9caa-7d6a92335dae" />
  );

  return (
    <MultiCardLayout main={mainCardContent} aside={<DummyAsideCardContent />} />
  );
};
