"use client";

import { useTranslate } from "lib/hooks";
import { DummyAsideCardContent } from "app/DummyAsideCardContent";
import MultiCardLayout from "../MultiCardLayout";
import { BudgetBasicInformation } from './[id]/BudgetBasicInformation';

export const BudgetsTitle = ({ name = "" }) => {
  const { t, dict } = useTranslate("BudgetsPage");
  const mainCardContent = (
    <>
      <BudgetBasicInformation budgetId="b9d8ef2d-90df-4ee6-b34f-edfb3b90f2de"/>
      <BudgetBasicInformation budgetId="3694a39d-7ecd-4e08-b56a-5dc857c09237"/>
    </>
  );

  return (
    <MultiCardLayout main={mainCardContent} aside={<DummyAsideCardContent />} />
  );
};
