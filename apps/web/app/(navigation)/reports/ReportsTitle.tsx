"use client";

import { useTranslate } from "lib/hooks";

export const ReportsTitle = () => {
  const { t, dict } = useTranslate("ReportsPage");

  return <h1>{t(dict.title)}</h1>;
};
