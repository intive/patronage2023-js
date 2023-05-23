"use client";

import { useTranslate } from "lib/hooks";
import { AsideCardContent } from "app/AsideCardContent";
import MultiCardLayout from "../MultiCardLayout";

export const ReportsTitle = () => {
  const { t, dict } = useTranslate("ReportsPage");
  const mainCardContent = <h1>{t(dict.title)}</h1>;

  return (
    <MultiCardLayout main={mainCardContent} aside={<AsideCardContent />} />
  );
};
