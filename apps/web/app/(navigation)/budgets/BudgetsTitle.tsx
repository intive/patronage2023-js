"use client";

import { useTranslate } from "lib/hooks";

export const BudgetsTitle = () => {
  const { t, dict } = useTranslate("BudgetsPage");

  return <h1>{t(dict.title)}</h1>;
};
