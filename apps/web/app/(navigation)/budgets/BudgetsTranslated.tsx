"use client";

import { useTranslate } from "lib/hooks";
import { DummyAsideCardContent } from "app/DummyAsideCardContent";
import MultiCardLayout from "../MultiCardLayout";

export const BudgetsTitle = () => {
  const { t, dict } = useTranslate("BudgetsPage");
  const mainCardContent = <h1>{t(dict.title)}</h1>;

  return (
    <MultiCardLayout main={mainCardContent} aside={<DummyAsideCardContent />} />
  );
};
