"use client";

import { useTranslate } from "lib/hooks";

export const TeamTitle = () => {
  const { t, dict } = useTranslate("TeamPage");

  return <h1>{t(dict.title)}</h1>;
};
