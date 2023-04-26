"use client";

import { TypoStyled, LinkStyled } from "app/(navigation)/HomePageComponents";
import { useTranslate } from "lib/hooks";
import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "ui";

export const MainPageTranslated = () => {
  const { dict, t } = useTranslate("MainPage");
  const { data } = useSession();

  return (
    <>
      <TypoStyled>{t(dict.welcomeText)}</TypoStyled>
      <LinkStyled href="/sign-up">{t(dict.createAccountLink)}</LinkStyled>
      <Button onClick={() => signOut()}>Log out</Button>
      <br />
      <Button onClick={() => signIn()}>Sign in</Button>
      <br />
      <Button onClick={() => console.log(data)}>Check data</Button>
    </>
  );
};
