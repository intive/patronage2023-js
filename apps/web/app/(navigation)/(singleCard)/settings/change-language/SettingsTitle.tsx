"use client";

import { useTranslate } from "lib/hooks";

export const SettingsTitle = () => {
  const { t, dict } = useTranslate("SettingsPage");

  return <h1>{t(dict.language.title)}</h1>;
};
