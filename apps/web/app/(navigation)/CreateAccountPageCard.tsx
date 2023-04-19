"use client";

import { CardStyled, TypoStyled, LinkStyled } from "./HomePageComponents";
import { useTranslate } from "lib/hooks";

export const CreateAccountPageCard = () => {
  const { dict, t } = useTranslate("MainPage");

  return (
    <CardStyled>
      <TypoStyled>{t(dict.welcomeText)}</TypoStyled>
      <LinkStyled href="/sign-up">{t(dict.createAccountLink)}</LinkStyled>
    </CardStyled>
  );
};
