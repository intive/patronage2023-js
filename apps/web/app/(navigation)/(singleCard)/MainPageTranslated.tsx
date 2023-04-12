"use client";

import {
  CardStyled,
  TypoStyled,
  LinkStyled,
} from "app/(navigation)/HomePageComponents";
import { useTranslate } from "lib/hooks";

export const MainPageTranslated = () => {
  const { dict, t } = useTranslate("MainPage");

  return (
    <>
      <TypoStyled>{t(dict.welcomeText)}</TypoStyled>
      <LinkStyled href="/sign-in">{t(dict.createAccountLink)}</LinkStyled>
    </>
  );
};
