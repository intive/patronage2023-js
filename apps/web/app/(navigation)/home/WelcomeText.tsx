"use client";
import { useTranslate } from "lib/hooks";
import { TypoStyled } from "./page.styled";

export const WelcomeText = () => {
  const { t, dict } = useTranslate("HomePage");

  return <TypoStyled>{t(dict.welcomeText)}</TypoStyled>;
};
