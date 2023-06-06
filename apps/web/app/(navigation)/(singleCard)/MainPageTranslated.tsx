"use client";

import { TypoStyled } from "components/HomePage.styled";
import { useTranslate } from "lib/hooks";
import styled from "styled-components";

const ContentWrapperStyled = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1em;
`;

export const MainPageTranslated = () => {
  const { dict, t } = useTranslate("MainPage");

  return (
    <ContentWrapperStyled>
      <TypoStyled>{t(dict.welcomeText)}</TypoStyled>
    </ContentWrapperStyled>
  );
};
