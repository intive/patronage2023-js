"use client";

import { TypoStyled, LinkStyled } from "app/(navigation)/HomePageComponents";
import { useTranslate } from "lib/hooks";
import { signIn, signOut, useSession } from "next-auth/react";
import styled from "styled-components";
import { Button } from "ui";
import { useToast } from "ui/Toast";

const ContentWrapperStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1em;
`;

export const MainPageTranslated = () => {
  const { dict, t } = useTranslate("MainPage");
  const { data } = useSession();
  const showToast = useToast();

  return (
    <ContentWrapperStyled>
      <TypoStyled>{t(dict.welcomeText)}</TypoStyled>
      <LinkStyled href="/sign-up">{t(dict.createAccountLink)}</LinkStyled>
      {data ? (
        <>
          <Button onClick={() => signOut()}>Log out</Button>
        </>
      ) : (
        <Button onClick={() => signIn()}>Sign in</Button>
      )}
      <Button
        onClick={() =>
          showToast({ variant: "error", message: "blahblahblahblahblah" })
        }>
        Show toast
      </Button>
    </ContentWrapperStyled>
  );
};
