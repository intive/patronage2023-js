"use client";

import { useTranslate } from "lib/hooks";
import { DummyAsideCardContent } from "app/DummyAsideCardContent";
import MultiCardLayout from "../MultiCardLayout";

export const ReportsTitle = () => {
  const { t, dict } = useTranslate("ReportsPage");
  const mainCardContent = <h1>{t(dict.title)}</h1>;

  return (
    <MultiCardLayout main={mainCardContent} aside={<DummyAsideCardContent />} />
  );
};
