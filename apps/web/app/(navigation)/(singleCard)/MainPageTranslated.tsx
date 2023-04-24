"use client";

import { TypoStyled, LinkStyled } from "app/(navigation)/HomePageComponents";
import { useTranslate } from "lib/hooks";
import { signOut } from "next-auth/react";

export const MainPageTranslated = () => {
  const { dict, t } = useTranslate("MainPage");

  return (
    <>
      <TypoStyled>{t(dict.welcomeText)}</TypoStyled>
      <LinkStyled href="/sign-up">{t(dict.createAccountLink)}</LinkStyled>
      <button onClick={() => signOut()}>Log out</button>
    </>
  );
};
