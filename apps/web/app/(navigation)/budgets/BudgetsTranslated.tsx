"use client";

import { useTranslate } from "lib/hooks";
import { DummyAsideCardContent } from "app/DummyAsideCardContent";
import MultiCardLayout from "../MultiCardLayout";
import { BudgetBasicInformation } from './[id]/BudgetBasicInformation';
import { Budget } from "lib/types";
import { TransactionsTable } from "./[id]/TransactionsTable";

const budget: Budget = {
  id: "71ee9a04-6b27-423a-9caa-7d6a92335dae",
  name: "Main budget",
  description: "Main budget of me and my wife",
  icon: "home",
  currency: {
    locale: "en-US",
    tag: "USD",
  },
  startDate: 1680307200000,
  endDate: 1682899200000,
  limit: 10000,
};

export const BudgetsTitle = ({ name = "" }) => {
  const { t, dict } = useTranslate("BudgetsPage");
  const mainCardContent = (
    <>
      <BudgetBasicInformation budget={budget}/>
      <TransactionsTable
      budget={budget}
      setSorting={(column) => console.log(column)}
      />
    </>
  );

  return (
    <MultiCardLayout main={mainCardContent} aside={<DummyAsideCardContent />} />
  );
};
