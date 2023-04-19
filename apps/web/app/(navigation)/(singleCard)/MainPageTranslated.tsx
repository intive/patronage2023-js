"use client";

import { TypoStyled, LinkStyled } from "app/(navigation)/HomePageComponents";
import { useTranslate } from "lib/hooks";

export const MainPageTranslated = () => {
  const { dict, t } = useTranslate("MainPage");

  return (
    <>
      <TypoStyled>{t(dict.welcomeText)}</TypoStyled>
      <LinkStyled href="/sign-up">{t(dict.createAccountLink)}</LinkStyled>
    </>
  );
};
