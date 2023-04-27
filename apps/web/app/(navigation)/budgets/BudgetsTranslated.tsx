"use client";

import { useTranslate } from "lib/hooks";
import { DummyAsideCardContent } from "app/DummyAsideCardContent";
import MultiCardLayout from "../MultiCardLayout";
import { BudgetBasicInformation } from './[id]/BudgetBasicInformation';
import { Budget } from "lib/types";

import { TransactionsTable } from "./[id]/TransactionsTable";

const budget: Budget = {
  "id": "36cc0777-2874-4d0c-a389-91280e45e836",
  "name": "Trip to London",
  "description": "Two week vacations in London",
  "icon": "savings",
  "currency": {
    "locale": "en-GB",
    "tag": "GBP"
  },
  "startDate": 1677628800000,
  "endDate": 1678838400000,
  "limit": 20000
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
