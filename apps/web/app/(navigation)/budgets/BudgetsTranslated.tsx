"use client";

import { useTranslate } from "lib/hooks";
import { DummyAsideCardContent } from "app/DummyAsideCardContent";
import MultiCardLayout from "../MultiCardLayout";

export const BudgetsTitle = ({ name = "" }) => {
  const { t, dict } = useTranslate("BudgetsPage");
  const mainCardContent = (
    <>
      <h1>{t(dict.title)}</h1>
      {name && <h2>Budget {name}</h2>}
    </>
  );

  return (
    <MultiCardLayout main={mainCardContent} aside={<DummyAsideCardContent />} />
  );
};
