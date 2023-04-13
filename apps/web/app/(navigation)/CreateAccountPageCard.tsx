"use client";

import { CardStyled, TypoStyled, LinkStyled } from "./main-page-components";
import { useTranslate } from "lib/hooks";

export const CreateAccountPageCard = () => {
  const { dict, t } = useTranslate("CreateAccountPage");

  return (
    <CardStyled>
      <TypoStyled>{t(dict.welcomeText)}</TypoStyled>
      <LinkStyled href="/sign-up">{t(dict.createAccountLink)}</LinkStyled>
    </CardStyled>
  );
};
