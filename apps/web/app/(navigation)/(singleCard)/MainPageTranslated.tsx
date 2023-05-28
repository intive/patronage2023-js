"use client";

import { TypoStyled, LinkStyled } from "app/(navigation)/HomePageComponents";
import { useTranslate } from "lib/hooks";
import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "ui";
import styled from "styled-components";

const ContentWrapperStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1em;
`;
export const MainPageTranslated = () => {
  const { dict, t } = useTranslate("MainPage");
  const { data: session } = useSession();

  return (
    <ContentWrapperStyled>
      <TypoStyled>{t(dict.welcomeText)}</TypoStyled>
      {!session && (
        <LinkStyled href="/sign-up">{t(dict.createAccountLink)}</LinkStyled>
      )}
    </ContentWrapperStyled>
  );
};
