"use client";

import { TypoStyled, LinkStyled } from "app/(navigation)/HomePageComponents";
import { useTranslate } from "lib/hooks";
import styled from "styled-components";

export const MainPageTranslated = () => {
  const { dict, t } = useTranslate("MainPage");

  const ContentWrapperStyled = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
  `;

  return (
    <ContentWrapperStyled>
      <TypoStyled>{t(dict.welcomeText)}</TypoStyled>
      <LinkStyled href="/sign-up">{t(dict.createAccountLink)}</LinkStyled>
    </ContentWrapperStyled>
  );
};
