"use client";

import { TypoStyled, LinkStyled } from "app/(navigation)/HomePageComponents";
import { useTranslate } from "lib/hooks";
import { signOut, useSession } from "next-auth/react";
import { Button } from "ui";
import styled from "styled-components";

export const MainPageTranslated = () => {
  const { dict, t } = useTranslate("MainPage");
  const { data } = useSession();

  const ContentWrapperStyled = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
  `;

  return (
    <ContentWrapperStyled>
      <TypoStyled>{t(dict.welcomeText)}</TypoStyled>
      <LinkStyled href="/sign-up">{t(dict.createAccountLink)}</LinkStyled>
      <LinkStyled href="/sign-in">Sign in</LinkStyled>
      <br />
      <Button onClick={() => signOut()}>Log out</Button>
      <br />
      {data ? (
        <p>
          User: {data.user.name}, <br /> Avatar: {data.user.image}, <br />{" "}
          AccessToken:
          {data.user.accessToken.substring(0, 30)}...
        </p>
      ) : (
        <p>Please log in</p>
      )}
    </ContentWrapperStyled>
  );
};
